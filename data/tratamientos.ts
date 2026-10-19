import type { Tratamiento } from "@/models/Tratamiento";

export const tratamientos: Tratamiento[] = [
  {
    id: 1,
    nombre: "Limpieza dental",
    descripcion: "Eliminación de sarro y pulido para cuidar dientes y encías.",
    imagen: "/imagenes/limpieza.jpg",
    textoAlternativo: "Tratamiento de limpieza dental",
    precioDesde: 25000,
    textoPrecio: "Desde $25.000"
  },
  {
    id: 2,
    nombre: "Blanqueamiento dental",
    descripcion: "Tratamiento estético para aclarar el tono de los dientes.",
    imagen: "/imagenes/blanqueamiento.jpg",
    textoAlternativo: "Tratamiento de blanqueamiento dental",
    precioDesde: 80000,
    textoPrecio: "Desde $80.000"
  },
  {
    id: 3,
    nombre: "Ortodoncia",
    descripcion: "Evaluación y corrección de la posición dental.",
    imagen: "/imagenes/ortodoncia.jpg",
    textoAlternativo: "Tratamiento de ortodoncia",
    precioDesde: 20000,
    textoPrecio: "Evaluación desde $20.000"
  },
  {
    id: 4,
    nombre: "Odontología general",
    descripcion: "Evaluación de la salud dental y orientación sobre los cuidados necesarios.",
    imagen: "/imagenes/consulta-dental.jpg",
    textoAlternativo: "Consulta de odontología general",
    precioDesde: null,
    textoPrecio: "Valor según evaluación"
  },
  {
    id: 5,
    nombre: "Armonización facial",
    descripcion: "Evaluación profesional para orientar sobre alternativas de cuidado facial.",
    imagen: "/imagenes/armonia-facial.jpg",
    textoAlternativo: "Evaluación de armonización facial",
    precioDesde: null,
    textoPrecio: "Valor según evaluación"
  }
];
