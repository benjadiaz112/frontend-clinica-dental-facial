export default function TarjetaTratamiento({
  tratamiento,
  seleccionado,
  alSeleccionar,
}) {
  return (
    <article className="tarjeta tarjeta-tratamiento">
      <img
        src={tratamiento.imagen}
        alt={tratamiento.textoAlternativo}
        loading="lazy"
      />
      <h2>{tratamiento.nombre}</h2>
      <p>{tratamiento.descripcion}</p>
      <p className="precio-tratamiento">{tratamiento.textoPrecio}</p>
      <button type="button" aria-pressed={seleccionado} onClick={alSeleccionar}>
        {seleccionado ? "Seleccionado: " : "Seleccionar: "}
        {tratamiento.nombre}
      </button>
    </article>
  );
}
