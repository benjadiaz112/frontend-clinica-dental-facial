import Link from "next/link";
import Menu from "./Menu";

interface Propiedades {
  nombre: string;
}

export default function Encabezado({ nombre }: Propiedades) {
  const enlaces = [{ texto: "Inicio", ruta: "/" }];

  return (
    <header className="encabezado">
      <div className="contenedor barra-navegacion">
        <Link href="/" className="logo">{nombre}</Link>
        <Menu enlaces={enlaces} />
      </div>
    </header>
  );
}
