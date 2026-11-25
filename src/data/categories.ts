import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'ceramica',
    name: 'Cerámica',
    description: 'Jarrones, tazas y bowls torneados y esmaltados a mano.',
    image: { id: '1643569556871-91ec60671ed7', alt: 'Jarrón de cerámica beige con forma de anillo' },
  },
  {
    id: 'iluminacion',
    name: 'Iluminación',
    description: 'Lámparas de luz cálida para cada rincón de la casa.',
    image: { id: '1667312939978-64cf31718a6e', alt: 'Lámpara de mesa con pantalla de lino sobre una cómoda' },
  },
  {
    id: 'textiles',
    name: 'Textiles',
    description: 'Cojines y mantas en lino y algodón lavado.',
    image: { id: '1611490135455-3a02bb9eb653', alt: 'Cojines terracota y crema apilados', focus: '78% 50%' },
  },
  {
    id: 'aromas',
    name: 'Aromas',
    description: 'Velas de cera vegetal y difusores de notas suaves.',
    image: { id: '1750433101188-8284e112d250', alt: 'Difusor de varillas con luz natural sobre fondo arena' },
  },
  {
    id: 'escritorio',
    name: 'Escritorio',
    description: 'Objetos para trabajar con calma y orden.',
    image: { id: '1572129063406-a96d5d21d2eb', alt: 'Cuaderno y jarrón blanco sobre un escritorio claro' },
  },
];

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);
