# API simulada local

La API es un servidor pequeño de Node.js. `api_simulada/servidor.js` utiliza `node:http`, carga `api_simulada/db.json` y escucha en `127.0.0.1:3001`.

## Encenderla

Desde la carpeta de `package.json`:

```bash
npm run api
```

Ese script ejecuta `node api_simulada/servidor.js`. El mensaje de la terminal indica cuándo está lista. Se detiene con `Ctrl+C`.

La página se inicia por separado con `npm run dev`, en otra terminal. La API entrega datos; Next.js sirve la interfaz en el puerto 3000.

## Consulta y respuestas

`data/tratamientos.js` hace `fetch("http://127.0.0.1:3001/tratamientos")`. Comprueba el estado HTTP y que el JSON sea una lista.

| Solicitud | Respuesta del servidor |
| --- | --- |
| `GET /tratamientos` | 200 con los cinco tratamientos en JSON. |
| Otra ruta | 404 con mensaje JSON. |
| Otro método en `/tratamientos` | 405 y cabecera `Allow: GET`. |
| Datos configurados inválidos | 500 con mensaje JSON. |

El servidor comprueba los campos de cada tratamiento antes de devolver la lista. Las cabeceras indican JSON con UTF-8 y permiten la consulta desde el navegador. Las imágenes se sirven desde `public/imagenes/` por Next.js; la API solo entrega sus rutas.

Los datos se leen al iniciar el proceso. Después de editar `db.json` hay que reiniciar la API. Esta implementación local no crea, modifica ni guarda reservas. Las cinco pruebas unitarias actuales no necesitan encenderla.
