import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { CartLine } from '../../types';
import { maxQuantity } from '../../utils/cart';
import { formatPrice } from '../../utils/format';
import Photo from '../ui/Photo';
import QuantityStepper from '../ui/QuantityStepper';

export default function CartItemRow({ line }: { line: CartLine }) {
  const { setQty, remove } = useCart();
  const { product, quantity, lineTotal } = line;
  const url = `/productos/${product.slug}`;

  return (
    <li className="flex gap-4 py-5">
      <Link to={url} className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-sand-100 sm:h-28 sm:w-28" aria-label={`Ver ${product.name}`}>
        <Photo image={product.images[0]} sizes="112px" maxWidth={320} />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
        <div>
          <h3 className="font-medium">
            <Link to={url} className="hover:text-accent">{product.name}</Link>
          </h3>
          <p className="mt-0.5 text-sm text-ink-500">{formatPrice(product.price)} c/u</p>
          {quantity >= maxQuantity(product) && (
            <p className="mt-1 text-xs text-amber-800">Máximo disponible por pedido</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
          <QuantityStepper
            value={quantity}
            max={maxQuantity(product)}
            onChange={(n) => setQty(product, n)}
            label={`Cantidad de ${product.name}`}
          />
          <div className="flex items-center gap-3">
            <span className="font-semibold">{formatPrice(lineTotal)}</span>
            <button
              type="button"
              onClick={() => remove(product.id)}
              className="rounded p-1.5 text-ink-400 hover:bg-sand-100 hover:text-red-700"
              aria-label={`Quitar ${product.name} del carrito`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
