// Comprueba el formato del correo sin consultar ningún servicio externo.
import { validarCorreo } from "../services/validacionesReserva.js";

QUnit.test("acepta un correo válido y rechaza formatos incorrectos", function (assert) {
  assert.true(validarCorreo("ana@ejemplo.cl"));
  assert.true(validarCorreo(" ana@ejemplo.cl "));
  assert.false(validarCorreo("ana@ejemplo"));
  assert.false(validarCorreo("ana@@ejemplo.cl"));
  assert.false(validarCorreo(""));
});
