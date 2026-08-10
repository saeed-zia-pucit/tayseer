import { PRODUCT_CATALOG } from '@/data/productCatalog'
import { HERO_PALETTE } from '@/theme'

export type ViSlide = {
  id: number
  productId: string
  color: string
  title: string
  titleLines: string[]
  caption: string
  images: string[]
  demoPath: string
}

/**
 * Hero always uses the locked product-carousel palette.
 * Theme Lab must not recolour this band.
 */
export const VI_COLORS = {
  clear: HERO_PALETTE.intro,
  black: HERO_PALETTE.bgDeep,
  white: '#ffffff',
} as const

/** Six Tayseer products — images are temporary placeholders until brand art lands. */
export const viSlides: ViSlide[] = PRODUCT_CATALOG.map((product, index) => ({
  id: 6 + index,
  productId: product.id,
  color:
    HERO_PALETTE.slides[index] ??
    HERO_PALETTE.slides[index % HERO_PALETTE.slides.length],
  title: product.name,
  titleLines: product.titleLines,
  caption: product.blurb,
  images: product.images,
  demoPath: product.demoPath,
}))

/** Product slides only (no intro hero) */
export const VI_SEGMENT_COUNT = viSlides.length
