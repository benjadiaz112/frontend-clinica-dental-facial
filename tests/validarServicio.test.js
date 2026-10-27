import { validarServicio } from "../services/validacionesReserva.js";

QUnit.test("acepta un servicio disponible y rechaza uno desconocido o vacío", function (assert) {
  const servicios = ["Limpieza dental", "Ortodoncia"];

  assert.true(validarServicio("Limpieza dental", servicios));
  assert.false(validarServicio("Otro servicio", servicios));
  assert.false(validarServicio("", servicios));
  assert.false(validarServicio("Limpieza dental", []));
});
