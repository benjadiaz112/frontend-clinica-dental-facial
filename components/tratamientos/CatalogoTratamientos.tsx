"use client";

import Mensaje from "@/components/compartidos/Mensaje";
import { useTratamientos } from "@/hooks/useTratamientos";
import TarjetaTratamiento from "./TarjetaTratamiento";

export default function CatalogoTratamientos() {
  const { tratamientos, cargando, error } = useTratamientos();

  if (cargando) return <Mensaje texto="Cargando tratamientos..." />;
  if (error) return <Mensaje texto={error} tipo="error" />;
  if (tratamientos.length === 0) return <Mensaje texto="No hay tratamientos disponibles." />;

  return (
    <div className="rejilla catalogo-tratamientos">
      {tratamientos.map(function (tratamiento) {
        return <TarjetaTratamiento key={tratamiento.id} tratamiento={tratamiento} />;
      })}
    </div>
  );
}
