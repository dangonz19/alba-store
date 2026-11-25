import type { CatalogFilters, CategoryId, PriceRangeId, Product, SortOption } from '../types';
import { discountPercent } from './format';

export const DEFAULT_FILTERS: CatalogFilters = {
  query: '',
  category: 'all',
  priceRange: 'all',
  onSale: false,
  sort: 'relevance',
};

export const PRICE_RANGES: { id: PriceRangeId; label: string; min: number; max: number }[] = [
  { id: 'all', label: 'Todos los precios', min: 0, max: Infinity },
  { id: 'under-15', label: 'Hasta $15.000', min: 0, max: 15000 },
  { id: '15-30', label: '$15.000 – $30.000', min: 15000, max: 30000 },
  { id: '30-60', label: '$30.000 – $60.000', min: 30000, max: 60000 },
  { id: '60-plus', label: 'Más de $60.000', min: 60000, max: Infinity },
];

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'relevance', label: 'Destacados' },
  { id: 'price-asc', label: 'Precio: menor a mayor' },
  { id: 'price-desc', label: 'Precio: mayor a menor' },
  { id: 'rating', label: 'Mejor valorados' },
  { id: 'newest', label: 'Novedades' },
  { id: 'discount', label: 'Mayor descuento' },
];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const isOnSale = (p: Product) => discountPercent(p.price, p.compareAtPrice) > 0;

function matchesQuery(p: Product, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  return normalize(`${p.name} ${p.shortDescription} ${p.description}`).includes(q);
}

function matchesPrice(p: Product, range: PriceRangeId): boolean {
  const r = PRICE_RANGES.find((x) => x.id === range);
  if (!r) return true;
  // Rango [min, max): un producto de $15.000 pertenece a "$15.000 – $30.000"
  return p.price >= r.min && p.price < r.max;
}

const featuredRank = (p: Product) => (p.tags.includes('featured') ? 0 : 1);

const comparators: Record<SortOption, (a: Product, b: Product) => number> = {
  relevance: (a, b) => featuredRank(a) - featuredRank(b) || b.rating - a.rating,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  newest: (a, b) => b.addedAt.localeCompare(a.addedAt),
  discount: (a, b) =>
    discountPercent(b.price, b.compareAtPrice) - discountPercent(a.price, a.compareAtPrice),
};

/** Aplica búsqueda, filtros y orden. No modifica el arreglo original. */
export function filterAndSort(products: Product[], filters: CatalogFilters): Product[] {
  return products
    .filter((p) => filters.category === 'all' || p.categoryId === filters.category)
    .filter((p) => matchesQuery(p, filters.query))
    .filter((p) => matchesPrice(p, filters.priceRange))
    .filter((p) => !filters.onSale || isOnSale(p))
    .sort(comparators[filters.sort]);
}

export function countActiveFilters(filters: CatalogFilters): number {
  return (
    (filters.query.trim() ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.onSale ? 1 : 0)
  );
}

export function relatedProducts(products: Product[], product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId);
  const others = products.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId);
  return [...sameCategory, ...others].slice(0, limit);
}

export const countByCategory = (products: Product[], id: CategoryId) =>
  products.filter((p) => p.categoryId === id).length;

// --- Conversión filtros <-> URL ---------------------------------------------

const isCategory = (v: string | null, valid: string[]): v is CategoryId => !!v && valid.includes(v);

export function filtersFromParams(params: URLSearchParams, validCategories: string[]): CatalogFilters {
  const category = params.get('categoria');
  const price = params.get('precio');
  const sort = params.get('orden');
  return {
    query: params.get('q') ?? '',
    category: isCategory(category, validCategories) ? category : 'all',
    priceRange: PRICE_RANGES.some((r) => r.id === price) ? (price as PriceRangeId) : 'all',
    onSale: params.get('oferta') === '1',
    sort: SORT_OPTIONS.some((s) => s.id === sort) ? (sort as SortOption) : 'relevance',
  };
}

export function paramsFromFilters(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.category !== 'all') params.set('categoria', filters.category);
  if (filters.priceRange !== 'all') params.set('precio', filters.priceRange);
  if (filters.onSale) params.set('oferta', '1');
  if (filters.sort !== 'relevance') params.set('orden', filters.sort);
  return params;
}
