import { SearchX, SlidersHorizontal } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/catalog/FilterPanel';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import CatalogGate from '../components/ui/CatalogGate';
import Drawer from '../components/ui/Drawer';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import { CATEGORIES } from '../data/categories';
import { useCatalog } from '../context/CatalogContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { CatalogFilters, SortOption } from '../types';
import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  countActiveFilters,
  filterAndSort,
  filtersFromParams,
  paramsFromFilters,
} from '../utils/catalog';
import { pluralize } from '../utils/format';

const CATEGORY_IDS = CATEGORIES.map((c) => c.id as string);

function CatalogContent() {
  const { products } = useCatalog();
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Los filtros viven en la URL: se pueden compartir y funcionan con el botón "atrás".
  const filters = useMemo(() => filtersFromParams(params, CATEGORY_IDS), [params]);
  const results = useMemo(() => filterAndSort(products, filters), [products, filters]);
  const activeCount = countActiveFilters(filters);

  const update = useCallback(
    (patch: Partial<CatalogFilters>) => setParams(paramsFromFilters({ ...filters, ...patch }), { replace: true }),
    [filters, setParams],
  );
  const reset = useCallback(() => setParams(paramsFromFilters({ ...DEFAULT_FILTERS, sort: filters.sort }), { replace: true }), [filters.sort, setParams]);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const currentCategory = CATEGORIES.find((c) => c.id === filters.category);

  return (
    <>
      <PageHeader
        title={currentCategory ? currentCategory.name : 'Productos'}
        subtitle={currentCategory ? currentCategory.description : 'Todo lo que tenemos para tu hogar.'}
        crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Productos' }]}
      />

      <div className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <aside className="hidden lg:block" aria-label="Filtros">
            <FilterPanel filters={filters} onChange={update} onReset={reset} activeCount={activeCount} idPrefix="desktop" />
          </aside>

          <section aria-label="Resultados">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-500" role="status">
                {results.length} {pluralize(results.length, 'producto', 'productos')}
              </p>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setDrawerOpen(true)}>
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Filtros{activeCount > 0 ? ` (${activeCount})` : ''}
                </Button>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-ink-500">Ordenar</label>
                  <select
                    id="sort"
                    value={filters.sort}
                    onChange={(e) => update({ sort: e.target.value as SortOption })}
                    className="input w-auto py-2"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {results.length > 0 ? (
              <ProductGrid products={results} columns={3} />
            ) : (
              <EmptyState
                icon={SearchX}
                title="No encontramos resultados"
                message="Prueba con otra búsqueda o quita algunos filtros."
                action={<Button onClick={reset}>Limpiar filtros</Button>}
              />
            )}
          </section>
        </div>
      </div>

      <Drawer open={drawerOpen} title="Filtros" onClose={closeDrawer}>
        <FilterPanel filters={filters} onChange={update} onReset={reset} activeCount={activeCount} idPrefix="mobile" />
        <div className="mt-6">
          <Button fullWidth onClick={closeDrawer}>Ver {results.length} {pluralize(results.length, 'resultado', 'resultados')}</Button>
        </div>
      </Drawer>
    </>
  );
}

export default function CatalogPage() {
  useDocumentTitle('Productos');
  return (
    <CatalogGate>
      <CatalogContent />
    </CatalogGate>
  );
}
