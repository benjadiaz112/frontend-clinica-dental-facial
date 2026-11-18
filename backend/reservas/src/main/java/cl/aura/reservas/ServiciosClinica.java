package cl.aura.reservas;

import java.time.*;
import java.net.http.HttpClient;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.*;
import org.springframework.web.server.ResponseStatusException;

@Component
class ServiciosClinica {
    record Tratamiento(long id, String nombre) {}
    record Profesional(long id, String nombre) {}
    record Bloque(long id, long profesionalId, LocalDateTime inicio) {}

    private final RestClient http;
    private final String clave;

    ServiciosClinica(@Value("${AURA_INTERNAL_KEY}") String clave) {
        this.clave = clave;
        var cliente = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build();
        var fabrica = new JdkClientHttpRequestFactory(cliente);
        fabrica.setReadTimeout(Duration.ofSeconds(3));
        this.http = RestClient.builder().requestFactory(fabrica).build();
    }

    Tratamiento tratamiento(long id) {
        return consultar(() -> http.get().uri("http://127.0.0.1:8082/api/tratamientos/{id}", id)
            .retrieve().body(Tratamiento.class));
    }

    Profesional profesional(long id, long tratamientoId) {
        var lista = consultar(() -> http.get()
            .uri("http://127.0.0.1:8083/api/profesionales?tratamientoId={id}", tratamientoId)
            .retrieve().body(Profesional[].class));
        return Arrays.stream(lista).filter(p -> p.id() == id).findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "El profesional no realiza ese tratamiento"));
    }

    Bloque ocupar(long bloque, String reserva, long profesionalId, String jwt) {
        return consultar(() -> http.put().uri("http://127.0.0.1:8084/interno/agenda/{b}/reservas/{r}?profesionalId={p}",
                bloque, reserva, profesionalId)
            .headers(h -> h.setBearerAuth(jwt)).header("X-Aura-Interna", clave).retrieve().body(Bloque.class));
    }

    void liberar(long bloque, String reserva, String jwt) {
        consultar(() -> http.delete().uri("http://127.0.0.1:8084/interno/agenda/{b}/reservas/{r}", bloque, reserva)
            .headers(h -> h.setBearerAuth(jwt)).header("X-Aura-Interna", clave).retrieve().toBodilessEntity());
    }

    private <T> T consultar(java.util.function.Supplier<T> operacion) {
        try {
            return operacion.get();
        } catch (HttpClientErrorException.Conflict error) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El horario ya no está disponible");
        } catch (HttpClientErrorException.NotFound error) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El tratamiento no está disponible");
        } catch (RestClientException error) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo completar la operación. Reintenta.");
        }
    }
}
