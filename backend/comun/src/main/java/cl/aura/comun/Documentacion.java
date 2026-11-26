package cl.aura.comun;

import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class Documentacion {
    @Bean
    OpenApiCustomizer usarOrigenActual() {
        return api -> api.setServers(List.of(new Server().url("/")));
    }
}
