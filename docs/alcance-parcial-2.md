# Alcance vigente de Clínica Aura

## Cambio solicitado

La suite se reduce a cinco pruebas de lógica pura con Vitest: nombre, RUT, formatos de RUT, correo y servicio disponible. El catálogo y el formulario contienen sus propios estados y la consulta inicial de la API. Se conservan las funciones de validación, las páginas y el flujo de selección y reserva de demostración.

## Tecnología que permanece

React con Next.js y TypeScript, CSS propio y API simulada local de tratamientos. `useState` mantiene los datos y `useEffect` realiza la consulta al abrir catálogo o reserva.

## Diferencias pendientes respecto de instrucciones_fullstack.md

El documento describe una tienda de videojuegos con React/Vite, JavaScript, Bootstrap, búsqueda y carrito. Esta modificación solo cambia las pruebas y la organización del estado de la clínica. No migra automáticamente la aplicación ni agrega un carrito o un filtro inexistentes. Por eso las cinco pruebas son sobre funciones reales de la clínica, en lugar de filtro y total de una tienda.

## Documentos

[PRUEBAS.md](PRUEBAS.md) explica los cinco casos y sus resultados. `ERS.docx` corresponde a la versión anterior y debe actualizarse si se presenta como documento vigente. Los HTML originales se conservan como referencia.
