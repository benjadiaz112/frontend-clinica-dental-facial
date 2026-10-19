import InformacionNosotros from "@/components/nosotros/InformacionNosotros";
import { obtenerNosotros } from "@/services/informacionService";
import "@/styles/informacion.css";

export const metadata = { title: "Nosotros | Clínica Aura" };

export default function Pagina() {
  return <InformacionNosotros informacion={obtenerNosotros()} />;
}
