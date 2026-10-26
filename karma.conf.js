const fs = require("fs");
const path = require("path");
const prepararCobertura = require("./tests/cobertura");

if (!process.env.CHROME_BIN && process.platform === "win32") {
  const carpetaProgramas = process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)";
  const rutaEdge = path.join(carpetaProgramas, "Microsoft", "Edge", "Application", "msedge.exe");

  if (fs.existsSync(rutaEdge)) {
    process.env.CHROME_BIN = rutaEdge;
  }
}

module.exports = function (config) {
  const medirCobertura = config.reporters?.includes("coverage") || false;
  const cobertura = medirCobertura ? prepararCobertura() : null;
  const archivos = [
    "tests/configuracion.js",
    "tests/**/*.spec.tsx",
    { pattern: "public/imagenes/*.jpg", included: false, watched: false }
  ];
  if (cobertura) archivos.unshift({ pattern: cobertura.archivoInicial, watched: false });
  config.set({
    frameworks: ["jasmine"],
    files: archivos,
    proxies: {
      "/imagenes/": "/base/public/imagenes/"
    },
    preprocessors: {
      "tests/**/*.spec.tsx": ["esbuild"]
    },
    esbuild: {
      jsx: "automatic",
      target: "es2020",
      plugins: cobertura ? [cobertura.plugin] : [],
      define: {
        "process.env.NODE_ENV": JSON.stringify("test")
      }
    },
    browsers: ["ChromeHeadless"],
    reporters: medirCobertura ? config.reporters : ["progress"],
    coverageReporter: {
      dir: "coverage/",
      subdir: "aplicacion",
      reporters: [
        { type: "text-summary" },
        { type: "html" },
        { type: "lcovonly" },
        { type: "json" },
        { type: "json-summary" }
      ]
    },
    hostname: "127.0.0.1",
    listenAddress: "127.0.0.1",
    singleRun: true,
    autoWatch: false
  });
};
