import PresentacionInicio from "@/components/inicio/PresentacionInicio";
import TratamientosDestacados from "@/components/inicio/TratamientosDestacados";
import CarruselInicio from "@/components/inicio/CarruselInicio";
import ConsejoDental from "@/components/inicio/ConsejoDental";
import { informacionClinica } from "@/data/clinica";
import {
  tratamientosDestacados,
  diapositivasInicio,
  consejoInicio,
} from "@/data/inicio";
import "@/styles/inicio.css";
export default function Inicio() {
  return (
    <>
      <PresentacionInicio clinica={informacionClinica} />
      <TratamientosDestacados tratamientos={tratamientosDestacados} />
      <CarruselInicio diapositivas={diapositivasInicio} />
      <ConsejoDental consejo={consejoInicio} />
    </>
  );
}
