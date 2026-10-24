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
    const tratamientos = datos.tratamientos;
    let terminarConsulta!: (respuesta: Response) => void;
    const pendiente = new Promise<Response>(function (resolver) { terminarConsulta = resolver; });
    const consulta = spyOn(window, "fetch").and.returnValue(pendiente);

    await mostrar();
    expect(contenedor.querySelector('[role="status"]')?.textContent?.trim()).toBeTruthy();
    expect(contenedor.querySelectorAll("article").length).toBe(0);
    expect(enlaceReserva()).toBeNull();
    await act(async function () { terminarConsulta(respuestaJson(tratamientos)); });
    const tarjetas = Array.from(contenedor.querySelectorAll("article"));

    expect(consulta).toHaveBeenCalledTimes(1);
    expect(tarjetas.length).toBe(tratamientos.length);
    tratamientos.forEach(function (tratamiento) {
      const tarjeta = tarjetas.find(function (item) { return item.textContent?.includes(tratamiento.nombre); });
      expect(tarjeta?.textContent).toContain(tratamiento.textoPrecio);
      expect(tarjeta?.querySelector("img")?.getAttribute("alt")).toBe(tratamiento.textoAlternativo);
    });
    expect(enlaceReserva()).toBeNull();
  });

  it("informa cuando la API devuelve una lista vacía", async function () {
    const respuesta = respuestaJson([]);
    spyOn(window, "fetch").and.resolveTo(respuesta);

    await mostrar();
    const mensaje = contenedor.querySelector('[role="status"]');

    expect(mensaje?.textContent?.trim()).toBeTruthy();
    expect(contenedor.querySelectorAll("article").length).toBe(0);
    expect(enlaceReserva()).toBeNull();
  });

  it("rechaza errores HTTP y respuestas que no contienen una lista", async function () {
    const respuesta = new Response("{}", { status: 500 });
    const consulta = spyOn(window, "fetch").and.resolveTo(respuesta);

    await mostrar();
    const mensaje = contenedor.querySelector('[role="alert"]');

    expect(mensaje?.textContent?.trim()).toBeTruthy();
    expect(contenedor.querySelectorAll("article").length).toBe(0);
    expect(enlaceReserva()).toBeNull();

    consulta.and.resolveTo(respuestaJson({ mensaje: "Datos incorrectos" }));
    await act(async function () { raiz.render(<CatalogoTratamientos key="respuesta-invalida" />); });
    expect(contenedor.querySelector('[role="alert"]')?.textContent?.trim()).toBeTruthy();
    expect(contenedor.querySelectorAll("article").length).toBe(0);
    expect(enlaceReserva()).toBeNull();
  });

  it("selecciona un solo tratamiento y actualiza el enlace a Reserva al cambiarlo", async function () {
    const tratamientos = datos.tratamientos.slice().reverse();
    spyOn(window, "fetch").and.resolveTo(respuestaJson(tratamientos));
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

    const quitar = Array.from(contenedor.querySelectorAll("button")).find(function (boton) {
      return boton.textContent === "Quitar selección";
    }) as HTMLButtonElement;
    await act(async function () { quitar.click(); });
    expect(contenedor.querySelectorAll('[aria-pressed="true"]').length).toBe(0);
    expect(enlaceReserva()).toBeNull();
    expect(quitar.isConnected).toBeFalse();

    await act(async function () { limpieza.click(); });
    expect(enlaceReserva()?.getAttribute("href")).toBe("/reserva?tratamiento=1");
  });
});
