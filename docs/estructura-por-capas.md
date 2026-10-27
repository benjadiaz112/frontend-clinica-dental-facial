# Estructura actual del proyecto

| Carpeta o archivo | Responsabilidad |
| --- | --- |
| `app/` | Páginas JSX y layout compartido de Next.js. |
| `components/` | Componentes JSX, sus propiedades, eventos y estados. |
| `data/` | Objetos de información y función de consulta HTTP en JavaScript. |
| `services/` | Funciones puras de validación en JavaScript. |
| `styles/` | CSS de las páginas y estilos comunes. |
| `api_simulada/` | Servidor Node y datos de los tratamientos. |
| `tests/` | Cinco pruebas de Vitest en cuatro archivos `.test.js`. |
| `public/imagenes/` | Imágenes servidas desde `/imagenes/`. |
| `docs/` | Explicaciones y resultados de verificación. |
| `jsconfig.json` | Alias de importación `@/` hacia la raíz. |
| `next.config.mjs` | Configuración de Next.js escrita en JavaScript. |
| `package.json` | Dependencias, requisitos de Node y comandos disponibles. |

`app/` compone cada página con componentes. El catálogo y el formulario guardan sus estados con `useState`; cada uno consulta la API al abrirse mediante `useEffect` y cancela la petición al salir. La llamada `fetch` está en `data/tratamientos.js`; las reglas del formulario están en `services/validacionesReserva.js`.

`Encabezado`, `Menu`, `PiePagina`, `Boton` y `Mensaje` se reutilizan por propiedades. Los archivos del sitio HTML original se mantienen como referencia. `node_modules/` y `.next/` se generan localmente y están excluidos de Git.
