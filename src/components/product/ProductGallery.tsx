import { useState } from 'react';
import type { Product } from '../../types';
import Photo from '../ui/Photo';

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.images;
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg bg-sand-100">
        <Photo key={current.id} image={current} sizes="(min-width: 1024px) 560px, 100vw" maxWidth={1280} priority />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Imágenes del producto">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`Ver imagen ${i + 1} de ${images.length}: ${image.alt}`}
              className={`aspect-square overflow-hidden rounded-md border-2 bg-sand-100 transition-colors ${
                active === i ? 'border-accent' : 'border-transparent hover:border-sand-300'
              }`}
            >
              <Photo image={image} sizes="180px" maxWidth={480} decorative />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
