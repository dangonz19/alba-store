import { Check, PackageSearch } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddToCartButton from '../components/product/AddToCartButton';
import FavoriteButton from '../components/product/FavoriteButton';
import ProductGallery from '../components/product/ProductGallery';
import ProductGrid from '../components/product/ProductGrid';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CatalogGate from '../components/ui/CatalogGate';
import EmptyState from '../components/ui/EmptyState';
import Price from '../components/ui/Price';
import QuantityStepper from '../components/ui/QuantityStepper';
import Rating from '../components/ui/Rating';
import SectionHeading from '../components/ui/SectionHeading';
import { getCategory } from '../data/categories';
import { useCatalog } from '../context/CatalogContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { maxQuantity } from '../utils/cart';
import { relatedProducts } from '../utils/catalog';

function ProductContent() {
  const { slug = '' } = useParams();
  const { products, getBySlug } = useCatalog();
  const product = getBySlug(slug);
  const [quantity, setQuantity] = useState(1);

  useDocumentTitle(product?.name ?? 'Producto no encontrado');

  if (!product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={PackageSearch}
          title="Producto no encontrado"
          message="Es posible que el enlace sea antiguo o que el producto ya no esté disponible."
          action={<Button to="/productos">Ver todos los productos</Button>}
        />
      </div>
    );
  }

  const category = getCategory(product.categoryId);
  const soldOut = product.stock <= 0;
  const max = Math.max(1, maxQuantity(product));

  return (
    <>
      <div className="container-page py-8 sm:py-12">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-ink-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-accent">Inicio</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/productos" className="hover:text-accent">Productos</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery key={product.id} product={product} />

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm uppercase tracking-wide text-ink-400">{category?.name}</p>
              {product.tags.includes('new') && <Badge tone="new">Nuevo</Badge>}
            </div>
            <h1 className="mt-1 text-3xl sm:text-4xl">{product.name}</h1>
            <div className="mt-3"><Rating rating={product.rating} reviewCount={product.reviewCount} /></div>
            <div className="mt-5"><Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" /></div>
            <p className="mt-5 text-ink-500">{product.shortDescription}</p>

            <p className={`mt-5 text-sm font-medium ${soldOut ? 'text-red-700' : product.stock <= 5 ? 'text-amber-800' : 'text-success'}`}>
              {soldOut ? 'Agotado por el momento' : product.stock <= 5 ? `Últimas ${product.stock} unidades` : 'Disponible, despacho en 24 horas'}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {!soldOut && <QuantityStepper value={quantity} max={max} onChange={setQuantity} />}
              <div className="min-w-[12rem] flex-1 sm:flex-none">
                <AddToCartButton product={product} quantity={quantity} size="lg" fullWidth />
              </div>
              <FavoriteButton productId={product.id} productName={product.name} variant="full" />
            </div>

            <section className="mt-10 border-t border-sand-200 pt-8" aria-labelledby="desc-title">
              <h2 id="desc-title" className="text-xl">Descripción</h2>
              <p className="mt-3 leading-relaxed text-ink-700">{product.description}</p>
            </section>

            <section className="mt-8" aria-labelledby="features-title">
              <h2 id="features-title" className="text-xl">Características</h2>
              <ul className="mt-3 space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <section className="bg-sand-50 py-16">
        <div className="container-page">
          <SectionHeading title="También te puede gustar" />
          <ProductGrid products={relatedProducts(products, product)} />
        </div>
      </section>
    </>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  return (
    <CatalogGate>
      {/* key: al cambiar de producto se reinicia la cantidad seleccionada */}
      <ProductContent key={slug} />
    </CatalogGate>
  );
}
