import { PRODUCTS } from '../data/products';
import type { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Capa de acceso a datos. Hoy lee los productos locales; si defines VITE_API_URL
 * intenta GET {VITE_API_URL}/products y, si falla, vuelve a los datos locales.
 * El resto de la app solo depende de esta función, así que migrar a un backend
 * real no requiere tocar componentes.
 */
export async function fetchCatalog(): Promise<Product[]> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Product[];
    } catch (err) {
      console.warn('No se pudo leer la API, se usan los datos locales.', err);
    }
  }
  await wait(250); // simula latencia de red
  return PRODUCTS;
}
