"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/data/api";

const Contexto = createContext(null);
let enCurso;

function renovar() {
  if (!enCurso) {
    enCurso = api("/auth/renovar", { metodo: "POST" }).finally(() => { enCurso = null; });
  }
  return enCurso;
}

export function Sesion({ children }) {
  const [cuenta, setCuenta] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    renovar().then((datos) => { if (activo) setCuenta(datos); })
      .catch(() => {}).finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, []);

  async function entrar(datos) {
    const acceso = await api("/auth/entrar", { metodo: "POST", datos });
    setCuenta(acceso);
  }

  async function salir() {
    await api("/auth/salir", { metodo: "POST" });
    setCuenta(null);
  }

  async function solicitar(ruta, opciones) {
    try {
      return await api(ruta, { ...opciones, token: cuenta?.token });
    } catch (error) {
      if (error.estado !== 401 || !cuenta) throw error;
      let acceso;
      try {
        acceso = await renovar();
      } catch (fallo) {
        if (fallo.estado === 401) setCuenta(null);
        throw fallo;
      }
      setCuenta(acceso);
      return api(ruta, { ...opciones, token: acceso.token });
    }
  }

  return <Contexto.Provider value={{ cuenta, cargando, entrar, salir, solicitar }}>{children}</Contexto.Provider>;
}

export function usarSesion() {
  return useContext(Contexto);
}
