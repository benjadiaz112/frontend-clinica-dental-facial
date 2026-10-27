# Cinco pruebas unitarias con Vitest

## Entorno y ejecución

La aplicación tiene cinco pruebas en cuatro archivos `.test.js`. Importan funciones de `services/validacionesReserva.js` y se ejecutan en Node.js, sin navegador ni API.

```bash
npm test
```

`package.json` ejecuta `vitest run`. Para repetir al guardar se utiliza `npm run test:watch`; se detiene con `Ctrl+C`.

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

Última ejecución registrada: 26 de octubre de 2026, con Node.js 24.22.1 y Vitest 5.0.5, después de convertir el código a JavaScript y JSX.

```text
Test Files  4 passed (4)
     Tests  5 passed (5)
```

El comando terminó con código de salida 0. La compilación con `npm run build` también terminó correctamente.

## Comprobación complementaria de la aplicación

Con la API real se revisaron las cinco páginas en móvil y escritorio, carrusel, selección, validación, foco, limpieza y página 404. Con la API apagada se comprobaron los mensajes y el bloqueo de Validar, manteniendo disponible Limpiar.

Esta revisión es independiente de los cinco casos de Vitest. Los tests no prueban el DOM, las rutas, el carrusel, el formulario completo ni la integración con el servidor. No se presenta un porcentaje de código ejecutado como resultado de esta suite.
