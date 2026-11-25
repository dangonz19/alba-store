import { ShoppingBag } from 'lucide-react';
import CartItemRow from '../components/cart/CartItemRow';
import OrderSummary from '../components/cart/OrderSummary';
import Button from '../components/ui/Button';
import CatalogGate from '../components/ui/CatalogGate';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import { FREE_SHIPPING_THRESHOLD } from '../data/brand';
import { useCart } from '../context/CartContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice, pluralize } from '../utils/format';

function CartContent() {
  const { lines, subtotal, count, clear } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={ShoppingBag}
          title="Tu carrito está vacío"
          message="Agrega productos para verlos aquí."
          action={<Button to="/productos">Ir a la tienda</Button>}
        />
      </div>
    );
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_22rem]">
      <section aria-label="Productos en el carrito">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <p className="text-sm text-ink-500">{count} {pluralize(count, 'producto', 'productos')}</p>
          <button type="button" onClick={clear} className="text-sm font-medium text-ink-500 hover:text-red-700">
            Vaciar carrito
          </button>
        </div>
        <ul className="divide-y divide-sand-200">
          {lines.map((line) => (
            <CartItemRow key={line.product.id} line={line} />
          ))}
        </ul>
        <p className="mt-4 rounded-md bg-sand-100 px-4 py-3 text-sm text-ink-700">
          {remaining > 0
            ? `Te faltan ${formatPrice(remaining)} para tener envío estándar gratis.`
            : 'Tienes envío estándar gratis en este pedido.'}
        </p>
      </section>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary subtotal={subtotal} shipping={null}>
          <div className="space-y-3">
            <Button to="/checkout" size="lg" fullWidth>Continuar al pago</Button>
            <Button to="/productos" variant="ghost" fullWidth>Seguir comprando</Button>
          </div>
        </OrderSummary>
      </div>
    </div>
  );
}

export default function CartPage() {
  useDocumentTitle('Carrito');
  return (
    <>
      <PageHeader title="Carrito" crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Carrito' }]} />
      <CatalogGate>
        <CartContent />
      </CatalogGate>
    </>
  );
}
