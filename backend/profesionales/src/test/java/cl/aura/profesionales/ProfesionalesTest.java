package cl.aura.profesionales;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class ProfesionalesTest {
    @Test
    void filtraPorElTratamientoSolicitado() {
        var db = mock(JdbcTemplate.class);
        var doctora = new Profesionales.Profesional(1, "Dra. Elisa Soto", "Odontología");
        when(db.query(contains("WHERE pt.tratamiento_id=?"),
            org.mockito.ArgumentMatchers.<RowMapper<Profesionales.Profesional>>any(), eq(4L)))
            .thenReturn(List.of(doctora));

        assertEquals(List.of(doctora), new Profesionales(db).listar(4L));
    }
}
