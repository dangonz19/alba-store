/** Lee JSON de localStorage con manejo de errores. Devuelve null si no hay dato válido. */
export function readJSON<T>(key: string, validate: (value: unknown) => value is T): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Almacenamiento lleno o bloqueado (modo privado): la app sigue funcionando en memoria.
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nada que hacer.
  }
}

export const STORAGE_KEYS = {
  cart: 'alba:cart:v1',
  favorites: 'alba:favorites:v1',
  lastOrder: 'alba:last-order:v1',
} as const;
