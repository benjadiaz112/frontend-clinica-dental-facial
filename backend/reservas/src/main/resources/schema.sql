CREATE TABLE IF NOT EXISTS reserva (
    id CHAR(36) PRIMARY KEY,
    correo VARCHAR(254) NOT NULL,
    tratamiento_id BIGINT NOT NULL,
    profesional_id BIGINT NOT NULL,
    bloque_id BIGINT NOT NULL,
    tratamiento VARCHAR(100),
    profesional VARCHAR(100),
    inicio DATETIME,
    estado VARCHAR(12) NOT NULL
);
