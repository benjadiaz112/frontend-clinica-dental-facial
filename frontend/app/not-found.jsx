import Link from "next/link";
import Mensaje from "@/components/compartidos/Mensaje";
export default function PaginaNoEncontrada() {
  return (
    <section
      className="contenedor panel portada"
      aria-labelledby="titulo-no-encontrada"
    >
      <h1 id="titulo-no-encontrada">Página no encontrada</h1>
      <Mensaje
        tipo="error"
        texto="La dirección que abriste no está disponible."
      />
      <p>Puedes volver al inicio o consultar los tratamientos de la clínica.</p>
      <div className="acciones">
        <Link href="/" className="btn">
          Volver al inicio
        </Link>
        <Link href="/tratamientos" className="btn btn-secundario">
          Ver tratamientos
        </Link>
      </div>
    </section>
  );
}
