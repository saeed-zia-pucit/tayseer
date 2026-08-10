export {
  ACTIVE_PALETTE_ID,
  HERO_PALETTE,
  PALETTES,
  PALETTE_LIST,
  getPalette,
  type BrandPalette,
} from '@/theme/palettes'
export {
  applyTheme,
  paintPalette,
  paletteToCssVars,
  THEME_CHANGE_EVENT,
} from '@/theme/applyTheme'
export {
  THEME_STORAGE_KEY,
  THEME_COLOR_FIELDS,
  loadStoredTheme,
  saveStoredTheme,
  clearStoredTheme,
  resolvePalette,
  paletteToColors,
  colorsToPalette,
  type ThemeColorKey,
  type StoredTheme,
} from '@/theme/themeStorage'
