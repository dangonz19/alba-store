import { Leaf, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../../data/brand';
import { formatPrice } from '../../utils/format';

const BENEFITS = [
  { icon: Truck, title: 'Envío gratis', text: `En compras sobre ${formatPrice(FREE_SHIPPING_THRESHOLD)}.` },
  { icon: RotateCcw, title: 'Cambios sin costo', text: '30 días para cambiar tu compra.' },
  { icon: ShieldCheck, title: 'Compra segura', text: 'Tus datos nunca se comparten.' },
  { icon: Leaf, title: 'Hecho con cuidado', text: 'Materiales naturales y lotes pequeños.' },
];

export default function Benefits() {
  return (
    <section aria-label="Beneficios de la tienda" className="border-y border-sand-200 bg-white">
      <ul className="container-page grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <h3 className="font-sans text-sm font-semibold">{title}</h3>
              <p className="mt-0.5 text-sm text-ink-500">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
