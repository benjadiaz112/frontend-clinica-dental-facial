# Rutas — paso 9

Next.js crea las rutas a partir de las carpetas y los archivos `page.tsx` dentro de `app/`. Se usan archivos cortos y explícitos; no se agrega otra librería de navegación.

## Rutas estáticas disponibles

| Dirección | Página |
| --- | --- |
| `/` | Inicio |
| `/nosotros` | Nosotros |
| `/tratamientos` | Tratamientos |
| `/reserva` | Reserva |
| `/contacto` | Contacto |
| `/categorias` | Categorías |
| `/ofertas` | Ofertas |
| `/blog` | Blog |
| `/carrito` | Selección de tratamientos |
| `/registro` | Crear cuenta |
| `/iniciar-sesion` | Iniciar sesión |
| `/checkout` | Resumen de solicitud |
| `/solicitud-exitosa` | Confirmación de solicitud |
| `/solicitud-error` | Estado de solicitud |
| `/admin` | Panel de administración |
| `/admin/tratamientos` | Administrar tratamientos |
| `/admin/categorias` | Administrar categorías |
| `/admin/usuarios` | Administrar usuarios |
| `/admin/solicitudes` | Administrar solicitudes |
| `/admin/reportes` | Reportes |
| `/admin/perfil` | Perfil de administración |

Inicio conserva la presentación existente. Las otras veinte páginas muestran su título, descripción, un aviso de disponibilidad futura y un enlace de regreso a Inicio. Sus formularios, datos y operaciones todavía no están implementados.

El detalle de tratamientos por identificador y el detalle de artículos se añadirán al desarrollar esas funcionalidades. Actualmente una dirección de detalle inexistente también muestra la página 404.

## Navegación

- `data/navegacion.ts` contiene las listas de enlaces principales, adicionales y administrativos.
- `models/EnlaceMenu.ts` describe un enlace con texto y ruta.
- El layout principal entrega los enlaces al encabezado y al pie.
- Menu recibe una etiqueta accesible y marca con `aria-current="page"` el enlace que coincide con la dirección actual.
- `app/admin/layout.tsx` comparte la navegación administrativa entre sus siete páginas.
- `app/not-found.tsx` muestra la página 404 y permite volver a Inicio. Conserva el encabezado, pie y enlace de salto al contenido del layout principal.

Las rutas de checkout y resultado ya existen para poder conectarlas al flujo de solicitud más adelante. Visitar esas direcciones no registra solicitudes ni procesa pagos.

## Estado de administración

La administración es una estructura de navegación de demostración, accesible directamente. Todavía no hay autenticación, roles ni operaciones CRUD. Los controles de acceso se implementarán junto con el registro e inicio de sesión; no se debe considerar una zona protegida.

## Archivos y capas

Cada `page.tsx` define un título de pestaña y muestra PaginaEnPreparacion con propiedades simples. Este componente está en `components/compartidos/`. El diseño usa las clases de CSS nativo existentes.

No se modifican las páginas HTML originales ni se incorpora la lógica de los pasos posteriores. La migración funcional empieza con Inicio en el paso 10.
