# Navegación y página 404 — paso 19

El encabezado y el pie permiten abrir Inicio, Nosotros, Tratamientos, Reserva y Contacto. Ambos utilizan la misma lista de data/navegacion.ts, evitando mantener direcciones duplicadas. Menu marca la dirección actual mediante aria-current. El logo lleva a Inicio.

La página 404 conserva encabezado, pie y salto al contenido. Explica que la dirección no existe y ofrece Volver al inicio y Ver tratamientos. No se incorporan rutas o librerías adicionales.

## Archivos modificados

- data/navegacion.ts: el pie reutiliza los cinco enlaces principales.
- components/compartidos/PiePagina.tsx: etiqueta accesible «Navegación del pie».
- app/not-found.tsx: título asociado a la sección, explicación y enlace al catálogo.

## Verificación realizada

Registro manual previo: en Edge con la versión de producción se comprobó:

- Cinco rutas HTTP 200, con un solo main y h1.
- Diez enlaces del encabezado y pie con destino y página activa correctos.
- Enlaces internos del contenido dirigidos a rutas existentes.
- Atrás y adelante del navegador; /nosotros/ redirige a /nosotros.
- El primer Tab muestra el salto al contenido y Enter enfoca main.
- Dos direcciones inexistentes, incluida una anidada, devuelven HTTP 404 y muestran la página personalizada.
- La 404 no marca una página activa, permite regresar a Inicio y al catálogo y no desborda a 1280, 375 y 320 píxeles.
- Sin errores JavaScript registrados.

La revisión global de accesibilidad y responsividad se completó en el [paso 23](responsividad-accesibilidad.md). Las dos pruebas automatizadas actuales y sus límites están en [PRUEBAS.md](PRUEBAS.md).
