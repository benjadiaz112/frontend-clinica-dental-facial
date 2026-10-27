# Datos de los tratamientos

`api_simulada/db.json` contiene la lista `tratamientos`. `data/tratamientos.js` la obtiene mediante HTTP; el catálogo y el formulario utilizan esa respuesta.

| Tratamiento | `precioDesde` | `textoPrecio` |
| --- | --- | --- |
| Limpieza dental | 25000 | Desde $25.000 |
| Blanqueamiento dental | 80000 | Desde $80.000 |
| Ortodoncia | 20000 | Evaluación desde $20.000 |
| Odontología general | null | Valor según evaluación |
| Armonización facial | null | Valor según evaluación |

Cada objeto también tiene `id`, `nombre`, `descripcion`, `imagen` y `textoAlternativo`. Los importes son referenciales y están expresados en pesos chilenos. `null` indica que el valor depende de una evaluación; no equivale a cero ni a un tratamiento gratis.

Las imágenes usan rutas como `/imagenes/limpieza.jpg`, correspondientes a archivos de `public/imagenes/`. Para cambiar la lista hay que editar el JSON y reiniciar la API.
