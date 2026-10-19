import type { InformacionClinica } from "@/models/InformacionClinica";

interface Propiedades {
  clinica: InformacionClinica;
}

export default function PresentacionInicio({ clinica }: Propiedades) {
  return (
    <main className="contenedor panel portada">
      <h1>{clinica.nombre}</h1>
      <p>{clinica.descripcion}</p>
      <p>{clinica.aviso}</p>
    </main>
  );
}
