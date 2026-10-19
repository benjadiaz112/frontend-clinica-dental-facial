# Datos de tratamientos — paso 13

`data/tratamientos.ts` contiene un arreglo de cinco objetos con la interfaz Tratamiento. Se mantienen el orden, nombres, descripciones, textos alternativos y precios de `servicios.html`. Solo se añade un identificador numérico y se adapta la ruta de las imágenes a `/imagenes/`, servida por Next.js.

| Tratamiento | precioDesde | textoPrecio |
| --- | --- | --- |
| Limpieza dental | 25000 | Desde $25.000 |
| Blanqueamiento dental | 80000 | Desde $80.000 |
| Ortodoncia | 20000 | Evaluación desde $20.000 |
| Odontología general | null | Valor según evaluación |
| Armonización facial | null | Valor según evaluación |

Los importes son referenciales en pesos chilenos. Ortodoncia conserva el valor de la evaluación, sin presentarlo como precio del tratamiento completo. `null` indica que no existe un precio informado; no significa cero ni atención gratuita.

`services/tratamientosService.ts` expone obtenerTratamientos, siguiendo las funciones sencillas de los servicios existentes. No se agrega API, CRUD, almacenamiento ni dependencias. Los componentes podrán obtener el catálogo mediante este servicio en el paso 14; la página actual todavía está en preparación.
