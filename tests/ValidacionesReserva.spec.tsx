import { validarNombre, validarRut, validarCorreo, validarServicio } from "../services/validacionesReserva";

describe("Validaciones de Reserva", function () {
  it("acepta un nombre válido y rechaza uno inválido", function () {
    expect(validarNombre("Ana Pérez")).toBeTrue();
    expect(validarNombre("Ana123")).toBeFalse();
  });

  it("acepta un RUT válido y rechaza un RUT inválido", function () {
    expect(validarRut("12.345.678-5")).toBeTrue();
    expect(validarRut("12.345.678-9")).toBeFalse();
  });

  it("acepta un correo válido y rechaza uno inválido", function () {
    expect(validarCorreo("ana@ejemplo.cl")).toBeTrue();
    expect(validarCorreo("ana@ejemplo")).toBeFalse();
  });

  it("acepta un servicio perteneciente al catálogo y rechaza otro", function () {
    const servicios = ["Limpieza dental", "Ortodoncia"];
    expect(validarServicio("Limpieza dental", servicios)).toBeTrue();
    expect(validarServicio("Otro servicio", servicios)).toBeFalse();
  });
});
