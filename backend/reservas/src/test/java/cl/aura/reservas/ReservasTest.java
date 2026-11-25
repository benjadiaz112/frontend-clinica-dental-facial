package cl.aura.reservas;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.server.ResponseStatusException;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservasTest {
    private final JdbcTemplate db = mock(JdbcTemplate.class);
    private final ServiciosClinica clinica = mock(ServiciosClinica.class);
    private final Reservas reservas = new Reservas(db, clinica, mock(TransactionTemplate.class));
    private final Jwt paciente = Jwt.withTokenValue("token-de-prueba").header("alg", "HS256")
        .subject("paciente@clinica.test").build();

    @Test
    void noCancelaUnaReservaQueNoPerteneceAlPaciente() {
        var id = UUID.randomUUID();
        when(db.query(contains("WHERE id=? AND correo=?"), eq(Reserva.FILA),
            eq(id.toString()), eq(paciente.getSubject()))).thenReturn(List.of());

        var error = assertThrows(ResponseStatusException.class, () -> reservas.cancelar(id, paciente));
        assertEquals(HttpStatus.NOT_FOUND, error.getStatusCode());
        verifyNoInteractions(clinica);
    }

    @Test
    void alCancelarLiberaElBloqueYGuardaElEstado() {
        var id = UUID.randomUUID();
        var cita = new Reserva(id.toString(), paciente.getSubject(), 1, 2, 7,
            "Limpieza", "Elisa", LocalDateTime.of(2026, 12, 1, 10, 0), "CONFIRMADA");
        when(db.query(contains("WHERE id=? AND correo=?"), eq(Reserva.FILA),
            eq(id.toString()), eq(paciente.getSubject()))).thenReturn(List.of(cita));

        reservas.cancelar(id, paciente);

        var orden = inOrder(clinica, db);
        orden.verify(clinica).liberar(7L, id.toString(), paciente.getTokenValue());
        orden.verify(db).update("UPDATE reserva SET estado='CANCELADA' WHERE id=?", id.toString());
    }
}
