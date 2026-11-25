import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { useCatalog } from '../../context/CatalogContext';
import { countByCategory } from '../../utils/catalog';
import { pluralize } from '../../utils/format';
import Photo from '../ui/Photo';

export default function CategoryTiles() {
  const { products } = useCatalog();

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {CATEGORIES.map((c) => {
        const n = countByCategory(products, c.id);
        return (
          <li key={c.id}>
            <Link to={`/productos?categoria=${c.id}`} className="group block">
              <div className="aspect-square overflow-hidden rounded-lg bg-sand-100">
                <div className="h-full transition-transform duration-300 group-hover:scale-[1.04]">
                  <Photo image={c.image} sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw" maxWidth={640} />
                </div>
              </div>
              <h3 className="mt-3 text-base font-medium group-hover:text-accent">{c.name}</h3>
              {products.length > 0 && (
                <p className="text-sm text-ink-500">
                  {n} {pluralize(n, 'producto', 'productos')}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
