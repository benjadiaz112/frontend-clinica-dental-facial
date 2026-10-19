import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import PresentacionInicio from "../components/inicio/PresentacionInicio";

describe("PresentacionInicio", function () {
  let contenedor: HTMLDivElement;
  let raiz: Root;

  const datos = {
    nombre: "Clínica de prueba",
    descripcion: "Descripción de prueba.",
    aviso: "Aviso inicial."
  };

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

  it("muestra el nombre, la descripción y el aviso recibidos", async function () {
    // Preparar los datos y mostrar el componente.
    await act(async function () {
      raiz.render(<PresentacionInicio clinica={datos} />);
    });

    // Comprobar lo que ve el usuario.
    expect(contenedor.querySelector("h1")?.textContent).toBe(datos.nombre);
    expect(contenedor.querySelector(".inicio-descripcion")?.textContent).toBe(datos.descripcion);
    expect(contenedor.querySelector('[role="status"]')?.textContent).toBe(datos.aviso);
  });

  it("actualiza la información cuando cambian las propiedades", async function () {
    await act(async function () {
      raiz.render(<PresentacionInicio clinica={datos} />);
    });

    const nuevosDatos = {
      ...datos,
      nombre: "Otra clínica",
      aviso: "Aviso actualizado."
    };

    await act(async function () {
      raiz.render(<PresentacionInicio clinica={nuevosDatos} />);
    });

    expect(contenedor.querySelector("h1")?.textContent).toBe(nuevosDatos.nombre);
    expect(contenedor.querySelector('[role="status"]')?.textContent).toBe(nuevosDatos.aviso);
  });
});
