package cl.aura.tratamientos;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.*;
import java.util.List;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class Catalogo {
    public record Datos(@NotBlank @Size(max=100) String nombre, @NotBlank @Size(max=500) String descripcion,
                        @NotBlank @Size(max=200) @Pattern(regexp="/imagenes/[a-zA-Z0-9_-]+[.](jpg|jpeg|png|webp)") String imagen,
                        @NotBlank @Size(max=150) String textoAlternativo, @PositiveOrZero Integer precioDesde,
                        @NotBlank @Size(max=100) String textoPrecio) {}
    public record Tratamiento(long id, String nombre, String descripcion, String imagen,
                              String textoAlternativo, Integer precioDesde, String textoPrecio) {}

    private static final RowMapper<Tratamiento> FILA = (rs, n) -> new Tratamiento(
        rs.getLong("id"), rs.getString("nombre"), rs.getString("descripcion"), rs.getString("imagen"),
        rs.getString("texto_alternativo"), rs.getObject("precio_desde", Integer.class), rs.getString("texto_precio"));
    private final JdbcTemplate db;

    Catalogo(JdbcTemplate db) { this.db = db; }

    public List<Tratamiento> listar() { return db.query("SELECT * FROM tratamiento ORDER BY id", FILA); }

    public Tratamiento buscar(long id) {
        return db.query("SELECT * FROM tratamiento WHERE id=?", FILA, id).stream().findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tratamiento no encontrado"));
    }

    public Tratamiento crear(Datos datos) {
        var clave = new GeneratedKeyHolder();
        try {
            db.update(con -> {
                var stmt = con.prepareStatement(
                    "INSERT INTO tratamiento (nombre, descripcion, imagen, texto_alternativo, precio_desde, texto_precio) VALUES (?, ?, ?, ?, ?, ?)",
                    java.sql.Statement.RETURN_GENERATED_KEYS);
                Object[] valores = {datos.nombre().strip(), datos.descripcion(), datos.imagen(), datos.textoAlternativo(), datos.precioDesde(), datos.textoPrecio()};
                for (int i=0; i<valores.length; i++) stmt.setObject(i+1, valores[i]);
                return stmt;
            }, clave);
        } catch (DuplicateKeyException error) { throw duplicado(); }
        return buscar(clave.getKey().longValue());
    }

    public Tratamiento actualizar(long id, Datos d) {
        try {
            db.update("UPDATE tratamiento SET nombre=?, descripcion=?, imagen=?, texto_alternativo=?, precio_desde=?, texto_precio=? WHERE id=?",
                d.nombre().strip(), d.descripcion(), d.imagen(), d.textoAlternativo(), d.precioDesde(), d.textoPrecio(), id);
        } catch (DuplicateKeyException error) { throw duplicado(); }
        return buscar(id);
    }

    public void eliminar(long id) {
        if (db.update("DELETE FROM tratamiento WHERE id=?", id) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tratamiento no encontrado");
        }
    }

    private ResponseStatusException duplicado() {
        return new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un tratamiento con ese nombre");
    }

    @Bean
    ApplicationRunner cargarCatalogo(ObjectMapper json, TransactionTemplate tx) {
        return args -> {
            try (var archivo = new ClassPathResource("catalogo.json").getInputStream()) {
                var registros = json.readTree(archivo).get("tratamientos");
                tx.executeWithoutResult(estado -> {
                    if (!db.queryForList("SELECT id FROM catalogo_inicializado").isEmpty()) return;
                    for (var d : registros) {
                        db.update("INSERT INTO tratamiento VALUES (?, ?, ?, ?, ?, ?, ?)", d.get("id").asLong(),
                            d.get("nombre").asText(), d.get("descripcion").asText(), d.get("imagen").asText(),
                            d.get("textoAlternativo").asText(), d.get("precioDesde").isNull() ? null : d.get("precioDesde").asInt(),
                            d.get("textoPrecio").asText());
                    }
                    db.update("INSERT INTO catalogo_inicializado VALUES (1)");
                });
            }
        };
    }
}
