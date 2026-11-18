# Estilos actuales

La aplicación utiliza CSS propio. `app/layout.jsx` importa `styles/globals.css`, que define colores, tamaños comunes, botones, campos, mensajes y navegación.

## Base

- Colores turquesa, blanco y texto oscuro; las variables están en `:root`.
- Fuente Arial del sistema.
- Contenedores de ancho flexible y máximo de 1000 píxeles.
- Flexbox, `flex-wrap` y media queries de 768 y 480 píxeles en los estilos globales.
- Imágenes limitadas al ancho disponible y reglas de foco visible.

| Clase | Uso |
| --- | --- |
| `contenedor` | Centrar y limitar el ancho. |
| `panel`, `tarjeta` | Bloques blancos con espacio interior y bordes redondeados. |
| `rejilla` | Distribuir tarjetas y apilarlas en móvil. |
| `btn`, `btn-secundario` | Botones y enlaces de acción. |
| `acciones` | Agrupar controles y permitir que se acomoden a otra fila. |
| `mensaje-info`, `mensaje-error`, `mensaje-exito` | Colores según el tipo de aviso. |
| `error` | Texto del error de un campo. |

Las clases `btn` son del proyecto; no corresponden a una instalación de Bootstrap. Los controles con `aria-invalid="true"` reciben un borde de error.

`inicio.css`, `informacion.css`, `tratamientos.css` y `reserva.css` añaden los estilos de cada sección. El sitio original conserva `css/estilos.css`, que no se importa en la aplicación actual.
