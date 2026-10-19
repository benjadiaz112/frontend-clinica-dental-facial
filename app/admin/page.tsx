import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Panel de administración | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Panel de administración"
      descripcion="Resumen general de la administración de la clínica."
    />
  );
}
