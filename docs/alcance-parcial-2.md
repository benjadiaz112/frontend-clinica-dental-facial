# Alcance vigente de Clínica Aura

## Cambio solicitado

Los componentes se convierten a JSX y las validaciones y datos a JavaScript. Se retiran las interfaces de tipos y la configuración anterior. Los alias se conservan mediante `jsconfig.json`.

La suite se reduce a cinco pruebas de lógica pura con Vitest: nombre, RUT, formatos de RUT, correo y servicio disponible. El catálogo y el formulario contienen sus propios estados y la consulta inicial de la API. Se conservan las funciones de validación, las páginas y el flujo de selección y reserva de demostración.

## Tecnología que permanece

React con Next.js y JavaScript/JSX, CSS propio y API simulada local de tratamientos. `useState` mantiene los datos y `useEffect` realiza la consulta al abrir catálogo o reserva.

## Diferencias pendientes respecto de instrucciones_fullstack.md

El documento describe una tienda de videojuegos con React/Vite, JavaScript, Bootstrap, búsqueda y carrito. Esta versión usa JavaScript/JSX y cinco pruebas de validación, con el estado dentro de los componentes. Se conserva Next.js; la migración a Vite y las funciones de búsqueda y carrito requieren otro cambio de alcance. Por eso las cinco pruebas son sobre funciones reales de la clínica, en lugar de filtro y total de una tienda.

## Documentos

[PRUEBAS.md](PRUEBAS.md) explica los cinco casos y sus resultados. `ERS.docx` corresponde a la versión anterior y debe actualizarse si se presenta como documento vigente. Los HTML originales se conservan como referencia.
