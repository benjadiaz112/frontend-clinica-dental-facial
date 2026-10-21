import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import CatalogoTratamientos from "../components/tratamientos/CatalogoTratamientos";
import datos from "../api_simulada/db.json";

describe("Catálogo conectado a la API", function () {
  let contenedor: HTMLDivElement;
  let raiz: Root;

  beforeEach(function () {
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(async function () {
    await act(async function () { raiz.unmount(); });
    contenedor.remove();
  });

  async function mostrar() {
    await act(async function () { raiz.render(<CatalogoTratamientos />); });
  }

  function respuestaJson(contenido: unknown) {
    const respuesta = new Response();
    spyOn(respuesta, "json").and.resolveTo(contenido);
    return respuesta;
  }

  it("muestra los cinco tratamientos y conserva los precios según evaluación", async function () {
    const consulta = spyOn(window, "fetch").and.resolveTo(respuestaJson(datos.tratamientos));
    await mostrar();
    expect(consulta.calls.mostRecent().args[0]).toBe("http://127.0.0.1:3001/tratamientos");
    expect(contenedor.querySelectorAll("article").length).toBe(5);
    const precios = contenedor.querySelectorAll(".precio-tratamiento");
    expect(precios[2].textContent).toBe("Evaluación desde $20.000");
    expect(precios[3].textContent).toBe("Valor según evaluación");
    expect(precios[4].textContent).toBe("Valor según evaluación");
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Selecciona un tratamiento");
  });

  it("informa cuando la API devuelve una lista vacía", async function () {
    spyOn(window, "fetch").and.resolveTo(respuestaJson([]));
    await mostrar();
    expect(contenedor.querySelector('[role="status"]')?.textContent).toBe("No hay tratamientos disponibles.");
  });

  it("muestra un error cuando la API devuelve un error HTTP", async function () {
    spyOn(window, "fetch").and.resolveTo(new Response("{}", { status: 500 }));
    await mostrar();
    expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain("No se pudieron cargar");
    expect(contenedor.querySelectorAll("article").length).toBe(0);
  });

  it("selecciona un solo tratamiento y actualiza el enlace a Reserva al cambiarlo", async function () {
    spyOn(window, "fetch").and.resolveTo(respuestaJson(datos.tratamientos));
    await mostrar();
    expect(contenedor.querySelector('a[href^="/reserva"]')).toBeNull();

    const botones = contenedor.querySelectorAll<HTMLButtonElement>("article button");
    await act(async function () { botones[0].click(); });
    expect(botones[0].getAttribute("aria-pressed")).toBe("true");
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Limpieza dental");
    expect(contenedor.querySelector("a")?.getAttribute("href")).toBe("/reserva?tratamiento=1");

    await act(async function () { botones[4].click(); });
    expect(botones[0].getAttribute("aria-pressed")).toBe("false");
    expect(contenedor.querySelectorAll('[aria-pressed="true"]').length).toBe(1);
    expect(contenedor.querySelector("a")?.getAttribute("href")).toBe("/reserva?tratamiento=5");
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Armonización facial");
  });
});
