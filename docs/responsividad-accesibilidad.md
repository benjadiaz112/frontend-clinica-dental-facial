# Responsividad y accesibilidad

## Implementación

Las páginas JSX usan CSS propio con contenedores flexibles, Flexbox y media queries. La navegación, tarjetas, imágenes y formulario se apilan o acomodan al ancho disponible.

El layout declara español y tiene un contenido principal con enlace para saltar a él. Las imágenes tienen texto alternativo; el video tiene título; los campos tienen etiquetas y referencias a sus errores. Los controles muestran foco visible y los botones del catálogo comunican la selección con `aria-pressed`.

## Última revisión de la versión JSX

El 26 de octubre de 2026 se revisaron las cinco páginas a 375 y 1280 píxeles: diez combinaciones sin desbordamiento horizontal, con un título principal y un contenido principal por página. Se comprobaron el carrusel y el recorrido de selección, validación y limpieza del formulario. El envío inválido enfocó el primer campo incorrecto.

En ese recorrido no se registraron errores de JavaScript. Esta revisión no constituye una certificación de accesibilidad ni una prueba con lectores de pantalla o con todos los dispositivos.

## Revisión manual recomendada

Comprobar también navegación con Tab y Enter, visibilidad del foco, enlace de salto al contenido, etiquetas y mensajes después de cambiar la interfaz. Las cinco pruebas de QUnit descritas en [PRUEBAS.md](PRUEBAS.md) solo comprueban funciones de validación.
