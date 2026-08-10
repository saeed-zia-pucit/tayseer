/** Normalize #rgb / #rrggbb → #rrggbb */
export function normalizeHex(hex: string): string {
  const h = hex.trim().replace('#', '')
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`.toLowerCase()
  }
  if (/^[0-9a-fA-F]{6}$/.test(h)) return `#${h}`.toLowerCase()
  return hex
}

/** "#9b6cd8" → "155, 108, 216" for rgba(var(--x), a) */
export function hexToRgbChannels(hex: string): string {
  const n = normalizeHex(hex).replace('#', '')
  const v = parseInt(n, 16)
  if (Number.isNaN(v)) return '0, 0, 0'
  return `${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}`
}
