const fs = require("fs");
const path = require("path");

// En Windows también podemos usar Edge, que está basado en Chromium.
if (!process.env.CHROME_BIN && process.platform === "win32") {
  const carpetaProgramas = process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)";
  const rutaEdge = path.join(carpetaProgramas, "Microsoft", "Edge", "Application", "msedge.exe");

  if (fs.existsSync(rutaEdge)) {
    process.env.CHROME_BIN = rutaEdge;
  }
}

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "tests/configuracion.js",
      "tests/**/*.spec.tsx",
      { pattern: "public/imagenes/*.jpg", included: false, watched: false }
    ],
    proxies: {
      "/imagenes/": "/base/public/imagenes/"
    },
    preprocessors: {
      "tests/**/*.spec.tsx": ["esbuild"]
    },
    esbuild: {
      jsx: "automatic",
      target: "es2020",
      define: {
        "process.env.NODE_ENV": JSON.stringify("test")
      }
    },
    browsers: ["ChromeHeadless"],
    reporters: ["progress"],
    hostname: "127.0.0.1",
    listenAddress: "127.0.0.1",
    singleRun: true,
    autoWatch: false
  });
};
