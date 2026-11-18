import { validarRut } from "../services/validacionesReserva.js";

QUnit.test("valida un RUT correcto y rechaza un RUT incorrecto o vacío", function (assert) {
  assert.true(validarRut("12.345.678-5"));
  assert.false(validarRut("12.345.678-9"));
  assert.false(validarRut(""));
});

QUnit.test("acepta RUT sin puntos, con K o cero y rechaza puntos mal ubicados", function (assert) {
  assert.true(validarRut("123456785"));
  assert.true(validarRut("6.000.000-k"));
  assert.true(validarRut("10.000.004-0"));
  assert.false(validarRut("12.34.5678-5"));
});
