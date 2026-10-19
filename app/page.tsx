import PresentacionInicio from "@/components/inicio/PresentacionInicio";
import TratamientosDestacados from "@/components/inicio/TratamientosDestacados";
import CarruselInicio from "@/components/inicio/CarruselInicio";
import ConsejoDental from "@/components/inicio/ConsejoDental";
import { obtenerInformacionClinica } from "@/services/clinicaService";
import { obtenerTratamientosDestacados, obtenerDiapositivasInicio, obtenerConsejoInicio } from "@/services/inicioService";
import "@/styles/inicio.css";

export default function Inicio() {
  const clinica = obtenerInformacionClinica();

  return (
    <>
      <PresentacionInicio clinica={clinica} />
      <TratamientosDestacados tratamientos={obtenerTratamientosDestacados()} />
      <CarruselInicio diapositivas={obtenerDiapositivasInicio()} />
      <ConsejoDental consejo={obtenerConsejoInicio()} />
    </>
  );
}
