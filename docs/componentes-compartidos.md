# Componentes comunes

`components/compartidos/` es el modulo comun del proyecto. Reune elementos pequenos que se usan en varias paginas y evita copiar el mismo codigo.

| Archivo | Responsabilidad |
| --- | --- |
| `Encabezado.tsx` | Muestra el nombre de la clinica y el menu. |
| `Menu.tsx` | Crea los enlaces y marca la pagina actual. |
| `PiePagina.tsx` | Muestra el pie y sus enlaces. |
| `Boton.tsx` | Boton reutilizable para formularios y acciones. |
| `Mensaje.tsx` | Muestra mensajes informativos, errores o exitos. |

Los modulos de `components/inicio`, `components/tratamientos` y `components/reserva` contienen solo los componentes de sus propias funcionalidades. No se crean componentes para funcionalidades fuera del alcance.
