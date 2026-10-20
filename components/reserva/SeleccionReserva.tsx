"use client";

import { useEffect, useState } from "react";
import Mensaje from "@/components/compartidos/Mensaje";
import { useTratamientos } from "@/hooks/useTratamientos";

function TratamientoElegido({ id }: { id: string }) {
  const { tratamientos, cargando, error } = useTratamientos();
  if (cargando) return <Mensaje texto="Consultando el tratamiento seleccionado..." />;
  if (error) return <Mensaje texto={error} tipo="error" />;

  const tratamiento = tratamientos.find(function (item) { return String(item.id) === id; });
  if (!tratamiento) return <Mensaje texto="El tratamiento seleccionado no está disponible. Vuelve al catálogo para elegir otro." tipo="error" />;

  return (
    <div>
      <h2>Tratamiento seleccionado</h2>
      <p>{tratamiento.nombre}</p>
      <p>{tratamiento.textoPrecio}</p>
    </div>
  );
}

export default function SeleccionReserva() {
  const [id, setId] = useState("");

  useEffect(function () {
    const parametros = new URLSearchParams(window.location.search);
    setId(parametros.get("tratamiento") || "");
  }, []);

  return (
    <>
      {id && <TratamientoElegido id={id} />}
      <a className="btn" href="/tratamientos">Elegir otro tratamiento</a>
    </>
  );
}
