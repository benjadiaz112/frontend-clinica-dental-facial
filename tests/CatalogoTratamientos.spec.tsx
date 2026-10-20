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

  it("informa que está cargando mientras la API no responde", async function () {
    spyOn(window, "fetch").and.returnValue(new Promise<Response>(function () {}));
    await mostrar();
    expect(contenedor.querySelector('[role="status"]')?.textContent).toBe("Cargando tratamientos...");
    expect(contenedor.querySelectorAll("article").length).toBe(0);
  });

  it("muestra los cinco tratamientos y conserva los precios según evaluación", async function () {
    const consulta = spyOn(window, "fetch").and.resolveTo(respuestaJson(datos.tratamientos));
    await mostrar();
    expect(consulta.calls.mostRecent().args[0]).toBe("http://127.0.0.1:3001/tratamientos");
    expect(contenedor.querySelectorAll("article").length).toBe(5);
    const precios = contenedor.querySelectorAll(".precio-tratamiento");
    expect(precios[2].textContent).toBe("Evaluación desde $20.000");
    expect(precios[3].textContent).toBe("Valor según evaluación");
    expect(precios[4].textContent).toBe("Valor según evaluación");
    expect(contenedor.querySelector('[role="status"]')).toBeNull();
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

  it("muestra un error cuando la conexión falla", async function () {
    spyOn(window, "fetch").and.rejectWith(new TypeError("Sin conexión"));
    await mostrar();
    expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain("No se pudieron cargar");
  });

  it("rechaza una respuesta que no contiene una lista", async function () {
    spyOn(window, "fetch").and.resolveTo(respuestaJson({}));
    await mostrar();
    expect(contenedor.querySelector('[role="alert"]')).not.toBeNull();
  });
});
