import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartItem, CartLine, Product } from '../types';
import { addItem, buildLines, countOf, isCartItemList, removeItem, setQuantity, subtotalOf } from '../utils/cart';
import { STORAGE_KEYS } from '../utils/storage';
import { useCatalog } from './CatalogContext';

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number) => void;
  setQty: (product: Product, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  quantityOf: (productId: string) => number;
}

const CartContext = createContext<CartValue | null>(null);
const EMPTY: CartItem[] = [];

export function CartProvider({ children }: { children: ReactNode }) {
  const { products } = useCatalog();
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEYS.cart, EMPTY, isCartItemList);

  // Mientras el catálogo carga no hay productos con los que unir: no se muestran líneas.
  const lines = useMemo(() => buildLines(items, products), [items, products]);

  const add = useCallback(
    (product: Product, quantity = 1) => setItems((prev) => addItem(prev, product, quantity)),
    [setItems],
  );
  const setQty = useCallback(
    (product: Product, quantity: number) => setItems((prev) => setQuantity(prev, product, quantity)),
    [setItems],
  );
  const remove = useCallback((productId: string) => setItems((prev) => removeItem(prev, productId)), [setItems]);
  const clear = useCallback(() => setItems(EMPTY), [setItems]);
  const quantityOf = useCallback(
    (productId: string) => lines.find((l) => l.product.id === productId)?.quantity ?? 0,
    [lines],
  );

  const value = useMemo(
    () => ({ lines, count: countOf(lines), subtotal: subtotalOf(lines), add, setQty, remove, clear, quantityOf }),
    [lines, add, setQty, remove, clear, quantityOf],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
