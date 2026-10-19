import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Resumen de solicitud | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Resumen de solicitud"
      descripcion="Revisión de los datos y servicios antes de solicitar una evaluación."
    />
  );
}
