import PresentacionInicio from "@/components/inicio/PresentacionInicio";
import { obtenerInformacionClinica } from "@/services/clinicaService";

export default function Inicio() {
  const clinica = obtenerInformacionClinica();

  return <PresentacionInicio clinica={clinica} />;
}
