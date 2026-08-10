/**
 * Central brand palettes for the full Tayseer app.
 *
 * Switch ACTIVE_PALETTE_ID, or use /theme-lab (persists in localStorage).
 */

export type BrandPalette = {
  id: string
  name: string
  blurb: string
  bgDeep: string
  bg: string
  bgElevated: string
  text: string
  muted: string
  accent: string
  accent2: string
  accent3: string
  accentSoft: string
  intro: string
  slides: readonly [string, string, string, string, string, string]
  accentRgb: string
  accent2Rgb: string
  accent3Rgb: string
}

/**
 * Default — deep indigo + punchy violet/cyan (matches Vide Infra hero slides).
 */
export const violetAurora: BrandPalette = {
  id: 'violet-aurora',
  name: 'Violet Aurora',
  blurb:
    'Saturated violet and cyan atmospheres — same energy as the product hero slides.',
  bgDeep: '#0a0614',
  bg: '#140c24',
  bgElevated: '#2a1848',
  text: '#f7f2ff',
  muted: '#b7a6de',
  accent: '#8b5cf6',
  accent2: '#06b6d4',
  accent3: '#a855f7',
  accentSoft: '#f0abfc',
  intro: '#4c1d95',
  slides: ['#8b5cf6', '#06b6d4', '#6366f1', '#a855f7', '#0ea5e9', '#d8b4fe'],
  accentRgb: '139, 92, 246',
  accent2Rgb: '6, 182, 212',
  accent3Rgb: '168, 85, 247',
}

export const lagoonPrism: BrandPalette = {
  id: 'lagoon-prism',
  name: 'Lagoon Prism',
  blurb: 'Teal core with aqua and coral accents — colourful while staying on-brand for fintech trust.',
  bgDeep: '#041c22',
  bg: '#06262f',
  bgElevated: '#0d3d4a',
  text: '#eef9f7',
  muted: '#8fb8b2',
  accent: '#14b8a6',
  accent2: '#38bdf8',
  accent3: '#34d399',
  accentSoft: '#e07a5f',
  intro: '#0f4c4a',
  slides: ['#0f766e', '#0891b2', '#0284c7', '#059669', '#0d9488', '#14b8a6'],
  accentRgb: '20, 184, 166',
  accent2Rgb: '56, 189, 248',
  accent3Rgb: '52, 211, 153',
}

export const sunsetCircuit: BrandPalette = {
  id: 'sunset-circuit',
  name: 'Sunset Circuit',
  blurb: 'Midnight navy with magenta, amber, and electric blue — bold and lively.',
  bgDeep: '#0b0614',
  bg: '#160b24',
  bgElevated: '#2a1240',
  text: '#fff5fb',
  muted: '#c9a8c0',
  accent: '#e879f9',
  accent2: '#38bdf8',
  accent3: '#fbbf24',
  accentSoft: '#fb7185',
  intro: '#4a1d5c',
  slides: ['#c026d3', '#7c3aed', '#2563eb', '#db2777', '#d97706', '#f472b6'],
  accentRgb: '232, 121, 249',
  accent2Rgb: '56, 189, 248',
  accent3Rgb: '251, 191, 36',
}

export const northernLights: BrandPalette = {
  id: 'northern-lights',
  name: 'Northern Lights',
  blurb: 'Near-black canvas with cyan, emerald, and violet ribbons — immersive and premium.',
  bgDeep: '#05080f',
  bg: '#0a1220',
  bgElevated: '#132038',
  text: '#eef6ff',
  muted: '#8aa4c0',
  accent: '#22d3ee',
  accent2: '#a78bfa',
  accent3: '#34d399',
  accentSoft: '#fde68a',
  intro: '#0e2744',
  slides: ['#0891b2', '#6366f1', '#10b981', '#3b82f6', '#8b5cf6', '#22d3ee'],
  accentRgb: '34, 211, 238',
  accent2Rgb: '167, 139, 250',
  accent3Rgb: '52, 211, 153',
}

export const PALETTES: Record<string, BrandPalette> = {
  [violetAurora.id]: violetAurora,
  [lagoonPrism.id]: lagoonPrism,
  [sunsetCircuit.id]: sunsetCircuit,
  [northernLights.id]: northernLights,
}

export const PALETTE_LIST = Object.values(PALETTES)

/** Default app-wide palette */
export const ACTIVE_PALETTE_ID: keyof typeof PALETTES = 'violet-aurora'

export function getPalette(id: string = ACTIVE_PALETTE_ID): BrandPalette {
  return PALETTES[id] ?? violetAurora
}
