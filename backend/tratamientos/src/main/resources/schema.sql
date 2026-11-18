CREATE TABLE IF NOT EXISTS tratamiento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(500) NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    texto_alternativo VARCHAR(150) NOT NULL,
    precio_desde INTEGER CHECK (precio_desde >= 0),
    texto_precio VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS catalogo_inicializado (id INTEGER PRIMARY KEY);
