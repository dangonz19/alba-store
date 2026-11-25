import Photo from '../ui/Photo';
import Button from '../ui/Button';

export default function PromoBanner() {
  return (
    <section className="container-page py-16">
      <div className="grid overflow-hidden rounded-xl bg-ink-900 text-paper md:grid-cols-2">
        <div className="flex flex-col items-start justify-center p-8 sm:p-12">
          <p className="text-sm font-medium uppercase tracking-wider text-accent-soft">Para tu escritorio</p>
          <h2 className="mt-3 text-3xl text-paper sm:text-4xl">Trabaja con calma</h2>
          <p className="mt-4 max-w-sm text-sand-300">
            Cuadernos, bandejas y portalápices para tener cada cosa en su lugar.
          </p>
          <div className="mt-7">
            <Button to="/productos?categoria=escritorio">Ver escritorio</Button>
          </div>
        </div>
        <div className="hidden min-h-[18rem] md:block" aria-hidden="true">
          <Photo image={{ id: '1654124803453-5bb8819e1524', alt: '' }} sizes="(min-width: 1216px) 608px, 50vw" maxWidth={1280} decorative />
        </div>
      </div>
    </section>
  );
}
