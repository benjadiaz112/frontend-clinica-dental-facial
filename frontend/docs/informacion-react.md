# Nosotros y Contacto

`app/nosotros/page.jsx` y `app/contacto/page.jsx` componen las páginas informativas. Sus datos vienen de objetos de JavaScript en `data/informacion.js`.

| Archivo | Responsabilidad |
| --- | --- |
| `components/nosotros/InformacionNosotros.jsx` | Descripción, propuesta de la clínica, imagen y enlace al catálogo. |
| `components/contacto/InformacionContacto.jsx` | Ubicación y teléfono ficticios, aviso de demostración y enlace a Reserva. |
| `styles/informacion.css` | Distribución de texto e imagen, con adaptación móvil. |

Son componentes que reciben información por propiedades. El encabezado y el pie se comparten mediante `app/layout.jsx`. Contacto presenta información; el formulario está en la ruta separada `/reserva`.

Para revisarlas, iniciar la aplicación, abrir ambas rutas y comprobar título, texto, imagen y enlaces en móvil y escritorio. Las cinco pruebas unitarias actuales no comprueban estas páginas.
