export async function consultarTratamientos(signal) {
  const respuesta = await fetch("/api/tratamientos", {
    signal,
  });
  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los tratamientos.");
  }
  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error("La API no devolvió una lista de tratamientos.");
  }
  return datos;
}
