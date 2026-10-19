import Link from "next/link";
import Mensaje from "./Mensaje";

interface Propiedades {
  titulo: string;
  descripcion: string;
}

export default function PaginaEnPreparacion({ titulo, descripcion }: Propiedades) {
  return (
    <section className="contenedor panel portada">
      <h1>{titulo}</h1>
      <p>{descripcion}</p>
      <Mensaje texto="Esta sección estará disponible próximamente." />
      <Link href="/" className="btn">Volver al inicio</Link>
    </section>
  );
}
