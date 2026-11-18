# Cómo leer y ejecutar los tests

Desde la carpeta de `package.json`:

```bash
npm install
npm test
```

QUnit ejecuta los cuatro archivos `.test.js` de `tests/`, que contienen cinco bloques `QUnit.test(...)`. `validarRut.test.js` contiene dos casos; los archivos de nombre, correo y servicio contienen uno cada uno.

## Estructura de un caso

1. Importar la función real que se va a comprobar.
2. Definir el caso con `QUnit.test("descripción", function (assert) { ... })`.
3. Preparar los datos y llamar a la función.
4. Comprobar el resultado con `assert.true(...)` o `assert.false(...)`.

Por ejemplo:

```js
import { validarNombre } from "../services/validacionesReserva.js";

QUnit.test("acepta un nombre válido", function (assert) {
  assert.true(validarNombre("Ana Pérez"));
});
```

QUnit está disponible al ejecutar el comando o al cargar la página de pruebas. Los tests llaman a las validaciones reales; no usan mocks, hooks personalizados ni cobertura.

## Ver los resultados en una página

```bash
npm run test:web
```

Abrir [Pruebas QUnit](http://127.0.0.1:4000/tests/index.html). La pantalla muestra las mismas cinco pruebas y sus comprobaciones. Recargar después de editar. No hace falta iniciar Next.js ni la API.

`npm run test:watch` repite las pruebas en la terminal al guardar. Ambos comandos se detienen con `Ctrl+C`. Los casos y el último resultado están en [PRUEBAS.md](PRUEBAS.md).
