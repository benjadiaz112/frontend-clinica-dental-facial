// Comprueba nombres válidos y rechaza números o nombres demasiado cortos.
import { test, expect } from "vitest";
import { validarNombre } from "../services/validacionesReserva.js";

test("acepta un nombre válido y rechaza uno inválido o vacío", function () {
  expect(validarNombre("Ana Pérez")).toBe(true);
  expect(validarNombre("  Ana Pérez  ")).toBe(true);
  expect(validarNombre("Ana123")).toBe(false);
  expect(validarNombre("An")).toBe(false);
  expect(validarNombre("")).toBe(false);
});
