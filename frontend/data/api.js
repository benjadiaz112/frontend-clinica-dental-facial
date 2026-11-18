export async function api(ruta, { metodo = "GET", datos, token } = {}) {
  const headers = {};
  if (datos) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = "Bearer " + token;
  const respuesta = await fetch("/api" + ruta, {
    method: metodo,
    headers,
    body: datos ? JSON.stringify(datos) : undefined,
  });
  if (respuesta.status === 204) return null;
  const contenido = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    const error = new Error(contenido?.message || "No se pudo completar la solicitud.");
    error.estado = respuesta.status;
    throw error;
  }
  return contenido;
}
