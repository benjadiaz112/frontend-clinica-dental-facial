import type { Tratamiento } from "@/models/Tratamiento";

interface Propiedades {
  tratamiento: Tratamiento;
}

export default function TarjetaTratamiento({ tratamiento }: Propiedades) {
  return (
    <article className="tarjeta tarjeta-tratamiento">
      <img src={tratamiento.imagen} alt={tratamiento.textoAlternativo} loading="lazy" />
      <h2>{tratamiento.nombre}</h2>
      <p>{tratamiento.descripcion}</p>
      <p className="precio-tratamiento">{tratamiento.textoPrecio}</p>
    </article>
  );
}
