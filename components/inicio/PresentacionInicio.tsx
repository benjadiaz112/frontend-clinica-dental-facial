import type { InformacionClinica } from "@/models/InformacionClinica";
import Mensaje from "../compartidos/Mensaje";

interface Propiedades {
  clinica: InformacionClinica;
}

export default function PresentacionInicio({ clinica }: Propiedades) {
  return (
    <section className="contenedor panel portada" aria-labelledby="titulo-inicio">
      <h1 id="titulo-inicio">{clinica.nombre}</h1>
      <p>{clinica.descripcion}</p>
      <Mensaje texto={clinica.aviso} />
    </section>
  );
}
