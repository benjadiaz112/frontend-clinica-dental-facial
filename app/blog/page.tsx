import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Blog | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Blog"
      descripcion="Artículos informativos sobre cuidado dental y facial."
    />
  );
}
