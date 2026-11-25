package cl.aura.usuarios;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UsuariosTest {
    @Test
    void reconoceLaCuentaYRechazaUnaClaveIncorrecta() {
        var db = mock(JdbcTemplate.class);
        var claves = new BCryptPasswordEncoder(4);
        var usuarios = new Usuarios(db, claves);
        String correo = "paciente@clinica.test";
        when(db.queryForList("SELECT * FROM usuario WHERE correo=?", correo)).thenReturn(
            List.of(Map.of("correo", correo, "clave", claves.encode("clave-de-prueba"), "rol", "PACIENTE")));

        assertEquals(new Usuarios.Cuenta(correo, "PACIENTE"),
            usuarios.validar(" PACIENTE@CLINICA.TEST ", "clave-de-prueba"));
        assertNull(usuarios.validar(correo, "otra-clave"));
    }
}
