const fs = require("fs");
const path = require("path");
const { createInstrumenter } = require("istanbul-lib-instrument");

module.exports = function prepararCobertura() {
  const raiz = path.resolve(__dirname, "..");
  const inicial = {};
  const archivos = new Set();

  function instrumentar(archivo) {
    const instrumentador = createInstrumenter({
      esModules: true,
      parserPlugins: ["typescript", "jsx"],
      produceSourceMap: true
    });
    const codigo = instrumentador.instrumentSync(fs.readFileSync(archivo, "utf8"), archivo);
    const mapa = Buffer.from(JSON.stringify(instrumentador.lastSourceMap())).toString("base64");
    return {
      codigo: codigo + "\n//# sourceMappingURL=data:application/json;base64," + mapa,
      cobertura: instrumentador.lastFileCoverage()
    };
  }

  function recorrer(carpeta) {
    for (const entrada of fs.readdirSync(carpeta, { withFileTypes: true })) {
      const archivo = path.join(carpeta, entrada.name);
      if (entrada.isDirectory()) {
        recorrer(archivo);
      } else if (/\.tsx?$/.test(archivo) && !archivo.endsWith(".d.ts")) {
        inicial[archivo] = instrumentar(archivo).cobertura;
        archivos.add(archivo);
      }
    }
  }

  for (const carpeta of ["app", "components", "hooks", "data", "services"]) {
    recorrer(path.join(raiz, carpeta));
  }

  const carpetaSalida = path.join(raiz, "coverage");
  fs.mkdirSync(carpetaSalida, { recursive: true });
  const archivoInicial = path.join(carpetaSalida, "inicial.js");
  fs.writeFileSync(archivoInicial, "window.__coverage__ = " + JSON.stringify(inicial) + ";\n");

  return {
    archivoInicial,
    plugin: {
      name: "cobertura-aplicacion",
      setup(build) {
        build.onLoad({ filter: /\.tsx?$/ }, function (args) {
          const archivo = path.resolve(args.path);
          if (!archivos.has(archivo)) return;
          return { contents: instrumentar(archivo).codigo, loader: archivo.endsWith(".tsx") ? "tsx" : "ts" };
        });
      }
    }
  };
};
