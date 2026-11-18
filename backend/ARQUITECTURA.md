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

## Tecnologías y responsabilidades

**Java 21 y Spring Boot** levantan seis aplicaciones. Los controladores definen los endpoints REST, **Spring JDBC** hace consultas con parámetros y **MySQL** guarda los datos. **Spring Security** comprueba el JWT y el rol antes de permitir escrituras. **Spring Cloud Gateway** reenvía las cinco rutas públicas. **Springdoc** genera Swagger y OpenAPI en cada servicio. **Maven** compila aplicaciones y pruebas. **Docker Compose** inicia MySQL con un volumen persistente.

En el frontend, **Next.js y React** muestran el catálogo, gestionan la sesión, enseñan las vistas según el rol y envían las peticiones a `/api`. Next.js las reenvía al Gateway para que navegador y frontend compartan origen, incluida la cookie. El acceso directo a la API también se comprueba con Spring Security: una operación protegida devuelve 401 sin token y 403 con el rol incorrecto.

## Inicio de sesión

Usuarios compara la contraseña con su hash BCrypt. Emite un JWT firmado HS256 de hasta cinco minutos que el frontend guarda en memoria. La sesión se recupera usando una cookie HttpOnly y SameSite Strict que contiene una credencial aleatoria. El backend guarda su huella SHA-256 en MySQL. Cada renovación reemplaza la credencial anterior y respeta el límite de ocho horas. Al cerrar sesión se elimina la credencial de renovación. Los JWT ya emitidos siguen siendo válidos hasta su expiración. Si se habilita HTTPS, configura `AURA_COOKIE_SECURE=true`.

## Reserva y consistencia

Reservas registra el UUID del intento y el correo del paciente, verifica el tratamiento y su profesional, y solicita el horario a Agenda. Agenda usa un UPDATE condicional en MySQL: un único intento puede ocupar un bloque libre. El mismo UUID permite repetir la solicitud sin duplicar la reserva. La cancelación libera únicamente el bloque asociado a ese UUID. Los endpoints internos de Agenda requieren el JWT de paciente y una clave compartida entre esos dos servicios.

Una interrupción entre los servicios puede dejar la solicitud pendiente. Se puede reintentar con el mismo UUID desde el formulario abierto o cancelar el intento desde Mis reservas. Cada servicio administra su propia base. Los profesionales están asociados a los tratamientos iniciales. Los tratamientos nuevos pueden mostrarse en el catálogo y requerir una asociación antes de que ofrezcan horarios.

El entorno está pensado para localhost y cuentas de demostración.
