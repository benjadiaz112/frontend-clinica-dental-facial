import InformacionContacto from "@/components/contacto/InformacionContacto";
import { contacto } from "@/data/informacion";
import "@/styles/informacion.css";
export const metadata = { title: "Contacto | Clínica Aura" };
export default function Pagina() {
  return <InformacionContacto informacion={contacto} />;
}
