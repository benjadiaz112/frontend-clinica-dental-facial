# Datos utilizados por los componentes

Los datos se representan con objetos y listas normales de JavaScript.

- Los tratamientos provienen de `api_simulada/db.json`. Incluyen identificador, nombre, descripción, imagen, texto alternativo y precio referencial. `precioDesde` admite `null` cuando el precio depende de evaluación; no significa un valor de cero.
- El formulario mantiene nombre, RUT, correo, servicio y comentario en su estado. El RUT se conserva como texto para admitir puntos, guion y K.
- `data/clinica.js`, `data/inicio.js`, `data/informacion.js` y `data/navegacion.js` contienen los textos y enlaces que reciben los componentes mediante propiedades.

Las reglas de nombre, RUT, correo y servicio están en `services/validacionesReserva.js`. Los objetos de datos no validan ni guardan una reserva por sí solos.
