import { discountPercent, formatPrice } from '../../utils/format';

interface Props {
  price: number;
  compareAtPrice?: number;
  size?: 'md' | 'lg';
}

export default function Price({ price, compareAtPrice, size = 'md' }: Props) {
  const percent = discountPercent(price, compareAtPrice);
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className={`font-semibold tabular-nums text-ink-900 ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>
        {formatPrice(price)}
      </span>
      {percent > 0 && compareAtPrice && (
        <>
          <span className="text-sm text-ink-400 line-through">
            <span className="sr-only">Precio anterior </span>
            {formatPrice(compareAtPrice)}
          </span>
          <span className="text-sm font-medium text-accent">-{percent}%</span>
        </>
      )}
    </div>
  );
}
