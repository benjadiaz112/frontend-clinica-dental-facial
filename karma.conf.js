const fs = require("fs");
const path = require("path");
const { esbuildPluginIstanbul } = require("esbuild-plugin-istanbul");

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
      singleBundle: false,
      plugins: [
        esbuildPluginIstanbul({
          filter: /\.tsx$/,
          loader: "tsx",
          name: "istanbul-loader-tsx"
        }),
        esbuildPluginIstanbul({
          filter: /\.ts$/,
          loader: "ts",
          name: "istanbul-loader-ts"
        })
      ],
      define: {
        "process.env.NODE_ENV": JSON.stringify("test")
      }
    },
    browsers: ["ChromeHeadless"],
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage/",
      reporters: [
        { type: "text-summary" },
        { type: "html" },
        { type: "lcovonly" }
      ]
    },
    hostname: "127.0.0.1",
    listenAddress: "127.0.0.1",
    singleRun: true,
    autoWatch: false
  });
};
