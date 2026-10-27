import Encabezado from "@/components/compartidos/Encabezado";
import PiePagina from "@/components/compartidos/PiePagina";
import { informacionClinica } from "@/data/clinica";
import { enlacesPrincipales, enlacesAdicionales } from "@/data/navegacion";
import "@/styles/globals.css";
export const metadata = {
  title: "Clínica Aura",
  description: "Clínica dental y de armonización facial. Proyecto académico.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <a className="salto-contenido" href="#contenido">
          Ir al contenido
        </a>
        <Encabezado
          nombre={informacionClinica.nombre}
          enlaces={enlacesPrincipales}
        />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <PiePagina
          nombre={informacionClinica.nombre}
          enlaces={enlacesAdicionales}
        />
      </body>
    </html>
  );
}
