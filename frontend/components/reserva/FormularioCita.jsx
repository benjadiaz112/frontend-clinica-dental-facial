"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api } from "@/data/api";
import Mensaje from "@/components/compartidos/Mensaje";
import { usarSesion } from "@/components/compartidos/Sesion";

function usarLista(ruta) {
  const [resultado, setResultado] = useState(null);
  useEffect(() => {
    if (!ruta) return;
    let activo = true;
    api(ruta).then((lista) => { if (activo) setResultado({ ruta, lista }); })
      .catch((error) => { if (activo) setResultado({ ruta, lista: [], error: error.message }); });
    return () => { activo = false; };
  }, [ruta]);
  return resultado?.ruta === ruta ? resultado : { lista: [], cargando: Boolean(ruta) };
}

export default function FormularioCita({ inicial }) {
  const { cuenta, cargando, solicitar } = usarSesion();
  const [tratamiento, setTratamiento] = useState(inicial);
  const [profesional, setProfesional] = useState("");
  const [bloque, setBloque] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [confirmada, setConfirmada] = useState(false);
  const intento = useRef(null);
  const tratamientos = usarLista("/tratamientos");
  const profesionales = usarLista(tratamiento ? "/profesionales?tratamientoId=" + encodeURIComponent(tratamiento) : "");
  const horarios = usarLista(profesional ? "/agenda?profesionalId=" + encodeURIComponent(profesional) : "");

  async function reservar(evento) {
    evento.preventDefault();
    setOcupado(true);
    setMensaje("");
    intento.current ||= crypto.randomUUID();
    try {
      await solicitar("/reservas", { metodo: "POST", datos: {
        id: intento.current, tratamientoId: Number(tratamiento), profesionalId: Number(profesional), bloqueId: Number(bloque),
      } });
      setConfirmada(true);
    } catch (error) {
      setMensaje(error.message);
    } finally { setOcupado(false); }
  }

  return (
    <section className="contenedor panel portada">
      <h1>Reserva una evaluación</h1>
      <Mensaje texto={mensaje || tratamientos.error || profesionales.error || horarios.error || ""} tipo="error" />
      {confirmada ? (
        <p>Reserva confirmada. Puedes consultarla en <Link href="/mis-reservas">Mis reservas</Link>.</p>
      ) : (
        <form onSubmit={reservar}>
          <p><label>Tratamiento <select required disabled={ocupado || tratamientos.cargando} value={tratamiento} onChange={(e) => {
            setTratamiento(e.target.value); setProfesional(""); setBloque(""); intento.current = null;
          }}>
            <option value="">Selecciona un tratamiento</option>
            {tratamientos.lista.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}
          </select></label></p>
          <p><label>Profesional <select required disabled={ocupado || !profesionales.lista.length} value={profesional} onChange={(e) => {
            setProfesional(e.target.value); setBloque(""); intento.current = null;
          }}>
            <option value="">Selecciona un profesional</option>
            {profesionales.lista.map((item) => <option key={item.id} value={item.id}>{item.nombre} · {item.especialidad}</option>)}
          </select></label></p>
          {tratamiento && !profesionales.cargando && !profesionales.error && !profesionales.lista.length &&
            <p>No hay profesionales asignados a este tratamiento.</p>}
          <p><label>Horario <select required disabled={ocupado || !horarios.lista.length} value={bloque} onChange={(e) => {
            setBloque(e.target.value); intento.current = null;
          }}>
            <option value="">Selecciona un horario</option>
            {horarios.lista.map((item) => <option key={item.id} value={item.id}>{item.inicio.replace("T", " ").slice(0, 16)}</option>)}
          </select></label></p>
          {profesional && !horarios.cargando && !horarios.error && !horarios.lista.length && <p>No hay horarios disponibles.</p>}
          {cargando ? <p>Cargando sesión...</p> : cuenta?.rol === "PACIENTE" ? (
            <button className="btn" disabled={ocupado || !bloque}>Confirmar reserva</button>
          ) : <p>Para confirmar, <Link href="/cuenta">ingresa con una cuenta de paciente</Link>.</p>}
        </form>
      )}
    </section>
  );
}
