const http = require("node:http");
const datos = require("./db.json");

function esTratamiento(valor) {
  if (typeof valor !== "object" || valor === null) return false;

  return Number.isInteger(valor.id)
    && typeof valor.nombre === "string"
    && valor.nombre.trim() !== ""
    && typeof valor.descripcion === "string"
    && typeof valor.imagen === "string"
    && typeof valor.textoAlternativo === "string"
    && (typeof valor.precioDesde === "number" || valor.precioDesde === null)
    && typeof valor.textoPrecio === "string";
}

const servidor = http.createServer(function (solicitud, respuesta) {
  respuesta.setHeader("Content-Type", "application/json; charset=utf-8");
  respuesta.setHeader("Access-Control-Allow-Origin", "*");

  if (solicitud.url !== "/tratamientos") {
    respuesta.writeHead(404);
    respuesta.end(JSON.stringify({ mensaje: "Ruta no encontrada." }));
    return;
  }

  if (solicitud.method !== "GET") {
    respuesta.setHeader("Allow", "GET");
    respuesta.writeHead(405);
    respuesta.end(JSON.stringify({ mensaje: "Solo se permite consultar tratamientos." }));
    return;
  }

  if (!Array.isArray(datos.tratamientos) || !datos.tratamientos.every(esTratamiento)) {
    respuesta.writeHead(500);
    respuesta.end(JSON.stringify({ mensaje: "Los tratamientos configurados son inválidos." }));
    return;
  }

  respuesta.writeHead(200);
  respuesta.end(JSON.stringify(datos.tratamientos));
});

servidor.on("error", function (error) {
  console.error("No se pudo iniciar la API:", error.message);
  process.exitCode = 1;
});

servidor.listen(3001, "127.0.0.1", function () {
  console.log("API de tratamientos: http://127.0.0.1:3001/tratamientos");
});
