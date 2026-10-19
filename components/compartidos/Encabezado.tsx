import Link from "next/link";
import Menu from "./Menu";
import type { EnlaceMenu } from "@/models/EnlaceMenu";

interface Propiedades {
  nombre: string;
  enlaces: EnlaceMenu[];
}

export default function Encabezado({ nombre, enlaces }: Propiedades) {
  return (
    <header className="encabezado">
      <div className="contenedor barra-navegacion">
        <Link href="/" className="logo">{nombre}</Link>
        <Menu enlaces={enlaces} />
      </div>
    </header>
  );
}
