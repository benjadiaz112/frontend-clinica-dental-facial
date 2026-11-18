"use client";

import Link from "next/link";
import { useState } from "react";
import { usarSesion } from "@/components/compartidos/Sesion";
import Mensaje from "@/components/compartidos/Mensaje";

export default function Cuenta() {
  const { cuenta, cargando, entrar, salir } = usarSesion();
  const [mensaje, setMensaje] = useState("");
  const [ocupado, setOcupado] = useState(false);

  async function operar(operacion) {
    setOcupado(true);
    setMensaje("");
    try { await operacion(); }
    catch (error) { setMensaje(error.message); }
    finally { setOcupado(false); }
  }

  return (
    <section className="contenedor panel portada">
      <h1>Mi sesión</h1>
      <Mensaje texto={mensaje} tipo="error" />
      {cargando ? <p>Cargando sesión...</p> : cuenta ? (
        <>
          <p>{cuenta.correo} · {cuenta.rol === "ADMIN" ? "Administrador" : "Paciente"}</p>
          <div className="acciones">
            {cuenta.rol === "ADMIN"
              ? <Link className="btn" href="/administrar">Administrar tratamientos</Link>
              : <Link className="btn" href="/mis-reservas">Mis reservas</Link>}
            <button className="btn btn-secundario" disabled={ocupado} onClick={() => operar(salir)}>Cerrar sesión</button>
          </div>
        </>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          const datos = Object.fromEntries(new FormData(e.currentTarget));
          operar(() => entrar(datos));
        }}>
          <p><label>Correo <input name="correo" type="email" autoComplete="username" required /></label></p>
          <p><label>Contraseña <input name="clave" type="password" autoComplete="current-password" required /></label></p>
          <button className="btn" disabled={ocupado}>Ingresar</button>
        </form>
      )}
    </section>
  );
}
