# Nosotros y Contacto — paso 11

`/nosotros` conserva el texto y la imagen de `nosotros.html`, con un enlace a Tratamientos. `/contacto` recupera la ubicación y el teléfono del pie original, indicando que son datos de demostración. No se agregan correos, horarios ni direcciones no proporcionadas.

El archivo original `contacto.html` es un formulario de reserva. En React se mantienen separadas las rutas: Contacto informa y enlaza a `/reserva`; el formulario controlado y sus validaciones se implementarán en el paso 18 del plan actualizado. El enlace no registra una solicitud. El HTML y el JavaScript originales siguen disponibles.

## Archivos y responsabilidades

| Archivo | Uso |
| --- | --- |
| app/nosotros/page.tsx y app/contacto/page.tsx | Componen las páginas y conservan sus títulos de pestaña. |
| components/nosotros/InformacionNosotros.tsx | Presenta la descripción, propuesta, imagen y enlace al catálogo. |
| components/contacto/InformacionContacto.tsx | Presenta ubicación, teléfono, aviso de demostración y enlace a Reserva. |
| models/ContenidoInformativo.ts | Define las propiedades de los datos informativos. |
| data/informacion.ts | Centraliza los textos originales y datos de ejemplo. |
| services/informacionService.ts | Obtiene la información para las páginas. |
| styles/informacion.css | Distribuye texto e imagen con Flexbox y los apila en móvil. |

Se reutilizan los componentes compartidos del layout y Mensaje. No se agregan dependencias ni estado a páginas estáticas. Las imágenes se sirven desde `public/imagenes/` con texto alternativo y sus dimensiones originales.

## Comprobaciones

Verificación realizada: `npm test` pasó sus diez casos existentes; `npm run build` y `npm run typecheck` terminaron correctamente. En Edge se comprobaron ambas páginas a 320, 375, 768 y 1280 píxeles: un solo `h1` y un solo `main`, imágenes cargadas con texto alternativo, menú activo y ausencia de desbordamiento horizontal. Los enlaces a Tratamientos y Reserva se abrieron usando Enter; no se registraron errores de JavaScript ni respuestas locales HTTP de error. No se añadieron pruebas unitarias para estos componentes estáticos.
