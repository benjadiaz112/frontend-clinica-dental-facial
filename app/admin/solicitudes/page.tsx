import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Administrar solicitudes | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Administrar solicitudes"
      descripcion="Consulta de solicitudes e historial de demostración."
    />
  );
}
