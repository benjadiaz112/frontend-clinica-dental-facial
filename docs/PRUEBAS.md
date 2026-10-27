# Pruebas unitarias de Clínica Aura

## Entorno

Vitest, ejecutado en Node.js mediante `npm test` (`vitest run`). Las pruebas importan directamente funciones de `services/validacionesReserva.ts`. No requieren navegador, componentes montados ni servidor de API.

## Casos: exactamente cinco

| Archivo | Función | Qué comprueba |
| --- | --- | --- |
| `tests/validarNombre.test.js` | `validarNombre` | Nombre correcto, espacios exteriores y rechazo de números, longitud insuficiente o vacío. |
| `tests/validarRut.test.js` (caso 1) | `validarRut` | RUT con dígito correcto, incorrecto o vacío. |
| `tests/validarRut.test.js` (caso 2) | `validarRut` | Formato sin puntos, dígitos K y cero, y rechazo de puntos mal ubicados. |
| `tests/validarCorreo.test.js` | `validarCorreo` | Correo correcto, espacios exteriores y rechazo de formatos incompletos o vacíos. |
| `tests/validarServicio.test.js` | `validarServicio` | Servicio de la lista, desconocido, vacío y lista sin servicios. |

Las listas y los textos de los tests son entradas de funciones puras. No se reemplaza `fetch` ni se simulan respuestas del servidor.

## Resultado real

Ejecución del 26 de octubre de 2026 con Node.js 24.22.1 y Vitest 5.0.5. Comando: `npm test`.

Resumen copiado de la salida del comando:

```text
Test Files  4 passed (4)
     Tests  5 passed (5)
```

La ejecución terminó correctamente con código de salida 0.

## Comprobación complementaria

`npm run typecheck` y `npm run build` terminaron correctamente. Con la aplicación compilada y la API real se comprobó el catálogo de cinco tratamientos, la selección y preselección por URL, los errores del formulario, el foco en el primer campo incorrecto, la validación correcta, la limpieza y la recuperación desde un identificador inexistente. No se registraron errores de JavaScript en ese recorrido.

Al apagar la API se comprobó que catálogo y reserva muestran el error y que el formulario bloquea la validación, manteniendo disponible Limpiar. Esta revisión del navegador es independiente de las cinco pruebas unitarias de Vitest.

## Límites

Estas cinco pruebas no comprueban el DOM, la navegación, el carrusel, el formulario completo ni la integración con la API. La conexión y la reserva se revisan por separado en el navegador con la API local encendida.
