import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import Boton from "../components/compartidos/Boton";
import Mensaje from "../components/compartidos/Mensaje";

describe("Componentes compartidos", function () {
  let contenedor: HTMLDivElement;
  let raiz: Root;

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

  it("ejecuta la acción al pulsar el botón", async function () {
    const accion = jasmine.createSpy("accion");
    await act(async function () {
      raiz.render(<Boton texto="Continuar" alHacerClic={accion} />);
    });

    await act(async function () {
      contenedor.querySelector("button")?.click();
    });

    expect(accion).toHaveBeenCalledTimes(1);
  });

  it("no ejecuta la acción si el botón está deshabilitado", async function () {
    const accion = jasmine.createSpy("accion");
    await act(async function () {
      raiz.render(<Boton texto="Continuar" deshabilitado alHacerClic={accion} />);
    });

    await act(async function () {
      contenedor.querySelector("button")?.click();
    });

    expect(accion).not.toHaveBeenCalled();
  });

  it("muestra un error accesible y lo oculta al limpiar el texto", async function () {
    await act(async function () {
      raiz.render(<Mensaje tipo="error" texto="Completa tus datos." />);
    });
    expect(contenedor.querySelector('[role="alert"]')?.textContent).toBe("Completa tus datos.");

    await act(async function () {
      raiz.render(<Mensaje tipo="error" texto="" />);
    });
    expect(contenedor.textContent).toBe("");
  });
});
