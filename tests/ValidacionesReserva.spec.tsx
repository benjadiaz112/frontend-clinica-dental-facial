import { validarNombre, validarRut, validarCorreo, validarServicio } from "../services/validacionesReserva";

describe("Validaciones de Reserva", function () {
  it("acepta nombres con tildes, ñ, guiones, apóstrofes y espacios exteriores", function () {
    ["Ana Pérez", "María-José Muñoz", "O'Connor", "  Benjamín Díaz  "].forEach(function (nombre) {
      expect(validarNombre(nombre)).toBeTrue();
    });
  });

  it("respeta los límites de 3 y 80 caracteres del nombre", function () {
    expect(validarNombre("Al")).toBeFalse();
    expect(validarNombre("Ana")).toBeTrue();
    expect(validarNombre("A".repeat(80))).toBeTrue();
    expect(validarNombre("A".repeat(81))).toBeFalse();
  });

  it("rechaza nombres vacíos, números y separadores incorrectos", function () {
    ["", "   ", "Ana123", "Ana@Pérez", "Ana  Pérez", "-Ana", "Ana-"].forEach(function (nombre) {
      expect(validarNombre(nombre)).toBeFalse();
    });
  });

  it("acepta el RUT original con puntos, sin puntos y sin guion", function () {
    ["12.345.678-5", "12345678-5", "123456785", " 12.345.678-5 "].forEach(function (rut) {
      expect(validarRut(rut)).toBeTrue();
    });
  });

  it("acepta los dígitos verificadores K, k y cero", function () {
    expect(validarRut("6.000.000-K")).toBeTrue();
    expect(validarRut("6000000-k")).toBeTrue();
    expect(validarRut("10.000.004-0")).toBeTrue();
  });

  it("rechaza un dígito verificador incorrecto", function () {
    expect(validarRut("12.345.678-9")).toBeFalse();
    expect(validarRut("6.000.000-0")).toBeFalse();
  });

  it("rechaza RUT vacío, incompleto, mal puntuado o con letras en el cuerpo", function () {
    ["", "123", "12.34.5678-5", "12.345.6785", "12A45678-5", "012345678-5", "12 345 678-5"].forEach(function (rut) {
      expect(validarRut(rut)).toBeFalse();
    });
  });

  it("acepta correos con subdominios y espacios exteriores", function () {
    expect(validarCorreo("ana+consulta@correo.cl")).toBeTrue();
    expect(validarCorreo(" ana@alumnos.ejemplo.cl ")).toBeTrue();
  });

  it("rechaza correos vacíos o con formato incorrecto", function () {
    ["", "   ", "ana", "ana@correo", "@correo.cl", "ana@@correo.cl", "ana pérez@correo.cl"].forEach(function (correo) {
      expect(validarCorreo(correo)).toBeFalse();
    });
  });

  it("respeta el límite original de 254 caracteres del correo", function () {
    expect(validarCorreo("a".repeat(249) + "@b.cl")).toBeTrue();
    expect(validarCorreo("a".repeat(250) + "@b.cl")).toBeFalse();
  });

  it("solo acepta servicios presentes en el catálogo recibido", function () {
    const servicios = ["Limpieza dental", "Ortodoncia"];
    expect(validarServicio("Limpieza dental", servicios)).toBeTrue();
    expect(validarServicio("Ortodoncia", servicios)).toBeTrue();
    expect(validarServicio("Otro servicio", servicios)).toBeFalse();
    expect(validarServicio("limpieza dental", servicios)).toBeFalse();
  });

  it("rechaza servicio vacío y catálogo vacío", function () {
    expect(validarServicio("", ["Limpieza dental"])).toBeFalse();
    expect(validarServicio("", [""])).toBeFalse();
    expect(validarServicio("Limpieza dental", [])).toBeFalse();
  });
});
