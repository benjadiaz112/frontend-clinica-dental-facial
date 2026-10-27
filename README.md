# Clínica Aura

Proyecto académico de Benjamin Diaz y Bikenson Fenelus. Presenta una clínica dental y facial ficticia, un catálogo de tratamientos y un formulario de reserva de demostración.

## Tecnologías actuales

| Herramienta | Uso |
| --- | --- |
| React 19.3.1 | Componentes, propiedades, eventos y estados. |
| Next.js 16.4.2 | Rutas, servidor de desarrollo y compilación. |
| JavaScript y JSX | Datos y funciones en `.js`; componentes y páginas en `.jsx`. |
| CSS propio | Estilos y adaptación a móvil mediante Flexbox y media queries. |
| Node.js | Ejecución de las herramientas y de la API simulada. |
| QUnit 3.0.0 | Cinco pruebas de funciones de validación. |

Las versiones instaladas están fijadas en `package-lock.json`. Se recomienda Node.js 24 LTS; las versiones compatibles se indican en `package.json`.

## Instalar e iniciar

Abrir una terminal en la carpeta que contiene `package.json`. Si el proyecto descargado tiene otra carpeta con el mismo nombre dentro, entrar a esa carpeta primero.

Instalar dependencias:

```bash
npm install
```

En una terminal, encender la API:

```bash
npm run api
```

En otra terminal, encender la página:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Mantener ambas terminales abiertas y detener cada servidor con `Ctrl+C`.

La página usa el puerto 3000. La API entrega los cinco tratamientos en [http://127.0.0.1:3001/tratamientos](http://127.0.0.1:3001/tratamientos). `npm run dev` inicia la página; la API se inicia por separado.

Si en Linux instalaste Node con nvm y una terminal anterior no reconoce `npm`, cargarlo con `source ~/.nvm/nvm.sh` o abrir una terminal nueva. En la terminal de VS Code en Linux se puede pegar con `Ctrl+Shift+V`.

## Comandos disponibles

| Comando | Acción |
| --- | --- |
| `npm run api` | Inicia el servidor local de tratamientos. |
| `npm run dev` | Inicia Next.js en desarrollo. |
| `npm test` | Ejecuta las cinco pruebas de QUnit y termina. |
| `npm run test:watch` | Repite las pruebas al guardar archivos. |
| `npm run test:web` | Inicia la página de resultados de QUnit en el puerto 4000. |
| `npm run build` | Genera la versión de producción en `.next/`. |
| `npm start` | Sirve la versión ya compilada. |

Para producción local, ejecutar primero `npm run build`, mantener la API encendida y usar `npm start`. Detener antes el servidor de desarrollo si ocupa el puerto 3000.

## Ver los tests en el navegador

Desde la carpeta de `package.json`, ejecutar:

```bash
npm run test:web
```

Abrir [Pruebas QUnit](http://127.0.0.1:4000/tests/index.html). Se muestran las mismas cinco pruebas que ejecuta `npm test`, con sus resultados y comprobaciones. Después de editar una prueba, recargar la página. No hace falta iniciar Next.js ni la API. Detener el servidor con `Ctrl+C`.

## Funcionalidades

- Inicio con presentación, tratamientos destacados, carrusel manual y video.
- Nosotros y Contacto con información ficticia de referencia.
- Catálogo desde la API, con carga, lista vacía y error.
- Selección de un tratamiento y paso de su identificador a Reserva.
- Formulario con nombre, RUT, correo, servicio y comentario opcional; validación, foco en el primer error y limpieza.
- Página 404 para direcciones inexistentes.

La validación correcta del formulario muestra un resultado de demostración: no guarda reservas ni envía correos.

## Organización y documentación

- [Estructura y archivos](docs/estructura-por-capas.md).
- [Rutas](docs/rutas.md) y [navegación](docs/navegacion-verificada.md).
- [API simulada](docs/api-simulada.md), [datos](docs/datos-tratamientos.md) y [forma de los objetos](docs/modelos.md).
- [Inicio](docs/inicio-react.md), [Nosotros y Contacto](docs/informacion-react.md) y [componentes compartidos](docs/componentes-compartidos.md).
- [Catálogo](docs/catalogo-react.md), [selección](docs/seleccion-tratamiento.md), [formulario](docs/formulario-reserva.md) y [validaciones](docs/validaciones-reserva.md).
- [Estilos](docs/estilos-comunes.md) y [responsividad y accesibilidad](docs/responsividad-accesibilidad.md).
- [Cómo leer y ejecutar los tests](docs/pruebas-iniciales.md), [casos y resultados](docs/PRUEBAS.md) e [informe de testing](INFORME-TESTING.md).
- [Alcance actual](docs/alcance-parcial-2.md) y [pendientes](docs/pasos-pendientes.md).

`jsconfig.json` define el alias `@/` para importar desde la raíz del proyecto; `next.config.mjs` contiene la configuración de Next.js. `.next/` y `node_modules/` son carpetas generadas y no se editan como código de la aplicación. Los HTML, CSS y JavaScript originales se conservan como referencia.

## Entrega

Repositorio: [frontend-clinica-dental-facial](https://github.com/benjadiaz112/frontend-clinica-dental-facial). `ERS.docx` describe el alcance actual y fue actualizado el 27 de octubre de 2026. El ZIP final se prepara después de cerrar el alcance y verificar la entrega.
