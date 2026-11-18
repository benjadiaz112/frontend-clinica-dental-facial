import FormularioReserva from "@/components/reserva/FormularioReserva";
import "@/styles/reserva.css";
export const metadata = { title: "Reserva | Clínica Aura" };
export default function Pagina() {
  return (
    <section
      className="contenedor panel portada"
      aria-labelledby="titulo-reserva"
    >
      <h1 id="titulo-reserva">Reserva una evaluación</h1>
      <p>Solicitud de una evaluación dental o facial.</p>
      <FormularioReserva />
    </section>
  );
}
