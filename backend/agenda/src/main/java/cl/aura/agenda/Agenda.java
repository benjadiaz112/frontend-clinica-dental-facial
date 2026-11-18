package cl.aura.agenda;

import java.time.*;
import java.util.List;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agenda")
public class Agenda {
    public record Bloque(long id, long profesionalId, LocalDateTime inicio) {}
    private final JdbcTemplate db;
    private final ZoneId chile = ZoneId.of("America/Santiago");

    Agenda(JdbcTemplate db) { this.db = db; }

    @GetMapping
    public List<Bloque> disponibles(@RequestParam long profesionalId) {
        return db.query("""
            SELECT id, profesional_id, inicio FROM bloque WHERE profesional_id=? AND inicio>? AND reserva IS NULL
            ORDER BY inicio
            """, (fila, n) -> new Bloque(fila.getLong("id"), fila.getLong("profesional_id"),
                fila.getObject("inicio", LocalDateTime.class)), profesionalId, LocalDateTime.now(chile));
    }

    @Bean
    ApplicationRunner prepararHorarios() {
        return args -> {
            LocalDate hoy = LocalDate.now(chile);
            for (long profesional=1; profesional<=3; profesional++) {
                for (int dia=1; dia<=7; dia++) {
                    for (int hora : new int[]{10, 12, 15}) {
                        db.update("INSERT IGNORE INTO bloque (profesional_id, inicio) VALUES (?, ?)",
                            profesional, hoy.plusDays(dia).atTime(hora, 0));
                    }
                }
            }
        };
    }
}
