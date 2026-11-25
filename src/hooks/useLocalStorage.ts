import { useCallback, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

/**
 * Como useState, pero persistido en localStorage.
 * - Lee el valor guardado al iniciar (si no es válido usa `initial`).
 * - Guarda cada cambio.
 * - Se sincroniza entre pestañas escuchando el evento `storage`.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
  validate: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => readJSON(key, validate) ?? initial);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        writeJSON(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      setValue(readJSON(key, validate) ?? initial);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // `initial` y `validate` son estables en los usos de esta app.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, update] as const;
}
