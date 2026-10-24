# Plan acotado a la pauta

Completados: paso 12, modelos; paso 13, datos originales; paso 14, API local; paso 15, catálogo conectado; paso 16, selección única y paso del identificador a Reserva. Se conserva el caso de Clínica Aura y la estructura por capas. La API es una decisión de implementación, no una exigencia explícita de la pauta.

Pasos 17 y 18 completados: validaciones independientes del DOM y formulario React con campos controlados, errores, foco y limpieza. La suite reducida cuenta con diez casos representativos. La confirmación no envía datos ni reserva horas.

## Avances completados

Paso 19 completado: navegación de las cinco páginas verificada, pie completo y página 404 con enlaces de regreso. Se comprobaron teclado, historial y respuestas HTTP.

Paso 20 completado: cobertura corregida para medir 29 archivos de aplicación, excluyendo pruebas e incluyendo los módulos no ejecutados. Se mantienen diez pruebas exitosas. Resultados y limitaciones en INFORME-TESTING.md y evidencia en docs/evidencia-cobertura.json.

Paso 21 completado: ERS versión 2 corregido sin caracteres dañados, con títulos, viñetas y tablas revisados. Se contrastaron requisitos, reserva de demostración, diez pruebas y cobertura con el código y la evidencia actuales. Se revisaron visualmente sus tres páginas exportadas desde Word.

Paso 22 completado: se mantienen diez pruebas funcionales, sin selectores de clases CSS ni posiciones fijas de tarjetas. Se revisan errores accesibles, campos por nombre, selección y limpieza después de éxito y error. Se conserva la interfaz y no se agregan dependencias.

Paso 23 completado: cinco páginas revisadas a 320, 375, 768 y 1280 px, sin desbordamiento horizontal. Se verificaron etiquetas, referencias accesibles y salto al contenido. Se diferenció el foco de teclado del tratamiento seleccionado con CSS nativo. Alcance y límites en docs/responsividad-accesibilidad.md.

Paso 24 completado: README, guías, plan e informe de testing armonizados con las cinco rutas, API local, diez pruebas, cobertura y revisión manual. Se retiraron referencias obsoletas a integrantes, módulos y pruebas.

## Pendientes
25. Resolver la diferencia de Bootstrap antes de cambiar estilos: la pauta lo exige y actualmente se utiliza CSS nativo.
26. Verificación final y entrega: pruebas, TypeScript, compilación, copia limpia, ZIP y presentación.

Se retiraron las páginas vacías de administración, usuarios, categorías, ofertas, blog, carrito, checkout y resultados separados. No tenían operaciones implementadas. La pauta menciona una plantilla con carrito, pero no detalla esos módulos para la adaptación a una clínica; la aceptación de esa adaptación corresponde al docente.
