import { PRODUCT_CATALOG } from '@/data/productCatalog'
import { resolvePalette } from '@/theme'

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

/** Active brand palette (includes Theme Lab localStorage overrides). */
const palette = resolvePalette()

export const VI_COLORS = {
  clear: palette.intro,
  black: palette.bgDeep,
  white: '#ffffff',
} as const

/** Six Tayseer products — images are temporary placeholders until brand art lands. */
export const viSlides: ViSlide[] = PRODUCT_CATALOG.map((product, index) => ({
  id: 6 + index,
  productId: product.id,
  color: palette.slides[index] ?? palette.slides[index % palette.slides.length],
  title: product.name,
  titleLines: product.titleLines,
  caption: product.blurb,
  images: product.images,
  demoPath: product.demoPath,
}))

/** Product slides only (no intro hero) */
export const VI_SEGMENT_COUNT = viSlides.length
