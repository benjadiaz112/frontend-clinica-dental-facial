"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Propiedades {
  enlaces: { texto: string; ruta: string }[];
}

export default function Menu({ enlaces }: Propiedades) {
  const rutaActual = usePathname();

  return (
    <nav aria-label="Navegación principal">
      <ul className="menu">
        {enlaces.map(function (enlace) {
          return (
            <li key={enlace.ruta}>
              <Link
                href={enlace.ruta}
                className="enlace-menu"
                aria-current={rutaActual === enlace.ruta ? "page" : undefined}
              >
                {enlace.texto}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
