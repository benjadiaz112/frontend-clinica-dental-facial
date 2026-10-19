"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EnlaceMenu } from "@/models/EnlaceMenu";

interface Propiedades {
  enlaces: EnlaceMenu[];
  etiqueta?: string;
}

export default function Menu({ enlaces, etiqueta = "Navegación principal" }: Propiedades) {
  const rutaActual = usePathname();

  return (
    <nav aria-label={etiqueta}>
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
