# Estructura por capas — paso 5

El proyecto usa un solo repositorio de GitHub. Las carpetas siguientes separan responsabilidades dentro del mismo proyecto; no crean otros repositorios.

## Carpetas y responsabilidades

| Carpeta | Qué contiene | Estado actual |
| --- | --- | --- |
| app/ | Rutas, páginas y layout de Next.js. Compone la interfaz usando componentes y servicios. | Ruta inicial y layout funcionando. |
| components/ | Presentación visual. Recibe información mediante propiedades, sin consultar directamente la API ni el almacenamiento. | PresentacionInicio y componentes compartidos: encabezado, menú, pie, botón y mensaje. |
| hooks/ | Estado y eventos de React para coordinar formularios y otras interacciones. | Reservada para los siguientes pasos. |
| models/ | Interfaces que describen la estructura de los datos. | InformacionClinica define nombre, descripción y aviso. |
| services/ | Funciones que coordinan los datos y las reglas del negocio, sin depender de React ni del DOM. | obtenerInformacionClinica obtiene la información de portada. |
| data/ | Fuentes de datos, funciones CRUD y acceso al almacenamiento o a la API. | Datos estáticos de la clínica; CRUD y persistencia pendientes. |
| styles/ | CSS nativo compartido. | Paso 7: colores, distribución responsiva, tarjetas, botones, campos, mensajes y foco visible. |
| public/ | Recursos que Next.js puede servir, como imágenes. | Reservada; las imágenes originales todavía no se migran. |
| tests/ | Pruebas de funciones y componentes. | Jasmine y Karma; dos casos de PresentacionInicio y tres de componentes compartidos. |
| api_simulada/ | Datos y configuración de la API de demostración. | Reservada; todavía no hay un servidor configurado. |
| docs/ | Alcance, estructura y documentación de testing. | Alcance y explicación de las capas. |

Los archivos `.gitkeep` permiten guardar las carpetas vacías en Git. No contienen funcionalidades.

## Flujo que ya funciona

```text
app/page.tsx
  -> services/clinicaService.ts
    -> data/clinica.ts

app/page.tsx
  -> components/inicio/PresentacionInicio.tsx (recibe los datos por props)

models/InformacionClinica.ts describe los datos usados por esas capas.
app/layout.tsx carga styles/globals.css.
```

La página inicial muestra el mismo contenido que antes. Ahora los datos, la función que los obtiene, la presentación y los estilos están en archivos separados.

El paso 7 añade clases reutilizables y adapta la distribución a móviles. La [guía de estilos comunes](estilos-comunes.md) explica su uso.

El paso 8 integra los [componentes compartidos](componentes-compartidos.md) en el layout y la presentación inicial. Las rutas adicionales continúan pendientes.

## Reglas para continuar

- Mantener código simple y moderno: funciones cortas, nombres claros y estructuras fáciles de escribir a mano, siguiendo el nivel de los ejemplos recibidos. Agregar dependencias o abstracciones solo cuando sean necesarias para el paso correspondiente.
- Mantener las páginas de `app/` pequeñas y dedicar los componentes a mostrar la interfaz.
- Colocar validaciones y cálculos en `services/`, sin `document.getElementById` ni acceso directo al DOM.
- Centralizar en `data/` las operaciones CRUD y el acceso a datos. El archivo JavaScript de datos solicitado por el Anexo 1 se implementará en los siguientes pasos.
- Usar hooks cuando exista estado o interacción; no agregar hooks a componentes que solo muestran propiedades.
- Usar CSS nativo en `styles/`, sin Bootstrap ni otra librería de estilos, según la decisión del usuario. La pauta menciona Bootstrap; esta elección se registra como una diferencia respecto de ese requisito.
- No crear componentes, pantallas administrativas o funciones CRUD ficticias para aparentar que ya están implementados.

## Qué sigue pendiente

La migración del sitio original, el catálogo, registro e inicio de sesión, el flujo equivalente al checkout, la administración, CRUD, persistencia, API y el resto de las pruebas se implementarán después. El entorno inicial de pruebas está explicado en [pruebas-iniciales.md](pruebas-iniciales.md). El Anexo 1 amplía el alcance público y administrativo, como queda registrado en el documento de alcance.

Los archivos HTML originales, `css/`, `js/` e `imagenes/` permanecen disponibles mediante XAMPP. Sus estilos y scripts no se mezclan todavía con los de la nueva aplicación.
