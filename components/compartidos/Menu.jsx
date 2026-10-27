"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Menu({ enlaces, etiqueta = "Navegación principal" }) {
  const rutaActual = usePathname();
  return (
    <nav aria-label={etiqueta}>
      <ul className="menu" role="list">
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
