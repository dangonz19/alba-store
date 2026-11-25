import type { ShippingMethod } from '../types';
import { FREE_SHIPPING_THRESHOLD } from './brand';

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Envío estándar',
    description: 'Entrega en 3 a 5 días hábiles. Gratis sobre $50.000.',
    price: 3990,
    freeOver: FREE_SHIPPING_THRESHOLD,
    requiresAddress: true,
  },
  {
    id: 'express',
    name: 'Envío express',
    description: 'Entrega en 24 a 48 horas hábiles.',
    price: 7990,
    requiresAddress: true,
  },
  {
    id: 'pickup',
    name: 'Retiro en tienda',
    description: 'Av. Providencia 1234, Santiago. Listo en 24 horas.',
    price: 0,
    requiresAddress: false,
  },
];

export const DEFAULT_SHIPPING = SHIPPING_METHODS[0];
