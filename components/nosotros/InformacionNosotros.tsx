import type { ContenidoNosotros } from "@/models/ContenidoInformativo";

interface Propiedades {
  informacion: ContenidoNosotros;
}

export default function InformacionNosotros({ informacion }: Propiedades) {
  return (
    <section className="contenedor panel portada informacion-pagina">
      <div>
        <h1>{informacion.titulo}</h1>
        <p>{informacion.descripcion}</p>
        <h2>{informacion.subtitulo}</h2>
        <p>{informacion.propuesta}</p>
        <a className="btn" href="/tratamientos">Ver tratamientos</a>
      </div>
      <img
        src="/imagenes/armonia-facial.jpg"
        alt="Profesional explicando un tratamiento a una paciente"
        width="700"
        height="716"
      />
    </section>
  );
}
