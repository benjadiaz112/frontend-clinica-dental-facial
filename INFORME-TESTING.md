# Informe de testing

## Ejecución

- Herramienta: Jasmine sobre Karma con Edge Headless.
- Comando: `npm test`.
- Casos ejecutados: 10.
- Resultado: 10 exitosos, 0 fallidos.
- Dependencia de API real: ninguna. Todos los accesos a `window.fetch` se reemplazan por respuestas simuladas dentro de las pruebas.

## Casos cubiertos

| Nº | Área | Comprobación | Resultado |
|---:|---|---|---|
| 1 | Validaciones | Rechazo y aceptación del nombre | Exitoso |
| 2 | Validaciones | Rechazo y aceptación del RUT | Exitoso |
| 3 | Validaciones | Rechazo y aceptación del correo | Exitoso |
| 4 | Validaciones | Rechazo y aceptación del servicio | Exitoso |
| 5 | Catálogo/API | Lista con cinco tratamientos y precios | Exitoso |
| 6 | Catálogo/API | Respuesta con lista vacía | Exitoso |
| 7 | Catálogo/API | Respuesta HTTP con error | Exitoso |
| 8 | Catálogo | Selección única y cambio de tratamiento | Exitoso |
| 9 | Reserva | Rechazo de datos inválidos y aceptación de datos válidos | Exitoso |
| 10 | Reserva | Limpieza de valores, errores y resultado | Exitoso |

## Mocks utilizados

Las pruebas del catálogo y del formulario usan `spyOn(window, "fetch")` para devolver:

- Los cinco tratamientos de `api_simulada/db.json`.
- Una lista vacía.
- Una respuesta HTTP 500.

Por esta razón, `npm test` funciona sin iniciar `npm run api` y no depende de disponibilidad de red, puerto local o datos externos.

## Cobertura

La configuración de Karma incluye `karma-coverage` y genera reportes HTML, LCOV y resumen de texto en la carpeta `coverage/`.

Resultado medido en la ejecución actual:

- Statements: **100% (14/14)**
- Branches: **100% (0/0)**
- Functions: **100% (5/5)**
- Lines: **100% (14/14)**

### Limitación

La integración actual de `karma-esbuild` agrupa los módulos y el instrumentador Istanbul registra el archivo de entrada de pruebas (`ValidacionesReserva.spec.tsx`), por lo que el porcentaje anterior **no representa la cobertura completa de todos los componentes de la aplicación**. El resultado debe presentarse como cobertura del archivo instrumentado y no como cobertura total del frontend. Las 10 pruebas funcionales sí se ejecutan completamente y verifican las validaciones, el catálogo, la API simulada, la selección y el formulario.
