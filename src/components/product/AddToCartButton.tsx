import { Check, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { maxQuantity } from '../../utils/cart';
import Button from '../ui/Button';

interface Props {
  product: Product;
  quantity?: number;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function AddToCartButton({ product, quantity = 1, size = 'md', fullWidth }: Props) {
  const { add, quantityOf } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  const inCart = quantityOf(product.id);
  const soldOut = product.stock <= 0;
  const atLimit = !soldOut && inCart >= maxQuantity(product);

  if (soldOut) {
    return (
      <Button size={size} fullWidth={fullWidth} disabled>
        Agotado
      </Button>
    );
  }

  return (
    <Button
      size={size}
      fullWidth={fullWidth}
      disabled={atLimit}
      onClick={() => {
        add(product, quantity);
        setJustAdded(true);
      }}
    >
      {justAdded ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" /> Agregado
        </>
      ) : atLimit ? (
        'Máximo en el carrito'
      ) : (
        <>
          {/* En cards angostas (móvil) el ícono se oculta para que el texto quepa en una línea. */}
          <ShoppingBag className={`h-4 w-4 shrink-0 ${size === 'sm' ? 'hidden min-[420px]:block' : ''}`} aria-hidden="true" />
          <span className="whitespace-nowrap">Agregar al carrito</span>
        </>
      )}
    </Button>
  );
}
