import { informacionClinica } from "@/data/clinica";
import type { InformacionClinica } from "@/models/InformacionClinica";

export function obtenerInformacionClinica(): InformacionClinica {
  return informacionClinica;
}
