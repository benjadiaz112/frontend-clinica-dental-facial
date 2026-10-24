import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import FormularioReserva from "../components/reserva/FormularioReserva";
import datos from "../api_simulada/db.json";

describe("Formulario de Reserva", function () {
  let contenedor: HTMLDivElement;
  let raiz: Root;
  let direccionOriginal: string;

  beforeEach(function () {
    direccionOriginal = window.location.href;
    history.replaceState(null, "", "/reserva");
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(async function () {
    await act(async function () { raiz.unmount(); });
    contenedor.remove();
    history.replaceState(null, "", direccionOriginal);
  });

  function simularApi(lista = datos.tratamientos) {
    const respuesta = new Response();
    spyOn(respuesta, "json").and.resolveTo(lista);
    return spyOn(window, "fetch").and.resolveTo(respuesta);
  }

  async function mostrar() {
    await act(async function () { raiz.render(<FormularioReserva />); });
  }

  function formulario() {
    return contenedor.querySelector("form") as HTMLFormElement;
  }

  function campo(nombre: string) {
    return formulario().elements.namedItem(nombre) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  }

  async function escribir(nombre: string, valor: string) {
    const control = campo(nombre);
    const prototipo = Object.getPrototypeOf(control);
    const asignar = Object.getOwnPropertyDescriptor(prototipo, "value")?.set;
    await act(async function () {
      asignar?.call(control, valor);
      control.dispatchEvent(new Event(control.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
    });
  }

  async function enviar() {
    await act(async function () { formulario().dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
  }

  async function completar() {
    await escribir("nombre", "Ana Pérez");
    await escribir("rut", "12.345.678-5");
    await escribir("correo", "ana@ejemplo.cl");
    await escribir("servicio", "Limpieza dental");
  }

  async function limpiarYComprobar() {
    await act(async function () { formulario().querySelector<HTMLButtonElement>('button[type="reset"]')?.click(); });
    ["nombre", "rut", "correo", "servicio", "comentario"].forEach(function (nombre) { expect(campo(nombre).value).toBe(""); });
    expect(formulario().querySelector('[role="status"]')).toBeNull();
    expect(formulario().querySelector('[role="alert"]')).toBeNull();
    expect(formulario().querySelectorAll('[aria-invalid="true"]').length).toBe(0);
    formulario().querySelectorAll('[aria-describedby]').forEach(function (control) {
      const id = control.getAttribute("aria-describedby") || "";
      expect(document.getElementById(id)?.textContent).toBe("");
    });
  }

  it("rechaza datos incorrectos y acepta datos correctos", async function () {
    const consulta = simularApi();
    await mostrar();
    await completar();
    await escribir("rut", "12.345.678-9");
    await enviar();
    expect(document.activeElement).toBe(campo("rut"));
    expect(campo("rut").getAttribute("aria-invalid")).toBe("true");
    const idError = campo("rut").getAttribute("aria-describedby");
    expect(document.getElementById(idError || "")?.textContent?.trim()).toBeTruthy();
    expect(formulario().querySelector('[role="alert"]')).not.toBeNull();
    expect(formulario().querySelector('[role="status"]')).toBeNull();

    await escribir("rut", "12.345.678-5");
    await enviar();
    expect(campo("rut").getAttribute("aria-invalid")).toBe("false");
    expect(formulario().querySelector('[role="status"]')?.textContent).toContain("no se envió una solicitud");
    expect(formulario().querySelector('[role="alert"]')).toBeNull();
    expect(consulta).toHaveBeenCalledTimes(1);
  });

  it("limpia valores, selección, errores y resultado", async function () {
    simularApi();
    await mostrar();
    await completar();
    await escribir("comentario", "Consulta de prueba");
    await enviar();
    expect(formulario().querySelector('[role="status"]')).not.toBeNull();
    await limpiarYComprobar();

    await completar();
    await escribir("rut", "12.345.678-9");
    await enviar();
    expect(formulario().querySelector('[role="alert"]')).not.toBeNull();
    await limpiarYComprobar();
  });

});
