import type { ReactNode } from "react";
import Menu from "@/components/compartidos/Menu";
import { enlacesAdministracion } from "@/data/navegacion";

export default function LayoutAdministracion({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="contenedor panel portada navegacion-admin">
        <h2>Administración</h2>
        <Menu enlaces={enlacesAdministracion} etiqueta="Navegación de administración" />
      </section>
      {children}
    </>
  );
}
