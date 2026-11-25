import type { ReactNode } from 'react';
import { formatPrice } from '../../utils/format';

interface Props {
  subtotal: number;
  /** null = aún no se calcula (en el carrito). */
  shipping: number | null;
  children?: ReactNode;
}

export default function OrderSummary({ subtotal, shipping, children }: Props) {
  const total = subtotal + (shipping ?? 0);
  return (
    <aside className="rounded-lg border border-sand-200 bg-white p-6" aria-label="Resumen del pedido">
      <h2 className="text-xl">Resumen</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-500">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-500">Envío</dt>
          <dd className="font-medium">
            {shipping === null ? 'Se calcula al pagar' : shipping === 0 ? 'Gratis' : formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-sand-200 pt-3 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-semibold">{formatPrice(total)}</dd>
        </div>
      </dl>
      {children && <div className="mt-6">{children}</div>}
    </aside>
  );
}
