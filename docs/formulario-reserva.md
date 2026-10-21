# Formulario React — paso 18

Reserva recupera los cinco campos del HTML original: nombre, RUT, correo, servicio y comentario opcional. Se mantienen las etiquetas, autocompletado, límites de 80/12/254/500 caracteres, textos e imagen original. No hay nuevas dependencias ni librerías de estilos.

## Responsabilidades

- `app/reserva/page.tsx`: título, aviso de demostración y composición.
- `components/reserva/FormularioReserva.tsx`: campos controlados, errores asociados mediante aria-describedby y aria-invalid, botones y foco en el primer campo incorrecto.
- `hooks/useReserva.ts`: valores, mensajes, selección inicial, validación y limpieza. Utiliza useTratamientos para obtener los servicios de la API.
- `services/validacionesReserva.ts`: reglas independientes de nombre, RUT, correo y servicio. El comentario es opcional y el hook impide aceptar más de 500 caracteres.
- `styles/reserva.css`: distribución con Flexbox y adaptación móvil mediante CSS nativo.
- `tests/FormularioReserva.spec.tsx`: ocho casos con fetch simulado.

La lógica de selección de SeleccionReserva.tsx se integra en useReserva; se retira el componente anterior para evitar dos consultas a la API y estados duplicados.

## Comportamiento

El parámetro tratamiento preselecciona el servicio al recibir el catálogo. Se puede cambiar desde el select. Si el identificador no existe se avisa y se permite elegir otro servicio. Sin parámetro, la lista comienza sin selección.

Validar datos comprueba todos los campos y enfoca el primero incorrecto. Los mensajes aparecen junto a cada campo y se limpian al editarlo; editar también elimina la confirmación anterior. Un resultado válido indica explícitamente que no hubo envío ni reserva real. No se envían ni persisten datos personales.

Limpiar elimina los cinco valores, selección, errores, resumen y confirmación. La URL no cambia; recargar una URL con tratamiento vuelve a preseleccionarlo. Si la API está cargando, falla o no ofrece servicios, el selector y el botón de validación se deshabilitan; Limpiar sigue disponible.

## Verificación realizada

Las pruebas representativas del formulario, TypeScript y compilación se ejecutan correctamente. El caso del formulario comprueba el rechazo de datos incorrectos, la aceptación de datos correctos y la limpieza de valores, selección, errores y resultado.

En Edge se verificaron esos flujos con la API real y respuestas de error simuladas, en anchos 1280, 768, 375 y 320 sin desbordamiento horizontal. Se revisó visualmente la captura móvil. No hubo errores JavaScript ni peticiones POST, PUT, PATCH o DELETE durante la validación. La cobertura porcentual sigue pendiente.
