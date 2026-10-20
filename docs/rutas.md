# Rutas de Clínica Aura

| Ruta | Estado |
| --- | --- |
| `/` | Inicio migrado con presentación, imágenes, destacados, carrusel y video. |
| `/nosotros` | Información original de la clínica migrada. |
| `/contacto` | Información de demostración y enlace a Reserva. |
| `/tratamientos` | Catálogo conectado a la API local, con carga, error y lista vacía. |
| `/reserva` | Formulario controlado con validaciones, errores y limpieza. Preselecciona desde el parámetro tratamiento y la API. |

Las direcciones inexistentes muestran `app/not-found.tsx`. El layout comparte encabezado, pie y salto al contenido. Menu marca la página activa con `aria-current`.

En el paso 12 se eliminaron las páginas vacías ajenas al plan acotado y sus enlaces. Los HTML originales se conservan. El paso 18 migra el formulario de `contacto.html` a `/reserva`; consultar y validar no registra una reserva real.
