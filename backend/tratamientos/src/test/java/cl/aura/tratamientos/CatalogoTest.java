package cl.aura.tratamientos;

import org.junit.jupiter.api.Test;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.server.ResponseStatusException;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CatalogoTest {
    @Test
    void informaConflictoAlCrearUnNombreDuplicado() {
        var db = mock(JdbcTemplate.class);
        var catalogo = new Catalogo(db);
        var datos = new Catalogo.Datos("Limpieza", "Limpieza dental", "/imagenes/limpieza.jpg",
            "Limpieza dental", 18000, "Desde $18.000");
        when(db.update(any(org.springframework.jdbc.core.PreparedStatementCreator.class),
            any(org.springframework.jdbc.support.KeyHolder.class)))
            .thenThrow(new DuplicateKeyException("Nombre duplicado"));

        var error = assertThrows(ResponseStatusException.class, () -> catalogo.crear(datos));
        assertEquals(HttpStatus.CONFLICT, error.getStatusCode());
    }

    @Test
    void informaCuandoElTratamientoQueSeQuiereEliminarNoExiste() {
        var db = mock(JdbcTemplate.class);
        when(db.update("DELETE FROM tratamiento WHERE id=?", 99L)).thenReturn(0);

        var error = assertThrows(ResponseStatusException.class, () -> new Catalogo(db).eliminar(99L));
        assertEquals(HttpStatus.NOT_FOUND, error.getStatusCode());
    }
}
