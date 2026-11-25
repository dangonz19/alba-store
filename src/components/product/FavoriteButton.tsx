import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface Props {
  productId: string;
  productName: string;
  /** "icon" = botón circular sobre la imagen; "full" = botón con texto. */
  variant?: 'icon' | 'full';
}

export default function FavoriteButton({ productId, productName, variant = 'icon' }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);
  const label = active ? `Quitar ${productName} de favoritos` : `Guardar ${productName} en favoritos`;

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={() => toggle(productId)}
        aria-pressed={active}
        aria-label={label}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-sand-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-accent hover:text-accent"
      >
        <Heart className={`h-4 w-4 ${active ? 'fill-accent text-accent' : ''}`} aria-hidden="true" />
        {active ? 'En favoritos' : 'Guardar'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={active}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-sm transition-colors hover:text-accent"
    >
      <Heart className={`h-[18px] w-[18px] ${active ? 'fill-accent text-accent' : ''}`} aria-hidden="true" />
    </button>
  );
}
