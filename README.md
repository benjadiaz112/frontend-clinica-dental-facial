# Clínica Aura

Integrantes: Benjamin Diaz y Bikenson Fenelus.

Frontend académico de una clínica dental y facial. Usa React y Next.js con JavaScript y JSX. Muestra información de la clínica, un catálogo de cinco tratamientos y un formulario de reserva de demostración.

## Ejecutar

Requiere Node.js 24 LTS (o una versión compatible indicada en `package.json`). Desde la carpeta que contiene este archivo:

```bash
npm install
```

En una terminal, iniciar los datos del catálogo:

```bash
npm run api
```

En otra terminal, iniciar la página:

```bash
npm run dev
```

Abrir `http://localhost:3000`. Mantener ambas terminales abiertas. La API entrega los tratamientos en `http://127.0.0.1:3001/tratamientos`.

## Cinco pruebas unitarias

```bash
npm test
```

Vitest ejecuta cinco pruebas de funciones puras: nombre, RUT, formatos de RUT, correo y servicio. No necesita navegador ni API. El alcance y los resultados reales están en [docs/PRUEBAS.md](docs/PRUEBAS.md).

Para repetir las pruebas al guardar:

```bash
npm run test:watch
```

## Organización

- `app/`: las cinco páginas y la página 404.
- `components/`: componentes reutilizables; catálogo y formulario guardan sus propios estados con `useState` y consultan la API con `useEffect`.
- `data/`: información de la clínica y función de consulta HTTP.
- `services/`: validaciones independientes de React.
- `styles/`: CSS propio y reglas responsivas.
- `api_simulada/`: servidor local y datos de los tratamientos.
- `tests/`: las cinco pruebas con Vitest.

## Otras comprobaciones

```bash
npm run build
```

Para producción local, mantener la API encendida y ejecutar `npm start` después de compilar. Detener antes el servidor de desarrollo si utiliza el mismo puerto.

## Alcance actual

El formulario valida datos y permite limpiar; no guarda reservas ni envía correos. La API es local y solo permite consultar los tratamientos. Los archivos HTML originales se conservan como referencia.

Los componentes usan archivos `.jsx`; los datos y las validaciones usan `.js`. Los alias de importación se configuran en `jsconfig.json` y Next.js en `next.config.mjs`. La lógica de estado permanece en los componentes. Quedan pendientes, si el equipo decide aplicar el documento de tienda completo, la migración a Vite, Bootstrap, búsqueda, carrito y json-server. No se declara cumplimiento de ese alcance con este cambio. `ERS.docx` corresponde a la versión anterior y requiere actualización antes de presentarlo como documento vigente.
