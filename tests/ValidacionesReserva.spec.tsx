import { validarNombre, validarRut, validarCorreo, validarServicio } from "../services/validacionesReserva";

describe("Validaciones de Reserva", function () {
  it("acepta un nombre válido y rechaza uno inválido", function () {
    // 1. Preparar los datos de prueba.
    let nombreValido = "Ana Pérez";
    let nombreInvalido = "Ana123";

    // 2. Ejecutar la función.
    let resultadoValido = validarNombre(nombreValido);
    let resultadoInvalido = validarNombre(nombreInvalido);

    // 3. Comprobar los resultados.
    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
  });

  it("acepta un RUT válido y rechaza un RUT inválido", function () {
    // 1. Preparar los datos de prueba.
    let rutValido = "12.345.678-5";
    let rutInvalido = "12.345.678-9";

    // 2. Ejecutar la función.
    let resultadoValido = validarRut(rutValido);
    let resultadoInvalido = validarRut(rutInvalido);

    // 3. Comprobar los resultados.
    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
  });

  it("acepta un correo válido y rechaza uno inválido", function () {
    // 1. Preparar los datos de prueba.
    let correoValido = "ana@ejemplo.cl";
    let correoInvalido = "ana@ejemplo";

    // 2. Ejecutar la función.
    let resultadoValido = validarCorreo(correoValido);
    let resultadoInvalido = validarCorreo(correoInvalido);

    // 3. Comprobar los resultados.
    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
  });

  it("acepta un servicio perteneciente al catálogo y rechaza otro", function () {
    // 1. Preparar los datos de prueba.
    let servicios = ["Limpieza dental", "Ortodoncia"];
    let servicioValido = "Limpieza dental";
    let servicioInvalido = "Otro servicio";

    // 2. Ejecutar la función.
    let resultadoValido = validarServicio(servicioValido, servicios);
    let resultadoInvalido = validarServicio(servicioInvalido, servicios);

    // 3. Comprobar los resultados.
    expect(resultadoValido).toBeTrue();
    expect(resultadoInvalido).toBeFalse();
  });
});
