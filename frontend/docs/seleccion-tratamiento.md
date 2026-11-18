# Selección de un tratamiento

`CatalogoTratamientos.jsx` guarda una sola selección con `useState`. Al pulsar otra tarjeta reemplaza el tratamiento elegido. Quitar selección vuelve a dejarlo vacío. Los botones comunican el estado mediante `aria-pressed`.

El enlace Continuar a Reserva aparece después de elegir y lleva una dirección como `/reserva?tratamiento=1`. No se utiliza almacenamiento local para conservar esa elección.

`FormularioReserva.jsx` lee el identificador con `URLSearchParams` cuando recibe los servicios de la API. Si existe, preselecciona su nombre y muestra su texto de precio. Si no existe, muestra un aviso y permite escoger otro servicio.

El usuario puede cambiar la selección desde el formulario. Limpiar elimina los campos y el resumen, pero mantiene la URL; recargar vuelve a procesar su parámetro. Volver al catálogo inicia una selección nueva.

## Archivos

- `components/tratamientos/CatalogoTratamientos.jsx`: selección y enlace.
- `components/tratamientos/TarjetaTratamiento.jsx`: presentación y clic recibido por propiedades.
- `components/reserva/FormularioReserva.jsx`: consulta, preselección, aviso y limpieza.
- `data/tratamientos.js`: consulta de datos.

Las cinco pruebas unitarias actuales no comprueban este recorrido completo. Se revisa en el navegador con la API real; elegir y validar no guarda una reserva.
