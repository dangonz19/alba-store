import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}

export default function PageHeader({ title, subtitle, crumbs }: Props) {
  return (
    <header className="border-b border-sand-200 bg-sand-50">
      <div className="container-page py-10 sm:py-12">
        {crumbs && (
          <nav aria-label="Ruta de navegación" className="mb-3">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                  {c.to ? (
                    <Link to={c.to} className="hover:text-accent">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-ink-500">{subtitle}</p>}
      </div>
    </header>
  );
}
