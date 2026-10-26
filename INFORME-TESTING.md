# Informe de testing

## Ejecución

- Herramienta: Jasmine sobre Karma con navegador Chromium sin ventana. La última comprobación se realizó con Brave/ChromeHeadless en Linux; las mediciones anteriores utilizaron Edge Headless en Windows.
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
| 7 | Catálogo/API | Respuesta HTTP con error y respuesta sin lista | Exitoso |
| 8 | Catálogo | Selección única, cambio, limpieza y nueva selección | Exitoso |
| 9 | Reserva | Rechazo de datos inválidos y aceptación de datos válidos | Exitoso |
| 10 | Reserva | Limpieza, recuperación de URL inválida y bloqueo sin servicios | Exitoso |

## Mocks utilizados

Las pruebas del catálogo y del formulario usan `spyOn(window, "fetch")` para devolver:

- Los cinco tratamientos de `api_simulada/db.json`.
- Una lista vacía.
- Una respuesta HTTP 500.

Por esta razón, `npm test` funciona sin iniciar `npm run api` y no depende de disponibilidad de red, puerto local o datos externos.

## Revisión de las diez pruebas

Las diez pruebas siguen el estilo sencillo del ejemplo de patentes: preparar los datos, ejecutar una función o acción y comprobar el resultado. Se utilizan `describe`, `it` y `expect` de Jasmine. QUnit sirve como referencia de estilo, pero no se instala ni se combina con el entorno de Jasmine y Karma.

En el paso 22 se conservan cuatro pruebas de validaciones, cuatro de catálogo y dos de formulario. No se agregan dependencias ni se cambia la interfaz.

Se eliminan los selectores `.precio-tratamiento` y `.mensaje-exito`, las posiciones fijas de tarjetas y la dependencia del nivel de un título para comprobar la limpieza. Las pruebas buscan los tratamientos por nombre, verifican sus precios y el identificador enviado a Reserva, y consultan campos del formulario mediante `name` y mensajes mediante `role`, `aria-invalid` y `aria-describedby`.

La selección se prueba con la lista simulada en orden inverso. Limpiar se comprueba después de un resultado válido y después de un error, dentro del mismo caso. Se mantiene la comprobación del aviso de que no se envió una solicitud, porque es una condición funcional de esta demostración. Los textos decorativos de carga, lista vacía y error no se comparan literalmente.

Estos cambios toleran modificaciones de clases, colores y orden de tarjetas. Un cambio en nombres de campos, roles accesibles o rutas puede requerir actualizar las pruebas, porque forman parte del comportamiento comprobado.

## Cobertura

Medición del 24 de octubre de 2026 con `npm test -- --reporters=dots,coverage`: diez pruebas exitosas y cero fallidas. TypeScript y compilación también finalizaron correctamente.

Karma utiliza `istanbul-lib-instrument` para instrumentar los archivos originales TypeScript/TSX antes de que esbuild los agrupe. `tests/cobertura.js` limita la medición a `app/`, `components/`, `hooks/`, `data/` y `services/`. Los archivos de pruebas no se instrumentan.

Se incluyen los 29 archivos de esas carpetas, incluso los no importados por las pruebas: sus contadores empiezan en cero. En esta ejecución, veinte archivos no tuvieron ejecución. Esto evita presentar como cobertura total únicamente lo que las pruebas alcanzaron a importar.

Resultado de la nueva medición del 24 de octubre de 2026, después de ampliar los comportamientos comprobados en los mismos diez casos:

- Sentencias: **76,60% (131/171)**.
- Ramas: **85,84% (91/106)**.
- Funciones: **64,91% (37/57)**.
- Líneas: **73,79% (107/145)**.

Los reportes de esta configuración se generan en `coverage/aplicacion/`: `index.html`, `lcov.info`, `coverage-final.json` y `coverage-summary.json`. `coverage/inicial.js` es la base temporal de contadores. Los reportes anteriores guardados en carpetas con nombres de navegador corresponden a la configuración antigua y no deben utilizarse para esta medición.

Se conserva una evidencia de los resultados y del resumen por archivo en [docs/evidencia-cobertura.json](docs/evidencia-cobertura.json). El resultado anterior del 100% medía un archivo de pruebas; queda reemplazado por esta medición de la aplicación.

## Revisión manual complementaria

El [informe del paso 23](docs/responsividad-accesibilidad.md) registra las cinco páginas en cuatro anchos, el salto al contenido, las etiquetas y el foco de teclado. Esta revisión es independiente de las diez pruebas automatizadas y no aumenta sus porcentajes de cobertura. El paso 24 solo actualiza documentación; no cambia la suite ni genera una medición nueva.

### Límites de la medición

Los porcentajes corresponden exclusivamente al TypeScript/TSX de las cinco carpetas indicadas. No miden CSS, imágenes, archivos de configuración, librerías, tipos de `models/`, el sitio HTML/JavaScript original ni `api_simulada/servidor.js`, que se ejecuta en otro proceso Node.js. Las páginas y componentes no ejecutados por estas diez pruebas permanecen con cero cobertura; no se ejecutan artificialmente para aumentar el resultado.

El informe no acredita accesibilidad completa, aspecto visual, ejecución real del backend ni aprobación académica. Las diez pruebas se mantienen sin añadir casos. Para regenerar una medición completa después de agregar o eliminar fuentes, ejecutar de nuevo `npm run test:coverage`; no utilizar como evidencia final una sesión previa de `test:watch`.

## Ampliación funcional de los diez casos

Se conserva la distribución 4 + 4 + 2, sin nuevas dependencias ni cambios en el código de aplicación. Se comprueban límites de nombre y correo; RUT sin puntos, con espacios, K y cero; servicios vacíos o fuera del catálogo; transición de carga a resultados; respuesta exitosa sin lista; quitar y volver a seleccionar; errores en campos vacíos y foco en el primero; corrección del error al editar; eliminación de confirmación al cambiar datos; y preselección desde la URL con limpieza posterior. Las comprobaciones se agrupan en el caso de la funcionalidad correspondiente. No se afirma cobertura exhaustiva.

La nueva ejecución completó 10/10 pruebas y TypeScript. La medición más reciente corresponde a este informe y a docs/evidencia-cobertura.json; el ERS ya refleja estos mismos resultados.

### Revisión de huecos funcionales en Reserva

Los mismos dos casos de formulario ahora verifican el bloqueo del selector y de Validar durante la carga, su habilitación al recibir servicios y la disponibilidad de Limpiar. También verifican la recuperación de un identificador inexistente eligiendo un servicio válido y el bloqueo ante lista vacía o rechazo de red, manteniendo la limpieza disponible. Los remontajes representan entradas nuevas al formulario con distintas respuestas simuladas. Se mantienen diez casos en total y no se cambia el código de aplicación.

Persisten huecos: las páginas informativas, navegación y carrusel no tienen casos automatizados en esta suite. Tampoco se prueban todas las combinaciones de cancelación de peticiones o JSON malformado. No se declara cobertura total.

## Simplificación de las pruebas — 26 de octubre de 2026

Se conservan los diez casos y los datos comprobados. Las validaciones agrupan entradas válidas e inválidas en listas. Las respuestas de API utilizan un objeto `Response` con estado HTTP real y método `json` simulado directamente, sin crear otro espía. La carga se comprueba antes de devolver la respuesta del mock, sin promesas pendientes resueltas manualmente. Los componentes se desmontan y montan para representar nuevas consultas, sin claves ni contadores de versión.

Las acciones de clic y escritura se reúnen en `tests/ayudas.ts`, con comentarios sobre `act` y los campos controlados de React. El formulario se envía pulsando su botón y conserva las comprobaciones de foco, errores asociados a campos, resultado, limpieza y bloqueo. Se mantienen las pruebas de selección con el catálogo en orden inverso. No se modifica el código de la aplicación ni se agregan dependencias.

La ejecución con `node node_modules/karma/bin/karma start --single-run` completó **10 pruebas exitosas y 0 fallidas**. Se indicó el navegador con `CHROME_BIN` y el binario compatible de esbuild con `ESBUILD_BINARY_PATH`, porque las dependencias incluidas originalmente son de Windows. La revisión de TypeScript con `tsc --noEmit --incremental false` también terminó sin errores.

La cobertura se conserva: **73,79% de líneas (107/145)**, **76,60% de sentencias (131/171)**, **85,84% de ramas (91/106)** y **64,91% de funciones (37/57)**. Estos resultados coinciden con la evidencia del 24 de octubre conservada en `docs/evidencia-cobertura.json`. Esta simplificación no amplía las funcionalidades cubiertas por la suite. Los reportes de esta comprobación se guardaron fuera de la carpeta del proyecto, por preferencia del usuario. En la configuración actual, `npm test` no genera `coverage/`; para crear los reportes se utiliza `npm run test:coverage`.
