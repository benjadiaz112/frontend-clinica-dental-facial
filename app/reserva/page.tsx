import Mensaje from "@/components/compartidos/Mensaje";
import FormularioReserva from "@/components/reserva/FormularioReserva";
import "@/styles/reserva.css";

export const metadata = { title: "Reserva | Clínica Aura" };

export default function Pagina() {
  return (
    <section className="contenedor panel portada">
      <h1>Reserva una evaluación</h1>
      <p>Solicitud de una evaluación dental o facial.</p>
      <Mensaje texto="Formulario de demostración: los datos no se envían ni se reserva una hora real." />
      <FormularioReserva />
    </section>
  );
}
