import Menu from "./Menu";
export default function PiePagina({ nombre, enlaces }) {
  return (
    <footer className="pie-pagina">
      <div className="contenedor">
        <p>{nombre} | Proyecto académico</p>
        <Menu enlaces={enlaces} etiqueta="Navegación del pie" />
      </div>
    </footer>
  );
}
