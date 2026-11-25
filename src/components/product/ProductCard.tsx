import { Link } from 'react-router-dom';
import { getCategory } from '../../data/categories';
import type { Product } from '../../types';
import { discountPercent } from '../../utils/format';
import Badge from '../ui/Badge';
import Photo from '../ui/Photo';
import Price from '../ui/Price';
import Rating from '../ui/Rating';
import AddToCartButton from './AddToCartButton';
import FavoriteButton from './FavoriteButton';

export default function ProductCard({ product }: { product: Product }) {
  const percent = discountPercent(product.price, product.compareAtPrice);
  const soldOut = product.stock <= 0;
  const lowStock = !soldOut && product.stock <= 5;
  const category = getCategory(product.categoryId);

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-sand-100">
        <Link to={`/productos/${product.slug}`} aria-label={`Ver ${product.name}`} className="block h-full">
          <div className={`h-full transition-transform duration-300 group-hover:scale-[1.03] ${soldOut ? 'opacity-60' : ''}`}>
            <Photo image={product.images[0]} sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw" maxWidth={960} />
          </div>
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {percent > 0 && <Badge tone="sale">-{percent}%</Badge>}
          {product.tags.includes('new') && <Badge tone="new">Nuevo</Badge>}
          {soldOut && <Badge tone="neutral">Agotado</Badge>}
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton productId={product.id} productName={product.name} />
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-ink-500">{category?.name}</p>
        <h3 className="mt-0.5 text-base font-medium">
          <Link to={`/productos/${product.slug}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-ink-500">{product.shortDescription}</p>
        <div className="mt-2">
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="mt-2">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
        {lowStock && <p className="mt-1 text-xs font-medium text-amber-800">Quedan {product.stock}</p>}
        <div className="mt-3 pt-1">
          <AddToCartButton product={product} size="sm" fullWidth />
        </div>
      </div>
    </article>
  );
}
