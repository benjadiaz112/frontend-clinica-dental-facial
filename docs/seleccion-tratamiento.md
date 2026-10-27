# Selección de tratamiento — paso 16

Cada tarjeta tiene un botón para seleccionar su tratamiento. CatalogoTratamientos guarda un único objeto con useState; cambiar de tarjeta reemplaza la elección y Quitar selección vuelve a null. Los botones anuncian el estado con aria-pressed y el mensaje compartido informa el nombre seleccionado.

El enlace Continuar a Reserva solo aparece después de elegir un tratamiento y lleva su identificador en la URL, por ejemplo `/reserva?tratamiento=1`. No se guardan datos personales ni se utiliza almacenamiento local.

Reserva lee el identificador con URLSearchParams y consulta los tratamientos mediante la función consultarTratamientos. Muestra el nombre y precio del tratamiento encontrado. Al recargar Reserva se conserva la referencia en la URL; al volver al catálogo comienza una selección nueva. Un identificador desconocido muestra un error, y si falla la API se informa sin mostrar una selección válida. Sin parámetro se ofrece el enlace al catálogo.

Desde el paso 18, el formulario React integra esta elección y permite cambiar el servicio, validar y limpiar. La selección no envía solicitudes ni reserva horas. No se agrega carrito, totales, administración ni dependencias.

## Archivos

- components/tratamientos/CatalogoTratamientos.jsx: estado, mensaje, cambio, limpieza y enlace a Reserva.
- components/tratamientos/TarjetaTratamiento.jsx: botón con evento y estado recibido por propiedades.
- components/reserva/FormularioReserva.jsx: lectura del identificador, consulta, estado y resumen.
- app/reserva/page.jsx: título, aviso de demostración y selección recibida.
- styles/tratamientos.css: botones y separación del resumen con CSS nativo.
- tests/validarServicio.test.js: validación del servicio mediante una función pura.

Se mantiene la estructura por capas y los datos del catálogo provienen de la API. El formulario y las validaciones ya están integrados; la confirmación es solo de demostración.

## Verificación

Registro manual previo del paso 23: en Edge se verificó selección por teclado, cambio, enlace y recarga en Reserva a 1280, 768, 375 y 320 píxeles sin desbordamiento. También se comprobó quitar selección, entrar sin identificador, consultar un identificador inexistente y manejar la API desconectada. No se registraron errores JavaScript.
