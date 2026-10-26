import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import FormularioReserva from "../components/reserva/FormularioReserva";
import datos from "../api_simulada/db.json";
import { escribirCampo, hacerClic, respuestaJson } from "./ayudas";

describe("Formulario de Reserva", function () {
  let contenedor: HTMLDivElement;
  let raiz: Root;
  let direccionOriginal: string;
  let consulta: jasmine.Spy;

  beforeEach(function () {
    direccionOriginal = window.location.href;
    history.replaceState(null, "", "/reserva");
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
    consulta = spyOn(window, "fetch").and.callFake(async function () {
      return respuestaJson(datos.tratamientos);
    });
  });

  afterEach(async function () {
    await act(async function () { raiz.unmount(); });
    contenedor.remove();
    history.replaceState(null, "", direccionOriginal);
  });

  async function mostrar() {
    // Cada llamada representa una nueva entrada a Reserva.
    await act(async function () {
      raiz.unmount();
      raiz = createRoot(contenedor);
      raiz.render(<FormularioReserva />);
    });
  }

  function formulario() {
    return contenedor.querySelector("form") as HTMLFormElement;
  }

  function campo(nombre: string) {
    return formulario().elements.namedItem(nombre) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  }

  function boton(tipo: string) {
    return formulario().querySelector('button[type="' + tipo + '"]') as HTMLButtonElement;
  }

  function escribir(nombre: string, valor: string) {
    return escribirCampo(campo(nombre), valor);
  }

  async function completar() {
    await escribir("nombre", "Ana Pérez");
    await escribir("rut", "12.345.678-5");
    await escribir("correo", "ana@ejemplo.cl");
    await escribir("servicio", "Limpieza dental");
  }

  function comprobarBloqueo() {
    expect((campo("servicio") as HTMLSelectElement).disabled).toBeTrue();
    expect(boton("submit").disabled).toBeTrue();
    expect(boton("reset").disabled).toBeFalse();
  }

  function comprobarLimpieza() {
    for (const nombre of ["nombre", "rut", "correo", "servicio", "comentario"]) {
      expect(campo(nombre).value).toBe("");
      expect(campo(nombre).getAttribute("aria-invalid")).toBe("false");
      expect(campo(nombre).getAttribute("aria-describedby")).toBe("error-" + nombre);
      expect(contenedor.querySelector("#error-" + nombre)?.textContent).toBe("");
    }
    expect(formulario().querySelector('[role="status"]')).toBeNull();
    expect(formulario().querySelector('[role="alert"]')).toBeNull();
  }

  it("rechaza datos incorrectos y acepta datos correctos", async function () {
    consulta.and.callFake(async function () {
      comprobarBloqueo();
      expect(contenedor.querySelector('[role="status"]')?.textContent?.trim()).toBeTruthy();
      return respuestaJson(datos.tratamientos);
    });
    await mostrar();
    expect((campo("servicio") as HTMLSelectElement).disabled).toBeFalse();
    expect(boton("submit").disabled).toBeFalse();

    // Un formulario vacío marca los cuatro campos obligatorios.
    await hacerClic(boton("submit"));
    expect(document.activeElement).toBe(campo("nombre"));
    expect(formulario().querySelectorAll('[aria-invalid="true"]').length).toBe(4);

    // Un RUT incorrecto muestra el error y recibe el foco.
    await completar();
    await escribir("rut", "12.345.678-9");
    await hacerClic(boton("submit"));
    const errorRut = contenedor.querySelector("#error-rut");
    expect(document.activeElement).toBe(campo("rut"));
    expect(campo("rut").getAttribute("aria-invalid")).toBe("true");
    expect(campo("rut").getAttribute("aria-describedby")).toBe("error-rut");
    expect(errorRut?.textContent?.trim()).toBeTruthy();
    expect(formulario().querySelector('[role="alert"]')).not.toBeNull();
    expect(formulario().querySelector('[role="status"]')).toBeNull();

    // Corregir el dato elimina su error.
    await escribir("rut", "12.345.678-5");
    expect(campo("rut").getAttribute("aria-invalid")).toBe("false");
    expect(errorRut?.textContent).toBe("");
    expect(formulario().querySelector('[role="alert"]')).toBeNull();

    // Los datos válidos muestran el resultado de demostración.
    await hacerClic(boton("submit"));
    expect(campo("rut").getAttribute("aria-invalid")).toBe("false");
    expect(formulario().querySelector('[role="status"]')?.textContent).toContain("no se envió una solicitud");
    expect(formulario().querySelector('[role="alert"]')).toBeNull();
    expect(consulta).toHaveBeenCalledTimes(1);

    // Editar de nuevo borra el resultado y permite volver a validar.
    await escribir("correo", "otro@ejemplo.cl");
    expect(formulario().querySelector('[role="status"]')).toBeNull();
    await hacerClic(boton("submit"));
    expect(formulario().querySelector('[role="status"]')).not.toBeNull();
    expect(consulta).toHaveBeenCalledTimes(1);
  });

  it("limpia el formulario y maneja selecciones inválidas o servicios no disponibles", async function () {
    // Un tratamiento de la URL aparece seleccionado.
    history.replaceState(null, "", "/reserva?tratamiento=5");
    await mostrar();
    expect(campo("servicio").value).toBe("Armonización facial");
    expect(contenedor.textContent).toContain("Valor según evaluación");

    // Limpiar después de una validación correcta.
    await completar();
    await escribir("comentario", "Consulta de prueba");
    await hacerClic(boton("submit"));
    expect(formulario().querySelector('[role="status"]')).not.toBeNull();
    await hacerClic(boton("reset"));
    comprobarLimpieza();
    expect(window.location.search).toBe("?tratamiento=5");
    expect(contenedor.textContent).not.toContain("Tratamiento seleccionado");

    // Limpiar también elimina los errores.
    await completar();
    await escribir("rut", "12.345.678-9");
    await hacerClic(boton("submit"));
    expect(formulario().querySelector('[role="alert"]')).not.toBeNull();
    await hacerClic(boton("reset"));
    comprobarLimpieza();

    // Una selección inexistente se recupera eligiendo un servicio válido.
    history.replaceState(null, "", "/reserva?tratamiento=999");
    await mostrar();
    expect(campo("servicio").value).toBe("");
    expect(contenedor.querySelector('[role="alert"]')?.textContent?.trim()).toBeTruthy();
    await completar();
    expect(contenedor.querySelector('[role="alert"]')).toBeNull();
    await hacerClic(boton("submit"));
    expect(formulario().querySelector('[role="status"]')).not.toBeNull();

    // Sin servicios se bloquea Validar, pero Limpiar sigue funcionando.
    consulta.and.resolveTo(respuestaJson([]));
    await mostrar();
    comprobarBloqueo();
    expect(contenedor.querySelector('[role="status"]')?.textContent?.trim()).toBeTruthy();
    await hacerClic(boton("reset"));
    comprobarLimpieza();

    // Una falla de red tiene el mismo bloqueo y muestra un error.
    consulta.and.rejectWith(new Error("API desconectada"));
    await mostrar();
    comprobarBloqueo();
    expect(contenedor.querySelector('[role="alert"]')?.textContent?.trim()).toBeTruthy();
    await hacerClic(boton("reset"));
    comprobarLimpieza();
  });
});
