# Inicio en React — paso 10

La ruta `/` recupera el contenido útil del `index.html` original y añade un carrusel manual. Los archivos HTML originales se conservan para su ejecución con XAMPP.

## Componentes

| Archivo | Función |
| --- | --- |
| PresentacionInicio.tsx | Nombre, presentación de la clínica, imagen principal y enlace a Reserva. Identifica el proyecto como una clínica ficticia. |
| TratamientosDestacados.tsx | Muestra las tres tarjetas del inicio original con imágenes y un enlace al catálogo. |
| CarruselInicio.tsx | Muestra una imagen a la vez y permite avanzar o retroceder con botones. |
| ConsejoDental.tsx | Conserva el texto y el video educativo del HTML original, con enlace para abrirlo en YouTube. |

`app/page.tsx` reúne los componentes. Los datos están en `data/inicio.ts`, sus tipos en `models/ContenidoInicio.ts` y las funciones que los obtienen en `services/inicioService.ts`. Son datos de presentación estáticos; no reemplazan el futuro modelo de tratamientos ni el CRUD.

Los estilos específicos están en `styles/inicio.css`, usando Flexbox y una media query. Se mantienen los colores y clases compartidos, sin librerías de diseño ni nuevas dependencias.

## Carrusel sencillo

Se usa `useState` para recordar el índice de la imagen visible y dos funciones para cambiarlo. Al llegar al final se vuelve al inicio, y al retroceder desde el inicio se muestra la última imagen. No hay reproducción automática ni temporizadores.

Los controles reutilizan Boton. El indicador anuncia el número y título de la imagen mediante `aria-live`. Con una imagen los controles quedan deshabilitados; sin imágenes no se muestra el carrusel.

## Recursos y enlaces

Se copian las cinco imágenes originales a `public/imagenes/` para servirlas desde Next.js. La carpeta `imagenes/` original permanece intacta. El marcador vacío `public/.gitkeep` se elimina porque ya hay recursos en esa carpeta.

Los enlaces de la portada llevan a `/reserva` y `/tratamientos`. Estas rutas existen, pero sus formularios y catálogo completos se implementarán en los pasos posteriores.

El video conserva la dirección original de YouTube. Su reproducción depende de la disponibilidad del servicio; el enlace externo permite intentar abrirlo directamente si el reproductor incrustado no está disponible.

## Pruebas

Los dos casos de PresentacionInicio se adaptan a su nueva distribución. Se agregan cinco casos del carrusel: avanzar y regresar, volver al inicio, retroceder a la última imagen, lista vacía y una sola imagen. Junto con los tres casos compartidos, la suite contiene diez pruebas; la cobertura de las funcionalidades futuras sigue pendiente.

Karma sirve las imágenes locales mediante una regla sencilla, para que las pruebas del componente real no soliciten recursos inexistentes.
