// Comprueba que el servicio elegido pertenezca a la lista recibida.
import { test, expect } from "vitest";
import { validarServicio } from "../services/validacionesReserva.js";

// Los servicios son datos de entrada de la función; no se consulta la API.
test("acepta un servicio disponible y rechaza uno desconocido o vacío", function () {
  const servicios = ["Limpieza dental", "Ortodoncia"];

  expect(validarServicio("Limpieza dental", servicios)).toBe(true);
  expect(validarServicio("Otro servicio", servicios)).toBe(false);
  expect(validarServicio("", servicios)).toBe(false);
  expect(validarServicio("Limpieza dental", [])).toBe(false);
});
