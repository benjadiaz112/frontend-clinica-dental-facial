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

  async function escribir(id: string, valor: string) {
    const campo = contenedor.querySelector("#" + id) as HTMLInputElement;
    const prototipo = Object.getPrototypeOf(campo);
    const asignar = Object.getOwnPropertyDescriptor(prototipo, "value")?.set;
    await act(async function () {
      asignar?.call(campo, valor);
      campo.dispatchEvent(new Event(campo.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
    });
  }

  async function enviar() {
    await act(async function () { contenedor.querySelector('form')?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
  }

  async function completar() {
    await escribir("nombre", "Ana Pérez");
    await escribir("rut", "12.345.678-5");
    await escribir("correo", "ana@ejemplo.cl");
    await escribir("servicio", "Limpieza dental");
  }

  it("marca los campos obligatorios y enfoca el primero al validar vacío", async function () {
    simularApi();
    await mostrar();
    await enviar();
    expect(contenedor.querySelectorAll('[aria-invalid="true"]').length).toBe(4);
    expect(document.activeElement?.id).toBe("nombre");
    expect(contenedor.querySelector("#error-rut")?.textContent).toContain("RUT válido");
  });

  it("acepta datos válidos con comentario opcional y no realiza envíos", async function () {
    const consulta = simularApi();
    await mostrar();
    await completar();
    await enviar();
    expect(contenedor.querySelector(".mensaje-exito")?.textContent).toContain("no se envió una solicitud");
    expect(contenedor.querySelectorAll('[aria-invalid="true"]').length).toBe(0);
    expect(consulta).toHaveBeenCalledTimes(1);
  });

  it("rechaza RUT incorrecto y permite corregirlo", async function () {
    simularApi();
    await mostrar();
    await completar();
    await escribir("rut", "12.345.678-9");
    await enviar();
    expect(document.activeElement?.id).toBe("rut");
    expect(contenedor.querySelector("#rut")?.getAttribute("aria-invalid")).toBe("true");
    await escribir("rut", "12.345.678-5");
    await enviar();
    expect(contenedor.querySelector(".mensaje-exito")).not.toBeNull();
    await escribir("nombre", "Otro nombre");
    expect(contenedor.querySelector(".mensaje-exito")).toBeNull();
  });

  it("limpia valores, selección, errores y resultado", async function () {
    simularApi();
    await mostrar();
    await completar();
    await escribir("comentario", "Consulta de prueba");
    await enviar();
    await act(async function () { contenedor.querySelector<HTMLButtonElement>('button[type="reset"]')?.click(); });
    contenedor.querySelectorAll<HTMLInputElement>("input, select, textarea").forEach(function (campo) { expect(campo.value).toBe(""); });
    expect(contenedor.querySelector(".mensaje-exito")).toBeNull();
    expect(contenedor.querySelectorAll('[aria-invalid="true"]').length).toBe(0);
    expect(contenedor.querySelector("h2")).toBeNull();
  });

  it("preselecciona el tratamiento del catálogo y permite cambiarlo", async function () {
    history.replaceState(null, "", "/reserva?tratamiento=5");
    simularApi();
    await mostrar();
    expect(contenedor.querySelector<HTMLSelectElement>("select")?.value).toBe("Armonización facial");
    await escribir("servicio", "Ortodoncia");
    expect(contenedor.querySelector<HTMLSelectElement>("select")?.value).toBe("Ortodoncia");
    expect(contenedor.textContent).toContain("Evaluación desde $20.000");
  });

  it("avisa cuando el identificador no existe y deja elegir un servicio válido", async function () {
    history.replaceState(null, "", "/reserva?tratamiento=999");
    simularApi();
    await mostrar();
    expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain("no está disponible");
    await escribir("servicio", "Limpieza dental");
    expect(contenedor.querySelector('[role="alert"]')).toBeNull();
  });

  it("bloquea la validación si falla la API", async function () {
    spyOn(window, "fetch").and.rejectWith(new TypeError("Sin conexión"));
    await mostrar();
    expect(contenedor.querySelector<HTMLButtonElement>('button[type="submit"]')?.disabled).toBeTrue();
    expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain("No se pudieron cargar");
  });

  it("informa y bloquea la validación si no existen servicios", async function () {
    simularApi([]);
    await mostrar();
    expect(contenedor.textContent).toContain("No hay servicios disponibles.");
    expect(contenedor.querySelector<HTMLButtonElement>('button[type="submit"]')?.disabled).toBeTrue();
  });
});
