CREATE TABLE IF NOT EXISTS profesional (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS profesional_tratamiento (
    profesional_id BIGINT NOT NULL REFERENCES profesional(id),
    tratamiento_id BIGINT NOT NULL,
    PRIMARY KEY (profesional_id, tratamiento_id)
);

INSERT IGNORE INTO profesional VALUES
    (1, 'Dra. Elisa Soto', 'Odontología general'),
    (2, 'Dr. Pablo Vera', 'Ortodoncia'),
    (3, 'Dra. Ana Campos', 'Armonización facial');
INSERT IGNORE INTO profesional_tratamiento VALUES (1,1), (1,2), (1,4), (2,3), (3,5);
