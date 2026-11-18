package cl.aura.usuarios;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.*;
import java.util.Base64;
import java.util.HexFormat;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import cl.aura.comun.Seguridad;

@RestController
@RequestMapping("/api/auth")
public class Sesion {
    private static final String COOKIE = "aura_sesion";
    private final SecureRandom azar = new SecureRandom();
    private final JdbcTemplate db;
    private final Usuarios usuarios;
    private final JwtEncoder jwt;
    private final boolean cookieSegura;

    public record Credenciales(@NotBlank @Email @Size(max=254) String correo, @NotBlank @Size(max=72) String clave) {}
    public record Acceso(String token, String correo, String rol) {}
    private record Renovacion(Usuarios.Cuenta cuenta, Instant vence) {}

    Sesion(JdbcTemplate db, Usuarios usuarios, SecretKey clave, @Value("${AURA_COOKIE_SECURE:false}") boolean cookieSegura) {
        this.db = db;
        this.usuarios = usuarios;
        this.jwt = new NimbusJwtEncoder(new ImmutableSecret<>(clave));
        this.cookieSegura = cookieSegura;
    }

    @PostMapping("/entrar")
    @Transactional
    public Acceso entrar(@Valid @RequestBody Credenciales datos,
                         @CookieValue(name=COOKIE, required=false) String anterior, HttpServletResponse respuesta) {
        var cuenta = usuarios.validar(datos.correo(), datos.clave());
        if (cuenta == null) throw invalida();
        revocar(anterior);
        db.update("DELETE FROM sesion WHERE vence <= CURRENT_TIMESTAMP");
        return emitir(cuenta, Instant.now().plus(Duration.ofHours(8)), respuesta);
    }

    @PostMapping("/renovar")
    @Transactional
    public Acceso renovar(@CookieValue(name=COOKIE, required=false) String cookie, HttpServletResponse respuesta) {
        if (cookie == null) throw invalida();
        var registros = db.query("""
            SELECT u.correo, u.rol, s.vence FROM sesion s JOIN usuario u ON u.correo=s.correo
            WHERE s.huella=? AND s.vence>CURRENT_TIMESTAMP
            """, (f, n) -> new Renovacion(new Usuarios.Cuenta(f.getString("correo"), f.getString("rol")),
                                          f.getTimestamp("vence").toInstant()), hash(cookie));
        if (registros.isEmpty() || revocar(cookie) != 1) throw invalida();
        var registro = registros.getFirst();
        return emitir(registro.cuenta(), registro.vence(), respuesta);
    }

    @PostMapping("/salir")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void salir(@CookieValue(name=COOKIE, required=false) String cookie, HttpServletResponse respuesta) {
        revocar(cookie);
        escribirCookie(respuesta, "", Duration.ZERO);
    }

    private Acceso emitir(Usuarios.Cuenta cuenta, Instant vence, HttpServletResponse respuesta) {
        Instant ahora = Instant.now();
        if (!vence.isAfter(ahora)) throw invalida();
        Instant expira = ahora.plusSeconds(300).isBefore(vence) ? ahora.plusSeconds(300) : vence;
        var datos = JwtClaimsSet.builder().issuer(Seguridad.EMISOR).subject(cuenta.correo())
            .issuedAt(ahora).expiresAt(expira).claim("rol", cuenta.rol()).build();
        var firma = JwsHeader.with(MacAlgorithm.HS256).build();
        String token = jwt.encode(JwtEncoderParameters.from(firma, datos)).getTokenValue();
        String cookie = Base64.getUrlEncoder().withoutPadding().encodeToString(azar.generateSeed(32));
        db.update("INSERT INTO sesion VALUES (?, ?, ?)", hash(cookie), cuenta.correo(), Timestamp.from(vence));
        escribirCookie(respuesta, cookie, Duration.between(ahora, vence));
        return new Acceso(token, cuenta.correo(), cuenta.rol());
    }

    private int revocar(String cookie) {
        return cookie == null ? 0 : db.update("DELETE FROM sesion WHERE huella=?", hash(cookie));
    }

    private void escribirCookie(HttpServletResponse respuesta, String valor, Duration duracion) {
        respuesta.setHeader("Cache-Control", "no-store");
        respuesta.addHeader("Set-Cookie", ResponseCookie.from(COOKIE, valor).httpOnly(true).secure(cookieSegura)
            .sameSite("Strict").path("/api/auth").maxAge(duracion).build().toString());
    }

    private String hash(String valor) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(valor.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException error) {
            throw new IllegalStateException(error);
        }
    }

    private ResponseStatusException invalida() {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales o sesión no válidas");
    }
}
