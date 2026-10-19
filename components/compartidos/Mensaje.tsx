interface Propiedades {
  texto: string;
  tipo?: "info" | "error" | "exito";
}

export default function Mensaje({ texto, tipo = "info" }: Propiedades) {
  if (texto === "") return null;

  return (
    <p className={"mensaje mensaje-" + tipo} role={tipo === "error" ? "alert" : "status"}>
      {texto}
    </p>
  );
}
