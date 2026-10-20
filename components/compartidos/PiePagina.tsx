import Menu from "./Menu";
import type { EnlaceMenu } from "@/models/EnlaceMenu";

interface Propiedades {
  nombre: string;
  enlaces: EnlaceMenu[];
}

export default function PiePagina({ nombre, enlaces }: Propiedades) {
  return (
    <footer className="pie-pagina">
      <div className="contenedor">
        <p>{nombre} | Proyecto académico</p>
        <Menu enlaces={enlaces} etiqueta="Navegación del pie" />
      </div>
    </footer>
  );
}
