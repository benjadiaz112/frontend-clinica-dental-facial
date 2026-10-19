import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import CarruselInicio from "../components/inicio/CarruselInicio";
import type { ElementoInicio } from "../models/ContenidoInicio";

describe("CarruselInicio", function () {
  let contenedor: HTMLDivElement;
  let raiz: Root;

  const imagenes: ElementoInicio[] = [
    { titulo: "Primera imagen", descripcion: "Primer contenido.", imagen: "/imagenes/limpieza.jpg", textoAlternativo: "Consulta dental" },
    { titulo: "Segunda imagen", descripcion: "Segundo contenido.", imagen: "/imagenes/ortodoncia.jpg", textoAlternativo: "Equipamiento dental" }
  ];

  beforeEach(function () {
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(async function () {
    await act(async function () {
      raiz.unmount();
    });
    contenedor.remove();
  });

  async function mostrar(diapositivas: ElementoInicio[]) {
    await act(async function () {
      raiz.render(<CarruselInicio diapositivas={diapositivas} />);
    });
  }

  async function pulsar(indice: number) {
    await act(async function () {
      contenedor.querySelectorAll("button")[indice].click();
    });
  }

  it("avanza y regresa entre imágenes", async function () {
    await mostrar(imagenes);
    await pulsar(1);
    expect(contenedor.querySelector("h3")?.textContent).toBe("Segunda imagen");
    await pulsar(0);
    expect(contenedor.querySelector("h3")?.textContent).toBe("Primera imagen");
  });

  it("vuelve a la primera imagen después de la última", async function () {
    await mostrar(imagenes);
    await pulsar(1);
    await pulsar(1);
    expect(contenedor.querySelector("h3")?.textContent).toBe("Primera imagen");
  });

  it("muestra la última imagen al retroceder desde la primera", async function () {
    await mostrar(imagenes);
    await pulsar(0);
    expect(contenedor.querySelector("h3")?.textContent).toBe("Segunda imagen");
  });

  it("no muestra el carrusel si no hay imágenes", async function () {
    await mostrar([]);
    expect(contenedor.textContent).toBe("");
  });

  it("deshabilita los controles si hay una sola imagen", async function () {
    await mostrar([imagenes[0]]);
    const botones = contenedor.querySelectorAll("button");
    expect(botones[0].disabled).toBeTrue();
    expect(botones[1].disabled).toBeTrue();
  });
});
