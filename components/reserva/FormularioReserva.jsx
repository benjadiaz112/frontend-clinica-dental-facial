"use client";
import { useEffect, useState } from "react";
import Boton from "@/components/compartidos/Boton";
import Mensaje from "@/components/compartidos/Mensaje";
import { consultarTratamientos } from "@/data/tratamientos";
import {
  validarNombre,
  validarRut,
  validarCorreo,
  validarServicio,
} from "@/services/validacionesReserva";
const datosVacios = {
  nombre: "",
  rut: "",
  correo: "",
  servicio: "",
  comentario: "",
};
export default function FormularioReserva() {
  const [datos, setDatos] = useState(datosVacios);
  const [errores, setErrores] = useState(datosVacios);
  const [resultado, setResultado] = useState("");
  const [aviso, setAviso] = useState("");
  const [tratamientos, setTratamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  // Cargar los servicios y recuperar la selección que viene del catálogo.
  useEffect(function () {
    const controlador = new AbortController();
    async function cargarServicios() {
      try {
        const lista = await consultarTratamientos(controlador.signal);
        if (controlador.signal.aborted) return;
        setTratamientos(lista);
        const id = new URLSearchParams(window.location.search).get(
          "tratamiento",
        );
        if (id) {
          const seleccionado = lista.find(function (item) {
            return String(item.id) === id;
          });
          if (seleccionado) {
            setDatos(function (anteriores) {
              return { ...anteriores, servicio: seleccionado.nombre };
            });
          } else {
            setAviso(
              "El tratamiento seleccionado no está disponible. Elige un servicio de la lista.",
            );
          }
        }
      } catch {
        if (!controlador.signal.aborted) {
          setError(
            "No se pudieron cargar los tratamientos. Comprueba que la API esté disponible e intenta recargar la página.",
          );
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }
    cargarServicios();
    return function () {
      controlador.abort();
    };
  }, []);
  // Actualizar el campo y quitar su error mientras el usuario lo corrige.
  function cambiar(campo, valor) {
    setDatos(function (anteriores) {
      return { ...anteriores, [campo]: valor };
    });
    setErrores(function (anteriores) {
      return { ...anteriores, [campo]: "" };
    });
    setResultado("");
    if (campo === "servicio") setAviso("");
  }
  // Revisar los datos y devolver el nombre del primer campo incorrecto.
  function validar() {
    const nuevosErrores = { ...datosVacios };
    if (!validarNombre(datos.nombre))
      nuevosErrores.nombre =
        "Escribe un nombre válido de 3 a 80 caracteres, con letras, espacios, guiones o apóstrofes.";
    if (!validarRut(datos.rut))
      nuevosErrores.rut = "Escribe un RUT válido. Ejemplo: 12.345.678-5.";
    if (!validarCorreo(datos.correo))
      nuevosErrores.correo = "Escribe un correo válido.";
    const servicios = tratamientos.map(function (item) {
      return item.nombre;
    });
    if (cargando || error || !validarServicio(datos.servicio, servicios))
      nuevosErrores.servicio = "Selecciona un servicio disponible.";
    if (datos.comentario.length > 500)
      nuevosErrores.comentario =
        "El comentario puede tener hasta 500 caracteres.";
    setErrores(nuevosErrores);
    const campos = Object.keys(nuevosErrores);
    const primero = campos.find(function (campo) {
      return nuevosErrores[campo] !== "";
    });
    setResultado(
      primero
        ? "Revisa los datos marcados."
        : "Datos válidos. Esta es una demostración: no se envió una solicitud ni se reservó una hora.",
    );
    return primero;
  }
  // Dejar el formulario vacío, sin errores ni resultado anterior.
  function limpiar() {
    setDatos({ ...datosVacios });
    setErrores({ ...datosVacios });
    setResultado("");
    setAviso("");
  }
  const hayErrores = Object.values(errores).some(function (texto) {
    return texto !== "";
  });
  const elegido = tratamientos.find(function (item) {
    return item.nombre === datos.servicio;
  });
  function enviar(evento) {
    evento.preventDefault();
    const primero = validar();
    if (primero) {
      const campo = evento.currentTarget.elements.namedItem(primero);
      campo?.focus();
    }
  }
  return (
    <>
      {cargando && <Mensaje texto="Cargando servicios..." />}
      {error && <Mensaje texto={error} tipo="error" />}
      {!cargando && !error && tratamientos.length === 0 && (
        <Mensaje texto="No hay servicios disponibles." />
      )}
      {aviso && <Mensaje texto={aviso} tipo="error" />}
      {elegido && (
        <div>
          <h2>Tratamiento seleccionado</h2>
          <p>
            {elegido.nombre} — {elegido.textoPrecio}
          </p>
        </div>
      )}
      <div className="reserva-disposicion">
        <form noValidate onSubmit={enviar} onReset={limpiar}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            value={datos.nombre}
            onChange={function (e) {
              cambiar("nombre", e.target.value);
            }}
            autoComplete="name"
            maxLength={80}
            required
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby="error-nombre"
            placeholder="Ejemplo: Ana Pérez"
          />
          <small className="error" id="error-nombre">
            {errores.nombre}
          </small>

          <label htmlFor="rut">RUT</label>
          <input
            id="rut"
            name="rut"
            value={datos.rut}
            onChange={function (e) {
              cambiar("rut", e.target.value);
            }}
            maxLength={12}
            required
            aria-invalid={Boolean(errores.rut)}
            aria-describedby="error-rut"
            placeholder="12.345.678-5"
          />
          <small className="error" id="error-rut">
            {errores.rut}
          </small>

          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            value={datos.correo}
            onChange={function (e) {
              cambiar("correo", e.target.value);
            }}
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errores.correo)}
            aria-describedby="error-correo"
            placeholder="nombre@correo.cl"
          />
          <small className="error" id="error-correo">
            {errores.correo}
          </small>

          <label htmlFor="servicio">Servicio</label>
          <select
            id="servicio"
            name="servicio"
            value={datos.servicio}
            onChange={function (e) {
              cambiar("servicio", e.target.value);
            }}
            disabled={cargando || Boolean(error) || tratamientos.length === 0}
            required
            aria-invalid={Boolean(errores.servicio)}
            aria-describedby="error-servicio"
          >
            <option value="">Selecciona una opción</option>
            {tratamientos.map(function (item) {
              return (
                <option key={item.id} value={item.nombre}>
                  {item.nombre}
                </option>
              );
            })}
          </select>
          <small className="error" id="error-servicio">
            {errores.servicio}
          </small>

          <label htmlFor="comentario">Comentario (opcional)</label>
          <textarea
            id="comentario"
            name="comentario"
            rows={4}
            value={datos.comentario}
            onChange={function (e) {
              cambiar("comentario", e.target.value);
            }}
            maxLength={500}
            aria-invalid={Boolean(errores.comentario)}
            aria-describedby="error-comentario"
            placeholder="Escribe tu consulta"
          />
          <small className="error" id="error-comentario">
            {errores.comentario}
          </small>

          <div className="acciones">
            <Boton
              texto="Validar datos"
              tipo="submit"
              deshabilitado={
                cargando || Boolean(error) || tratamientos.length === 0
              }
            />
            <Boton texto="Limpiar" tipo="reset" secundario />
          </div>
          <Mensaje texto={resultado} tipo={hayErrores ? "error" : "exito"} />
        </form>
        <img
          src="/imagenes/consulta-dental.jpg"
          alt="Atención profesional en Clínica Aura"
          width={1600}
          height={900}
        />
      </div>
      <p className="reserva-enlace">
        <a href="/tratamientos">Elegir otro tratamiento</a>
      </p>
    </>
  );
}
