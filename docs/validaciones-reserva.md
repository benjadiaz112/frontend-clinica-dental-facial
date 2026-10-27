# Validaciones del formulario

`services/validacionesReserva.js` exporta cuatro funciones de JavaScript que reciben valores y devuelven `true` o `false`. No necesitan React, DOM ni API.

| Función | Qué revisa |
| --- | --- |
| `validarNombre(nombre)` | Espacios exteriores, largo de 3 a 80 caracteres y patrón de letras, tildes, ñ, espacios, guiones y apóstrofes. |
| `validarRut(rut)` | Formatos admitidos y dígito verificador mediante módulo 11; admite K minúscula y espacios exteriores. |
| `validarCorreo(correo)` | Patrón básico de correo y máximo de 254 caracteres después de recortar espacios. |
| `validarServicio(servicio, serviciosPermitidos)` | Valor no vacío presente en la lista recibida. |

La comprobación del RUT no acredita identidad. El formato del correo no comprueba que esa dirección exista. La lista de servicios viene del catálogo al utilizar el formulario.

`FormularioReserva.jsx` llama a estas funciones y añade el mensaje correspondiente al campo. El límite del comentario se comprueba dentro de ese componente.

Vitest tiene cinco casos: nombre, dígito de RUT, formatos de RUT, correo y servicio. Los archivos y resultados se describen en [PRUEBAS.md](PRUEBAS.md).
