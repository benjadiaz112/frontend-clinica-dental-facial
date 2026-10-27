// Comprueba la validación del RUT sin usar React, navegador ni API.
import { test, expect } from "vitest";
import { validarRut } from "../services/validacionesReserva.js";

// Debe aceptar un dígito verificador correcto y rechazar datos incorrectos.
test("valida un RUT correcto y rechaza un RUT incorrecto o vacío", function () {
  expect(validarRut("12.345.678-5")).toBe(true);
  expect(validarRut("12.345.678-9")).toBe(false);
  expect(validarRut("")).toBe(false);
});

// También debe reconocer los formatos admitidos y los dígitos K y cero.
test("acepta RUT sin puntos, con K o cero y rechaza puntos mal ubicados", function () {
  expect(validarRut("123456785")).toBe(true);
  expect(validarRut("6.000.000-k")).toBe(true);
  expect(validarRut("10.000.004-0")).toBe(true);
  expect(validarRut("12.34.5678-5")).toBe(false);
});
