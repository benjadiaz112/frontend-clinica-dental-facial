export interface Tratamiento {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  textoAlternativo: string;
  precioDesde: number | null;
  textoPrecio: string;
}
