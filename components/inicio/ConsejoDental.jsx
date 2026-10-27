export default function ConsejoDental({ consejo }) {
  return (
    <section
      className="contenedor panel inicio-bloque inicio-consejo"
      aria-labelledby="titulo-consejo"
    >
      <div>
        <h2 id="titulo-consejo">{consejo.titulo}</h2>
        <p>{consejo.descripcion}</p>
        <a href={consejo.enlaceVideo} target="_blank" rel="noopener noreferrer">
          Abrir video en YouTube
        </a>
      </div>
      <iframe
        className="video-dental"
        src={consejo.video}
        title="Video educativo sobre cepillado dental"
        loading="lazy"
        allow="encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </section>
  );
}
