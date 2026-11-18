# Forma de los datos en JavaScript

La aplicación trabaja con objetos y listas normales de JavaScript. Sus datos se distribuyen así:

- `api_simulada/db.json`: tratamientos con identificador, descripción, imagen y precio referencial.
- `data/clinica.js`: nombre y descripción de la clínica.
- `data/inicio.js`: destacados, diapositivas y video de Inicio.
- `data/informacion.js`: textos de Nosotros y datos ficticios de Contacto.
- `data/navegacion.js`: etiquetas y direcciones del menú.
- `components/reserva/FormularioReserva.jsx`: estado del formulario con `nombre`, `rut`, `correo`, `servicio` y `comentario`.

El RUT se mantiene como texto para conservar puntos, guion y K. Un comentario vacío es válido porque es opcional. `precioDesde` puede ser `null` cuando el tratamiento depende de evaluación.

Los objetos no validan ni guardan una solicitud por sí mismos. El formulario llama a las funciones de `services/validacionesReserva.js` para revisar sus valores.
