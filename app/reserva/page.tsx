import Mensaje from "@/components/compartidos/Mensaje";
import SeleccionReserva from "@/components/reserva/SeleccionReserva";

export const metadata = { title: "Reserva | Clínica Aura" };

export default function Pagina() {
  return (
    <section className="contenedor panel portada">
      <h1>Reserva una evaluación</h1>
      <p>Solicitud de una evaluación dental o facial.</p>
      <Mensaje texto="El formulario está en preparación. Esta selección no envía una solicitud ni reserva una hora real." />
      <SeleccionReserva />
    </section>
  );
}
