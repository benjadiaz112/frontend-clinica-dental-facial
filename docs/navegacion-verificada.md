# Navegación y página 404

`data/navegacion.js` contiene Inicio, Nosotros, Tratamientos, Reserva y Contacto. El encabezado y el pie reutilizan esa lista. `Menu.jsx` usa `Link` y `usePathname` de Next.js para navegar y marcar la página actual con `aria-current`.

`app/not-found.jsx` muestra una explicación y enlaces de regreso. Se integra con el mismo layout que las páginas existentes.

## Verificación registrada

En la última revisión de JSX, las cinco rutas principales respondieron HTTP 200 y una dirección inexistente respondió HTTP 404. Cada página principal mostró un `main` y un `h1`. El recorrido de selección abrió Reserva con el tratamiento elegido.

## Para volver a comprobar

- Recorrer los enlaces del encabezado y el pie.
- Abrir los enlaces del contenido y comprobar sus destinos.
- Usar Atrás y Adelante del navegador.
- Comprobar con teclado el salto al contenido y los enlaces de regreso de la 404.
- Abrir una dirección inexistente y confirmar la página personalizada.

Las cinco pruebas unitarias vigentes no automatizan estos recorridos. El alcance está en [PRUEBAS.md](PRUEBAS.md).
