import type { BrandPalette } from '@/theme/palettes'
import { resolvePalette } from '@/theme/themeStorage'

export const THEME_CHANGE_EVENT = 'tayseer-theme-change'

/** CSS custom properties written to :root / documentElement */
export function paletteToCssVars(p: BrandPalette): Record<string, string> {
  return {
    '--brand-bg-deep': p.bgDeep,
    '--brand-bg': p.bg,
    '--brand-bg-elevated': p.bgElevated,
    '--brand-text': p.text,
    '--brand-muted': p.muted,
    '--brand-accent': p.accent,
    '--brand-accent-2': p.accent2,
    '--brand-accent-3': p.accent3,
    '--brand-accent-soft': p.accentSoft,
    '--brand-intro': p.intro,
    '--brand-slide-1': p.slides[0],
    '--brand-slide-2': p.slides[1],
    '--brand-slide-3': p.slides[2],
    '--brand-slide-4': p.slides[3],
    '--brand-slide-5': p.slides[4],
    '--brand-slide-6': p.slides[5],
    '--brand-accent-rgb': p.accentRgb,
    '--brand-accent-2-rgb': p.accent2Rgb,
    '--brand-accent-3-rgb': p.accent3Rgb,
  }
}

/** Paint a palette onto the document. */
export function paintPalette(palette: BrandPalette): BrandPalette {
  const root = document.documentElement
  const vars = paletteToCssVars(palette)
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }
  root.dataset.palette = palette.id
  window.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: palette }),
  )
  return palette
}

/**
 * Apply theme on boot (or after reset).
 * Uses localStorage lab prefs when present, else ACTIVE_PALETTE_ID preset.
 */
export function applyTheme(palette?: BrandPalette): BrandPalette {
  return paintPalette(palette ?? resolvePalette())
}
