"use client";

import type { FormEvent } from "react";
import Boton from "@/components/compartidos/Boton";
import Mensaje from "@/components/compartidos/Mensaje";
import { useReserva } from "@/hooks/useReserva";

export default function FormularioReserva() {
  const { datos, errores, resultado, aviso, tratamientos, cargando, error, cambiar, validar, limpiar } = useReserva();
  const hayErrores = Object.values(errores).some(function (texto) { return texto !== ""; });
  const elegido = tratamientos.find(function (item) { return item.nombre === datos.servicio; });

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const primero = validar();
    if (primero) {
      const campo = evento.currentTarget.elements.namedItem(primero) as HTMLElement | null;
      campo?.focus();
    }
  }

  return (
    <>
      {cargando && <Mensaje texto="Cargando servicios..." />}
      {error && <Mensaje texto={error} tipo="error" />}
      {!cargando && !error && tratamientos.length === 0 && <Mensaje texto="No hay servicios disponibles." />}
      {aviso && <Mensaje texto={aviso} tipo="error" />}
      {elegido && (
        <div>
          <h2>Tratamiento seleccionado</h2>
          <p>{elegido.nombre} — {elegido.textoPrecio}</p>
        </div>
      )}
      <div className="reserva-disposicion">
        <form noValidate onSubmit={enviar} onReset={limpiar}>
          <label htmlFor="nombre">Nombre completo</label>
          <input id="nombre" name="nombre" value={datos.nombre} onChange={function (e) { cambiar("nombre", e.target.value); }} autoComplete="name" maxLength={80} required aria-invalid={Boolean(errores.nombre)} aria-describedby="error-nombre" placeholder="Ejemplo: Ana Pérez" />
          <small className="error" id="error-nombre">{errores.nombre}</small>

          <label htmlFor="rut">RUT</label>
          <input id="rut" name="rut" value={datos.rut} onChange={function (e) { cambiar("rut", e.target.value); }} maxLength={12} required aria-invalid={Boolean(errores.rut)} aria-describedby="error-rut" placeholder="12.345.678-5" />
          <small className="error" id="error-rut">{errores.rut}</small>

          <label htmlFor="correo">Correo</label>
          <input id="correo" name="correo" type="email" value={datos.correo} onChange={function (e) { cambiar("correo", e.target.value); }} autoComplete="email" maxLength={254} required aria-invalid={Boolean(errores.correo)} aria-describedby="error-correo" placeholder="nombre@correo.cl" />
          <small className="error" id="error-correo">{errores.correo}</small>

          <label htmlFor="servicio">Servicio</label>
          <select id="servicio" name="servicio" value={datos.servicio} onChange={function (e) { cambiar("servicio", e.target.value); }} disabled={cargando || Boolean(error) || tratamientos.length === 0} required aria-invalid={Boolean(errores.servicio)} aria-describedby="error-servicio">
            <option value="">Selecciona una opción</option>
            {tratamientos.map(function (item) { return <option key={item.id} value={item.nombre}>{item.nombre}</option>; })}
          </select>
          <small className="error" id="error-servicio">{errores.servicio}</small>

          <label htmlFor="comentario">Comentario (opcional)</label>
          <textarea id="comentario" name="comentario" rows={4} value={datos.comentario} onChange={function (e) { cambiar("comentario", e.target.value); }} maxLength={500} aria-invalid={Boolean(errores.comentario)} aria-describedby="error-comentario" placeholder="Escribe tu consulta" />
          <small className="error" id="error-comentario">{errores.comentario}</small>

          <div className="acciones">
            <Boton texto="Validar datos" tipo="submit" deshabilitado={cargando || Boolean(error) || tratamientos.length === 0} />
            <Boton texto="Limpiar" tipo="reset" secundario />
          </div>
          <Mensaje texto={resultado} tipo={hayErrores ? "error" : "exito"} />
        </form>
        <img src="/imagenes/consulta-dental.jpg" alt="Atención profesional en Clínica Aura" width={1600} height={900} />
      </div>
      <p className="reserva-enlace"><a href="/tratamientos">Elegir otro tratamiento</a></p>
    </>
  );
}
