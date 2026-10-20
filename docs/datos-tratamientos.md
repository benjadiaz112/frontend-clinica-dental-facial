# Datos de tratamientos — paso 13

`api_simulada/db.json` contiene los cinco objetos originales. Desde el paso 15, `data/tratamientos.ts` los consulta por HTTP desde la API local. Se mantienen el orden, nombres, descripciones, textos alternativos y precios de `servicios.html`. Solo se añade un identificador numérico y se adapta la ruta de las imágenes a `/imagenes/`, servida por Next.js.

| Tratamiento | precioDesde | textoPrecio |
| --- | --- | --- |
| Limpieza dental | 25000 | Desde $25.000 |
| Blanqueamiento dental | 80000 | Desde $80.000 |
| Ortodoncia | 20000 | Evaluación desde $20.000 |
| Odontología general | null | Valor según evaluación |
| Armonización facial | null | Valor según evaluación |

Los importes son referenciales en pesos chilenos. Ortodoncia conserva el valor de la evaluación, sin presentarlo como precio del tratamiento completo. `null` indica que no existe un precio informado; no significa cero ni atención gratuita.

`services/tratamientosService.ts` expone obtenerTratamientos y delega el fetch a data/. El catálogo utiliza useTratamientos para gestionar la consulta y sus estados. No se agrega CRUD, almacenamiento ni dependencias.
