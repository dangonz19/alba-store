import Benefits from '../components/home/Benefits';
import CategoryTiles from '../components/home/CategoryTiles';
import Hero from '../components/home/Hero';
import Newsletter from '../components/home/Newsletter';
import PromoBanner from '../components/home/PromoBanner';
import ProductGrid from '../components/product/ProductGrid';
import CatalogGate from '../components/ui/CatalogGate';
import SectionHeading from '../components/ui/SectionHeading';
import { useCatalog } from '../context/CatalogContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { isOnSale } from '../utils/catalog';

function HomeSections() {
  const { products } = useCatalog();
  const featured = products.filter((p) => p.tags.includes('featured')).slice(0, 4);
  const newest = products.filter((p) => p.tags.includes('new')).slice(0, 4);
  const offers = products.filter(isOnSale).sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <section className="container-page py-16">
        <SectionHeading title="Productos destacados" subtitle="Los favoritos de nuestros clientes." linkTo="/productos" />
        <ProductGrid products={featured} />
      </section>

      <section className="container-page pb-16">
        <SectionHeading title="Compra por categoría" linkTo="/categorias" linkLabel="Ver categorías" />
        <CategoryTiles />
      </section>

      <section className="bg-sand-50 py-16">
        <div className="container-page">
          <SectionHeading title="Recién llegados" subtitle="Lo último que sumamos a la tienda." linkTo="/productos?orden=newest" linkLabel="Ver novedades" />
          <ProductGrid products={newest} />
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading title="Ofertas" subtitle="Precios rebajados por tiempo limitado." linkTo="/productos?oferta=1" linkLabel="Ver ofertas" />
        <ProductGrid products={offers} />
      </section>
    </>
  );
}

export default function HomePage() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <Benefits />
      <CatalogGate>
        <HomeSections />
      </CatalogGate>
      <PromoBanner />
      <Newsletter />
    </>
  );
}
