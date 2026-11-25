import { SHIPPING_METHODS } from '../data/shipping';
import type { CartItem, CartLine, Product, ShippingId } from '../types';

export const MAX_PER_LINE = 10;

/** Cantidad máxima que se puede comprar de un producto (stock y tope por línea). */
export const maxQuantity = (product: Product) => Math.min(product.stock, MAX_PER_LINE);

export const isCartItem = (v: unknown): v is CartItem =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as CartItem).productId === 'string' &&
  Number.isInteger((v as CartItem).quantity) &&
  (v as CartItem).quantity > 0;

export const isCartItemList = (v: unknown): v is CartItem[] => Array.isArray(v) && v.every(isCartItem);

/** Agrega una unidad (o `quantity`) respetando el máximo permitido. */
export function addItem(items: CartItem[], product: Product, quantity = 1): CartItem[] {
  const max = maxQuantity(product);
  if (max <= 0) return items;
  const existing = items.find((i) => i.productId === product.id);
  if (!existing) return [...items, { productId: product.id, quantity: Math.min(quantity, max) }];
  return items.map((i) =>
    i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, max) } : i,
  );
}

/** Fija la cantidad de una línea; cantidad <= 0 la elimina. */
export function setQuantity(items: CartItem[], product: Product, quantity: number): CartItem[] {
  if (quantity <= 0) return items.filter((i) => i.productId !== product.id);
  const safe = Math.min(quantity, maxQuantity(product));
  return items.map((i) => (i.productId === product.id ? { ...i, quantity: safe } : i));
}

export const removeItem = (items: CartItem[], productId: string): CartItem[] =>
  items.filter((i) => i.productId !== productId);

/**
 * Une los items guardados con el catálogo actual: descarta productos que ya no
 * existen o sin stock y recorta cantidades que superan el máximo.
 */
export function buildLines(items: CartItem[], catalog: Product[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = catalog.find((p) => p.id === item.productId);
    if (!product) continue;
    const quantity = Math.min(item.quantity, maxQuantity(product));
    if (quantity <= 0) continue;
    lines.push({ product, quantity, lineTotal: product.price * quantity });
  }
  return lines;
}

export const subtotalOf = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.lineTotal, 0);

export const countOf = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.quantity, 0);

export function shippingCost(shippingId: ShippingId, subtotal: number): number {
  const method = SHIPPING_METHODS.find((m) => m.id === shippingId);
  if (!method) return 0;
  if (method.freeOver !== undefined && subtotal >= method.freeOver) return 0;
  return method.price;
}
