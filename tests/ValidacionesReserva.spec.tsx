import { validarNombre, validarRut, validarCorreo, validarServicio } from "../services/validacionesReserva";

describe("Validaciones de Reserva", function () {
  it("acepta nombres válidos y rechaza nombres inválidos", function () {
    const validos = ["Ana Pérez", "  Ana Pérez  ", "Ana-María O'Neil", "Ana", "A".repeat(80)];
    const invalidos = ["Ana123", "An", "A".repeat(81), ""];

    for (const nombre of validos) {
      expect(validarNombre(nombre)).toBeTrue();
    }
    for (const nombre of invalidos) {
      expect(validarNombre(nombre)).toBeFalse();
    }
  });

  it("acepta RUT válidos y rechaza RUT inválidos", function () {
    const validos = ["12.345.678-5", "123456785", " 12.345.678-5 ", "6.000.000-k", "10.000.004-0"];
    const invalidos = ["12.345.678-9", "12.34.5678-5", ""];

    for (const rut of validos) {
      expect(validarRut(rut)).toBeTrue();
    }
    for (const rut of invalidos) {
      expect(validarRut(rut)).toBeFalse();
    }
  });

  it("acepta correos válidos y rechaza correos inválidos", function () {
    const validos = ["ana@ejemplo.cl", " ana@ejemplo.cl ", "a".repeat(249) + "@b.cl"];
    const invalidos = ["ana@ejemplo", "ana perez@ejemplo.cl", "ana@@ejemplo.cl", "a".repeat(250) + "@b.cl", ""];

    for (const correo of validos) {
      expect(validarCorreo(correo)).toBeTrue();
    }
    for (const correo of invalidos) {
      expect(validarCorreo(correo)).toBeFalse();
    }
  });

  it("acepta un servicio del catálogo y rechaza los demás", function () {
    const servicios = ["Limpieza dental", "Ortodoncia"];
    const invalidos = ["Otro servicio", "", "limpieza dental"];

    expect(validarServicio("Limpieza dental", servicios)).toBeTrue();
    for (const servicio of invalidos) {
      expect(validarServicio(servicio, servicios)).toBeFalse();
    }
    expect(validarServicio("Limpieza dental", [])).toBeFalse();
  });
});
