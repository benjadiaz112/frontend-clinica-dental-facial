# Página de Inicio

`app/page.jsx` reúne cuatro componentes JSX. Los textos y listas están en `data/clinica.js` y `data/inicio.js`.

| Componente | Contenido |
| --- | --- |
| `PresentacionInicio.jsx` | Nombre de la clínica, descripción, imagen y enlace a Reserva. |
| `TratamientosDestacados.jsx` | Tres tarjetas informativas y enlace al catálogo. |
| `CarruselInicio.jsx` | Galería manual con botones Anterior y Siguiente. |
| `ConsejoDental.jsx` | Texto y video educativo con enlace a YouTube. |

Los componentes reciben datos por propiedades. El carrusel usa `useState` para recordar la diapositiva actual: al avanzar desde la última vuelve a la primera y al retroceder desde la primera muestra la última. Con una sola diapositiva bloquea los controles; sin diapositivas no se muestra.

`styles/inicio.css` adapta imágenes, destacados y video a distintos anchos. Las imágenes están en `public/imagenes/`. La reproducción del video depende del servicio externo.

Las cinco pruebas unitarias actuales son de validación; Inicio y el carrusel se comprueban en el navegador. Los HTML originales se conservan como referencia, pero la aplicación se inicia con Next.js.
