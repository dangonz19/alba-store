import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import { useCallback, useState, type FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import Drawer from '../ui/Drawer';
import Logo from './Logo';

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos', end: false },
  { to: '/categorias', label: 'Categorías', end: false },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-ink-700'}`;

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold tabular-nums leading-none text-white">
      {count > 99 ? '99+' : count}
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { count } = useCart();
  const { ids } = useFavorites();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos');
    setMenuOpen(false);
  };

  const iconBtn = 'relative flex h-10 w-10 items-center justify-center rounded-md text-ink-700 transition-colors hover:bg-sand-100';

  const searchForm = (idSuffix: string) => (
    <form onSubmit={onSearch} role="search" className="relative">
      <label htmlFor={`search-${idSuffix}`} className="sr-only">
        Buscar productos
      </label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
      <input
        id={`search-${idSuffix}`}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos"
        className="input pl-9"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <button type="button" className={`${iconBtn} lg:hidden`} onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <Logo />

        <nav aria-label="Principal" className="ml-8 hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden w-64 md:block">{searchForm('desktop')}</div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <NavLink to="/favoritos" className={iconBtn} aria-label={`Favoritos (${ids.length})`}>
            <Heart className="h-5 w-5" aria-hidden="true" />
            <CountBadge count={ids.length} />
          </NavLink>
          <NavLink to="/carrito" className={iconBtn} aria-label={`Carrito (${count} productos)`}>
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <CountBadge count={count} />
          </NavLink>
        </div>
      </div>

      <Drawer open={menuOpen} title="Menú" onClose={closeMenu}>
        <div className="mb-6">{searchForm('mobile')}</div>
        <nav aria-label="Menú móvil" className="flex flex-col">
          {[...LINKS, { to: '/favoritos', label: 'Favoritos', end: false }, { to: '/carrito', label: 'Carrito', end: false }].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `border-b border-sand-100 py-3.5 text-base font-medium ${isActive ? 'text-accent' : 'text-ink-700'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
