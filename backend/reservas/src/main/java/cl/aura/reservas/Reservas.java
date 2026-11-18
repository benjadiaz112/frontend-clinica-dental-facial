package cl.aura.reservas;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/reservas")
@SecurityRequirement(name="jwt")
public class Reservas {
    public record Solicitud(@NotNull UUID id, @Positive long tratamientoId, @Positive long profesionalId, @Positive long bloqueId) {}
    private final JdbcTemplate db;
    private final ServiciosClinica clinica;

    Reservas(JdbcTemplate db, ServiciosClinica clinica) {
        this.db = db;
        this.clinica = clinica;
    }

    @GetMapping
    public List<Reserva> listar(@AuthenticationPrincipal Jwt usuario) {
        return db.query("SELECT * FROM reserva WHERE correo=? ORDER BY inicio DESC", Reserva.FILA, usuario.getSubject());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public Reserva crear(@Valid @RequestBody Solicitud datos, @AuthenticationPrincipal Jwt usuario) {
        String id = datos.id().toString();
        db.update("""
            INSERT INTO reserva (id, correo, tratamiento_id, profesional_id, bloque_id, estado)
            VALUES (?, ?, ?, ?, ?, 'PENDIENTE') ON DUPLICATE KEY UPDATE id=id
            """, id, usuario.getSubject(), datos.tratamientoId(), datos.profesionalId(), datos.bloqueId());
        Reserva anterior = cargar(id, usuario);
        if (anterior.tratamientoId() != datos.tratamientoId() || anterior.profesionalId() != datos.profesionalId()
            || anterior.bloqueId() != datos.bloqueId() || anterior.estado().equals("CANCELADA")) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El identificador ya se usó para otra operación");
        }
        if (anterior.estado().equals("CONFIRMADA")) return anterior;

        var tratamiento = clinica.tratamiento(datos.tratamientoId());
        var profesional = clinica.profesional(datos.profesionalId(), datos.tratamientoId());
        var bloque = clinica.ocupar(datos.bloqueId(), id, profesional.id(), usuario.getTokenValue());
        db.update("UPDATE reserva SET tratamiento=?, profesional=?, inicio=?, estado='CONFIRMADA' WHERE id=?",
            tratamiento.nombre(), profesional.nombre(), bloque.inicio(), id);
        return cargar(id, usuario);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void cancelar(@PathVariable UUID id, @AuthenticationPrincipal Jwt usuario) {
        Reserva reserva = cargar(id.toString(), usuario);
        if (reserva.estado().equals("CANCELADA")) return;
        clinica.liberar(reserva.bloqueId(), reserva.id(), usuario.getTokenValue());
        db.update("UPDATE reserva SET estado='CANCELADA' WHERE id=?", reserva.id());
    }

    private Reserva cargar(String id, Jwt usuario) {
        return db.query("SELECT * FROM reserva WHERE id=? AND correo=? FOR UPDATE", Reserva.FILA, id, usuario.getSubject())
            .stream().findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
    }
}
