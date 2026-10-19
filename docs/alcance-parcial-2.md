# Alcance de la Evaluación Parcial 2 — Clínica Aura

## Decisión vigente

El usuario limita la entrega a «DSY1104 Evaluación Parcial 2_EE_EP_Estudiante.pdf». Esta decisión reemplaza la ampliación anterior basada en los anexos. Los ejemplos orientan la estructura y la sencillez del código, sin agregar módulos obligatorios.

Se migra el sitio existente de Clínica Aura a React con Next.js y TypeScript, manteniendo la estructura por capas y un solo repositorio. Los modelos del paso 12 describen tratamientos y los campos de la reserva original. Los tipos por sí solos no validan ni guardan información.

## Requisitos y comprobación

| Requisito de la pauta | Aplicación y criterio de aceptación |
| --- | --- |
| Framework JavaScript y estructura funcional, páginas 3 y 6 | React con Next.js; páginas de la clínica navegables, catálogo y reserva completos. Datos, componentes y servicios separados. |
| Propiedades y estados, páginas 3 y 6 | Componentes reciben datos por propiedades; selección, carrusel y formulario gestionan su estado en React. |
| Responsividad con Bootstrap, páginas 3, 4, 6 y 8 | La pauta exige Bootstrap. El usuario mantiene CSS nativo: existe una diferencia pendiente y no se declara cumplimiento literal. |
| Jasmine y Karma, páginas 3 y 7 | Pruebas de lógica, comportamiento y DOM. La rúbrica contempla diez pruebas para el nivel máximo; deben verificar funcionalidades significativas. |
| Proceso de testing, páginas 3 y 7 | Configuración, mocks pertinentes, análisis de resultados y cobertura medida. No se inventarán porcentajes ni resultados. |
| Documentos y entrega, página 4 | ERS actualizado, documento de cobertura, enlace GitHub público y ZIP del frontend. |
| Presentación individual, páginas 4, 8 y 9 | Explicar y demostrar React, propiedades, estados, responsividad, pruebas, mocks y análisis de resultados. |

## Funcionalidades del caso

- Mantener Inicio, Nosotros, Tratamientos, Reserva y Contacto informativo, con navegación y página 404.
- Conservar imágenes, textos, video y precios referenciales del sitio original. Un precio no informado no equivale a cero.
- Mostrar los cinco tratamientos con componentes reutilizables y permitir elegir un servicio para evaluación.
- Migrar nombre, RUT, correo, servicio y comentario a campos controlados; validar nombre, RUT por módulo 11, correo y servicio permitido.
- Mostrar errores asociados y foco en el primer campo inválido; limpiar valores y mensajes. Identificar la confirmación como demostración, sin afirmar envío ni reserva real.
- Verificar responsividad, navegación por teclado, etiquetas y texto alternativo.

## Fuera del plan acotado

No se agregan administración, gestión de usuarios, autenticación, ofertas, blog, reportes, pagos ni CRUD general como requisitos de este PDF. Tampoco se exige una API simulada para mostrar los datos estáticos existentes. Se retiran únicamente sus páginas vacías ya creadas.

La introducción de la pauta menciona una plantilla de tienda con carrito. No se afirma que este documento apruebe automáticamente sustituir todo el flujo de esa plantilla por una reserva clínica: la aceptación del caso personalizado corresponde al docente.

## Estado y cierre

Inicio, Nosotros y Contacto están migrados; Tratamientos y Reserva siguen en preparación. Existen diez pruebas iniciales con Jasmine y Karma, pero faltan pruebas de las funcionalidades pendientes, mocks, cobertura y documentos finales. Los HTML originales permanecen disponibles.

El [plan pendiente](pasos-pendientes.md) se renumera desde el paso 13. La [guía de modelos](modelos.md) y las [rutas](rutas.md) describen el estado del paso 12. Cada avance tendrá un commit descriptivo con el autor solicitado, sin imponer una estrategia de ramas que la pauta no establece.
