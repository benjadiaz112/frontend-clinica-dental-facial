// Sirve solo la página de pruebas, QUnit y los archivos que necesitan los tests.
const http = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const archivos = {
  "/": "tests/index.html",
  "/tests/index.html": "tests/index.html",
  "/tests/validarNombre.test.js": "tests/validarNombre.test.js",
  "/tests/validarRut.test.js": "tests/validarRut.test.js",
  "/tests/validarCorreo.test.js": "tests/validarCorreo.test.js",
  "/tests/validarServicio.test.js": "tests/validarServicio.test.js",
  "/services/validacionesReserva.js": "services/validacionesReserva.js",
  "/qunit/qunit.js": "node_modules/qunit/qunit/qunit.js",
  "/qunit/qunit.css": "node_modules/qunit/qunit/qunit.css",
};
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

const servidor = http.createServer(async function (solicitud, respuesta) {
  const ruta = new URL(solicitud.url, "http://127.0.0.1").pathname;
  const archivo = Object.hasOwn(archivos, ruta) ? archivos[ruta] : null;
  if (!archivo) {
    respuesta.writeHead(404);
    respuesta.end("Archivo no encontrado.");
    return;
  }
  try {
    const contenido = await readFile(path.join(raiz, archivo));
    respuesta.writeHead(200, {
      "Content-Type": tipos[path.extname(archivo)],
      "Cache-Control": "no-store",
    });
    respuesta.end(contenido);
  } catch (error) {
    respuesta.writeHead(500);
    respuesta.end("No se pudo cargar el archivo. Ejecuta npm install.");
  }
});

servidor.on("error", function (error) {
  console.error("No se pudo iniciar el servidor de pruebas:", error.message);
  process.exitCode = 1;
});
servidor.listen(4000, "127.0.0.1", function () {
  console.log("Pruebas QUnit: http://127.0.0.1:4000/tests/index.html");
});
