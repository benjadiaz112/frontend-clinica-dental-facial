import type { Tratamiento } from "@/models/Tratamiento";

export async function consultarTratamientos(signal: AbortSignal): Promise<Tratamiento[]> {
  const respuesta = await fetch("http://127.0.0.1:3001/tratamientos", { signal });

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los tratamientos.");
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error("La API no devolvió una lista de tratamientos.");
  }

  return datos;
}
