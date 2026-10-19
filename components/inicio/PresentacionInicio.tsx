import type { InformacionClinica } from "@/models/InformacionClinica";
import Mensaje from "../compartidos/Mensaje";

interface Propiedades {
  clinica: InformacionClinica;
}

export default function PresentacionInicio({ clinica }: Propiedades) {
  return (
    <section className="contenedor panel portada inicio-hero" aria-labelledby="titulo-inicio">
      <div>
        <h1 id="titulo-inicio">{clinica.nombre}</h1>
        <p className="inicio-subtitulo">Clínica dental y facial</p>
        <p className="inicio-descripcion">{clinica.descripcion}</p>
        <a href="/reserva" className="btn">Solicitar evaluación</a>
        <Mensaje texto={clinica.aviso} />
      </div>
      <img src="/imagenes/consulta-dental.jpg" alt="Profesional atendiendo a una paciente en una consulta dental" width={1600} height={900} />
    </section>
  );
}
