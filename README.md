# Alba — Tienda online (React + TypeScript)

Alba es una tienda ficticia de objetos para el hogar (cerámica, iluminación, textiles, aromas y escritorio). Es un **frontend completo** hecho para portafolio: sin backend, con datos locales y una arquitectura lista para conectar una API real.

> No procesa pagos reales ni pide datos de tarjeta. El checkout es una simulación.

## Tecnologías

- React 18 + TypeScript (modo estricto)
- Vite 5
- Tailwind CSS 3
- React Router 6
- Lucide React (iconos)

## Instalación y uso

Requiere Node.js 18 o superior.

```bash
git clone <url-del-repositorio>
cd alba-store
npm install
npm run dev
```

Otros comandos:

```bash
npm run build      # revisa tipos (tsc) y genera /dist
npm run preview    # sirve el build localmente
npm run typecheck  # solo revisión de tipos
```

## Funcionalidades

- **Inicio:** hero, destacados, categorías, novedades, ofertas, beneficios, banner, newsletter y footer.
- **Catálogo:** búsqueda, filtro por categoría y precio, solo ofertas, 6 criterios de orden, estado sin resultados. Los filtros viven en la URL (`/productos?categoria=textiles&orden=price-asc`), así que se pueden compartir y funciona el botón "atrás".
- **Detalle de producto:** galería, precio y descuento, stock, cantidad, agregar al carrito, favoritos, características, descripción y relacionados.
- **Categorías, Favoritos y 404.**
- **Carrito:** agregar, quitar, cambiar cantidades, subtotal, total y vaciar. Persistido en `localStorage`.
- **Checkout simulado:** contacto, método de envío, dirección (se oculta con retiro en tienda), resumen y validación. Al confirmar se guarda el pedido y se muestra la página de confirmación.
- **Accesibilidad básica:** HTML semántico, enlace "saltar al contenido", etiquetas en formularios, `aria-label` en botones de icono, foco visible y respeto a `prefers-reduced-motion`.
- **Imágenes:** fotografías referenciales de [Unsplash](https://unsplash.com) (licencia Unsplash), servidas desde su CDN con `srcset` responsivo (`src/utils/images.ts`, componente `Photo`). Si una foto falla, se muestra el fondo arena en su lugar.
- **Tipografía:** Inter (texto) y Manrope (títulos), autoalojadas como fuentes variables con `@fontsource-variable`.

## Estructura

```
src/
├── components/
│   ├── ui/          Botón, Badge, Rating, Field, Drawer, EmptyState… (genéricos)
│   ├── product/     Tarjeta, grilla, galería, botones de carrito/favorito
│   ├── layout/      Navbar, Footer, Logo
│   ├── home/        Secciones de la portada
│   ├── catalog/     Panel de filtros
│   └── cart/        Fila de carrito y resumen del pedido
├── context/         Estado global: Catalog, Cart, Favorites
├── data/            Productos, categorías, envíos, regiones, marca
├── hooks/           useLocalStorage, useDocumentTitle
├── layouts/         MainLayout, ScrollToTop
├── pages/           Una carpeta-archivo por ruta
├── services/        productService (acceso a datos)
├── types/           Tipos compartidos
└── utils/           Funciones puras: cart, catalog, format, storage, validation
```

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/productos` | Catálogo (acepta `q`, `categoria`, `precio`, `oferta`, `orden`) |
| `/productos/:slug` | Detalle |
| `/categorias` | Categorías |
| `/carrito` | Carrito |
| `/checkout` | Checkout simulado |
| `/pedido-confirmado` | Confirmación |
| `/favoritos` | Favoritos |
| `*` | 404 |

## Cómo conectar una API real

Todo el acceso a datos pasa por `src/services/productService.ts`. Copia `.env.example` a `.env` y define `VITE_API_URL`; el servicio intentará `GET {VITE_API_URL}/products` (debe devolver `Product[]`, ver `src/types`) y, si falla, usa los datos locales. Los componentes no cambian.

## Posibles mejoras

- Backend real (productos, usuarios, pedidos) y pagos con una pasarela en modo prueba.
- Cuentas de usuario e historial de pedidos.
- Reseñas reales y fotografías propias de producto.
- Tests con Vitest y React Testing Library (las funciones de `utils/` ya son puras y fáciles de probar).
- Paginación o carga progresiva del catálogo.
- Internacionalización y modo oscuro.
