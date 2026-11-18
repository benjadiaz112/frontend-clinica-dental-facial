package cl.aura.gateway;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.*;
import java.time.Duration;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import static org.junit.jupiter.api.Assertions.*;

@EnabledIfEnvironmentVariable(named = "AURA_PRUEBA_INTEGRACION", matches = "true")
class IntegracionTest {
    private static final String TRATAMIENTOS = "/api/tratamientos";
    private static final String RESERVAS = "/api/reservas";
    private final ObjectMapper json = new ObjectMapper();
    private final HttpClient cliente = HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build();
    private final String base = System.getenv().getOrDefault("AURA_WEB_URL", "http://localhost:3000");

    @Test
    void verificaRolesCrudYReservas() throws Exception {
        var administrador = entrar("admin@clinica.test", "AURA_ADMIN_PASSWORD");
        var paciente = entrar("paciente@clinica.test", "AURA_USER_PASSWORD");
        assertEquals("ADMIN", cuerpo(administrador).get("rol").asText());
        assertEquals("PACIENTE", cuerpo(paciente).get("rol").asText());
        String original = cookie(paciente);
        var nuevaSesion = pedir("POST", "/api/auth/renovar", null, null, original);
        assertEquals(200, nuevaSesion.statusCode());
        String renovada = cookie(nuevaSesion);
        assertNotEquals(original, renovada);
        assertEquals(401, pedir("POST", "/api/auth/renovar", null, null, original).statusCode());

        String tokenAdmin = cuerpo(administrador).get("token").asText();
        String tokenPaciente = cuerpo(nuevaSesion).get("token").asText();
        probarCatalogo(tokenAdmin, tokenPaciente);
        probarReserva(tokenAdmin, tokenPaciente);

        assertEquals(204, pedir("POST", "/api/auth/salir", null, null, renovada).statusCode());
        assertEquals(401, pedir("POST", "/api/auth/renovar", null, null, renovada).statusCode());
    }

    private void probarCatalogo(String admin, String paciente) throws Exception {
        var datos = json.createObjectNode();
        datos.put("nombre", "Prueba " + UUID.randomUUID());
        datos.put("descripcion", "Registro temporal");
        datos.put("imagen", "/imagenes/consulta-dental.jpg");
        datos.put("textoAlternativo", "Consulta");
        datos.put("precioDesde", 1000);
        datos.put("textoPrecio", "Desde $1.000");

        assertEquals(200, pedir("GET", TRATAMIENTOS, null, null, null).statusCode());
        assertEquals(401, pedir("POST", TRATAMIENTOS, datos, null, null).statusCode());
        assertEquals(403, pedir("POST", TRATAMIENTOS, datos, paciente, null).statusCode());
        assertEquals(400, pedir("POST", TRATAMIENTOS, datos.deepCopy().put("precioDesde", -1), admin, null).statusCode());

        var creado = pedir("POST", TRATAMIENTOS, datos, admin, null);
        assertEquals(201, creado.statusCode(), creado.body());
        String ruta = TRATAMIENTOS + "/" + cuerpo(creado).get("id").asLong();
        try {
            assertEquals(datos.get("nombre"), cuerpo(pedir("GET", ruta, null, null, null)).get("nombre"));
            var editado = pedir("PUT", ruta, datos.put("precioDesde", 1500), admin, null);
            assertEquals(200, editado.statusCode(), editado.body());
            assertEquals(1500, cuerpo(editado).get("precioDesde").asInt());
        } finally {
            assertEquals(204, pedir("DELETE", ruta, null, admin, null).statusCode());
        }
        assertEquals(404, pedir("GET", ruta, null, null, null).statusCode());
    }

    private void probarReserva(String admin, String paciente) throws Exception {
        var profesionales = cuerpo(pedir("GET", "/api/profesionales?tratamientoId=1", null, null, null));
        long profesional = profesionales.get(0).get("id").asLong();
        String agenda = "/api/agenda?profesionalId=" + profesional;
        long bloque = cuerpo(pedir("GET", agenda, null, null, null)).get(0).get("id").asLong();
        assertEquals(401, pedir("GET", RESERVAS, null, null, null).statusCode());
        assertEquals(403, pedir("GET", RESERVAS, null, admin, null).statusCode());

        String idA = UUID.randomUUID().toString();
        String idB = UUID.randomUUID().toString();
        var a = datosReserva(idA, profesional, bloque);
        var b = datosReserva(idB, profesional, bloque);
        try {
            var primera = cliente.sendAsync(solicitud("POST", RESERVAS, a, paciente, null), HttpResponse.BodyHandlers.ofString());
            var segunda = cliente.sendAsync(solicitud("POST", RESERVAS, b, paciente, null), HttpResponse.BodyHandlers.ofString());
            CompletableFuture.allOf(primera, segunda).join();
            var r1 = primera.join();
            var r2 = segunda.join();
            boolean ganoPrimera = r1.statusCode() == 201;
            assertEquals(201, (ganoPrimera ? r1 : r2).statusCode(), r1.body() + r2.body());
            assertEquals(409, (ganoPrimera ? r2 : r1).statusCode());
            String ganador = ganoPrimera ? idA : idB;
            var reintento = pedir("POST", RESERVAS, ganoPrimera ? a : b, paciente, null);
            assertEquals(201, reintento.statusCode());
            assertEquals(ganador, cuerpo(reintento).get("id").asText());
            var reservas = cuerpo(pedir("GET", RESERVAS, null, paciente, null));
            assertTrue(java.util.stream.StreamSupport.stream(reservas.spliterator(), false)
                .anyMatch(r -> ganador.equals(r.get("id").asText()) && "CONFIRMADA".equals(r.get("estado").asText())));
            assertFalse(disponible(agenda, bloque));
        } finally {
            for (String id : new String[]{idA, idB}) {
                int estado = pedir("DELETE", RESERVAS + "/" + id, null, paciente, null).statusCode();
                assertTrue(estado == 204 || estado == 404);
            }
        }
        assertTrue(disponible(agenda, bloque));
    }

    private boolean disponible(String ruta, long bloque) throws Exception {
        for (var horario : cuerpo(pedir("GET", ruta, null, null, null))) {
            if (horario.get("id").asLong() == bloque) return true;
        }
        return false;
    }

    private Map<String, Object> datosReserva(String id, long profesional, long bloque) {
        return Map.of("id", id, "tratamientoId", 1, "profesionalId", profesional, "bloqueId", bloque);
    }

    private HttpResponse<String> entrar(String correo, String variable) throws Exception {
        var respuesta = pedir("POST", "/api/auth/entrar", Map.of("correo", correo, "clave", System.getenv(variable)), null, null);
        assertEquals(200, respuesta.statusCode(), respuesta.body());
        String cabecera = respuesta.headers().firstValue("set-cookie").orElseThrow();
        assertTrue(cabecera.contains("HttpOnly") && cabecera.contains("SameSite=Strict"));
        return respuesta;
    }

    private String cookie(HttpResponse<String> respuesta) {
        return respuesta.headers().firstValue("set-cookie").orElseThrow().split(";")[0];
    }

    private JsonNode cuerpo(HttpResponse<String> respuesta) throws Exception {
        return json.readTree(respuesta.body());
    }

    private HttpResponse<String> pedir(String metodo, String ruta, Object datos, String token, String cookie) throws Exception {
        return cliente.send(solicitud(metodo, ruta, datos, token, cookie), HttpResponse.BodyHandlers.ofString());
    }

    private HttpRequest solicitud(String metodo, String ruta, Object datos, String token, String cookie) throws Exception {
        var builder = HttpRequest.newBuilder(URI.create(base + ruta)).timeout(Duration.ofSeconds(15));
        if (token != null) builder.header("Authorization", "Bearer " + token);
        if (cookie != null) builder.header("Cookie", cookie);
        if (datos == null) return builder.method(metodo, HttpRequest.BodyPublishers.noBody()).build();
        return builder.header("Content-Type", "application/json")
            .method(metodo, HttpRequest.BodyPublishers.ofString(json.writeValueAsString(datos))).build();
    }
}
