"use client";

import { useEffect, useState } from "react";
import type { Reserva } from "@/models/Reserva";
import { validarNombre, validarRut, validarCorreo, validarServicio } from "@/services/validacionesReserva";
import { useTratamientos } from "./useTratamientos";

const datosVacios: Reserva = { nombre: "", rut: "", correo: "", servicio: "", comentario: "" };

export function useReserva() {
  const { tratamientos, cargando, error } = useTratamientos();
  const [datos, setDatos] = useState<Reserva>(datosVacios);
  const [errores, setErrores] = useState<Reserva>(datosVacios);
  const [resultado, setResultado] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(function () {
    const id = new URLSearchParams(window.location.search).get("tratamiento");
    if (!id || cargando || error) return;
    const elegido = tratamientos.find(function (item) { return String(item.id) === id; });
    if (elegido) {
      setDatos(function (anteriores) { return { ...anteriores, servicio: elegido.nombre }; });
    } else {
      setAviso("El tratamiento seleccionado no está disponible. Elige un servicio de la lista.");
    }
  }, [tratamientos, cargando, error]);

  function cambiar(campo: keyof Reserva, valor: string) {
    setDatos(function (anteriores) { return { ...anteriores, [campo]: valor }; });
    setErrores(function (anteriores) { return { ...anteriores, [campo]: "" }; });
    setResultado("");
    if (campo === "servicio") setAviso("");
  }

  function validar() {
    const nuevosErrores = { ...datosVacios };
    if (!validarNombre(datos.nombre)) nuevosErrores.nombre = "Escribe un nombre válido de 3 a 80 caracteres, con letras, espacios, guiones o apóstrofes.";
    if (!validarRut(datos.rut)) nuevosErrores.rut = "Escribe un RUT válido. Ejemplo: 12.345.678-5.";
    if (!validarCorreo(datos.correo)) nuevosErrores.correo = "Escribe un correo válido.";
    const servicios = tratamientos.map(function (item) { return item.nombre; });
    if (cargando || error || !validarServicio(datos.servicio, servicios)) nuevosErrores.servicio = "Selecciona un servicio disponible.";
    if (datos.comentario.length > 500) nuevosErrores.comentario = "El comentario puede tener hasta 500 caracteres.";

    setErrores(nuevosErrores);
    const campos = Object.keys(nuevosErrores) as (keyof Reserva)[];
    const primero = campos.find(function (campo) { return nuevosErrores[campo] !== ""; });
    setResultado(primero ? "Revisa los datos marcados." : "Datos válidos. Esta es una demostración: no se envió una solicitud ni se reservó una hora.");
    return primero;
  }

  function limpiar() {
    setDatos({ ...datosVacios });
    setErrores({ ...datosVacios });
    setResultado("");
    setAviso("");
  }

  return { datos, errores, resultado, aviso, tratamientos, cargando, error, cambiar, validar, limpiar };
}
