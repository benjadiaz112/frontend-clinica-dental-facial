# Alcance actual de Clínica Aura

## Implementado

- React con Next.js y componentes JSX.
- Datos y validaciones en JavaScript; alias de importación en `jsconfig.json`.
- Cinco páginas y 404, con encabezado y pie compartidos.
- Catálogo desde una API local mediante `fetch`.
- Selección de tratamiento y formulario de demostración con validación y limpieza.
- Estado dentro de los componentes mediante `useState` y carga inicial con `useEffect`.
- CSS propio responsivo.
- Cinco pruebas unitarias con QUnit, por decisión del equipo.

## Límites

El formulario no guarda solicitudes ni confirma horas. La API permite consultar tratamientos y está preparada para uso en el mismo equipo. Los datos de la clínica son ficticios.

El documento externo `instrucciones_fullstack.md` describe una tienda con Vite, Bootstrap, búsqueda, carrito y json-server, y menciona dos pruebas. Esos requisitos no describen por completo esta versión: el proyecto actual conserva Next.js, la clínica, su API propia y cinco pruebas de validación. La documentación refleja el código existente y no afirma que esas diferencias estén resueltas.

`ERS.docx` está actualizado al 27 de octubre de 2026 y describe esta versión del proyecto. Los pendientes están en [pasos-pendientes.md](pasos-pendientes.md).
