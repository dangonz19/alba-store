import Button from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Página no encontrada');
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Error 404</p>
      <h1 className="mt-3 text-4xl">Esta página no existe</h1>
      <p className="mt-3 max-w-md text-ink-500">El enlace puede estar roto o la página fue movida. Volvamos a un lugar conocido.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/">Ir al inicio</Button>
        <Button to="/productos" variant="secondary">Ver productos</Button>
      </div>
    </div>
  );
}
