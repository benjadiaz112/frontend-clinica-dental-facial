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
- `tests/PresentacionInicio.spec.tsx`: contiene dos pruebas del componente real.
- `tests/ComponentesCompartidos.spec.tsx`: añade tres casos de botón y mensajes en el paso 8.
- `tests/CarruselInicio.spec.tsx`: añade cinco casos de navegación del carrusel en el paso 10.

Jasmine escribe y comprueba los casos; Karma los ejecuta en el navegador. Esbuild transforma TypeScript y JSX para que el navegador pueda ejecutarlos. No se agregan bibliotecas de pruebas de interfaz adicionales.

## Cómo leer una prueba

- `describe` agrupa casos relacionados.
- `it` describe un comportamiento que se quiere comprobar.
- `beforeEach` prepara un contenedor vacío para cada caso.
- `act` espera las actualizaciones de React antes de comprobar el DOM.
- `expect(...).toBe(...)` compara el resultado obtenido con el esperado.
- `afterEach` desmonta el componente y elimina el contenedor para no mezclar los casos.

Se mantiene el enfoque de los ejemplos recibidos: preparar datos, ejecutar y comprobar. El primer caso muestra nombre, descripción y aviso proporcionados por propiedades. El segundo vuelve a renderizar con otras propiedades y verifica que la información cambie.

Este paso configura el entorno y las pruebas iniciales. Las pruebas de formularios, eventos, lógica de negocio, mocks y cobertura se incorporarán al implementar esas funcionalidades. Todavía no representa la suite final de al menos 10 pruebas ni el documento final de cobertura.

En el paso 8 se añaden tres comportamientos: el botón ejecuta su acción, un botón deshabilitado no la ejecuta y un mensaje de error es accesible y desaparece al limpiar el texto. En el paso 10 se prueban avance y retroceso del carrusel, sus límites y listas de cero o una imagen. La suite actual contiene diez pruebas; las funcionalidades futuras todavía necesitan sus propios casos.

## Verificación de este paso

- `npm test`: diez pruebas aprobadas en Edge tras el paso 10.
- `npm run build` y `npm run typecheck`: completados correctamente.
- `npm audit --omit=dev`: cero vulnerabilidades informadas en dependencias de producción durante esta revisión.
- `npm audit`: cinco alertas de severidad alta en herramientas de desarrollo, derivadas de `braces`, usado por los monitores de archivos de Karma y karma-esbuild. La versión estable consultada, 3.0.3, sigue afectada y npm no ofrece una solución compatible para toda la cadena. Queda pendiente una actualización compatible; no se aplicaron las degradaciones de versiones que propone `--force`.

Referencias: [configuración de Karma](https://karma-runner.github.io/latest/config/configuration-file.html), [primera suite de Jasmine](https://jasmine.github.io/tutorials/your_first_suite) y [act en React](https://react.dev/reference/react/act).
