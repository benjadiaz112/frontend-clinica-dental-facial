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

  function botonTratamiento(nombre: string) {
    return Array.from(contenedor.querySelectorAll("button")).find(function (boton) {
      return boton.textContent?.includes(nombre);
    }) as HTMLButtonElement;
  }

  function enlaceReserva() {
    return contenedor.querySelector<HTMLAnchorElement>('a[href^="/reserva?"]');
  }

  it("muestra los cinco tratamientos y conserva los precios según evaluación", async function () {
    const consulta = spyOn(window, "fetch").and.resolveTo(respuestaJson(datos.tratamientos));
    await mostrar();
    expect(consulta).toHaveBeenCalledTimes(1);
    const tarjetas = Array.from(contenedor.querySelectorAll("article"));
    expect(tarjetas.length).toBe(datos.tratamientos.length);
    datos.tratamientos.forEach(function (tratamiento) {
      const tarjeta = tarjetas.find(function (item) { return item.textContent?.includes(tratamiento.nombre); });
      expect(tarjeta?.textContent).toContain(tratamiento.textoPrecio);
    });
    expect(enlaceReserva()).toBeNull();
  });

  it("informa cuando la API devuelve una lista vacía", async function () {
    spyOn(window, "fetch").and.resolveTo(respuestaJson([]));
    await mostrar();
    expect(contenedor.querySelector('[role="status"]')?.textContent?.trim()).toBeTruthy();
    expect(contenedor.querySelectorAll("article").length).toBe(0);
    expect(enlaceReserva()).toBeNull();
  });

  it("muestra un error cuando la API devuelve un error HTTP", async function () {
    spyOn(window, "fetch").and.resolveTo(new Response("{}", { status: 500 }));
    await mostrar();
    expect(contenedor.querySelector('[role="alert"]')?.textContent?.trim()).toBeTruthy();
    expect(contenedor.querySelectorAll("article").length).toBe(0);
  });

  it("selecciona un solo tratamiento y actualiza el enlace a Reserva al cambiarlo", async function () {
    spyOn(window, "fetch").and.resolveTo(respuestaJson(datos.tratamientos.slice().reverse()));
    await mostrar();
    expect(enlaceReserva()).toBeNull();

    const limpieza = botonTratamiento("Limpieza dental");
    const armonizacion = botonTratamiento("Armonización facial");
    await act(async function () { limpieza.click(); });
    expect(limpieza.getAttribute("aria-pressed")).toBe("true");
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Limpieza dental");
    expect(enlaceReserva()?.getAttribute("href")).toBe("/reserva?tratamiento=1");

    await act(async function () { armonizacion.click(); });
    expect(limpieza.getAttribute("aria-pressed")).toBe("false");
    expect(armonizacion.getAttribute("aria-pressed")).toBe("true");
    expect(contenedor.querySelectorAll('[aria-pressed="true"]').length).toBe(1);
    expect(enlaceReserva()?.getAttribute("href")).toBe("/reserva?tratamiento=5");
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Armonización facial");
  });
});
