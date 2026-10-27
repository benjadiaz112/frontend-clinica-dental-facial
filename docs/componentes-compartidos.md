# Componentes compartidos

Los archivos de `components/compartidos/` son componentes React escritos en JSX.

| Archivo | Propiedades principales | Responsabilidad |
| --- | --- | --- |
| `Encabezado.jsx` | `nombre`, `enlaces` | Logo enlazado al inicio y menú principal. |
| `Menu.jsx` | `enlaces`, `etiqueta` | Lista de enlaces y marca de la página activa. |
| `PiePagina.jsx` | `nombre`, `enlaces` | Pie académico y navegación secundaria. |
| `Boton.jsx` | `texto`, `tipo`, `secundario`, `deshabilitado`, `alHacerClic` | Botón reutilizable con apariencia y acción recibidas. |
| `Mensaje.jsx` | `texto`, `tipo` | Aviso informativo, error o resultado correcto. |

`Menu` usa `usePathname` de Next.js para reconocer la dirección actual y aplicar `aria-current`. El texto vacío de `Mensaje` no crea un párrafo; los errores usan `role="alert"` y los demás mensajes `role="status"`.

## Cómo leer las importaciones

`import Link from "next/link"` trae el componente de Next.js utilizado para los enlaces. `import Menu from "./Menu"` trae `Menu.jsx` de la misma carpeta. `@/components/...` usa el alias a la raíz definido en `jsconfig.json`.

Importar permite usar esos componentes en el JSX. Para mostrarlos se escriben elementos como `<Link href="/">Inicio</Link>` o `<Menu enlaces={enlaces} />` dentro del componente.
