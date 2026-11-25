import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../data/brand';
import { CATEGORIES } from '../../data/categories';
import Logo from './Logo';

const linkClass = 'text-sm text-sand-300 transition-colors hover:text-white';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-sand-200">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-sand-300">
            {BRAND.tagline}. Objetos hechos en lotes pequeños, pensados para durar.
          </p>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-sand-300 hover:text-white"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" /> Instagram
          </a>
        </div>

        <nav aria-label="Tienda">
          <h2 className="font-sans text-sm font-semibold text-white">Tienda</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/productos" className={linkClass}>Todos los productos</Link></li>
            <li><Link to="/productos?oferta=1" className={linkClass}>Ofertas</Link></li>
            <li><Link to="/productos?orden=newest" className={linkClass}>Novedades</Link></li>
            <li><Link to="/favoritos" className={linkClass}>Favoritos</Link></li>
          </ul>
        </nav>

        <nav aria-label="Categorías">
          <h2 className="font-sans text-sm font-semibold text-white">Categorías</h2>
          <ul className="mt-4 space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/productos?categoria=${c.id}`} className={linkClass}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Contacto</h2>
          <ul className="mt-4 space-y-3 text-sm text-sand-300">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{BRAND.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" aria-hidden="true" /><a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="hover:text-white">{BRAND.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" aria-hidden="true" /><a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-700">
        <p className="container-page py-5 text-xs text-ink-400">
          © {new Date().getFullYear()} {BRAND.name}. Tienda ficticia creada como proyecto de portafolio: no se procesan pagos ni pedidos reales.
        </p>
      </div>
    </footer>
  );
}
