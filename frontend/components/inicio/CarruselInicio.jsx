"use client";
import { useState } from "react";
import Boton from "../compartidos/Boton";
export default function CarruselInicio({ diapositivas }) {
  const [actual, setActual] = useState(0);
  if (diapositivas.length === 0) return null;
  const indice = actual < diapositivas.length ? actual : 0;
  const diapositiva = diapositivas[indice];
  function anterior() {
    setActual(indice === 0 ? diapositivas.length - 1 : indice - 1);
  }
  function siguiente() {
    setActual(indice === diapositivas.length - 1 ? 0 : indice + 1);
  }
  return (
    <section
      className="contenedor panel inicio-bloque inicio-carrusel"
      aria-label="Galería de la clínica"
      aria-roledescription="carrusel"
    >
      <h2>Conoce Clínica Aura</h2>
      <figure>
        <img
          src={diapositiva.imagen}
          alt={diapositiva.textoAlternativo}
          width={800}
          height={450}
          loading="lazy"
        />
        <figcaption>
          <h3>{diapositiva.titulo}</h3>
          <p>{diapositiva.descripcion}</p>
        </figcaption>
      </figure>
      <p aria-live="polite" aria-atomic="true">
        Imagen {indice + 1} de {diapositivas.length}: {diapositiva.titulo}
      </p>
      <div className="acciones">
        <Boton
          texto="Anterior"
          secundario
          deshabilitado={diapositivas.length === 1}
          alHacerClic={anterior}
        />
        <Boton
          texto="Siguiente"
          deshabilitado={diapositivas.length === 1}
          alHacerClic={siguiente}
        />
      </div>
    </section>
  );
}
