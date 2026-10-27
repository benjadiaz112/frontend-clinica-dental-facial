"use client";
import { useEffect, useState } from "react";
import Mensaje from "@/components/compartidos/Mensaje";
import Boton from "@/components/compartidos/Boton";
import { consultarTratamientos } from "@/data/tratamientos";
import TarjetaTratamiento from "./TarjetaTratamiento";
export default function CatalogoTratamientos() {
  const [tratamientos, setTratamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  // Consultar los tratamientos al abrir el catálogo.
  useEffect(function () {
    const controlador = new AbortController();
    async function cargar() {
      try {
        const lista = await consultarTratamientos(controlador.signal);
        if (!controlador.signal.aborted) setTratamientos(lista);
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
    cargar();
    // Cancelar la consulta si se sale de la página antes de recibir los datos.
    return function () {
      controlador.abort();
    };
  }, []);
  if (cargando) return <Mensaje texto="Cargando tratamientos..." />;
  if (error) return <Mensaje texto={error} tipo="error" />;
  if (tratamientos.length === 0)
    return <Mensaje texto="No hay tratamientos disponibles." />;
  return (
    <>
      <div className="rejilla catalogo-tratamientos">
        {tratamientos.map(function (tratamiento) {
          return (
            <TarjetaTratamiento
              key={tratamiento.id}
              tratamiento={tratamiento}
              seleccionado={seleccionado?.id === tratamiento.id}
              alSeleccionar={function () {
                setSeleccionado(tratamiento);
              }}
            />
          );
        })}
      </div>
      <div className="seleccion-tratamiento">
        <Mensaje
          texto={
            seleccionado
              ? "Tratamiento seleccionado: " + seleccionado.nombre
              : "Selecciona un tratamiento para solicitar una evaluación."
          }
        />
        {seleccionado && (
          <div className="acciones">
            <a className="btn" href={"/reserva?tratamiento=" + seleccionado.id}>
              Continuar a Reserva
            </a>
            <Boton
              texto="Quitar selección"
              secundario
              alHacerClic={function () {
                setSeleccionado(null);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
