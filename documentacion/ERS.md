# ERS - Clínica Aura

## 1. Introducción

### 1.1 Propósito

Este documento describe la primera versión del sitio web de Clínica Aura, una clínica ficticia dedicada a la salud dental y la armonización facial.

### 1.2 Alcance

El sitio permite conocer la clínica, revisar tratamientos y enviar una solicitud de reserva. En esta versión los datos no se guardan en una base de datos.

### 1.3 Público objetivo

Personas mayores de edad que buscan información básica sobre servicios dentales o faciales y desean solicitar una evaluación.

## 2. Requerimientos funcionales

| Código | Requerimiento |
|---|---|
| RF-01 | El usuario podrá navegar entre Inicio, Servicios y Reserva. |
| RF-02 | El usuario podrá revisar tratamientos dentales, estéticos y faciales. |
| RF-03 | El usuario podrá ver imágenes relacionadas con los servicios. |
| RF-04 | El usuario podrá reproducir un video educativo desde la página de inicio. |
| RF-05 | El usuario podrá completar un formulario de reserva. |
| RF-06 | JavaScript validará nombre, RUT, correo y servicio. |
| RF-07 | El sistema mostrará mensajes específicos junto a cada campo incorrecto. |
| RF-08 | El botón Limpiar eliminará los datos y mensajes del formulario. |

## 3. Requerimientos no funcionales

| Código | Requerimiento |
|---|---|
| RNF-01 | El sitio utilizará HTML5 semántico. |
| RNF-02 | Los estilos estarán en una hoja CSS externa. |
| RNF-03 | La programación estará en un archivo JavaScript externo. |
| RNF-04 | El diseño se adaptará a computadores, tablets y celulares. |
| RNF-05 | Las imágenes tendrán texto alternativo y el formulario tendrá etiquetas asociadas. |
| RNF-06 | El proyecto podrá ejecutarse localmente mediante Apache en XAMPP. |

## 4. Herramientas y tecnologías

- Visual Studio Code para editar el proyecto.
- HTML5 para la estructura y el contenido.
- Bootstrap 5 para columnas, tarjetas, botones y formularios adaptables.
- CSS3 externo para personalizar los colores del sitio.
- JavaScript para interacción y validación.
- XAMPP/Apache para ejecutar el sitio en `localhost`.
- Git y GitHub para control de versiones y trabajo colaborativo.

## 5. Propuesta de solución

Se propone una interfaz limpia en tonos azul y turquesa, asociados a salud y confianza. La información se divide en tres páginas para facilitar la navegación y mantener el código ordenado. La reserva funciona como demostración frontend y confirma los datos solamente cuando superan todas las validaciones.

## 6. Restricciones

- El sitio no almacena datos.
- El formulario no envía correos ni confirma horas reales.
- Los precios mostrados son referenciales y corresponden a una clínica ficticia.
- El video requiere conexión a Internet para reproducirse.

## 7. Mejoras futuras

- Agregar una base de datos para almacenar reservas.
- Permitir inicio de sesión de pacientes.
- Mostrar horas disponibles en tiempo real.
- Enviar confirmaciones por correo.
- Incorporar un panel de administración.
