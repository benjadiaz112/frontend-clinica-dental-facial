import InformacionNosotros from "@/components/nosotros/InformacionNosotros";
import { nosotros } from "@/data/informacion";
import "@/styles/informacion.css";
export const metadata = { title: "Nosotros | Clínica Aura" };
export default function Pagina() {
  return <InformacionNosotros informacion={nosotros} />;
}
