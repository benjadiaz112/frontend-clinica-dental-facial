# Clínica Aura

Proyecto frontend académico de una clínica dental y de armonización facial, desarrollado con HTML5, CSS y JavaScript.

## Estructura

```text
clinica-dental-frontend/
├── index.html
├── servicios.html
├── contacto.html
├── css/estilos.css
├── js/script.js
├── imagenes/
└── documentacion/ERS.md
```

## Ejecutar con XAMPP

1. Abre XAMPP e inicia **Apache**.
2. Copia `clinica-dental-frontend` dentro de:

   ```text
   C:\xampp\htdocs
   ```

3. Abre en el navegador:

   ```text
   http://localhost/clinica-dental-frontend/
   ```

No es necesario iniciar MySQL porque el proyecto no utiliza una base de datos.

## Funcionalidades

- Navegación entre Inicio, Servicios y Contacto.
- Información sobre servicios dentales y faciales.
- Imágenes y video educativo.
- Formulario para solicitar una reserva.
- Validación de nombre, RUT, correo y servicio.
- Mensajes y colores para campos correctos e incorrectos.
- Botón para limpiar el formulario.
- Diseño adaptable mediante CSS externo.

## Prueba del formulario

1. Abre **Contacto**.
2. Presiona **Enviar** con los campos vacíos.
3. Revisa los mensajes de error.
4. Completa los datos y selecciona un servicio.
5. Puedes probar con el RUT `12.345.678-5`.

Los datos no se guardan porque el proyecto es solamente frontend.

## Tecnologías

- HTML5
- CSS
- JavaScript
- XAMPP
- Git y GitHub