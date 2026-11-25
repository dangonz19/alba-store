import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import Button from './Button';
import EmptyState from './EmptyState';

/** Muestra carga o error mientras el catálogo no está listo; si lo está, renderiza `children`. */
export default function CatalogGate({ children }: { children: ReactNode }) {
  const { loading, error, reload } = useCatalog();

  if (loading) {
    return (
      <div className="container-page py-24 text-center text-ink-500" role="status">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-sand-200 border-t-accent" aria-hidden="true" />
        Cargando catálogo…
      </div>
    );
  }
  if (error) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={AlertTriangle}
          title="No pudimos cargar los productos"
          message={error}
          action={<Button onClick={reload}>Reintentar</Button>}
        />
      </div>
    );
  }
  return <>{children}</>;
}
