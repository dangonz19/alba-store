import { CheckCircle2, ReceiptText } from 'lucide-react';
import { useMemo } from 'react';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Order } from '../types';
import { formatDate, formatPrice } from '../utils/format';
import { STORAGE_KEYS, readJSON } from '../utils/storage';

const isOrder = (v: unknown): v is Order =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as Order).number === 'string' &&
  Array.isArray((v as Order).lines) &&
  typeof (v as Order).total === 'number';

export default function OrderConfirmationPage() {
  useDocumentTitle('Pedido confirmado');
  const order = useMemo(() => readJSON(STORAGE_KEYS.lastOrder, isOrder), []);

  if (!order) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ReceiptText}
          title="No hay un pedido reciente"
          message="Cuando completes una compra, el resumen aparecerá aquí."
          action={<Button to="/productos">Ir a la tienda</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container-page max-w-2xl py-14">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <h1 className="mt-4 text-3xl">¡Gracias por tu pedido, {order.customer.fullName.split(' ')[0]}!</h1>
        <p className="mt-2 text-ink-500">
          Pedido <strong className="text-ink-900">{order.number}</strong> · {formatDate(order.createdAt)}
        </p>
        <p className="mt-1 text-sm text-ink-500">Te enviaríamos la confirmación a {order.customer.email}. Esto es una simulación.</p>
      </div>

      <section className="mt-10 rounded-lg border border-sand-200 bg-white p-6" aria-label="Detalle del pedido">
        <ul className="divide-y divide-sand-100 text-sm">
          {order.lines.map((l) => (
            <li key={l.name} className="flex justify-between gap-3 py-2.5">
              <span>{l.quantity} × {l.name}</span>
              <span>{formatPrice(l.quantity * l.unitPrice)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-sand-200 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-ink-500">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-ink-500">{order.shippingName}</dt><dd>{order.shippingCost === 0 ? 'Gratis' : formatPrice(order.shippingCost)}</dd></div>
          <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
        </dl>
        <p className="mt-5 border-t border-sand-200 pt-4 text-sm text-ink-500">
          <span className="font-medium text-ink-700">Entrega: </span>{order.address}
        </p>
      </section>

      <div className="mt-8 flex justify-center gap-3">
        <Button to="/productos">Seguir comprando</Button>
        <Button to="/" variant="secondary">Ir al inicio</Button>
      </div>
    </div>
  );
}
