package cl.aura.agenda;

import java.time.*;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/interno/agenda")
public class Bloqueos {
    private final JdbcTemplate db;
    private final String clave;

    Bloqueos(JdbcTemplate db, @Value("${AURA_INTERNAL_KEY}") String clave) {
        if (clave.length() < 32) throw new IllegalArgumentException("AURA_INTERNAL_KEY requiere al menos 32 caracteres");
        this.db = db;
        this.clave = clave;
    }

    @PutMapping("/{bloque}/reservas/{reserva}")
    @Transactional
    public Agenda.Bloque ocupar(@PathVariable long bloque, @PathVariable UUID reserva,
                                @RequestParam long profesionalId, @RequestHeader("X-Aura-Interna") String credencial) {
        verificar(credencial);
        db.update("UPDATE bloque SET reserva=? WHERE id=? AND profesional_id=? AND inicio>? AND reserva IS NULL",
            reserva.toString(), bloque, profesionalId, LocalDateTime.now(ZoneId.of("America/Santiago")));
        return db.query("SELECT * FROM bloque WHERE id=? AND profesional_id=? AND reserva=?",
            (f, n) -> new Agenda.Bloque(f.getLong("id"), f.getLong("profesional_id"),
                f.getObject("inicio", LocalDateTime.class)), bloque, profesionalId, reserva.toString())
            .stream().findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "El horario ya no está disponible"));
    }

    @DeleteMapping("/{bloque}/reservas/{reserva}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void liberar(@PathVariable long bloque, @PathVariable UUID reserva,
                        @RequestHeader("X-Aura-Interna") String credencial) {
        verificar(credencial);
        db.update("UPDATE bloque SET reserva=NULL WHERE id=? AND reserva=?", bloque, reserva.toString());
    }

    private void verificar(String credencial) {
        if (!java.security.MessageDigest.isEqual(clave.getBytes(java.nio.charset.StandardCharsets.UTF_8),
                credencial.getBytes(java.nio.charset.StandardCharsets.UTF_8))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
