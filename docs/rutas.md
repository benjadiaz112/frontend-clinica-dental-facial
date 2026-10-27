# Rutas y páginas

| Dirección | Archivo | Contenido |
| --- | --- | --- |
| `/` | `app/page.jsx` | Inicio, destacados, carrusel y video. |
| `/nosotros` | `app/nosotros/page.jsx` | Presentación de la clínica ficticia. |
| `/contacto` | `app/contacto/page.jsx` | Datos ficticios de referencia y enlace a Reserva. |
| `/tratamientos` | `app/tratamientos/page.jsx` | Catálogo consultado desde la API. |
| `/reserva` | `app/reserva/page.jsx` | Formulario de demostración. |
| Dirección inexistente | `app/not-found.jsx` | Página 404 con enlaces de regreso. |

`app/layout.jsx` comparte encabezado, pie, estilos globales y el enlace para saltar al contenido. `data/navegacion.js` contiene las cinco direcciones del menú.

La selección del catálogo abre `/reserva?tratamiento=<id>`. El parámetro sirve para preseleccionar un servicio; no es una ruta dinámica independiente ni una reserva guardada. Los archivos HTML originales no forman parte de las rutas actuales de Next.js.
