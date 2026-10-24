# Validaciones de Reserva — paso 17

`services/validacionesReserva.ts` extrae las reglas del formulario original a cuatro funciones que reciben valores y devuelven true o false. No dependen de React, del DOM, de almacenamiento ni de la API.

| Función | Regla |
| --- | --- |
| validarNombre | Recorta espacios exteriores, exige entre 3 y 80 caracteres y permite las letras, tildes, ñ, espacios simples, guiones y apóstrofes del patrón original. |
| validarRut | Conserva los formatos originales y verifica el dígito mediante módulo 11. Acepta K o k y recorta espacios exteriores. |
| validarCorreo | Conserva la comprobación sencilla del original, recorta espacios exteriores y aplica el máximo de 254 caracteres del campo HTML. No verifica la existencia del correo ni implementa todas las reglas posibles de correo electrónico. |
| validarServicio | Comprueba que el nombre no esté vacío y aparezca exactamente en la lista recibida del catálogo. No mantiene una segunda lista fija. |

La validación del RUT comprueba formato y dígito; no acredita identidad ni existencia de una persona. No se añaden restricciones nuevas sobre nombres o servicios.

`tests/ValidacionesReserva.spec.tsx` contiene cuatro casos Jasmine: aceptación y rechazo de nombre, RUT, correo y servicio. Son pruebas representativas, no exhaustivas de todos los límites y formatos posibles. Los datos son ejemplos de prueba y no se consultan servicios externos.

El HTML y js/script.js originales se conservan. Desde el paso 18, useReserva conecta estas funciones al formulario React. No se envían datos ni se registran reservas reales.
