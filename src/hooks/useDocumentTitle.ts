import { useEffect } from 'react';
import { BRAND } from '../data/brand';

/** Actualiza el título de la pestaña: "Página — Alba". */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
  }, [title]);
}
