import { Search } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import type { CatalogFilters } from '../../types';
import { PRICE_RANGES } from '../../utils/catalog';
import Button from '../ui/Button';

interface Props {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
  activeCount: number;
  /** Sufijo para ids únicos cuando el panel se renderiza dos veces (escritorio y drawer). */
  idPrefix: string;
}

const legend = 'mb-3 text-sm font-semibold text-ink-900';

export default function FilterPanel({ filters, onChange, onReset, activeCount, idPrefix }: Props) {
  const categoryOptions = [{ id: 'all' as const, name: 'Todas' }, ...CATEGORIES];

  return (
    <div className="space-y-7">
      <div>
        <label htmlFor={`${idPrefix}-q`} className={`${legend} block`}>Buscar</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input
            id={`${idPrefix}-q`}
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Nombre o descripción"
            className="input pl-9"
          />
        </div>
      </div>

      <fieldset>
        <legend className={legend}>Categoría</legend>
        <div className="space-y-2">
          {categoryOptions.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
              <input
                type="radio"
                name={`${idPrefix}-category`}
                checked={filters.category === c.id}
                onChange={() => onChange({ category: c.id })}
                className="h-4 w-4 accent-accent"
              />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>Precio</legend>
        <div className="space-y-2">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
              <input
                type="radio"
                name={`${idPrefix}-price`}
                checked={filters.priceRange === r.id}
                onChange={() => onChange({ priceRange: r.id })}
                className="h-4 w-4 accent-accent"
              />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink-900">
        <input
          type="checkbox"
          checked={filters.onSale}
          onChange={(e) => onChange({ onSale: e.target.checked })}
          className="h-4 w-4 accent-accent"
        />
        Solo ofertas
      </label>

      <Button variant="secondary" size="sm" fullWidth onClick={onReset} disabled={activeCount === 0}>
        Limpiar filtros{activeCount > 0 ? ` (${activeCount})` : ''}
      </Button>
    </div>
  );
}
