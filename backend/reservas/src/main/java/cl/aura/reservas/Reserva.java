package cl.aura.reservas;

import java.time.LocalDateTime;
import org.springframework.jdbc.core.RowMapper;

public record Reserva(String id, String correo, long tratamientoId, long profesionalId,
                      long bloqueId, String tratamiento, String profesional, LocalDateTime inicio, String estado) {
    static final RowMapper<Reserva> FILA = (f, n) -> new Reserva(f.getString("id"), f.getString("correo"),
        f.getLong("tratamiento_id"), f.getLong("profesional_id"), f.getLong("bloque_id"),
        f.getString("tratamiento"), f.getString("profesional"), f.getObject("inicio", LocalDateTime.class), f.getString("estado"));
}
