# Catálogo de tratamientos

`app/tratamientos/page.jsx` muestra el título y compone `components/tratamientos/CatalogoTratamientos.jsx`.

El catálogo mantiene con `useState` la lista de tratamientos, el estado de carga, el error y el tratamiento seleccionado. Un `useEffect` llama a `consultarTratamientos` de `data/tratamientos.js` al abrirse. `AbortController` permite cancelar la consulta al salir.

Según la respuesta muestra carga, error, lista vacía o tarjetas. `TarjetaTratamiento.jsx` recibe el objeto del tratamiento, si está seleccionado y la función que responde al clic. Muestra nombre, descripción, imagen y texto de precio.

Seleccionar una tarjeta muestra el enlace a Reserva con su identificador. Se puede cambiar o quitar la selección. El detalle del recorrido está en [seleccion-tratamiento.md](seleccion-tratamiento.md).

## Revisarlo

Encender `npm run api` y `npm run dev`, abrir `/tratamientos`, comprobar las cinco tarjetas y sus precios, seleccionar un tratamiento y continuar a Reserva. Con la API apagada, recargar debe mostrar el mensaje de error.

Las cinco pruebas de Vitest comprueban validaciones; no montan ni comprueban este componente.
