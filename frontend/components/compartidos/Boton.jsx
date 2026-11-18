"use client";
export default function Boton({
  texto,
  tipo = "button",
  secundario = false,
  deshabilitado = false,
  alHacerClic,
}) {
  return (
    <button
      type={tipo}
      className={secundario ? "btn btn-secundario" : "btn"}
      disabled={deshabilitado}
      onClick={alHacerClic}
    >
      {texto}
    </button>
  );
}
