import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Categorías | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Categorías"
      descripcion="Tratamientos agrupados por categoría."
    />
  );
}
