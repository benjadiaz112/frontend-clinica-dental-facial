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

Medición del 24 de octubre de 2026 con `npm test -- --reporters=dots,coverage`: diez pruebas exitosas y cero fallidas. TypeScript y compilación también finalizaron correctamente.

Karma utiliza `istanbul-lib-instrument` para instrumentar los archivos originales TypeScript/TSX antes de que esbuild los agrupe. `tests/cobertura.js` limita la medición a `app/`, `components/`, `hooks/`, `data/` y `services/`. Los archivos de pruebas no se instrumentan.

Se incluyen los 29 archivos de esas carpetas, incluso los no importados por las pruebas: sus contadores empiezan en cero. En esta ejecución, veinte archivos no tuvieron ejecución. Esto evita presentar como cobertura total únicamente lo que las pruebas alcanzaron a importar.

Resultado medido en la ejecución actual:

- Sentencias: **68,42% (117/171)**.
- Ramas: **71,69% (76/106)**.
- Funciones: **59,64% (34/57)**.
- Líneas: **69,65% (101/145)**.

Los reportes de esta configuración se generan en `coverage/aplicacion/`: `index.html`, `lcov.info`, `coverage-final.json` y `coverage-summary.json`. `coverage/inicial.js` es la base temporal de contadores. Los reportes anteriores guardados en carpetas con nombres de navegador corresponden a la configuración antigua y no deben utilizarse para esta medición.

Se conserva una evidencia de los resultados y del resumen por archivo en [docs/evidencia-cobertura.json](docs/evidencia-cobertura.json). El resultado anterior del 100% medía un archivo de pruebas; queda reemplazado por esta medición de la aplicación.

### Limitación

Los porcentajes corresponden exclusivamente al TypeScript/TSX de las cinco carpetas indicadas. No miden CSS, imágenes, archivos de configuración, librerías, tipos de `models/`, el sitio HTML/JavaScript original ni `api_simulada/servidor.js`, que se ejecuta en otro proceso Node.js. Las páginas y componentes no ejecutados por estas diez pruebas permanecen con cero cobertura; no se ejecutan artificialmente para aumentar el resultado.

El informe no acredita accesibilidad completa, aspecto visual, ejecución real del backend ni aprobación académica. Las diez pruebas se mantienen sin añadir casos. Para regenerar una medición completa después de agregar o eliminar fuentes, ejecutar de nuevo `npm test`; no utilizar como evidencia final una sesión previa de `test:watch`.
