# Pruebas unitarias de Clínica Aura

## Entorno

Vitest, ejecutado en Node.js mediante `npm test` (`vitest run`). Las pruebas importan directamente funciones de `services/validacionesReserva.ts`. No requieren navegador, componentes montados ni servidor de API.

## Casos: exactamente dos

| Archivo | Función | Qué comprueba |
| --- | --- | --- |
| `tests/validarRut.test.js` | `validarRut` | Acepta un RUT con dígito correcto y rechaza uno incorrecto o vacío. |
| `tests/validarServicio.test.js` | `validarServicio` | Acepta un servicio de la lista y rechaza otro, un valor vacío o una lista sin servicios. |

Las listas y los textos de los tests son entradas de funciones puras. No se reemplaza `fetch` ni se simulan respuestas del servidor.

## Resultado real

Ejecución del 26 de octubre de 2026 con Node.js 24.22.1 y Vitest 5.0.5. Comando: `npm test`.

Resumen copiado de la salida del comando:

```text
Test Files  2 passed (2)
     Tests  2 passed (2)
```

La ejecución terminó correctamente con código de salida 0.

## Comprobación complementaria

`npm run typecheck` y `npm run build` terminaron correctamente. Con la aplicación compilada y la API real se comprobó el catálogo de cinco tratamientos, la selección y preselección por URL, los errores del formulario, el foco en el primer campo incorrecto, la validación correcta, la limpieza y la recuperación desde un identificador inexistente. No se registraron errores de JavaScript en ese recorrido.

Al apagar la API se comprobó que catálogo y reserva muestran el error y que el formulario bloquea la validación, manteniendo disponible Limpiar. Esta revisión del navegador es independiente de las dos pruebas unitarias de Vitest.

## Límites

Estas dos pruebas no comprueban el DOM, la navegación, el carrusel, el formulario completo ni la integración con la API. Las funciones de nombre y correo se conservan en la aplicación, pero no tienen casos automatizados en esta suite reducida. La conexión y la reserva se revisan por separado en el navegador con la API local encendida.
