// Comprueba el formato del correo sin consultar ningún servicio externo.
import { test, expect } from "vitest";
import { validarCorreo } from "../services/validacionesReserva.js";

test("acepta un correo válido y rechaza formatos incorrectos", function () {
  expect(validarCorreo("ana@ejemplo.cl")).toBe(true);
  expect(validarCorreo(" ana@ejemplo.cl ")).toBe(true);
  expect(validarCorreo("ana@ejemplo")).toBe(false);
  expect(validarCorreo("ana@@ejemplo.cl")).toBe(false);
  expect(validarCorreo("")).toBe(false);
});
