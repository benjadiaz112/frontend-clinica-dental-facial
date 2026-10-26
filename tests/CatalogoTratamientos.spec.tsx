import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import CatalogoTratamientos from "../components/tratamientos/CatalogoTratamientos";
import datos from "../api_simulada/db.json";
import { hacerClic, respuestaJson } from "./ayudas";

describe("Catálogo conectado a la API", function () {
  let contenedor: HTMLDivElement;
  let raiz: Root;
  let consulta: jasmine.Spy;

  beforeEach(function () {
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
  });

  async function mostrar() {
    // Cada llamada abre el catálogo desde cero con la respuesta preparada.
    await act(async function () {
      raiz.unmount();
      raiz = createRoot(contenedor);
      raiz.render(<CatalogoTratamientos />);
    });
  }

  function buscarBoton(texto: string) {
    for (const boton of contenedor.querySelectorAll("button")) {
      if (boton.textContent?.includes(texto)) return boton;
    }
    throw new Error("No se encontró el botón: " + texto);
  }

  function enlaceReserva() {
    return contenedor.querySelector('a[href^="/reserva?"]');
  }

  it("muestra la carga y luego los cinco tratamientos con sus precios", async function () {
    consulta.and.callFake(async function () {
      // Mientras fetch está trabajando, React debe mostrar la carga.
      expect(contenedor.querySelector('[role="status"]')?.textContent?.trim()).toBeTruthy();
      expect(contenedor.querySelectorAll("article").length).toBe(0);
      expect(enlaceReserva()).toBeNull();
      return respuestaJson(datos.tratamientos);
    });

    await mostrar();

    const tarjetas = contenedor.querySelectorAll("article");
    expect(consulta).toHaveBeenCalledTimes(1);
    expect(tarjetas.length).toBe(datos.tratamientos.length);
    for (const tratamiento of datos.tratamientos) {
      const tarjeta = buscarBoton(tratamiento.nombre).closest("article");
      expect(tarjeta?.textContent).toContain(tratamiento.textoPrecio);
      expect(tarjeta?.querySelector("img")?.alt).toBe(tratamiento.textoAlternativo);
    }
    expect(enlaceReserva()).toBeNull();
  });

  it("informa cuando no hay tratamientos", async function () {
    consulta.and.resolveTo(respuestaJson([]));

    await mostrar();

    expect(contenedor.querySelector('[role="status"]')?.textContent?.trim()).toBeTruthy();
    expect(contenedor.querySelectorAll("article").length).toBe(0);
    expect(enlaceReserva()).toBeNull();
  });

  it("muestra un error si la API falla o no entrega una lista", async function () {
    const respuestas = [respuestaJson({}, 500), respuestaJson({ mensaje: "Datos incorrectos" })];

    for (const respuesta of respuestas) {
      consulta.and.resolveTo(respuesta);

      await mostrar();

      expect(contenedor.querySelector('[role="alert"]')?.textContent?.trim()).toBeTruthy();
      expect(contenedor.querySelectorAll("article").length).toBe(0);
      expect(enlaceReserva()).toBeNull();
    }
  });

  it("permite seleccionar, cambiar, quitar y volver a seleccionar", async function () {
    consulta.and.resolveTo(respuestaJson(datos.tratamientos.slice().reverse()));
    await mostrar();
    const limpieza = buscarBoton("Limpieza dental");
    const armonizacion = buscarBoton("Armonización facial");
    expect(enlaceReserva()).toBeNull();

    await hacerClic(limpieza);

    expect(limpieza.getAttribute("aria-pressed")).toBe("true");
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Limpieza dental");
    expect(enlaceReserva()?.getAttribute("href")).toBe("/reserva?tratamiento=1");

    await hacerClic(armonizacion);

    expect(limpieza.getAttribute("aria-pressed")).toBe("false");
    expect(armonizacion.getAttribute("aria-pressed")).toBe("true");
    expect(contenedor.querySelectorAll('[aria-pressed="true"]').length).toBe(1);
    expect(contenedor.querySelector('[role="status"]')?.textContent).toContain("Armonización facial");
    expect(enlaceReserva()?.getAttribute("href")).toBe("/reserva?tratamiento=5");

    const quitar = buscarBoton("Quitar selección");
    await hacerClic(quitar);

    expect(contenedor.querySelectorAll('[aria-pressed="true"]').length).toBe(0);
    expect(enlaceReserva()).toBeNull();
    expect(quitar.isConnected).toBeFalse();

    await hacerClic(limpieza);

    expect(enlaceReserva()?.getAttribute("href")).toBe("/reserva?tratamiento=1");
  });
});
