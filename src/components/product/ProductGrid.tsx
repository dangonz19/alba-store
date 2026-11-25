import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  /** Columnas en pantallas grandes. */
  columns?: 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: Props) {
  const lg = columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 ${lg}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
