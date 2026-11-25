import { Heart } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import CatalogGate from '../components/ui/CatalogGate';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import { useCatalog } from '../context/CatalogContext';
import { useFavorites } from '../context/FavoritesContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function FavoritesList() {
  const { products } = useCatalog();
  const { ids } = useFavorites();
  const favorites = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-page py-10">
      {favorites.length > 0 ? (
        <ProductGrid products={favorites} />
      ) : (
        <EmptyState
          icon={Heart}
          title="Aún no tienes favoritos"
          message="Toca el corazón en cualquier producto para guardarlo aquí."
          action={<Button to="/productos">Explorar productos</Button>}
        />
      )}
    </div>
  );
}

export default function FavoritesPage() {
  useDocumentTitle('Favoritos');
  return (
    <>
      <PageHeader title="Favoritos" subtitle="Tus productos guardados." crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Favoritos' }]} />
      <CatalogGate>
        <FavoritesList />
      </CatalogGate>
    </>
  );
}
