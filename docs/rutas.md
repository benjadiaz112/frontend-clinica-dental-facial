# Rutas de Clínica Aura

| Ruta | Estado |
| --- | --- |
| `/` | Inicio migrado con presentación, imágenes, destacados, carrusel y video. |
| `/nosotros` | Información original de la clínica migrada. |
| `/contacto` | Información de demostración y enlace a Reserva. |
| `/tratamientos` | Catálogo conectado a la API local, con carga, error y lista vacía. |
| `/reserva` | Pendiente de migrar el formulario original. |

Las direcciones inexistentes muestran `app/not-found.tsx`. El layout comparte encabezado, pie y salto al contenido. Menu marca la página activa con `aria-current`.

En el paso 12 se eliminaron las páginas vacías ajenas al plan acotado y sus enlaces. Los HTML originales se conservan. `contacto.html` contiene la reserva original, que se migrará a `/reserva` en el paso 18 del plan actualizado.
