import Photo from '../ui/Photo';

const HERO_IMAGES = [
  { id: '1677761640321-b80251be00ca', alt: 'Jarrones de cerámica en tonos arena sobre un fondo de lino' },
  { id: '1753932847231-7949af383b98', alt: 'Lámpara de pantalla redonda encendida junto a un jarrón y libros' },
];
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="bg-sand-50">
      <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Colección otoño–invierno</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Objetos simples para un hogar tranquilo</h1>
          <p className="mt-5 max-w-md text-lg text-ink-500">
            Cerámica, luz y textiles hechos en lotes pequeños. Piezas pensadas para usarse todos los días y durar años.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/productos" size="lg">Ver productos</Button>
            <Button to="/productos?oferta=1" variant="secondary" size="lg">Ver ofertas</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4" aria-hidden="true">
          <div className="mt-8 aspect-[4/5] overflow-hidden rounded-lg bg-sand-100">
            <Photo image={HERO_IMAGES[0]} sizes="(min-width: 1024px) 290px, 50vw" maxWidth={960} priority decorative />
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-sand-100">
            <Photo image={HERO_IMAGES[1]} sizes="(min-width: 1024px) 290px, 50vw" maxWidth={960} priority decorative />
          </div>
        </div>
      </div>
    </section>
  );
}
