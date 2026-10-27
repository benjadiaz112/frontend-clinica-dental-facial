# Clínica Aura

Integrantes: Benjamin Diaz y Bikenson Fenelus.

Frontend académico de una clínica dental y facial. Usa React, Next.js y TypeScript. Muestra información de la clínica, un catálogo de cinco tratamientos y un formulario de reserva de demostración.

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

## Dos pruebas unitarias

```bash
npm test
```

Vitest ejecuta dos pruebas de funciones puras: validación de RUT y validación de servicio. No necesita navegador ni API. El alcance y los resultados reales están en [docs/PRUEBAS.md](docs/PRUEBAS.md).

Para repetir las pruebas al guardar:

```bash
npm run test:watch
```

## Organización

- `app/`: las cinco páginas y la página 404.
- `components/`: componentes reutilizables; catálogo y formulario guardan sus propios estados con `useState` y consultan la API con `useEffect`.
- `data/`: información de la clínica y función de consulta HTTP.
- `services/`: validaciones independientes de React.
- `models/`: tipos de TypeScript.
- `styles/`: CSS propio y reglas responsivas.
- `api_simulada/`: servidor local y datos de los tratamientos.
- `tests/`: las dos pruebas con Vitest.

## Otras comprobaciones

```bash
npm run typecheck
npm run build
```

Para producción local, mantener la API encendida y ejecutar `npm start` después de compilar. Detener antes el servidor de desarrollo si utiliza el mismo puerto.

## Alcance actual

El formulario valida datos y permite limpiar; no guarda reservas ni envía correos. La API es local y solo permite consultar los tratamientos. Los archivos HTML originales se conservan como referencia.

El cambio actual simplifica las pruebas y reúne la lógica de estado en los componentes. Quedan pendientes, si el equipo decide aplicar el documento de tienda completo, la migración a Vite y JavaScript, Bootstrap, búsqueda, carrito y json-server. No se declara cumplimiento de ese alcance con este cambio. `ERS.docx` corresponde a la versión anterior y requiere actualización antes de presentarlo como documento vigente.
