// Comprueba la validación del RUT sin usar React, navegador ni API.
import { test, expect } from "vitest";
import { validarRut } from "../services/validacionesReserva";

// Debe aceptar un dígito verificador correcto y rechazar datos incorrectos.
test("valida un RUT correcto y rechaza un RUT incorrecto o vacío", function () {
  expect(validarRut("12.345.678-5")).toBe(true);
  expect(validarRut("12.345.678-9")).toBe(false);
  expect(validarRut("")).toBe(false);
});
