/**
 * Las fotografías vienen de Unsplash (licencia Unsplash, uso gratuito) y se sirven
 * desde su CDN, que redimensiona y entrega WebP/AVIF según el navegador.
 */
const CDN = 'https://images.unsplash.com';

/** Anchos que se ofrecen en srcset: cubren cards chicas y pantallas 2x. */
export const IMAGE_WIDTHS = [320, 480, 640, 960, 1280] as const;

export function imageUrl(id: string, width: number): string {
  return `${CDN}/photo-${id}?auto=format&fit=crop&w=${width}&q=78`;
}

export function imageSrcSet(id: string, maxWidth = 1280): string {
  return IMAGE_WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${imageUrl(id, w)} ${w}w`)
    .join(', ');
}
