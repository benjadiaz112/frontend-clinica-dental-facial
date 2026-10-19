import Mensaje from "@/components/compartidos/Mensaje";
import type { ContenidoContacto } from "@/models/ContenidoInformativo";

interface Propiedades {
  informacion: ContenidoContacto;
}

export default function InformacionContacto({ informacion }: Propiedades) {
  return (
    <section className="contenedor panel portada informacion-pagina">
      <div>
        <h1>Contacto</h1>
        <p>Información de referencia de Clínica Aura.</p>
        <dl className="datos-contacto">
          <dt>Ubicación de referencia</dt>
          <dd>{informacion.ubicacion}</dd>
          <dt>Teléfono de ejemplo</dt>
          <dd>{informacion.telefono}</dd>
        </dl>
        <Mensaje texto={informacion.aviso} />
        <p>Para conocer el estado del formulario de evaluación, visita Reserva.</p>
        <a className="btn" href="/reserva">Ir a Reserva</a>
      </div>
      <img
        src="/imagenes/consulta-dental.jpg"
        alt="Atención profesional en Clínica Aura"
        width="1600"
        height="900"
      />
    </section>
  );
}
