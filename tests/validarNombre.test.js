// Comprueba nombres válidos y rechaza números o nombres demasiado cortos.
import { validarNombre } from "../services/validacionesReserva.js";

QUnit.test("acepta un nombre válido y rechaza uno inválido o vacío", function (assert) {
  assert.true(validarNombre("Ana Pérez"));
  assert.true(validarNombre("  Ana Pérez  "));
  assert.false(validarNombre("Ana123"));
  assert.false(validarNombre("An"));
  assert.false(validarNombre(""));
});
