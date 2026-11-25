# Pruebas de los microservicios

Cada microservicio tiene sus pruebas en `src/test/java`. JUnit ejecuta las pruebas y Mockito simula dependencias como MySQL y las llamadas a otros servicios. Estas pruebas unitarias se ejecutan con los servidores apagados.

| Microservicio | Prueba |
| --- | --- |
| Usuarios | Cuenta válida y rechazo de contraseña incorrecta |
| Tratamientos | Nombre duplicado y eliminación de un registro inexistente |
| Profesionales | Filtro por tratamiento |
| Agenda | Rechazo de credencial incorrecta y liberación del bloque de una reserva |
| Reservas | Permiso para cancelar una cita propia y liberación del bloque |

Desde la carpeta `backend`, con Java 21 y Maven:

```bash
mvn test
```

Para probar solo un módulo y sus dependencias, por ejemplo Usuarios:

```bash
mvn -pl usuarios -am test
```

La prueba de integración del Gateway sigue disponible aparte. Requiere que MySQL, el backend y el frontend estén activos y que los datos iniciales estén cargados.

```bash
source ~/.clinica-aura-local.env
AURA_PRUEBA_INTEGRACION=true mvn -pl gateway test
```

## Arranque desde VS Code

Abre la carpeta raíz que contiene `backend` y `frontend`. Instala **Extension Pack for Java** y **Spring Boot Extension Pack**. Con Docker Desktop abierto, el backend empaquetado con `mvn package` y el archivo privado `~/.clinica-aura-local.env` configurado, elige **Terminal → Run Task → Clínica Aura: iniciar backend**. La tarea inicia MySQL, los cinco microservicios y el Gateway.

Para arrancar cada aplicación por separado desde Spring Boot Dashboard, el entorno de ejecución debe incluir las variables de conexión y sesión que lee ese servicio. Si prefieres ejecutar todo junto, la tarea ya carga esas variables.
