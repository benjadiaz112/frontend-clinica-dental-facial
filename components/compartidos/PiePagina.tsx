interface Propiedades {
  nombre: string;
}

export default function PiePagina({ nombre }: Propiedades) {
  return (
    <footer className="pie-pagina">
      <div className="contenedor">
        <p>{nombre} | Proyecto académico</p>
      </div>
    </footer>
  );
}
