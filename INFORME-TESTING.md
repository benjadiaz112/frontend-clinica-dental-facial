# Informe de testing

## Objetivo

Comprobar las validaciones de la reserva y los principales flujos del catálogo y
del formulario sin depender de un servidor de API activo.

## Herramientas

- Jasmine para definir las pruebas y las expectativas.
- Karma para ejecutar la suite en Edge Headless.
- Esbuild para transformar TypeScript y JSX.
- `spyOn` de Jasmine para simular `fetch` y las respuestas JSON.

## Mocks utilizados

Las pruebas de catálogo y reserva reemplazan `window.fetch` con `spyOn`. Por
eso `npm test` no necesita ejecutar `npm run api` ni conectarse a
`http://127.0.0.1:3001`.

- La respuesta correcta usa los datos de `api_simulada/db.json` como contenido
  controlado del mock.
- La respuesta vacía usa una lista vacía.
- El error HTTP usa una respuesta con estado 500.
- El JSON se entrega mediante `respuesta.json()` simulada.

La prueba de selección confirma además que el componente intenta consultar la
ruta esperada, pero no realiza una petición real. Las pruebas de validación
ejecutan funciones locales y no hacen solicitudes de red.

## Casos ejecutados

| # | Archivo | Caso | Resultado |
|---:|---|---|---|
| 1 | `tests/ValidacionesReserva.spec.tsx` | Acepta un nombre válido y rechaza uno inválido. | Aprobado |
| 2 | `tests/ValidacionesReserva.spec.tsx` | Acepta un RUT válido y rechaza uno inválido. | Aprobado |
| 3 | `tests/ValidacionesReserva.spec.tsx` | Acepta un correo válido y rechaza uno inválido. | Aprobado |
| 4 | `tests/ValidacionesReserva.spec.tsx` | Acepta un servicio del catálogo y rechaza otro. | Aprobado |
| 5 | `tests/CatalogoTratamientos.spec.tsx` | Carga los cinco tratamientos y muestra sus precios. | Aprobado |
| 6 | `tests/CatalogoTratamientos.spec.tsx` | Informa cuando la API simulada devuelve una lista vacía. | Aprobado |
| 7 | `tests/CatalogoTratamientos.spec.tsx` | Muestra un error ante una respuesta HTTP 500 simulada. | Aprobado |
| 8 | `tests/CatalogoTratamientos.spec.tsx` | Permite seleccionar y cambiar un tratamiento. | Aprobado |
| 9 | `tests/FormularioReserva.spec.tsx` | Rechaza datos incorrectos y acepta datos corregidos. | Aprobado |
| 10 | `tests/FormularioReserva.spec.tsx` | Limpia valores, selección, errores y resultado. | Aprobado |

## Ejecución

Comando ejecutado:

```bash
npm test
```

Resultado:

```text
TOTAL: 10 SUCCESS
```

La suite se ejecutó en Edge Headless sin iniciar la API local. La cobertura
porcentual todavía debe medirse con una herramienta de instrumentación; por
esa razón este informe no inventa un porcentaje.

## Limitaciones

- Los mocks comprueban el comportamiento del frontend, no la disponibilidad de
  un servidor externo.
- La suite no reemplaza una prueba de integración de la API real.
- La medición porcentual de cobertura queda pendiente.
