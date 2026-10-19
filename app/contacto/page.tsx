import InformacionContacto from "@/components/contacto/InformacionContacto";
import { obtenerContacto } from "@/services/informacionService";
import "@/styles/informacion.css";

export const metadata = { title: "Contacto | Clínica Aura" };

export default function Pagina() {
  return <InformacionContacto informacion={obtenerContacto()} />;
}
