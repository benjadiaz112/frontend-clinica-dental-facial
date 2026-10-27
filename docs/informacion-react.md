# Nosotros y Contacto — paso 11

`/nosotros` conserva el texto y la imagen de `nosotros.html`, con un enlace a Tratamientos. `/contacto` recupera la ubicación y el teléfono del pie original, indicando que son datos de demostración. No se agregan correos, horarios ni direcciones no proporcionadas.

El archivo original `contacto.html` es un formulario de reserva. En React se mantienen separadas las rutas: Contacto informa y enlaza a `/reserva`; el formulario controlado y sus validaciones están implementados en Reserva. El enlace no registra una solicitud. El HTML y el JavaScript originales siguen disponibles.

## Archivos y responsabilidades

| Archivo | Uso |
| --- | --- |
| app/nosotros/page.jsx y app/contacto/page.jsx | Componen las páginas y conservan sus títulos de pestaña. |
| components/nosotros/InformacionNosotros.jsx | Presenta la descripción, propuesta, imagen y enlace al catálogo. |
| components/contacto/InformacionContacto.jsx | Presenta ubicación, teléfono, aviso de demostración y enlace a Reserva. |
| data/informacion.js | Centraliza los textos originales y datos de ejemplo. |
| data/informacion.js | Contiene la información de las páginas. |
| styles/informacion.css | Distribuye texto e imagen con Flexbox y los apila en móvil. |

Se reutilizan los componentes compartidos del layout y Mensaje. No se agregan dependencias ni estado a páginas estáticas. Las imágenes se sirven desde `public/imagenes/` con texto alternativo y sus dimensiones originales.

## Comprobaciones

Verificación realizada: La suite vigente tiene cinco pruebas de validación; `npm run build` terminaron correctamente. En Edge se comprobaron ambas páginas a 320, 375, 768 y 1280 píxeles: un solo `h1` y un solo `main`, imágenes cargadas con texto alternativo, menú activo y ausencia de desbordamiento horizontal. Los enlaces a Tratamientos y Reserva se abrieron usando Enter; no se registraron errores de JavaScript ni respuestas locales HTTP de error. No se añadieron pruebas unitarias para estos componentes estáticos.
