"use client";

import { useEffect, useState } from "react";
import { consultarTratamientos } from "@/data/tratamientos";
import type { Tratamiento } from "@/models/Tratamiento";

export function useTratamientos() {
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(function () {
    const controlador = new AbortController();

    async function cargar() {
      try {
        const datos = await consultarTratamientos(controlador.signal);
        if (!controlador.signal.aborted) setTratamientos(datos);
      } catch {
        if (!controlador.signal.aborted) {
          setError("No se pudieron cargar los tratamientos. Comprueba que la API esté disponible e intenta recargar la página.");
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargar();
    return function () {
      controlador.abort();
    };
  }, []);

  return { tratamientos, cargando, error };
}
