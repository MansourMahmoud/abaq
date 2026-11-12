/**
 * Image sources for the demo catalogue.
 *
 * Photos live in `public/media/img` as `<name>-<width>.webp`, pre-rendered at
 * each width in `WIDTHS`. Components refer to a photo by name only, so moving
 * the files to a CDN later means changing `imageUrl` and nothing else.
 */
export const PHOTOS = [
  'amberTrio',
  'blueBottle',
  'bottlesRow',
  'burnerCarpet',
  'burnerMajlis',
  'clearOnFur',
  'daisyShadows',
  'goldBottle',
  'handsHolding',
  'monoBottle',
  'oudOil',
  'pinkBottle',
  'rollOns',
  'souk',
  'spraying',
] as const;

export type PhotoKey = (typeof PHOTOS)[number];

/** Widths rendered for every photo, smallest first. */
const WIDTHS = [480, 960, 1600] as const;

/** URL of the smallest rendition that is at least `width` pixels wide. */
export function imageUrl(photo: PhotoKey, width: number): string {
  const rendition = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/media/img/${photo}-${rendition}.webp`;
}

/** `srcset` listing every rendition, for use with a `sizes` attribute. */
export function imageSrcSet(photo: PhotoKey): string {
  return WIDTHS.map((width) => `${imageUrl(photo, width)} ${width}w`).join(', ');
}
