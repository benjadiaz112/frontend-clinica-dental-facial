# Ejecutar y leer las dos pruebas

Desde la carpeta de `package.json`:

```bash
npm install
npm test
```

`npm test` ejecuta `vitest run` y termina. Para repetir al guardar se usa `npm run test:watch`.

## Archivos

- `tests/validarRut.test.js`: una prueba de RUT correcto, incorrecto y vacío.
- `tests/validarServicio.test.js`: una prueba de pertenencia del servicio a la lista.
- `services/validacionesReserva.ts`: funciones usadas tanto por la aplicación como por los tests.

## Cómo leerlas

`test` nombra el comportamiento. Dentro se preparan datos, se llama a una función y se compara con `expect(...).toBe(true)` o `toBe(false)`. Los dos archivos tienen comentarios en español.

No hace falta iniciar la API para ejecutar estos tests. El resultado real está en [PRUEBAS.md](PRUEBAS.md).
