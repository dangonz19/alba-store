import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Al cambiar de ruta (no solo de query) vuelve arriba. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
