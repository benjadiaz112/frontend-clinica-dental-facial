# Catálogo conectado — paso 15

La ruta `/tratamientos` muestra el título y aviso originales. CatalogoTratamientos recibe los resultados del hook useTratamientos y muestra carga, error, lista vacía o tarjetas. TarjetaTratamiento recibe un objeto por propiedades y muestra imagen, nombre, descripción y texto de precio original.

Flujo: página → componentes → hook → data/tratamientos.ts → API local. El fetch se mantiene en data/; los componentes no acceden directamente al servidor ni al JSON. useState guarda datos, carga y error; useEffect inicia la consulta y cancela la petición con AbortController al salir de la página.

## Ejecutar

En una terminal ejecutar `npm run api`; en otra, `npm run dev`. Abrir `http://localhost:3000/tratamientos`. La consulta apunta a `http://127.0.0.1:3001/tratamientos`, por lo que esta configuración es para ejecución local. No se utiliza como configuración de despliegue público.

Sin la API se muestra un error; después de iniciarla se puede recargar la página. No se oculta el error sustituyendo la respuesta por datos locales. Una respuesta HTTP incorrecta, JSON inválido o una respuesta que no sea una lista se trata como error.

## Archivos

- app/tratamientos/page.tsx: composición de la página.
- components/tratamientos/CatalogoTratamientos.tsx: estados y lista de tarjetas.
- components/tratamientos/TarjetaTratamiento.tsx: presentación por propiedades.
- hooks/useTratamientos.ts: estado y ciclo de la consulta.
- data/tratamientos.ts: fetch y comprobación de respuesta HTTP y lista.
- styles/tratamientos.css: Flexbox, tarjetas y adaptación móvil con CSS nativo.
- tests/CatalogoTratamientos.spec.tsx: cuatro casos con fetch simulado, sin depender de la API real.

Se mantienen los cinco tratamientos originales y los precios según evaluación. El catálogo permite la [selección única](seleccion-tratamiento.md), su limpieza y el enlace al [formulario implementado](formulario-reserva.md).

## Verificación

Las pruebas representativas del catálogo, TypeScript y compilación se ejecutan correctamente. En Edge se comprobó la conexión con la API real, cinco tarjetas e imágenes cargadas y ausencia de desbordamiento a 1280, 768, 375 y 320 píxeles. Se comprobaron los estados de carga, vacío y error con respuestas simuladas, y la recuperación al recargar con la API disponible. Se revisaron capturas de escritorio y móvil. La medición actual está en el [informe de testing](../INFORME-TESTING.md).
