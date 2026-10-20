"use client";

import { useState } from "react";
import Mensaje from "@/components/compartidos/Mensaje";
import Boton from "@/components/compartidos/Boton";
import type { Tratamiento } from "@/models/Tratamiento";
import { useTratamientos } from "@/hooks/useTratamientos";
import TarjetaTratamiento from "./TarjetaTratamiento";

export default function CatalogoTratamientos() {
  const { tratamientos, cargando, error } = useTratamientos();
  const [seleccionado, setSeleccionado] = useState<Tratamiento | null>(null);

  if (cargando) return <Mensaje texto="Cargando tratamientos..." />;
  if (error) return <Mensaje texto={error} tipo="error" />;
  if (tratamientos.length === 0) return <Mensaje texto="No hay tratamientos disponibles." />;

  return (
    <>
      <div className="rejilla catalogo-tratamientos">
        {tratamientos.map(function (tratamiento) {
          return (
            <TarjetaTratamiento
              key={tratamiento.id}
              tratamiento={tratamiento}
              seleccionado={seleccionado?.id === tratamiento.id}
              alSeleccionar={function () { setSeleccionado(tratamiento); }}
            />
          );
        })}
      </div>
      <div className="seleccion-tratamiento">
        <Mensaje texto={seleccionado ? "Tratamiento seleccionado: " + seleccionado.nombre : "Selecciona un tratamiento para solicitar una evaluación."} />
        {seleccionado && (
          <div className="acciones">
            <a className="btn" href={"/reserva?tratamiento=" + seleccionado.id}>Continuar a Reserva</a>
            <Boton texto="Quitar selección" secundario alHacerClic={function () { setSeleccionado(null); }} />
          </div>
        )}
      </div>
    </>
  );
}
