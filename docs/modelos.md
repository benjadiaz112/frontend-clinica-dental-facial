# Modelos — paso 12

- `models/Tratamiento.ts` define identificador, nombre, descripción, imagen, texto alternativo y precio referencial. `precioDesde` admite `null` cuando el original dice «Valor según evaluación»; no se inventa un precio ni se interpreta como cero. `textoPrecio` conserva expresiones como «Evaluación desde $20.000».
- `models/Reserva.ts` define nombre, RUT, correo, servicio y comentario, como en el formulario original. El comentario puede ser una cadena vacía y el RUT es texto para conservar su formato y el dígito K.

Son interfaces simples de TypeScript utilizadas por Tratamientos y Reserva. No validan, envían ni guardan datos; las validaciones se implementan en los servicios y el formulario solo demuestra el resultado. No se crean modelos administrativos ni datos reales de pacientes.
