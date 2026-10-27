# Cómo leer y ejecutar los tests

Desde la carpeta de `package.json`:

```bash
npm install
npm test
```

Vitest busca los cuatro archivos `.test.js` de `tests/` y ejecuta sus cinco bloques `test(...)`. `validarRut.test.js` contiene dos casos; los archivos de nombre, correo y servicio contienen uno cada uno.

## Estructura de un caso

1. Importar `test` y `expect` de Vitest y la función que se va a comprobar.
2. Preparar los datos necesarios.
3. Llamar a la función dentro de `expect(...)`.
4. Comparar con `toBe(true)` o `toBe(false)`.

Cada archivo tiene comentarios en español. Son pruebas de funciones JavaScript: no hace falta iniciar la página ni la API.

`npm run test:watch` repite la ejecución al guardar; se detiene con `Ctrl+C`. Los nombres de los casos y el último resultado real están en [PRUEBAS.md](PRUEBAS.md).
