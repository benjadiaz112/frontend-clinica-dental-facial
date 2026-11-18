# Cinco pruebas unitarias con QUnit

## Entorno y ejecución

La aplicación tiene cinco pruebas en cuatro archivos `.test.js`. Importan funciones de `services/validacionesReserva.js` y se ejecutan en Node.js o en el navegador, sin consultar la API.

```bash
npm test
```

`package.json` ejecuta `qunit "tests/*.test.js"`. Para repetir al guardar se utiliza `npm run test:watch`; se detiene con `Ctrl+C`.

Para ver los resultados en el navegador:

```bash
npm run test:web
```

Abrir [http://127.0.0.1:4000/tests/index.html](http://127.0.0.1:4000/tests/index.html). `tests/index.html` carga QUnit instalado en el proyecto y los mismos cuatro archivos de pruebas. `tests/servidor.cjs` sirve esos archivos y las validaciones en el puerto 4000; no inicia la aplicación ni la API. No depende de un CDN. Recargar la página después de modificar el código.

Los archivos `package.json` de `tests/` y `services/` indican a Node.js que esas carpetas usan módulos con `import` y `export`. La API conserva su formato con `require`.

## Casos actuales

| Archivo | Caso | Qué comprueba |
| --- | --- | --- |
| `tests/validarNombre.test.js` | Nombre | Texto válido, espacios exteriores y rechazo de números, largo insuficiente y vacío. |
| `tests/validarRut.test.js` | Dígito verificador | RUT correcto, incorrecto y vacío. |
| `tests/validarRut.test.js` | Formatos | RUT sin puntos, K y cero; rechazo de puntos mal ubicados. |
| `tests/validarCorreo.test.js` | Correo | Formato correcto, espacios exteriores y rechazo de formatos incorrectos y vacío. |
| `tests/validarServicio.test.js` | Servicio | Servicio disponible, desconocido, vacío y lista sin servicios. |

Las listas y textos son entradas de funciones puras. Los tests no reemplazan `fetch` ni crean respuestas simuladas de la API.

## Resultado verificado

Última ejecución registrada: 26 de octubre de 2026, con Node.js 24.22.1 y QUnit 3.0.0, después de migrar las cinco pruebas a QUnit.

```text
# pass 5
# skip 0
# todo 0
# fail 0
```

El comando terminó con código de salida 0. En el navegador también se verificaron las cinco pruebas: 21 comprobaciones correctas y cero fallidas. La compilación con `npm run build` también terminó correctamente.

## Comprobación complementaria de la aplicación

Con la API real se revisaron las cinco páginas en móvil y escritorio, carrusel, selección, validación, foco, limpieza y página 404. Con la API apagada se comprobaron los mensajes y el bloqueo de Validar, manteniendo disponible Limpiar.

Esta revisión es independiente de los cinco casos de QUnit. Los tests no prueban el DOM, las rutas, el carrusel, el formulario completo ni la integración con el servidor. No se presenta un porcentaje de código ejecutado como resultado de esta suite.
