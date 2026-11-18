# Frontend de Clínica Aura

Sitio Next.js y React para consultar tratamientos y solicitar una evaluación. Se conecta a los microservicios Spring Boot mediante el Gateway. La [guía de arranque completa](../backend/README.md) describe MySQL, cuentas y los seis procesos Java.

```bash
npm ci
npm run dev -- --hostname 127.0.0.1
```

Abre [localhost:3000](http://localhost:3000). Las peticiones de la web a `/api` pasan por Next.js al Gateway de `127.0.0.1:8080`.

- Paciente: consulta el catálogo, selecciona profesional y horario, confirma y cancela sus propias reservas.
- Administrador: crea, edita y elimina tratamientos.
- Las vistas protegidas consultan la sesión y la API verifica el rol en cada operación protegida.

`npm test` conserva cinco comprobaciones QUnit del proyecto anterior. `npm run test:web` las muestra en [localhost:4000](http://127.0.0.1:4000/tests/index.html). Las pruebas actuales de integración están en Java en el backend.

Los HTML originales, `api_simulada` y el ERS del Parcial 2 quedan como referencia. Consulta el [manual del Parcial 3](docs/MANUAL-PARCIAL-3.md) para el recorrido actual.
