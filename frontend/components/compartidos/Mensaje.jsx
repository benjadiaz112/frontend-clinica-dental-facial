export default function Mensaje({ texto, tipo = "info" }) {
  if (texto === "") return null;
  return (
    <p
      className={"mensaje mensaje-" + tipo}
      role={tipo === "error" ? "alert" : "status"}
    >
      {texto}
    </p>
  );
}
