import Link from "next/link";
import Menu from "./Menu";
export default function Encabezado({ nombre, enlaces }) {
  return (
    <header className="encabezado">
      <div className="contenedor barra-navegacion">
        <Link href="/" className="logo">
          {nombre}
        </Link>
        <Menu enlaces={enlaces} />
      </div>
    </header>
  );
}
