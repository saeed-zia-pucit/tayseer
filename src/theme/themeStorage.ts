import { hexToRgbChannels, normalizeHex } from '@/theme/hex'
import {
  ACTIVE_PALETTE_ID,
  getPalette,
  type BrandPalette,
} from '@/theme/palettes'

/** Bump when defaults change so stale lab prefs do not override the new system. */
export const THEME_STORAGE_KEY = 'tayseer-theme-lab-v6'

/** Editable colour fields (everything except id/name/blurb/rgb channels). */
export type ThemeColorKey =
  | 'bgDeep'
  | 'bg'
  | 'bgElevated'
  | 'text'
  | 'muted'
  | 'accent'
  | 'accent2'
  | 'accent3'
  | 'accentSoft'
  | 'intro'
  | 'slide1'
  | 'slide2'
  | 'slide3'
  | 'slide4'
  | 'slide5'
  | 'slide6'

export const THEME_COLOR_FIELDS: {
  key: ThemeColorKey
  label: string
  group: string
}[] = [
  { key: 'bgDeep', label: 'Background deep', group: 'Background' },
  { key: 'bg', label: 'Background', group: 'Background' },
  { key: 'bgElevated', label: 'Background elevated', group: 'Background' },
  { key: 'text', label: 'Text', group: 'Text' },
  { key: 'muted', label: 'Text muted', group: 'Text' },
  { key: 'accent', label: 'Accent primary', group: 'Accents' },
  { key: 'accent2', label: 'Accent secondary', group: 'Accents' },
  { key: 'accent3', label: 'Accent tertiary', group: 'Accents' },
  { key: 'accentSoft', label: 'Accent soft', group: 'Accents' },
  { key: 'intro', label: 'Hero intro atmosphere', group: 'Hero / slides' },
  { key: 'slide1', label: 'Product slide 1', group: 'Hero / slides' },
  { key: 'slide2', label: 'Product slide 2', group: 'Hero / slides' },
  { key: 'slide3', label: 'Product slide 3', group: 'Hero / slides' },
  { key: 'slide4', label: 'Product slide 4', group: 'Hero / slides' },
  { key: 'slide5', label: 'Product slide 5', group: 'Hero / slides' },
  { key: 'slide6', label: 'Product slide 6', group: 'Hero / slides' },
]

export type StoredTheme = {
  paletteId: string
  colors: Record<ThemeColorKey, string>
}

export function paletteToColors(p: BrandPalette): Record<ThemeColorKey, string> {
  return {
    bgDeep: p.bgDeep,
    bg: p.bg,
    bgElevated: p.bgElevated,
    text: p.text,
    muted: p.muted,
    accent: p.accent,
    accent2: p.accent2,
    accent3: p.accent3,
    accentSoft: p.accentSoft,
    intro: p.intro,
    slide1: p.slides[0],
    slide2: p.slides[1],
    slide3: p.slides[2],
    slide4: p.slides[3],
    slide5: p.slides[4],
    slide6: p.slides[5],
  }
}

export function colorsToPalette(
  paletteId: string,
  colors: Record<ThemeColorKey, string>,
  meta?: Pick<BrandPalette, 'name' | 'blurb'>,
): BrandPalette {
  const base = getPalette(paletteId)
  const defaults = paletteToColors(base)
  const c = (key: ThemeColorKey) =>
    normalizeHex(colors[key] ?? defaults[key])
  return {
    id: paletteId,
    name: meta?.name ?? `${base.name} (custom)`,
    blurb: meta?.blurb ?? base.blurb,
    mode: base.mode ?? 'dark',
    bgDeep: c('bgDeep'),
    bg: c('bg'),
    bgElevated: c('bgElevated'),
    text: c('text'),
    muted: c('muted'),
    accent: c('accent'),
    accent2: c('accent2'),
    accent3: c('accent3'),
    accentSoft: c('accentSoft'),
    intro: c('intro'),
    slides: [
      c('slide1'),
      c('slide2'),
      c('slide3'),
      c('slide4'),
      c('slide5'),
      c('slide6'),
    ],
    accentRgb: hexToRgbChannels(c('accent')),
    accent2Rgb: hexToRgbChannels(c('accent2')),
    accent3Rgb: hexToRgbChannels(c('accent3')),
  }
}

export function loadStoredTheme(): StoredTheme | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredTheme
    if (!parsed?.paletteId || !parsed?.colors) return null
    return parsed
  } catch {
    return null
  }
}

export function saveStoredTheme(theme: StoredTheme) {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
}

export function clearStoredTheme() {
  localStorage.removeItem(THEME_STORAGE_KEY)
}

/** Resolve active palette: localStorage custom → else default preset. */
export function resolvePalette(): BrandPalette {
  const stored = loadStoredTheme()
  if (stored) {
    return colorsToPalette(stored.paletteId, stored.colors)
  }
  return getPalette(ACTIVE_PALETTE_ID)
}
