CREATE TABLE IF NOT EXISTS bloque (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    profesional_id BIGINT NOT NULL,
    inicio DATETIME NOT NULL,
    reserva CHAR(36),
    UNIQUE (profesional_id, inicio)
);
