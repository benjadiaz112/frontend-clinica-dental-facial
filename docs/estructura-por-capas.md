# Estructura simple por modulos

El proyecto se divide por funcionalidades, como pequenos paquetes de codigo. Cada carpeta contiene solo lo necesario para esa parte del sitio.

| Carpeta | Responsabilidad |
| --- | --- |
| `app/` | Rutas de Inicio, Nosotros, Tratamientos, Reserva, Contacto y 404. |
| `components/compartidos/` | Menu, encabezado, pie, botones y mensajes reutilizables. |
| `components/inicio/` | Componentes de la pagina principal. |
| `components/tratamientos/` | Catalogo y tarjetas de tratamientos. |
| `components/reserva/` | Formulario de reserva. |
| `components/nosotros/` y `components/contacto/` | Informacion de cada pagina. |
| `data/` | Informacion estatica y consulta de la API simulada. |
| `models/` | Tipos de datos. |
| `hooks/` | Estado y efectos del catalogo y formulario. |
| `services/` | Validaciones independientes del DOM. |
| `styles/` | CSS nativo compartido y especifico. |
| `tests/` | Diez pruebas Jasmine ejecutadas con Karma. |

Cada pagina obtiene datos simples desde `data/` y los entrega a sus componentes mediante propiedades. No se usan clases, dependencias nuevas ni capas que solo repitan funciones.

`api_simulada/` contiene `db.json` y un servidor JavaScript. `data/tratamientos.ts` consulta esa API y `hooks/useTratamientos.ts` gestiona carga, datos y errores. No se agrega CRUD administrativo.

La carpeta `services/` se mantiene solo para las reglas de validacion de la reserva, porque esas funciones no dependen de React ni del DOM.

Los archivos HTML, CSS y JavaScript originales permanecen disponibles. CSS nativo sigue siendo una diferencia respecto del requisito explicito de Bootstrap.
