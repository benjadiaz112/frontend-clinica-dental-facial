# Estilos comunes — paso 7

La aplicación usa CSS nativo, sin librerías de estilos ni dependencias adicionales. `styles/globals.css` se importa una vez desde `app/layout.tsx`.

## Base visual

- Turquesa, blanco y texto oscuro, manteniendo la identidad de Clínica Aura.
- El turquesa principal es `#007373`, más oscuro que el anterior para mejorar el contraste con el blanco.
- Los colores se definen en `:root` y se reutilizan con `var(...)`.
- Arial del sistema, sin descargar fuentes.
- Flexbox, tamaños flexibles y media queries a 768 y 480 px en los estilos globales.
- Foco visible para enlaces, botones y campos al usar el teclado.

## Clases reutilizables

| Clase | Uso |
| --- | --- |
| contenedor | Centra el contenido y limita su ancho a 1000 px. |
| panel | Fondo blanco, espacio interior y bordes redondeados. |
| portada | Separación superior e inferior de la presentación inicial. |
| tarjeta | Bloque visual reutilizable para tarjetas. |
| rejilla | Distribuye bloques en columnas; en móvil se apilan. |
| btn | Aspecto común para enlaces que realizan una acción. Los botones también reciben estos estilos. |
| btn-secundario | Variante blanca con borde turquesa; se combina con btn. |
| acciones | Agrupa botones y permite que pasen a otra fila. |
| mensaje | Espaciado y bordes de un mensaje. |
| mensaje-error | Colores de error; se combina con mensaje. |
| mensaje-info | Colores de un aviso informativo; se combina con mensaje. |
| mensaje-exito | Colores de éxito; se combina con mensaje. |
| error | Texto de error asociado a un campo. |

Los campos `input`, `select` y `textarea` comparten tipografía, bordes y espaciado. Un campo con `aria-invalid="true"` recibe borde de error. Los botones deshabilitados se distinguen visualmente.

## Aplicación actual

PresentacionInicio utiliza `contenedor panel portada`. Desde el paso 10, `styles/inicio.css` añade la distribución de la presentación, las imágenes, el carrusel y el video. El paso 11 agrega `styles/informacion.css` para Nosotros y Contacto: texto e imagen en columnas, apilados hasta 768 px. Ambas páginas reutilizan las clases comunes.

El paso 8 añade estilos de encabezado, menú activo, pie y enlace de salto al contenido. El menú se coloca debajo del nombre de la clínica en pantallas pequeñas. Mensaje aplica las clases comunes al aviso de la portada.

El sitio HTML original conserva `css/estilos.css`. No se modifica ni se carga dentro de Next.js.
