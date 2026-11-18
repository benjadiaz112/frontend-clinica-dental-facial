# Backend de Clínica Aura

## Arranque local sin XAMPP

Requisitos: **JDK 21**, **Maven**, **Docker con Compose** y **Node.js 24** para el frontend. Arranca Docker Desktop o el servicio de Docker antes de continuar. `docker info` debe mostrar los datos del servidor. Si devuelve un error de acceso, inicia Docker Desktop o pide al administrador del equipo acceso al daemon.

Desde la carpeta `backend`, en una terminal Bash:

```bash
export MYSQL_ROOT_PASSWORD="$(openssl rand -hex 16)"
export MYSQL_AURA_PASSWORD="$(openssl rand -hex 16)"
export AURA_JWT_SECRET="$(openssl rand -hex 32)"
export AURA_INTERNAL_KEY="$(openssl rand -hex 32)"
read -rsp "Contraseña del administrador: " AURA_ADMIN_PASSWORD; echo
read -rsp "Contraseña del paciente: " AURA_USER_PASSWORD; echo
export AURA_ADMIN_PASSWORD AURA_USER_PASSWORD

docker compose up -d --wait mysql
mvn package
bash iniciar-local.sh
```

Guarda los valores en un archivo privado fuera del repositorio para volver a usar los mismos al reiniciar. Las claves de las cuentas deben ser distintas y tener al menos 12 caracteres y hasta 72 bytes. MySQL solo ejecuta el script de creación de bases al inicializar su volumen. Los usuarios de prueba se crean en el primer arranque de Usuarios. Si cambias las variables después de inicializar los datos, las claves ya guardadas se conservan.

En otra terminal, entra a `frontend` y ejecuta:

```bash
npm ci
npm run dev -- --hostname 127.0.0.1
```

Abre [Clínica Aura en localhost](http://localhost:3000). Usa `admin@clinica.test` para administrar el catálogo o `paciente@clinica.test` para reservar. Usa las contraseñas que definiste arriba.

| Aplicación | Puerto | Base MySQL |
| --- | ---: | --- |
| MySQL | 3306 | Una instancia local |
| Gateway | 8080 | — |
| Usuarios | 8081 | aura_usuarios |
| Tratamientos | 8082 | aura_tratamientos |
| Profesionales | 8083 | aura_profesionales |
| Agenda | 8084 | aura_agenda |
| Reservas | 8085 | aura_reservas |
| Next.js | 3000 | — |

Puedes abrir Swagger en [Usuarios](http://127.0.0.1:8081/swagger-ui.html), [Tratamientos](http://127.0.0.1:8082/swagger-ui.html), [Profesionales](http://127.0.0.1:8083/swagger-ui.html), [Agenda](http://127.0.0.1:8084/swagger-ui.html) y [Reservas](http://127.0.0.1:8085/swagger-ui.html). Para probar operaciones protegidas, usa el token devuelto por `POST /api/auth/entrar` en **Authorize**. Los endpoints internos de Agenda requieren también la credencial entre servicios.

Detén el frontend y los servicios con **Ctrl+C** en sus terminales. `docker compose stop mysql` detiene la base y conserva su volumen.

## Verificación

Con todas las aplicaciones iniciadas, desde otra terminal con las claves de prueba exportadas:

```bash
cd backend
AURA_PRUEBA_INTEGRACION=true mvn -pl gateway test
```

La prueba Java llama a Next.js y pasa por el Gateway. Comprueba renovación y cierre de sesión, permisos, validación, CRUD y dos solicitudes simultáneas para un mismo bloque. Usa los datos iniciales y cancela las reservas que crea. Ejecútala sobre una base de demostración.

Consulta el [documento de integración](ARQUITECTURA.md) para explicar el flujo de datos y permisos.
