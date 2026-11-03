# SPOTLIGHT

## Estructura
- HTML: páginas principales del sitio.
- `css/global.css`: estilos compartidos.
- `css/<pagina>.css`: estilos particulares de cada página.
- `js/<pagina>.js`: lógica de cada página.
- `js/config/`: configuraciones de Tailwind separadas de la lógica.
- `assets/`: imágenes, iconos y fuentes.

## Cómo ejecutar
Abre `index.html` en el navegador o utiliza Live Server en Visual Studio Code.

## Notas
- Se conservaron los HTML y la lógica JavaScript original.
- Los archivos de configuración de Tailwind se movieron a `js/config/`.
- Los estilos base repetidos se centralizaron en `css/global.css`.
- Los estilos del catálogo se combinaron en `css/catalogo.css`.
- Se conservaron los estilos en línea del HTML para evitar cambios visuales involuntarios.
- Tailwind y algunas fuentes siguen cargándose desde CDN/Google Fonts, por lo que requieren internet.
- No se agregó backend porque el ZIP original no incluía uno.
