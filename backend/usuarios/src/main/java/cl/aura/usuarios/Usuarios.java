package cl.aura.usuarios;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
class Usuarios implements ApplicationRunner {
    record Cuenta(String correo, String rol) {}

    private final JdbcTemplate db;
    private final BCryptPasswordEncoder claves;
    private final String hashFicticio;

    Usuarios(JdbcTemplate db, BCryptPasswordEncoder claves) {
        this.db = db;
        this.claves = claves;
        this.hashFicticio = claves.encode(java.util.UUID.randomUUID().toString());
    }

    Cuenta validar(String correo, String clave) {
        if (clave.getBytes(StandardCharsets.UTF_8).length > 72) return null;
        var filas = db.queryForList("SELECT * FROM usuario WHERE correo=?", correo.strip().toLowerCase(Locale.ROOT));
        var fila = filas.isEmpty() ? null : filas.getFirst();
        String hash = fila == null ? hashFicticio : (String) fila.get("clave");
        if (!claves.matches(clave, hash) || fila == null) return null;
        return new Cuenta((String) fila.get("correo"), (String) fila.get("rol"));
    }

    @Override
    public void run(ApplicationArguments args) {
        crear("admin@clinica.test", "AURA_ADMIN_PASSWORD", "ADMIN");
        crear("paciente@clinica.test", "AURA_USER_PASSWORD", "PACIENTE");
    }

    private void crear(String correo, String variable, String rol) {
        if (!db.queryForList("SELECT correo FROM usuario WHERE correo=?", correo).isEmpty()) return;
        String clave = System.getenv(variable);
        if (clave == null || clave.length() < 12 || clave.getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new IllegalArgumentException(variable + " requiere entre 12 caracteres y 72 bytes");
        }
        db.update("INSERT INTO usuario VALUES (?, ?, ?)", correo, claves.encode(clave), rol);
    }
}
