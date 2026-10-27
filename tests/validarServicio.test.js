// Comprueba que el servicio elegido pertenezca a la lista recibida.
import { validarServicio } from "../services/validacionesReserva.js";

// Los servicios son datos de entrada de la función; no se consulta la API.
QUnit.test("acepta un servicio disponible y rechaza uno desconocido o vacío", function (assert) {
  const servicios = ["Limpieza dental", "Ortodoncia"];

  assert.true(validarServicio("Limpieza dental", servicios));
  assert.false(validarServicio("Otro servicio", servicios));
  assert.false(validarServicio("", servicios));
  assert.false(validarServicio("Limpieza dental", []));
});
