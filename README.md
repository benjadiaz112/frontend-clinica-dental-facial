# Clínica Aura
integrantes: Benjamin Diaz, Javier Hidalgo, Bikenson Fenelus
Proyecto frontend académico de una clínica dental y de armonización facial. Conserva el sitio original en HTML, CSS y JavaScript e incorpora la base de su nueva versión con React y Next.js.

## Evaluación Parcial 2: alcance definido

El [alcance y los criterios de aceptación](docs/alcance-parcial-2.md) cruzan la pauta, el ERS actual y los ejemplos recibidos. Incluyen la migración planificada a React con Bootstrap, estructura por capas, API simulada y pruebas con Jasmine y Karma. El documento también registra la vinculación con GitHub conservando el historial.

Están completados la definición de alcance, la conexión con GitHub, la revisión y las correcciones del sitio original. El paso 4 incorpora una página inicial de React con Next.js y TypeScript. La migración de las páginas, la organización completa por capas, Bootstrap, la API simulada y Jasmine/Karma corresponden a los siguientes pasos.

## Ejecutar la base de React con Next.js

Requiere Node.js 20.9 o superior y npm, según la [documentación oficial de Next.js](https://nextjs.org/docs/app/getting-started/installation). Ejecuta los comandos desde la raíz del repositorio.

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`. Por ahora muestra una página inicial; los archivos HTML originales no se sirven desde Next.js y continúan disponibles mediante XAMPP.

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
