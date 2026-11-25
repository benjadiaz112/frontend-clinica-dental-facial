package cl.aura.agenda;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.server.ResponseStatusException;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BloqueosTest {
    private static final String CLAVE = "clave-interna-de-prueba-de-32-caracteres";
    private final JdbcTemplate db = mock(JdbcTemplate.class);
    private final Bloqueos bloqueos = new Bloqueos(db, CLAVE);

    @Test
    void rechazaUnaCredencialIncorrectaAntesDeConsultarLaBase() {
        var id = UUID.randomUUID();
        var error = assertThrows(ResponseStatusException.class, () -> bloqueos.liberar(7, id, "incorrecta"));

        assertEquals(HttpStatus.FORBIDDEN, error.getStatusCode());
        verifyNoInteractions(db);
    }

    @Test
    void liberaSoloElBloqueAsociadoALaReserva() {
        var id = UUID.randomUUID();
        bloqueos.liberar(7, id, CLAVE);

        verify(db).update("UPDATE bloque SET reserva=NULL WHERE id=? AND reserva=?", 7L, id.toString());
    }
}
