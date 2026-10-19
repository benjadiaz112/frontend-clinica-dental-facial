import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Confirmación de solicitud | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Confirmación de solicitud"
      descripcion="Consulta del resultado de una solicitud de evaluación."
    />
  );
}
