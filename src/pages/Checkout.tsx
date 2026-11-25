import { ShoppingBag } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/cart/OrderSummary';
import Button from '../components/ui/Button';
import CatalogGate from '../components/ui/CatalogGate';
import EmptyState from '../components/ui/EmptyState';
import { SelectField, TextField } from '../components/ui/Field';
import PageHeader from '../components/ui/PageHeader';
import { REGIONS } from '../data/regions';
import { SHIPPING_METHODS } from '../data/shipping';
import { useCart } from '../context/CartContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { CheckoutErrors, CheckoutForm, Order } from '../types';
import { shippingCost } from '../utils/cart';
import { formatPrice } from '../utils/format';
import { STORAGE_KEYS, writeJSON } from '../utils/storage';
import { EMPTY_CHECKOUT_FORM, generateOrderNumber, validateCheckout } from '../utils/validation';

function CheckoutContent() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutForm>(EMPTY_CHECKOUT_FORM);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  if (lines.length === 0) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={ShoppingBag}
          title="No hay nada que pagar"
          message="Tu carrito está vacío. Agrega productos para continuar."
          action={<Button to="/productos">Ir a la tienda</Button>}
        />
      </div>
    );
  }

  const method = SHIPPING_METHODS.find((m) => m.id === form.shipping) ?? SHIPPING_METHODS[0];
  const shipping = shippingCost(form.shipping, subtotal);

  const setField = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Al editar un campo se limpia su error.
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onText = (key: keyof CheckoutForm) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setField(key, e.target.value as never);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateCheckout(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const first = Object.keys(found)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    const order: Order = {
      number: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      lines: lines.map((l) => ({ name: l.product.name, quantity: l.quantity, unitPrice: l.product.price })),
      subtotal,
      shippingCost: shipping,
      total: subtotal + shipping,
      customer: { fullName: form.fullName.trim(), email: form.email.trim() },
      shippingName: method.name,
      address: method.requiresAddress
        ? `${form.address.trim()}, ${form.city.trim()}, ${form.region}`
        : 'Retiro en tienda',
    };
    writeJSON(STORAGE_KEYS.lastOrder, order);
    clear();
    navigate('/pedido-confirmado');
  };

  return (
    <form onSubmit={onSubmit} noValidate className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-10">
        <section aria-labelledby="contact-title">
          <h2 id="contact-title" className="text-xl">Datos de contacto</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField id="field-fullName" label="Nombre completo" autoComplete="name" value={form.fullName} onChange={onText('fullName')} error={errors.fullName} />
            </div>
            <TextField id="field-email" label="Correo" type="email" autoComplete="email" value={form.email} onChange={onText('email')} error={errors.email} />
            <TextField id="field-phone" label="Teléfono" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" value={form.phone} onChange={onText('phone')} error={errors.phone} />
          </div>
        </section>

        <fieldset>
          <legend className="font-display text-xl font-semibold tracking-tight">Método de envío</legend>
          <div className="mt-5 space-y-3">
            {SHIPPING_METHODS.map((m) => {
              const cost = shippingCost(m.id, subtotal);
              return (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                    form.shipping === m.id ? 'border-accent bg-accent-soft/40' : 'border-sand-200 bg-white hover:border-sand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={m.id}
                    checked={form.shipping === m.id}
                    onChange={() => setField('shipping', m.id)}
                    className="mt-1 h-4 w-4 accent-accent"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{m.name}</span>
                    <span className="block text-sm text-ink-500">{m.description}</span>
                  </span>
                  <span className="text-sm font-semibold">{cost === 0 ? 'Gratis' : formatPrice(cost)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {method.requiresAddress && (
          <section aria-labelledby="address-title">
            <h2 id="address-title" className="text-xl">Dirección de entrega</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <TextField id="field-address" label="Dirección" autoComplete="street-address" value={form.address} onChange={onText('address')} error={errors.address} />
              </div>
              <TextField id="field-city" label="Ciudad o comuna" autoComplete="address-level2" value={form.city} onChange={onText('city')} error={errors.city} />
              <SelectField id="field-region" label="Región" options={REGIONS} placeholder="Selecciona una región" value={form.region} onChange={onText('region')} error={errors.region} />
              <TextField id="field-postalCode" label="Código postal (opcional)" autoComplete="postal-code" value={form.postalCode} onChange={onText('postalCode')} />
            </div>
          </section>
        )}

        <div>
          <label htmlFor="field-notes" className="mb-1.5 block text-sm font-medium text-ink-700">Notas para el pedido (opcional)</label>
          <textarea id="field-notes" rows={3} className="input" value={form.notes} onChange={onText('notes')} />
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary subtotal={subtotal} shipping={shipping}>
          <ul className="mb-5 space-y-2 border-b border-sand-200 pb-5 text-sm">
            {lines.map((l) => (
              <li key={l.product.id} className="flex justify-between gap-3">
                <span className="text-ink-700">{l.quantity} × {l.product.name}</span>
                <span className="shrink-0">{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <Button type="submit" size="lg" fullWidth>Confirmar pedido</Button>
          <p className="mt-3 text-center text-xs text-ink-500">
            Simulación: no se realiza ningún cobro y no se piden datos de tarjeta.
          </p>
        </OrderSummary>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  useDocumentTitle('Checkout');
  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Carrito', to: '/carrito' }, { label: 'Checkout' }]} />
      <CatalogGate>
        <CheckoutContent />
      </CatalogGate>
    </>
  );
}
