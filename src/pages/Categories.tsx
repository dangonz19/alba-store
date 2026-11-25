import { Link } from 'react-router-dom';
import Photo from '../components/ui/Photo';
import CatalogGate from '../components/ui/CatalogGate';
import PageHeader from '../components/ui/PageHeader';
import { CATEGORIES } from '../data/categories';
import { useCatalog } from '../context/CatalogContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { countByCategory } from '../utils/catalog';
import { pluralize } from '../utils/format';

function CategoryList() {
  const { products } = useCatalog();
  return (
    <ul className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((c) => {
        const n = countByCategory(products, c.id);
        return (
          <li key={c.id}>
            <Link to={`/productos?categoria=${c.id}`} className="group block overflow-hidden rounded-lg border border-sand-200 bg-white transition-shadow hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden bg-sand-100">
                <div className="h-full transition-transform duration-300 group-hover:scale-[1.03]">
                  <Photo image={c.image} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" maxWidth={960} />
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl group-hover:text-accent">{c.name}</h2>
                <p className="mt-1 text-sm text-ink-500">{c.description}</p>
                <p className="mt-3 text-sm font-medium text-accent">
                  {n} {pluralize(n, 'producto', 'productos')}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function CategoriesPage() {
  useDocumentTitle('Categorías');
  return (
    <>
      <PageHeader title="Categorías" subtitle="Explora la tienda por tipo de producto." crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Categorías' }]} />
      <CatalogGate>
        <CategoryList />
      </CatalogGate>
    </>
  );
}
