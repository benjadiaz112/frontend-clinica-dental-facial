# Formulario de reserva

`components/reserva/FormularioReserva.tsx` contiene sus estados, la consulta de servicios y las acciones de cambiar, validar y limpiar. Utiliza `useState` y un `useEffect` para la carga inicial. Las reglas independientes de React permanecen en `services/validacionesReserva.ts`.

## Comportamiento

El formulario conserva nombre, RUT, correo, servicio y comentario opcional. El parámetro `tratamiento` de la URL preselecciona un servicio al recibir la lista. Un identificador inexistente muestra un aviso y permite elegir otro servicio.

Validar revisa los campos y enfoca el primero incorrecto. Corregir un campo elimina su error y el resultado anterior. Limpiar borra los datos, errores, selección y resultado. Durante la carga, ante un error o sin servicios, el selector y el botón Validar quedan bloqueados; Limpiar sigue disponible.

Un resultado válido indica que es una demostración: no se guardó una reserva ni se envió una solicitud.

## Verificación

Las dos pruebas actuales de Vitest comprueban únicamente RUT y servicio. Para comprobar el formulario completo se inicia la API real y se revisan datos vacíos, datos correctos, un RUT incorrecto, corrección, limpieza y selección desde el catálogo.
