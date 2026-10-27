# Formulario de reserva de demostración

`app/reserva/page.jsx` compone `components/reserva/FormularioReserva.jsx`. El formulario guarda sus valores, errores, resultado, aviso y estado de la API con `useState`. Un `useEffect` carga los servicios y recupera la selección de la URL.

## Campos

| Campo | Comportamiento |
| --- | --- |
| Nombre | Obligatorio, entre 3 y 80 caracteres según el patrón admitido. |
| RUT | Obligatorio, formato admitido y dígito verificador por módulo 11. |
| Correo | Obligatorio, formato básico y máximo de 254 caracteres. |
| Servicio | Obligatorio y perteneciente al catálogo recibido. |
| Comentario | Opcional, máximo de 500 caracteres. |

Los campos son controlados: muestran el valor del estado y lo actualizan al escribir. Las reglas puras están en `services/validacionesReserva.js`.

## Acciones

Validar datos revisa los campos, presenta sus mensajes y enfoca el primero incorrecto. Editar elimina el error de ese campo y el resultado anterior. Limpiar borra valores, errores, selección y resultado.

Mientras se consultan servicios, si ocurre un error o la lista está vacía, el selector y Validar quedan deshabilitados. Limpiar sigue disponible. Un identificador desconocido de la URL permite recuperarse eligiendo otro servicio.

Los mensajes de error están asociados a los controles mediante `aria-describedby` y `aria-invalid`. Un resultado correcto indica que es una demostración: no se envió una solicitud ni se reservó una hora.

Las cinco pruebas de Vitest revisan funciones de validación. La interfaz completa se comprueba aparte en el navegador con la API real.
