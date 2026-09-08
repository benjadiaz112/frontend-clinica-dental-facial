# Clínica Aura

Proyecto frontend académico de una clínica dental y de armonización facial, desarrollado con HTML5, CSS y JavaScript.

## Funcionalidades

- Navegación entre Inicio, Nosotros, Tratamientos, Mi pedido y Reserva.
- Catálogo generado desde un arreglo JavaScript.
- Imágenes y precios referenciales de tratamientos.
- Carrito con cantidades, subtotales, total y persistencia en `localStorage`.
- Formulario de reserva con validación de nombre, RUT, correo y servicio.
- Registro de usuarios e inicio de sesión básico mediante `localStorage`.
- Validación de RUN, dominios de correo, contraseña, región, comuna y dirección.
- Mensajes e indicadores visuales para campos correctos e incorrectos.
- Video educativo y diseño responsivo mediante CSS externo.

## Ejecutar con XAMPP

1. Copia la carpeta `clinica-dental-combinada` dentro de `C:\xampp\htdocs`.
2. Inicia Apache desde XAMPP.
3. Abre `http://localhost/clinica-dental-combinada/`.

No se necesita MySQL porque los datos del pedido se guardan localmente en el navegador.

## Pruebas rápidas

- En Tratamientos, agrega productos y revisa que el contador cambie.
- Abre Mi pedido y confirma cantidades, subtotales y total.
- Recarga la página para comprobar que el pedido se conserva.
- En Reserva, envía campos vacíos y revisa los mensajes.
- RUT válido de prueba: `12.345.678-5`.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- LocalStorage
- XAMPP
- Git y GitHub
