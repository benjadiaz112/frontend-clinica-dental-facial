# Pruebas iniciales — paso 6

## Ejecutar

Desde la raíz del proyecto:

```bash
npm ci
npm test
```

Karma abre un navegador sin ventana, ejecuta Jasmine y termina. No es necesario iniciar Next.js ni la API. Si alguna prueba falla, el comando devuelve un código de error.

Para repetir las pruebas al guardar cambios:

```bash
npm run test:watch
```

Detén ese modo con `Ctrl+C`.

## Navegador

En Windows, la configuración usa Edge si está instalado en su ubicación habitual y no se definió `CHROME_BIN`. En otros casos, el lanzador busca Chrome. También se puede indicar la ruta del navegador manualmente; por ejemplo, en PowerShell:

```powershell
$env:CHROME_BIN = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npm test
```

## Archivos

- `karma.conf.js`: indica el framework, archivos, transformación de TSX y navegador.
- `tests/configuracion.js`: activa el entorno de pruebas de React para usar `act`.
- `tests/ValidacionesReserva.spec.tsx`: reúne las validaciones principales de nombre, RUT, correo y servicio.
- `tests/CatalogoTratamientos.spec.tsx`: prueba carga, respuesta vacía, error de API y selección.
- `tests/FormularioReserva.spec.tsx`: prueba rechazo, aceptación y limpieza del formulario.

Jasmine escribe y comprueba los casos; Karma los ejecuta en el navegador. Esbuild transforma TypeScript y JSX para que el navegador pueda ejecutarlos. No se agregan bibliotecas de pruebas de interfaz adicionales.

## Cómo leer una prueba

- `describe` agrupa casos relacionados.
- `it` describe un comportamiento que se quiere comprobar.
- `beforeEach` prepara un contenedor vacío para cada caso.
- `act` espera las actualizaciones de React antes de comprobar el DOM.
- `expect(...).toBe(...)` compara el resultado obtenido con el esperado.
- `afterEach` desmonta el componente y elimina el contenedor para no mezclar los casos.

Se mantiene el enfoque de los ejemplos recibidos: preparar datos, ejecutar y comprobar. La suite actual contiene exactamente diez pruebas funcionales: cuatro de validaciones, cuatro de catálogo y dos de formulario. Las pruebas históricas de botones, presentación y carrusel se retiraron para conservar ese alcance.

## Cobertura y resultados

`tests/cobertura.js` instrumenta 29 archivos de aplicación en app, components, hooks, data y services, incluidos los no ejecutados. Excluye pruebas, CSS, modelos y el servidor Node de la API. Los resultados y límites están en el [informe de testing](../INFORME-TESTING.md).

Para regenerar los reportes:

```bash
npm run test:coverage
```

Abre `coverage/aplicacion/index.html`. Los reportes se generan localmente y no se incluyen en Git; la evidencia conservada está en `docs/evidencia-cobertura.json`.

La ejecución normal con `npm test` o `npm run test:watch` no instrumenta el código ni genera reportes de cobertura. Los reportes de ejecuciones anteriores permanecen hasta que se eliminen.

La última verificación del paso 23 completó las diez pruebas, TypeScript y compilación. Esta guía no presenta auditorías antiguas de dependencias como un diagnóstico actual de seguridad.
