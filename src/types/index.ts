export type CategoryId = 'ceramica' | 'iluminacion' | 'textiles' | 'aromas' | 'escritorio';

export type ProductTag = 'featured' | 'new';

/**
 * Fotografía de producto. `id` es el identificador de la foto en Unsplash
 * (la parte "photo-…" de su URL); la URL final se arma en utils/images.ts.
 */
export interface ProductImage {
  id: string;
  /** Texto alternativo descriptivo, en español. */
  alt: string;
  /** Punto focal opcional para el recorte (object-position), p. ej. "50% 70%". */
  focus?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: ProductImage;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: CategoryId;
  /** Precio en pesos chilenos (entero). */
  price: number;
  /** Precio anterior; si existe, el producto está en oferta. */
  compareAtPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  features: string[];
  tags: ProductTag[];
  /** Fecha ISO de alta, se usa para ordenar por novedad. */
  addedAt: string;
  /** Primera imagen = portada en cards; el resto aparece en la galería del detalle. */
  images: ProductImage[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

/** Línea de carrito ya unida con los datos del producto. */
export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest'
  | 'discount';

export type PriceRangeId = 'all' | 'under-15' | '15-30' | '30-60' | '60-plus';

export interface CatalogFilters {
  query: string;
  category: CategoryId | 'all';
  priceRange: PriceRangeId;
  onSale: boolean;
  sort: SortOption;
}

export type ShippingId = 'standard' | 'express' | 'pickup';

export interface ShippingMethod {
  id: ShippingId;
  name: string;
  description: string;
  price: number;
  /** Si el subtotal supera este valor el envío es gratis. */
  freeOver?: number;
  requiresAddress: boolean;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  notes: string;
  shipping: ShippingId;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

export interface Order {
  number: string;
  createdAt: string;
  lines: { name: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  customer: { fullName: string; email: string };
  shippingName: string;
  address: string;
}
