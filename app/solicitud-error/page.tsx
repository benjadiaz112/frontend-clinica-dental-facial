import PaginaEnPreparacion from "@/components/compartidos/PaginaEnPreparacion";

export const metadata = { title: "Estado de solicitud | Clínica Aura" };

export default function Pagina() {
  return (
    <PaginaEnPreparacion
      titulo="Estado de solicitud"
      descripcion="Información para revisar una solicitud que no pudo completarse."
    />
  );
}
