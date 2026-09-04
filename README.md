# Clínica Aura

Proyecto frontend académico de una clínica dental y de armonización facial. Está realizado con HTML5, Bootstrap, CSS y JavaScript básico.

## Estructura

```text
clinica-dental-frontend/
├── index.html
├── servicios.html
├── contacto.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
├── imagenes/
└── documentacion/
```

## Cómo ejecutarlo con XAMPP

1. Descarga e instala XAMPP desde su sitio oficial.
2. Abre el **Panel de control de XAMPP**.
3. Presiona **Start** en la fila de **Apache**.
4. Abre la carpeta donde instalaste XAMPP. Normalmente es `C:\xampp`.
5. Entra en la carpeta `htdocs`.
6. Copia la carpeta completa `clinica-dental-frontend` dentro de `htdocs`.
7. Revisa que quede así: `C:\xampp\htdocs\clinica-dental-frontend\index.html`.
8. Abre el navegador y escribe:

   `http://localhost/clinica-dental-frontend/`

9. Para detener el servidor, vuelve al panel de XAMPP y presiona **Stop** en Apache.

### Si no abre

- Comprueba que Apache esté de color verde y diga **Running**.
- Verifica que la carpeta esté dentro de `htdocs` y no dentro de otra carpeta duplicada.
- Si Apache utiliza otro puerto, prueba `http://localhost:8080/clinica-dental-frontend/`.
- No es necesario encender MySQL, porque este proyecto no usa base de datos.
- Mantén conexión a Internet para cargar Bootstrap y el video.

## Prueba rápida del formulario

1. Abre la página **Reserva**.
2. Presiona **Enviar solicitud** con el formulario vacío: deben aparecer mensajes de error.
3. Completa los datos. Puedes usar el RUT de prueba `12.345.678-5`.
4. Selecciona un servicio.
5. Al enviar correctamente aparecerá un mensaje verde. Los datos no se guardan porque el proyecto es solo frontend.

## Relación con la rúbrica

- HTML5 semántico: `header`, `nav`, `main`, `section`, `article`, `aside` y `footer`.
- Navegación: tres páginas HTML interconectadas.
- Contenido: hipervínculos, imágenes locales, botones, video embebido y formulario.
- CSS externo: todas las páginas usan `css/estilos.css` para personalizar colores.
- JavaScript externo: todas las páginas usan `js/script.js`.
- Formulario: etiquetas asociadas, autocompletado, ayudas y mensajes de error personalizados.
- Diseño adaptable: CSS organiza el contenido en computadores y celulares.
- Documentación: ERS y guía de presentación en la carpeta `documentacion`.
