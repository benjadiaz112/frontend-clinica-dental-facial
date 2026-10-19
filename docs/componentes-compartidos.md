# Componentes compartidos — paso 8

Los componentes están en `components/compartidos/`. Se usan funciones, propiedades, condiciones, `map` y eventos sencillos, con CSS nativo y sin dependencias nuevas.

| Archivo | Responsabilidad |
| --- | --- |
| Encabezado.tsx | Muestra el nombre recibido y el menú. El nombre enlaza a Inicio. |
| Menu.tsx | Recibe enlaces y una etiqueta accesible, crea la navegación y marca la página actual. Usa Link y usePathname de Next.js. |
| PiePagina.tsx | Muestra el nombre recibido y la identificación del proyecto académico. |
| Boton.tsx | Recibe texto, tipo, variante secundaria, estado deshabilitado y una función para el clic. Por defecto es de tipo button para no enviar formularios accidentalmente. |
| Mensaje.tsx | Recibe texto y tipo: info, error o exito. Un error usa role="alert"; los demás, role="status". Si el texto está vacío, no muestra nada. |

## Uso actual

`app/layout.tsx` obtiene el nombre desde el servicio de la clínica y muestra Encabezado y PiePagina alrededor de cada página. Incluye un único `main` con id `contenido` y un enlace de teclado para saltar directamente a él, incluso en la página de error. Las páginas deben aportar sus secciones sin agregar otro `main`.

PresentacionInicio utiliza Mensaje para el aviso existente. Boton queda disponible para los próximos formularios; este paso no agrega acciones de negocio ficticias a la portada.

Desde el paso 9, las listas de enlaces están en `data/navegacion.ts`. El encabezado muestra las páginas principales, el pie ofrece enlaces adicionales y la administración comparte su propio menú. Las nuevas páginas usan PaginaEnPreparacion hasta que se migren sus funcionalidades; la [guía de rutas](rutas.md) registra su estado.

## Ejemplos sencillos

```tsx
<Boton texto="Guardar" tipo="submit" />
<Boton texto="Limpiar" tipo="reset" secundario />
<Boton texto="Continuar" alHacerClic={continuar} />
<Mensaje texto="Revisa los datos." tipo="error" />
```

`continuar` representa la función del componente que use el botón. Una función de evento debe utilizarse desde un componente cliente de React, como los futuros formularios.

## Verificación

Se agregan tres casos a Jasmine: clic del botón, botón deshabilitado y mostrar/limpiar un mensaje de error accesible. Junto con los dos casos iniciales, la suite contiene cinco pruebas. Las pruebas finales de todas las funcionalidades continúan pendientes.
