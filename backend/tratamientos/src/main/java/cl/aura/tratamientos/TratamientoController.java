package cl.aura.tratamientos;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tratamientos")
public class TratamientoController {
    private final Catalogo catalogo;

    TratamientoController(Catalogo catalogo) {
        this.catalogo = catalogo;
    }

    @GetMapping
    public List<Catalogo.Tratamiento> listar() {
        return catalogo.listar();
    }

    @GetMapping("/{id}")
    public Catalogo.Tratamiento buscar(@PathVariable long id) {
        return catalogo.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name="jwt")
    public Catalogo.Tratamiento crear(@Valid @RequestBody Catalogo.Datos datos) {
        return catalogo.crear(datos);
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name="jwt")
    public Catalogo.Tratamiento actualizar(@PathVariable long id, @Valid @RequestBody Catalogo.Datos datos) {
        return catalogo.actualizar(id, datos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @SecurityRequirement(name="jwt")
    public void eliminar(@PathVariable long id) {
        catalogo.eliminar(id);
    }
}
