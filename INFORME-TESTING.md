# Informe de testing de Clínica Aura

La aplicación utiliza QUnit para comprobar funciones puras de `services/validacionesReserva.js`. La suite tiene cinco casos en cuatro archivos JavaScript.

```bash
npm test
```

Para ver esos mismos casos en una página, ejecutar `npm run test:web` y abrir [Pruebas QUnit](http://127.0.0.1:4000/tests/index.html). Se verifican nombre, dígito del RUT, formatos del RUT, correo y servicio disponible. No es necesario iniciar la API ni el frontend para ejecutar estas funciones.

La última ejecución verificada del 26 de octubre de 2026 terminó con cinco pruebas exitosas y cero fallidas. La compilación de producción también terminó correctamente. Los casos, la salida del comando y los límites están en [docs/PRUEBAS.md](docs/PRUEBAS.md).

Las revisiones del navegador con la API real complementan estas pruebas: comprueban la carga de la página, selección, formulario, limpieza y manejo de la API apagada. No se presentan como casos adicionales de QUnit ni como una medición porcentual del código.
