import { consultarTratamientos } from "@/data/tratamientos";

export function obtenerTratamientos(signal: AbortSignal) {
  return consultarTratamientos(signal);
}
