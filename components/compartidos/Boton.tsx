"use client";

interface Propiedades {
  texto: string;
  tipo?: "button" | "submit" | "reset";
  secundario?: boolean;
  deshabilitado?: boolean;
  alHacerClic?: () => void;
}

export default function Boton({
  texto,
  tipo = "button",
  secundario = false,
  deshabilitado = false,
  alHacerClic
}: Propiedades) {
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
