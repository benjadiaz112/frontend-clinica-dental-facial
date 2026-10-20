import type { EnlaceMenu } from "@/models/EnlaceMenu";

export const enlacesPrincipales: EnlaceMenu[] = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Nosotros", ruta: "/nosotros" },
  { texto: "Tratamientos", ruta: "/tratamientos" },
  { texto: "Reserva", ruta: "/reserva" },
  { texto: "Contacto", ruta: "/contacto" }
];

export const enlacesAdicionales: EnlaceMenu[] = enlacesPrincipales;
