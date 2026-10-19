# Estructura por capas

El proyecto utiliza un solo repositorio y código simple. El paso 12 acota el alcance a la pauta principal y retira las páginas vacías adicionales.

| Carpeta | Responsabilidad |
| --- | --- |
| app/ | Cinco rutas de la clínica, layout compartido y página 404. |
| components/ | Presentación mediante propiedades y estado cuando corresponde. |
| models/ | Interfaces de información, enlaces, Tratamiento y Reserva. |
| data/ | Información estática y enlaces de navegación. |
| services/ | Obtención de datos y futuras validaciones independientes del DOM. |
| hooks/ | Reservada para coordinar interacciones cuando sea necesario. |
| styles/ | CSS nativo compartido y específico por página. |
| public/ | Las cinco imágenes originales disponibles en Next.js. |
| tests/ | Pruebas Jasmine ejecutadas con Karma. |
| docs/ | Alcance, guías y documentación de pruebas. |

Flujo: la página obtiene datos desde servicios y los entrega a componentes mediante propiedades. Los servicios acceden a data/. Los modelos describen esos datos. No se introducen clases, dependencias ni abstracciones innecesarias.

Las validaciones se escribirán en services/, sin manipular directamente el DOM. El formulario React gestionará sus valores y mensajes con estado. Las interfaces no sustituyen las validaciones.

No se necesita montar una API ni implementar CRUD administrativo para este plan. `api_simulada/.gitkeep` es únicamente un marcador vacío de la preparación anterior.

Los HTML originales, css/, js/ e imagenes/ permanecen disponibles. El [alcance](alcance-parcial-2.md), las [rutas](rutas.md), los [modelos](modelos.md) y los [pasos pendientes](pasos-pendientes.md) describen el estado vigente. CSS nativo sigue siendo una diferencia respecto del requisito explícito de Bootstrap.
