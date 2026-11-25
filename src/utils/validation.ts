import { SHIPPING_METHODS } from '../data/shipping';
import type { CheckoutErrors, CheckoutForm } from '../types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s-]{8,15}$/;

export const EMPTY_CHECKOUT_FORM: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  postalCode: '',
  notes: '',
  shipping: 'standard',
};

/** Valida el formulario de checkout. Devuelve un objeto vacío si todo está correcto. */
export function validateCheckout(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const method = SHIPPING_METHODS.find((m) => m.id === form.shipping);

  if (form.fullName.trim().length < 3) errors.fullName = 'Ingresa tu nombre completo.';
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Ingresa un correo válido.';
  if (!PHONE_RE.test(form.phone.trim())) errors.phone = 'Ingresa un teléfono válido (8 a 15 dígitos).';

  if (method?.requiresAddress) {
    if (form.address.trim().length < 5) errors.address = 'Ingresa tu dirección.';
    if (form.city.trim().length < 2) errors.city = 'Ingresa tu ciudad o comuna.';
    if (!form.region) errors.region = 'Selecciona una región.';
  }
  return errors;
}

export function generateOrderNumber(date = new Date()): string {
  const stamp = date.toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ALB-${stamp}-${rand}`;
}
