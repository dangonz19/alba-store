import { Link } from 'react-router-dom';
import { BRAND } from '../../data/brand';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2" aria-label={`${BRAND.name}, ir al inicio`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
        <svg viewBox="0 0 64 64" className="h-5 w-5" aria-hidden="true">
          <path d="M14 46 32 16l18 30h-8.5L32 30.5 22.5 46z" fill="#FAF8F5" />
        </svg>
      </span>
      <span className={`font-display text-xl font-extrabold tracking-tight ${light ? 'text-paper' : 'text-ink-900'}`}>
        {BRAND.name}
      </span>
    </Link>
  );
}
