"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Mensaje from "@/components/compartidos/Mensaje";
import { usarSesion } from "@/components/compartidos/Sesion";

export default function MisReservas() {
  const { cuenta, cargando, solicitar } = usarSesion();
  const [lista, setLista] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    if (cuenta?.rol !== "PACIENTE") return;
    let activo = true;
    solicitar("/reservas").then((datos) => { if (activo) setLista(datos); })
      .catch((error) => { if (activo) setMensaje(error.message); });
    return () => { activo = false; };
  }, [cuenta?.correo, cuenta?.rol]);

  async function cancelar(id) {
    if (!window.confirm("¿Cancelar esta reserva?")) return;
    setOcupado(true);
    setMensaje("");
    try {
      await solicitar("/reservas/" + id, { metodo: "DELETE" });
      setLista(await solicitar("/reservas"));
    } catch (error) { setMensaje(error.message); }
    finally { setOcupado(false); }
  }

  return (
    <section className="contenedor panel portada">
      <h1>Mis reservas</h1>
      <Mensaje texto={mensaje} tipo="error" />
      {cargando ? <p>Cargando sesión...</p> : cuenta?.rol !== "PACIENTE" ? (
        <p><Link href="/cuenta">Ingresa como paciente</Link> para ver tus reservas.</p>
      ) : lista === null ? (
        !mensaje && <p>Cargando reservas...</p>
      ) : lista.length === 0 ? <p>Aún no tienes reservas.</p> : (
        <ul>
          {lista.map((item) => (
            <li key={item.id}>
              <p>{item.inicio ? item.tratamiento + " · " + item.profesional + " · " + item.inicio.replace("T", " ").slice(0, 16) : "Solicitud sin confirmar"} · {item.estado}</p>
              {item.estado !== "CANCELADA" &&
                <button className="btn btn-secundario" disabled={ocupado} onClick={() => cancelar(item.id)}>Cancelar reserva</button>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
