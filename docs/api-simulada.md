# API simulada — paso 14

Se prepara una API local de consulta para los cinco tratamientos, solicitada por el usuario. Es un apoyo para el catálogo y futuras pruebas con mocks; no se presenta como una exigencia explícita de la pauta ni incorpora administración.

## Ejecutar

Desde la raíz del repositorio, en una terminal:

```bash
npm run api
```

Consultar `http://127.0.0.1:3001/tratamientos`. Detener con Ctrl+C. La API solo escucha en el equipo local. Si el puerto 3001 está ocupado, liberar ese puerto antes de iniciarla.

En otra terminal ejecutar `npm run dev` para Next.js, en el puerto 3000. Desde el paso 15, `/tratamientos` consulta esta API mediante fetch a través de las capas data/ y services/. Sin API disponible se muestra un error; iniciarla y recargar permite volver a consultar.

## Archivos

- `api_simulada/db.json`: única fuente de los cinco tratamientos originales. Conserva nombres, descripciones, imágenes, textos alternativos, precios y valores null.
- `api_simulada/servidor.js`: servidor pequeño escrito en JavaScript con el módulo http incluido en Node.js, sin instalar dependencias.
- `data/tratamientos.ts`: consulta la API y comprueba el estado HTTP y que la respuesta sea una lista. db.json sigue siendo la fuente de datos del servidor.
- `package.json`: agrega el comando api.

## Respuestas

| Petición | Resultado |
| --- | --- |
| GET /tratamientos | 200 y un arreglo con cinco tratamientos. |
| Otra ruta | 404 con mensaje JSON. |
| Otro método en /tratamientos | 405 con mensaje JSON y cabecera Allow: GET. |

Se permite lectura desde el navegador mediante Access-Control-Allow-Origin. No hay creación, edición, eliminación, autenticación ni datos personales. Las imágenes siguen sirviéndose desde Next.js en `/imagenes/`; la API entrega sus rutas, no los archivos.

Los datos se cargan al iniciar el servidor: después de editar db.json hay que reiniciarlo. El servidor no modifica ese archivo.

## Verificación realizada

Compilación y TypeScript correctos. Se verificó por HTTP: GET devuelve los cinco tratamientos idénticos al HTML original, JSON UTF-8 y cabecera CORS; ruta inexistente devuelve 404; POST, PUT, PATCH y DELETE devuelven 405 con Allow: GET. El archivo de datos permaneció intacto. El servidor usado para la comprobación se detuvo al terminar.
