# Arquitectura de Clínica Aura

El navegador abre Next.js en el puerto 3000. Next.js reenvía /api al Gateway en 8080. Cada aplicación Spring Boot tiene un puerto propio. El Gateway enruta solicitudes, y los servicios validan permisos.

| Servicio | Puerto | Datos propios |
| --- | ---: | --- |
| Usuarios | 8081 | Usuarios, roles y renovación de sesión |
| Tratamientos | 8082 | Catálogo e imágenes de referencia |
| Profesionales | 8083 | Especialistas y tratamientos asociados |
| Agenda | 8084 | Horarios y bloqueo de bloques |
| Reservas | 8085 | Reservas y cancelaciones de pacientes |

El administrador mantiene el catálogo. El paciente consulta tratamientos, selecciona profesional y horario, y reserva o cancela una cita propia. Cada servicio guarda sus datos en su propia base MySQL.

## Contratos REST

- `POST /api/auth/entrar`, `/renovar`, `/salir`: sesión.
- `GET /api/tratamientos`, `GET /api/tratamientos/{id}`: catálogo público. POST, PUT y DELETE sobre el catálogo requieren ADMIN.
- `GET /api/profesionales?tratamientoId=...`: lista de especialistas filtrada por tratamiento.
- `GET /api/agenda?profesionalId=...`: horarios futuros disponibles.
- `GET /api/reservas`, `POST /api/reservas` y `DELETE /api/reservas/{id}`: acciones del paciente autenticado.

El Gateway publica estas rutas. Las rutas internas de Agenda se consumen desde Reservas.
