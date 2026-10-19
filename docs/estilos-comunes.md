# Estilos comunes — paso 7

La aplicación usa CSS nativo, sin librerías de estilos ni dependencias adicionales. `styles/globals.css` se importa una vez desde `app/layout.tsx`.

## Base visual

- Turquesa, blanco y texto oscuro, manteniendo la identidad de Clínica Aura.
- El turquesa principal es `#007373`, más oscuro que el anterior para mejorar el contraste con el blanco.
- Los colores se definen en `:root` y se reutilizan con `var(...)`.
- Arial del sistema, sin descargar fuentes.
- Flexbox, tamaños flexibles y una media query a 768 px.
- Foco visible para enlaces, botones y campos al usar el teclado.

## Clases reutilizables

| Clase | Uso |
| --- | --- |
| contenedor | Centra el contenido y limita su ancho a 1000 px. |
| panel | Fondo blanco, espacio interior y bordes redondeados. |
| portada | Separación superior e inferior de la presentación inicial. |
| tarjeta | Bloque visual para los futuros listados. |
| rejilla | Distribuye bloques en columnas; en móvil se apilan. |
| btn | Aspecto común para enlaces que realizan una acción. Los botones también reciben estos estilos. |
| btn-secundario | Variante blanca con borde turquesa; se combina con btn. |
| acciones | Agrupa botones y permite que pasen a otra fila. |
| mensaje | Espaciado y bordes de un mensaje. |
| mensaje-error | Colores de error; se combina con mensaje. |
| mensaje-exito | Colores de éxito; se combina con mensaje. |
| error | Texto de error asociado a un campo. |

Los campos `input`, `select` y `textarea` comparten tipografía, bordes y espaciado. Un campo con `aria-invalid="true"` recibe borde de error. Los botones deshabilitados se distinguen visualmente.

## Aplicación actual

PresentacionInicio utiliza `contenedor panel portada`. Su contenido y funcionamiento siguen siendo los mismos; las demás clases están disponibles para los componentes y formularios de los próximos pasos.

El sitio HTML original conserva `css/estilos.css`. No se modifica ni se carga dentro de Next.js.
