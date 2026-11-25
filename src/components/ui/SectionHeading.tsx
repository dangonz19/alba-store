import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
}

export default function SectionHeading({ title, subtitle, linkTo, linkLabel = 'Ver todo' }: Props) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-ink-500">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark sm:inline-flex">
          {linkLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
