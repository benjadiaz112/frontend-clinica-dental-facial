# Inicio en React — paso 10

La ruta `/` recupera el contenido útil del `index.html` original y añade un carrusel manual. Los archivos HTML originales se conservan para su ejecución con XAMPP.

## Componentes

| Archivo | Función |
| --- | --- |
| PresentacionInicio.jsx | Nombre, presentación de la clínica, imagen principal y enlace a Reserva. Identifica el proyecto como una clínica ficticia. |
| TratamientosDestacados.jsx | Muestra las tres tarjetas del inicio original con imágenes y un enlace al catálogo. |
| CarruselInicio.jsx | Muestra una imagen a la vez y permite avanzar o retroceder con botones. |
| ConsejoDental.jsx | Conserva el texto y el video educativo del HTML original, con enlace para abrirlo en YouTube. |

`app/page.jsx` reúne los componentes. Los datos son objetos y listas de JavaScript en `data/inicio.js`. Son datos de presentación estáticos; el catálogo consulta por separado la API simulada. No hay CRUD.

Los estilos específicos están en `styles/inicio.css`, usando Flexbox y una media query. Se mantienen los colores y clases compartidos, sin librerías de diseño ni nuevas dependencias.

## Carrusel sencillo

Se usa `useState` para recordar el índice de la imagen visible y dos funciones para cambiarlo. Al llegar al final se vuelve al inicio, y al retroceder desde el inicio se muestra la última imagen. No hay reproducción automática ni temporizadores.

Los controles reutilizan Boton. El indicador anuncia el número y título de la imagen mediante `aria-live`. Con una imagen los controles quedan deshabilitados; sin imágenes no se muestra el carrusel.

## Recursos y enlaces

Se copian las cinco imágenes originales a `public/imagenes/` para servirlas desde Next.js. La carpeta `imagenes/` original permanece intacta. El marcador vacío `public/.gitkeep` se elimina porque ya hay recursos en esa carpeta.

Los enlaces de la portada llevan al formulario implementado en `/reserva` y al catálogo conectado en `/tratamientos`.

El video conserva la dirección original de YouTube. Su reproducción depende de la disponibilidad del servicio; el enlace externo permite intentar abrirlo directamente si el reproductor incrustado no está disponible.

## Pruebas

La suite actual contiene cinco pruebas de funciones puras: nombre, RUT, formatos de RUT, correo y servicio. Inicio y el carrusel se comprueban manualmente; estas cinco pruebas no verifican sus componentes. El alcance está en [PRUEBAS.md](PRUEBAS.md).
