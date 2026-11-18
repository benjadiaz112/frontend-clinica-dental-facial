package cl.aura.reservas;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservas")
@SecurityRequirement(name="jwt")
public class ReservaController {
    private final Reservas reservas;

    ReservaController(Reservas reservas) {
        this.reservas = reservas;
    }

    @GetMapping
    public List<Reserva> listar(@AuthenticationPrincipal Jwt usuario) {
        return reservas.listar(usuario);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva crear(@Valid @RequestBody Reservas.Solicitud datos, @AuthenticationPrincipal Jwt usuario) {
        return reservas.crear(datos, usuario);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelar(@PathVariable UUID id, @AuthenticationPrincipal Jwt usuario) {
        reservas.cancelar(id, usuario);
    }
}
