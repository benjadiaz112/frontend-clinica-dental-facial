import CatalogoTratamientos from "@/components/tratamientos/CatalogoTratamientos";
import "@/styles/tratamientos.css";

export const metadata = { title: "Tratamientos | Clínica Aura" };

export default function Pagina() {
  return (
    <section className="contenedor panel portada" aria-labelledby="titulo-tratamientos">
      <h1 id="titulo-tratamientos">Tratamientos dentales y faciales</h1>
      <p>Los valores son referenciales y cada tratamiento requiere una evaluación profesional.</p>
      <CatalogoTratamientos />
    </section>
  );
}
