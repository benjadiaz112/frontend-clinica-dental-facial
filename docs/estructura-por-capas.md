# Estructura del proyecto

| Carpeta | Responsabilidad |
| --- | --- |
| `app/` | Páginas de Inicio, Nosotros, Tratamientos, Reserva, Contacto y 404. |
| `components/` | Interfaz, propiedades, eventos y estado de los componentes. |
| `data/` | Información estática y consulta de tratamientos con `fetch`. |
| `models/` | Tipos de datos de TypeScript. |
| `services/` | Funciones puras de validación. |
| `styles/` | Estilos compartidos y reglas responsivas. |
| `api_simulada/` | Datos y servidor local de consulta. |
| `tests/` | Dos pruebas sencillas con Vitest. |

El catálogo y el formulario guardan sus estados con `useState`. Cada uno tiene un `useEffect` para cargar sus servicios al abrirse. La consulta HTTP se mantiene en `data/tratamientos.ts`; las validaciones están en `services/validacionesReserva.ts`.

Los componentes reciben propiedades y funciones para responder a los eventos. No se agregan capas intermedias para compartir el estado del catálogo y el formulario. Los HTML originales se mantienen como referencia.
