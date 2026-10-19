# Alcance de la Evaluación Parcial 2 — Clínica Aura

Fecha: 19 de octubre de 2026.

## Objetivo y estado

Migrar el frontend existente de Clínica Aura a React, con diseño responsivo mediante Bootstrap, separación por capas y pruebas con Jasmine y Karma. Adaptar el catálogo y el carrito del anexo a una selección de tratamientos para solicitar una evaluación.

Este documento completa la definición de alcance y registra la preparación de Git. Las funcionalidades de la nueva entrega descritas abajo están planificadas: este cambio no las implementa ni certifica que sus pruebas estén aprobadas.

## Fuentes y decisiones

| Fuente revisada | Qué aporta | Decisión para Clínica Aura |
| --- | --- | --- |
| Pauta DSY1104, Evaluación Parcial 2, páginas 3–4 y 6–9 | React, propiedades y estados, Bootstrap, Jasmine y Karma, DOM, mocks, resultados y cobertura; ERS e informe de testing | Son requisitos de esta entrega. La rúbrica contempla 10 pruebas para el nivel máximo de ese indicador. |
| ERS.docx del repositorio, versión 1 | RF-01 a RF-08, RNF-01 a RNF-08, cuatro páginas, validaciones y restricciones de la clínica | Mantener la funcionalidad existente y actualizar posteriormente el ERS para reflejar React, la API simulada y las pruebas. |
| Anexo 3, Base HTML, carpeta Tienda | Navegación, Bootstrap, catálogo, detalle, búsqueda, carrito y otras pantallas de ejemplo | Adaptar la estructura pública al caso de la clínica. Las pantallas de usuarios y administración son ampliaciones fuera de este alcance. |
| mi-app.rar | Ejemplo de Next.js con React, componentes, estado, filtros y consumo de datos | Usar como referencia para la migración; verificar compatibilidad de dependencias antes de instalarlas. |
| api_simulada.rar | Datos de productos y dependencia json-server | Adaptar los datos a tratamientos ficticios y documentar cómo iniciar la API local. |
| patenteTestTerminado.zip y PagoEstacionamiento (1).zip | Separación entre lógica e interfaz y casos de prueba con QUnit | Reutilizar el enfoque preparar–ejecutar–comprobar; usar Jasmine y Karma según la pauta. |

Los ejemplos contienen ejercicios y funciones incompletas: no se consideran funcionalidades terminadas ni instrucciones para implementar estacionamientos o patentes en la clínica. La pauta se utiliza como criterio académico; el anexo se adapta al caso existente.

## Punto de partida verificado

- Páginas actuales: Inicio, Nosotros, Tratamientos y Reserva.
- HTML, CSS y JavaScript sin framework ni configuración de pruebas.
- Validación de nombre, RUT, correo y servicio concentrada en `js/script.js`, junto con interacción con el DOM.
- El formulario muestra una confirmación visual; no envía correos ni registra una hora real.
- El ERS actual no requiere base de datos. La API nueva será una simulación académica, sin datos reales de pacientes.

## Funcionalidades y criterios de aceptación

Los identificadores ALC complementan los requisitos del ERS; no los reemplazan.

| ID | Funcionalidad y relación con las fuentes | Criterio para aceptarla |
| --- | --- | --- |
| ALC-01 | Navegación React: ERS RF-01 y pauta | Inicio, Nosotros, Tratamientos y Reserva se abren mediante rutas; encabezado y pie son compartidos; una ruta inexistente muestra una página adecuada. |
| ALC-02 | Inicio y Nosotros: ERS RF-04 y anexo | Mantienen información de la clínica, imágenes con texto alternativo y video educativo; el carrusel adaptado permite cambiar de diapositiva. |
| ALC-03 | Catálogo: ERS RF-02 y RF-03 | Las tarjetas reciben datos mediante propiedades y muestran nombre, categoría, descripción, imagen y precio referencial en pesos chilenos. |
| ALC-04 | API simulada: ejemplo mi-app y api_simulada | El catálogo carga tratamientos ficticios desde la API mediante un repositorio y muestra estados de carga, error y respuesta vacía. |
| ALC-05 | Búsqueda y categorías: anexo y mi-app | El estado de React controla ambos filtros; se combinan correctamente y se informa cuando no hay coincidencias. |
| ALC-06 | Detalle: anexo | Cada tratamiento tiene una ruta por identificador y una acción para solicitar evaluación; un identificador desconocido se maneja sin bloquear la aplicación. |
| ALC-07 | Selección de tratamientos: adaptación del carrito | Se puede agregar un tratamiento, quitarlo y vaciar la selección. No se duplican tratamientos: cada uno representa una evaluación solicitada. El resumen calcula la suma de precios referenciales numéricos, sin presentarla como presupuesto definitivo. |
| ALC-08 | Persistencia de la selección: anexo | La selección se conserva al recargar mediante almacenamiento local; se manejan datos ausentes o inválidos. No se persisten datos personales del formulario. |
| ALC-09 | Formulario: ERS RF-05 y RF-06 | Nombre, RUT, correo, servicio y comentario son campos controlados. Los campos obligatorios y reglas existentes se validan antes de aceptar la solicitud. El comentario sigue siendo opcional y tiene límite de 500 caracteres. |
| ALC-10 | Validaciones: ERS RF-06 y ejemplos | RUT por módulo 11, nombre, correo y pertenencia del servicio al catálogo se comprueban mediante funciones independientes del DOM, con casos válidos, inválidos y límites documentados. |
| ALC-11 | Mensajes y limpieza: ERS RF-07 y RF-08 | Los errores aparecen junto al campo correspondiente; limpiar elimina valores, mensajes e indicadores. La confirmación identifica el flujo como demostración y no afirma un envío real. |
| ALC-12 | Responsividad y accesibilidad: ERS RNF-01, RNF-04, RNF-05 y RNF-07; pauta | Se utiliza Bootstrap para distribución y adaptación. Menú, tarjetas y formulario funcionan a 375, 768 y 1280 px sin desbordamiento horizontal; existen etiquetas, foco visible y navegación por teclado. |

## Capas y reglas de implementación

Base propuesta: Next.js con React y TypeScript, siguiendo el ejemplo recibido, con Bootstrap para la presentación.

| Carpeta | Responsabilidad |
| --- | --- |
| app/ | Rutas, páginas y composición general. |
| components/ | Componentes visuales reutilizables y propiedades. |
| hooks/ | Estado, eventos y coordinación de la interfaz. |
| models/ | Tipos de tratamientos, selección y solicitud. |
| services/ | Validaciones, filtros y cálculos independientes del DOM. |
| repositories/ | Acceso a API y almacenamiento local. |
| tests/ | Pruebas Jasmine ejecutadas con Karma. |
| api_simulada/ | Datos ficticios y configuración del servidor local. |
| public/ | Imágenes y recursos estáticos. |
| docs/ | Alcance, trazabilidad y documentación de testing. |

Los componentes delegan las reglas en servicios y el acceso a datos en repositorios, coordinados mediante hooks cuando corresponda. No se copiará la manipulación imperativa del DOM del sitio anterior dentro de los componentes React.

## Testing y criterios de cierre

Antes de migrar las funcionalidades, debe ejecutarse una prueba mínima de React/TSX con Jasmine y Karma para verificar la configuración.

La suite tendrá al menos 10 pruebas significativas, cubriendo lógica y comportamiento de componentes. Debe comprobar RUT válido e inválido, campos obligatorios, búsqueda y filtros, agregar/quitar tratamientos, total, mensajes y limpieza. Se añadirán casos para estados de carga, respuesta vacía y error de API, y recuperación de almacenamiento inválido. No se fijará el número en 10 si quedan comportamientos principales sin verificar.

Se utilizarán mocks o spies de API y almacenamiento para evitar depender de servidores externos en las pruebas. El informe relacionará requisito, caso, datos, resultado esperado, resultado obtenido y evidencia de ejecución; también registrará cobertura real de líneas, funciones y ramas, fallos corregidos y exclusiones justificadas. La pauta revisada no fija un porcentaje mínimo de cobertura: no se declararán porcentajes sin medirlos.

Para cerrar la entrega deben pasar las pruebas, el análisis estático configurado y la compilación. Se comprobará además la navegación, la adaptación visual y la ejecución desde una copia limpia siguiendo el README.

## Límites y entregables

Fuera del alcance: autenticación real, registro de pacientes, panel administrativo, pagos, correos, agenda con disponibilidad real y base de datos de producción. Las cuentas y pantallas administrativas del anexo no se incorporan automáticamente como requisitos. Los precios seguirán siendo referenciales y el video requerirá conexión a Internet.

Entregables finales: repositorio público actualizado, ZIP del frontend sin dependencias ni archivos generados, ERS actualizado y documento de cobertura de testing. La presentación demostrará componentes, propiedades, estados, Bootstrap, ejecución de pruebas, mocks y análisis de resultados.

## Preparación de Git — paso 2

- Repositorio: https://github.com/benjadiaz112/frontend-clinica-dental-facial.git
- La carpeta descargada no contenía `.git`. Se compararon mediante hashes Git los 14 archivos originales con `main`: todos coincidían.
- Se recuperó el historial remoto y se vinculó la rama local `main` con `origin/main`, partiendo del commit `be981da` (`añadir miembros del grupo`), sin reemplazar los archivos de trabajo.
- Se configuró localmente el autor solicitado: `benjadiaz112 <diazbenja1514@gmail.com>`.
- El archivo local `configuracion-autores-git.txt` se conserva fuera de este commit, dedicado al alcance. No se modifica la aplicación en estos dos pasos.
- La pauta no exige una estrategia de ramas ni una cantidad de commits. Los avances se guardarán con commits descriptivos conforme a lo solicitado, conservando el historial y sin push forzado.

Este documento complementa el ERS versión 1. La actualización del propio ERS y del informe de testing se realizará cuando se implementen y verifiquen los cambios correspondientes.
