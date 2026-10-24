import { validarNombre, validarRut, validarCorreo, validarServicio } from "../services/validacionesReserva";

describe("Validaciones de Reserva", function () {
  it("acepta un nombre válido y rechaza uno inválido", function () {
    let nombreValido = "Ana Pérez";
    let nombreInvalido = "Ana123";

    let resultadoValido = validarNombre(nombreValido);
    let resultadoInvalido = validarNombre(nombreInvalido);

    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
    expect(validarNombre("  Ana Pérez  ")).toBeTrue();
    expect(validarNombre("Ana-María O'Neil")).toBeTrue();
    expect(validarNombre("An")).toBeFalse();
    expect(validarNombre("Ana")).toBeTrue();
    expect(validarNombre("A".repeat(80))).toBeTrue();
    expect(validarNombre("A".repeat(81))).toBeFalse();
    expect(validarNombre("")).toBeFalse();
  });

  it("acepta un RUT válido y rechaza un RUT inválido", function () {
    let rutValido = "12.345.678-5";
    let rutInvalido = "12.345.678-9";

    let resultadoValido = validarRut(rutValido);
    let resultadoInvalido = validarRut(rutInvalido);

    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
    expect(validarRut("123456785")).toBeTrue();
    expect(validarRut(" 12.345.678-5 ")).toBeTrue();
    expect(validarRut("6.000.000-k")).toBeTrue();
    expect(validarRut("10.000.004-0")).toBeTrue();
    expect(validarRut("12.34.5678-5")).toBeFalse();
    expect(validarRut("")).toBeFalse();
  });

  it("acepta un correo válido y rechaza uno inválido", function () {
    let correoValido = "ana@ejemplo.cl";
    let correoInvalido = "ana@ejemplo";

    let resultadoValido = validarCorreo(correoValido);
    let resultadoInvalido = validarCorreo(correoInvalido);

    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
    expect(validarCorreo(" ana@ejemplo.cl ")).toBeTrue();
    expect(validarCorreo("ana perez@ejemplo.cl")).toBeFalse();
    expect(validarCorreo("ana@@ejemplo.cl")).toBeFalse();
    expect(validarCorreo("a".repeat(249) + "@b.cl")).toBeTrue();
    expect(validarCorreo("a".repeat(250) + "@b.cl")).toBeFalse();
    expect(validarCorreo("")).toBeFalse();
  });

  it("acepta un servicio perteneciente al catálogo y rechaza otro", function () {
    let servicios = ["Limpieza dental", "Ortodoncia"];
    let servicioValido = "Limpieza dental";
    let servicioInvalido = "Otro servicio";

    let resultadoValido = validarServicio(servicioValido, servicios);
    let resultadoInvalido = validarServicio(servicioInvalido, servicios);

    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
    expect(validarServicio("", servicios)).toBeFalse();
    expect(validarServicio("Limpieza dental", [])).toBeFalse();
    expect(validarServicio("limpieza dental", servicios)).toBeFalse();
  });
});
