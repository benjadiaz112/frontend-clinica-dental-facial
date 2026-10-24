# Clínica Aura
integrantes: Benjamin Diaz, Javier Hidalgo, Bikenson Fenelus
Proyecto frontend académico de una clínica dental y de armonización facial. Conserva el sitio original en HTML, CSS y JavaScript e incorpora la base de su nueva versión con React y Next.js.

## Evaluación Parcial 2: alcance definido

El [alcance vigente](docs/alcance-parcial-2.md) se limita a la pauta principal, por indicación del usuario: React, propiedades y estados, navegación, formularios, responsividad, Jasmine/Karma, mocks, cobertura y entregables. Se conserva el caso de Clínica Aura. Por decisión del usuario se utiliza CSS nativo; la pauta exige Bootstrap y esta diferencia sigue pendiente.

Inicio, Nosotros, Contacto, Tratamientos y Reserva están migrados. El [catálogo](docs/catalogo-react.md) consulta la API y permite [seleccionar un tratamiento](docs/seleccion-tratamiento.md). El [formulario React](docs/formulario-reserva.md) valida nombre, RUT, correo y servicio, muestra errores y permite limpiar. La confirmación es solo de demostración. Se conservan cinco rutas y la página 404. La suite contiene diez pruebas representativas; la cobertura de líneas medida es 69,65% sobre 29 archivos de aplicación, incluidos los no ejecutados. El [informe de testing](INFORME-TESTING.md) detalla el alcance y las exclusiones.

## Estructura simple por modulos

El [paso 19](docs/navegacion-verificada.md) completa la navegación del pie y verifica los enlaces, historial, teclado y la página 404.

La información de las páginas está en `data/` y se muestra en `components/`; `app/` compone cada ruta. La lógica reutilizable del formulario está en `hooks/` y sus validaciones en `services/`. Los estilos nativos están en `styles/`.

Todo permanece dentro de este mismo repositorio de GitHub.

## Estilos comunes

La [guía de estilos comunes](docs/estilos-comunes.md) explica los colores, contenedores, tarjetas, botones, campos y mensajes de `styles/globals.css`. Se utilizan clases sencillas, Flexbox y una media query para adaptar la distribución a móviles.

## Ejecutar la base de React con Next.js

El [detalle de los componentes compartidos](docs/componentes-compartidos.md) explica sus propiedades y uso. La [guía de rutas](docs/rutas.md) enumera las páginas disponibles y los enlaces públicos y administrativos.

Requiere Node.js 20.9 o superior y npm, según la [documentación oficial de Next.js](https://nextjs.org/docs/app/getting-started/installation). Ejecuta los comandos desde la raíz del repositorio.

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`. La [guía de Inicio en React](docs/inicio-react.md) explica la portada. La [guía de Nosotros y Contacto](docs/informacion-react.md) explica las dos páginas informativas y su separación de Reserva. Los archivos HTML originales continúan disponibles mediante XAMPP. Los [pasos pendientes](docs/pasos-pendientes.md) indican cómo continuar.

Para compilar y ejecutar la versión de producción:

```bash
npm run build
npm start
```

Detén el servidor de desarrollo antes de iniciar el de producción si ambos usan el puerto 3000.

Para revisar los tipos de TypeScript:

```bash
npm run typecheck
```

`package-lock.json` fija las dependencias para que `npm ci` reproduzca la instalación. Los comandos `dev` y `build` generan los archivos locales de Next.js necesarios; estos archivos y `node_modules` no se publican en Git.

## API simulada local

Ejecuta `npm run api` en otra terminal. El catálogo consulta `http://127.0.0.1:3001/tratamientos` desde el navegador; si la API no está disponible muestra un error. La [guía de API](docs/api-simulada.md) detalla el servidor local. Esta dirección está preparada para ejecución en el mismo equipo.

## Pruebas con Jasmine y Karma

```bash
npm test
```

Ejecuta las pruebas una vez en un navegador sin ventana. En Windows se utiliza Edge si está disponible; la configuración permite indicar otro navegador compatible mediante `CHROME_BIN`. No es necesario iniciar el servidor de Next.js.

Para repetir las pruebas al guardar cambios, utiliza `npm run test:watch`. La suite contiene diez casos representativos de validaciones, catálogo, selección y formulario, con mocks de API. No es necesario iniciar la API para ejecutar las pruebas.

## Funcionalidades del sitio original

- Navegación entre Inicio, Nosotros, Tratamientos y Reserva.
- Página informativa de tratamientos.
- Imágenes y precios referenciales de tratamientos.
- Formulario de reserva con validación de nombre, RUT, correo y servicio.
- Validación de RUT mediante módulo 11 y validación de correo.
- Mensajes e indicadores visuales para campos correctos e incorrectos.
- Video educativo y diseño responsivo mediante CSS externo.

## Ejecutar el sitio original con XAMPP

1. Copia la carpeta `clinica-dental-frontend` dentro de `C:\xampp\htdocs`.
2. Inicia Apache desde XAMPP.
3. Abre `http://localhost/clinica-dental-frontend/`.
## Pruebas rápidas

- Revisa que todos los enlaces del menú abran la página correcta.
- Comprueba que las imágenes y el video se muestren correctamente.
- En Reserva, envía campos vacíos y revisa los mensajes.
- RUT válido de prueba: `12.345.678-5`.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- React y Next.js para la nueva versión
- TypeScript
- Node.js y npm
- XAMPP
- Git y GitHub
