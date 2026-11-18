package cl.aura.comun;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import java.time.Duration;
import org.springframework.security.oauth2.server.resource.authentication.*;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@SecurityScheme(name = "jwt", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class Seguridad {
    public static final String EMISOR = "clinica-aura";

    @Bean
    SecretKey claveJwt(@Value("${aura.jwt.secret}") String secreto) {
        byte[] bytes = secreto.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) throw new IllegalArgumentException("AURA_JWT_SECRET requiere al menos 32 bytes");
        return new SecretKeySpec(bytes, "HmacSHA256");
    }

    @Bean
    JwtDecoder verificador(SecretKey clave) {
        var decoder = NimbusJwtDecoder.withSecretKey(clave).build();
        decoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(
            new JwtTimestampValidator(Duration.ZERO), new JwtIssuerValidator(EMISOR)));
        return decoder;
    }

    @Bean
    BCryptPasswordEncoder claves() { return new BCryptPasswordEncoder(); }

    @Bean
    SecurityFilterChain permisos(HttpSecurity http) throws Exception {
        var roles = new JwtGrantedAuthoritiesConverter();
        roles.setAuthoritiesClaimName("rol");
        roles.setAuthorityPrefix("ROLE_");
        var conversion = new JwtAuthenticationConverter();
        conversion.setJwtGrantedAuthoritiesConverter(roles);
        return http.csrf(c -> c.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(r -> r
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/error").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/entrar", "/api/auth/renovar", "/api/auth/salir").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/tratamientos", "/api/tratamientos/*", "/api/profesionales", "/api/agenda").permitAll()
                .requestMatchers("/api/tratamientos", "/api/tratamientos/*").hasRole("ADMIN")
                .requestMatchers("/api/reservas", "/api/reservas/*", "/interno/agenda/**").hasRole("PACIENTE")
                .anyRequest().denyAll())
            .oauth2ResourceServer(o -> o.jwt(j -> j.jwtAuthenticationConverter(conversion)))
            .build();
    }
}
