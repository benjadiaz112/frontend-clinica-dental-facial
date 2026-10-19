import type { EnlaceMenu } from "@/models/EnlaceMenu";

export const enlacesPrincipales: EnlaceMenu[] = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Nosotros", ruta: "/nosotros" },
  { texto: "Tratamientos", ruta: "/tratamientos" },
  { texto: "Reserva", ruta: "/reserva" },
  { texto: "Contacto", ruta: "/contacto" },
  { texto: "Carrito", ruta: "/carrito" },
  { texto: "Ingresar", ruta: "/iniciar-sesion" }
];

export const enlacesAdicionales: EnlaceMenu[] = [
  { texto: "Categorías", ruta: "/categorias" },
  { texto: "Ofertas", ruta: "/ofertas" },
  { texto: "Blog", ruta: "/blog" },
  { texto: "Crear cuenta", ruta: "/registro" },
  { texto: "Administración", ruta: "/admin" }
];

export const enlacesAdministracion: EnlaceMenu[] = [
  { texto: "Panel", ruta: "/admin" },
  { texto: "Tratamientos", ruta: "/admin/tratamientos" },
  { texto: "Categorías", ruta: "/admin/categorias" },
  { texto: "Usuarios", ruta: "/admin/usuarios" },
  { texto: "Solicitudes", ruta: "/admin/solicitudes" },
  { texto: "Reportes", ruta: "/admin/reportes" },
  { texto: "Perfil", ruta: "/admin/perfil" }
];
