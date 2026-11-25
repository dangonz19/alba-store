import { useState } from 'react';
import type { ProductImage } from '../../types';
import { imageSrcSet, imageUrl } from '../../utils/images';

interface Props {
  image: ProductImage;
  /** Atributo sizes del <img>: cuánto ocupa la foto en pantalla. */
  sizes: string;
  /** Ancho máximo a pedir al CDN. */
  maxWidth?: number;
  /** Fotos visibles al cargar (hero, galería): se cargan sin lazy y con prioridad. */
  priority?: boolean;
  /** Si la foto es decorativa se deja el alt vacío. */
  decorative?: boolean;
  className?: string;
}

/**
 * Foto que llena su contenedor (object-cover) sin deformarse. El contenedor
 * define el aspect-ratio; mientras carga, o si falla, queda el fondo arena.
 */
export default function Photo({ image, sizes, maxWidth = 1280, priority = false, decorative = false, className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`h-full w-full bg-sand-100 ${className}`} role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : image.alt} />;
  }

  return (
    <img
      src={imageUrl(image.id, Math.min(640, maxWidth))}
      srcSet={imageSrcSet(image.id, maxWidth)}
      sizes={sizes}
      alt={decorative ? '' : image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={`block h-full w-full bg-sand-100 object-cover ${className}`}
      style={image.focus ? { objectPosition: image.focus } : undefined}
    />
  );
}
