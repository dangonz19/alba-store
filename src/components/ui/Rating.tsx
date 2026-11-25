import { Star } from 'lucide-react';

interface Props {
  rating: number;
  reviewCount?: number;
}

export default function Rating({ rating, reviewCount }: Props) {
  const label = `Valoración ${rating.toFixed(1)} de 5${reviewCount !== undefined ? `, ${reviewCount} reseñas` : ''}`;
  return (
    <div className="flex items-center gap-1.5 text-sm text-ink-500" role="img" aria-label={label}>
      <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden="true" />
      <span className="font-medium text-ink-700">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && <span>({reviewCount})</span>}
    </div>
  );
}
