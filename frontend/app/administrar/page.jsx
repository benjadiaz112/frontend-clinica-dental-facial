"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Mensaje from "@/components/compartidos/Mensaje";
import { usarSesion } from "@/components/compartidos/Sesion";
import { consultarTratamientos } from "@/data/tratamientos";

const vacio = { nombre: "", descripcion: "", imagen: "/imagenes/consulta-dental.jpg",
                textoAlternativo: "", precioDesde: "", textoPrecio: "" };
const campos = [["nombre", "Nombre", 100], ["descripcion", "Descripción", 500],
                ["imagen", "Ruta de imagen", 200], ["textoAlternativo", "Texto alternativo", 150],
                ["textoPrecio", "Precio visible", 100]];

export default function Administrar() {
  const { cuenta, cargando, solicitar } = usarSesion();
  const [lista, setLista] = useState([]);
  const [edicion, setEdicion] = useState(vacio);
  const [ocupado, setOcupado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("info");

  useEffect(() => {
    if (cuenta?.rol !== "ADMIN") return;
    const control = new AbortController();
    consultarTratamientos(control.signal).then(setLista).catch(() => {
      if (!control.signal.aborted) { setTipo("error"); setMensaje("No se pudo cargar el catálogo."); }
    });
    return () => control.abort();
  }, [cuenta?.rol]);

  async function cambiar(metodo, id, datos) {
    setOcupado(true);
    setMensaje("");
    try {
      await solicitar("/tratamientos" + (id ? "/" + id : ""), { metodo, datos });
      setEdicion(vacio);
      setLista(await consultarTratamientos());
      setTipo("exito");
      setMensaje("Catálogo actualizado.");
    } catch (error) {
      setTipo("error");
      setMensaje(error.message);
    } finally { setOcupado(false); }
  }

  function guardar(evento) {
    evento.preventDefault();
    const { id, ...datos } = edicion;
    datos.precioDesde = datos.precioDesde === "" ? null : Number(datos.precioDesde);
    cambiar(id ? "PUT" : "POST", id, datos);
  }

  return (
    <section className="contenedor panel portada">
      <h1>Administrar tratamientos</h1>
      {cargando ? <p>Cargando sesión...</p> : cuenta?.rol !== "ADMIN" ? (
        <p>Esta página está reservada al administrador. <Link href="/cuenta">Ir a Mi sesión</Link></p>
      ) : (
        <>
          <Mensaje texto={mensaje} tipo={tipo} />
          <form onSubmit={guardar}>
            {campos.map(([campo, etiqueta, maximo]) => (
              <p key={campo}><label>{etiqueta} <input required maxLength={maximo}
                value={edicion[campo]} onChange={(e) => setEdicion({ ...edicion, [campo]: e.target.value })} /></label></p>
            ))}
            <p><label>Precio en pesos <input type="number" min="0" max="2147483647"
              value={edicion.precioDesde} onChange={(e) => setEdicion({ ...edicion, precioDesde: e.target.value })} /></label></p>
            <div className="acciones">
              <button className="btn" disabled={ocupado}>{edicion.id ? "Guardar cambios" : "Crear tratamiento"}</button>
              {edicion.id && <button className="btn btn-secundario" type="button" disabled={ocupado} onClick={() => setEdicion(vacio)}>Cancelar edición</button>}
            </div>
          </form>
          <ul>
            {lista.map((item) => (
              <li key={item.id}>
                <p>{item.nombre} · {item.textoPrecio}</p>
                <div className="acciones">
                  <button className="btn btn-secundario" disabled={ocupado} onClick={() => setEdicion({ ...item, precioDesde: item.precioDesde ?? "" })}>Editar</button>
                  <button className="btn btn-secundario" disabled={ocupado} onClick={() => {
                    if (window.confirm("¿Eliminar " + item.nombre + "?")) cambiar("DELETE", item.id);
                  }}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
