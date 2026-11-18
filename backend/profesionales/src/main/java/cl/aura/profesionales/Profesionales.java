package cl.aura.profesionales;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profesionales")
public class Profesionales {
    public record Profesional(long id, String nombre, String especialidad) {}
    private final JdbcTemplate db;

    Profesionales(JdbcTemplate db) { this.db = db; }

    @GetMapping
    public List<Profesional> listar(@RequestParam long tratamientoId) {
        return db.query("""
            SELECT p.* FROM profesional p JOIN profesional_tratamiento pt ON pt.profesional_id=p.id
            WHERE pt.tratamiento_id=? ORDER BY p.nombre
            """, (fila, n) -> new Profesional(fila.getLong("id"), fila.getString("nombre"), fila.getString("especialidad")), tratamientoId);
    }
}
