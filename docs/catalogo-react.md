# Catálogo de tratamientos

`app/tratamientos/page.jsx` compone la página. `CatalogoTratamientos` guarda tratamientos, carga, error y selección mediante `useState`. Un `useEffect` llama a `consultarTratamientos` de `data/tratamientos.js` y cancela la petición al desmontarse.

La página muestra carga, error, lista vacía o las tarjetas de los cinco tratamientos. `TarjetaTratamiento` recibe el tratamiento, su estado de selección y la función de clic mediante propiedades.

Al seleccionar un tratamiento aparece el enlace `/reserva?tratamiento=<id>`. Se puede cambiar la elección o quitarla. Los precios conservan los textos originales y su carácter referencial.

## Comprobar manualmente

Iniciar `npm run api` y `npm run dev`. Abrir `/tratamientos`, comprobar los cinco nombres y precios, seleccionar una tarjeta, cambiarla, quitar la selección y continuar a Reserva. Detener la API y recargar para revisar el mensaje de error.

Las cinco pruebas automatizadas actuales son de funciones de validación; no prueban este componente.
