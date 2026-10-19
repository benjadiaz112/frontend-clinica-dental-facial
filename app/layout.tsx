import type { Metadata } from "next";
import type { ReactNode } from "react";
import Encabezado from "@/components/compartidos/Encabezado";
import PiePagina from "@/components/compartidos/PiePagina";
import { obtenerInformacionClinica } from "@/services/clinicaService";
import { enlacesPrincipales, enlacesAdicionales } from "@/data/navegacion";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Clínica Aura",
  description: "Clínica dental y de armonización facial. Proyecto académico."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const clinica = obtenerInformacionClinica();

  return (
    <html lang="es">
      <body>
        <a className="salto-contenido" href="#contenido">Ir al contenido</a>
        <Encabezado nombre={clinica.nombre} enlaces={enlacesPrincipales} />
        <main id="contenido" tabIndex={-1}>{children}</main>
        <PiePagina nombre={clinica.nombre} enlaces={enlacesAdicionales} />
      </body>
    </html>
  );
}
