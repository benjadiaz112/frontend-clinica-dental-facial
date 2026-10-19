import type { ElementoInicio } from "@/models/ContenidoInicio";

interface Propiedades {
  tratamientos: ElementoInicio[];
}

export default function TratamientosDestacados({ tratamientos }: Propiedades) {
  return (
    <section className="contenedor inicio-bloque" aria-labelledby="titulo-destacados">
      <h2 id="titulo-destacados" className="inicio-titulo">Tratamientos destacados</h2>
      <div className="rejilla inicio-destacados">
        {tratamientos.map(function (tratamiento) {
          return (
            <article className="tarjeta" key={tratamiento.titulo}>
              <img src={tratamiento.imagen} alt={tratamiento.textoAlternativo} width={500} height={375} loading="lazy" />
              <h3>{tratamiento.titulo}</h3>
              <p>{tratamiento.descripcion}</p>
            </article>
          );
        })}
      </div>
      <p className="inicio-enlace">
        <a href="/tratamientos" className="btn btn-secundario">Ver tratamientos y precios</a>
      </p>
    </section>
  );
}
