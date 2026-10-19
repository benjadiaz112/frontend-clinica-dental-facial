import Link from "next/link";
import Mensaje from "@/components/compartidos/Mensaje";

export default function PaginaNoEncontrada() {
  return (
    <section className="contenedor panel portada">
      <h1>Página no encontrada</h1>
      <Mensaje tipo="error" texto="La dirección que abriste no está disponible." />
      <Link href="/" className="btn">Volver al inicio</Link>
    </section>
  );
}
