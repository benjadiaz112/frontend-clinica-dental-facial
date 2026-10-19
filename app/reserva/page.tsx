import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Reserva | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Reserva"
      descripcion="Solicitud de una evaluación dental o facial."
    />
  );
}
