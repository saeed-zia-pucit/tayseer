import { useMemo, useState } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  PALETTE_LIST,
  THEME_COLOR_FIELDS,
  applyTheme,
  clearStoredTheme,
  colorsToPalette,
  loadStoredTheme,
  paintPalette,
  paletteToColors,
  resolvePalette,
  saveStoredTheme,
  type ThemeColorKey,
} from '@/theme'

/**
 * Temporary colour playground — delete this route/page when experiments are done.
 * Prefs persist in localStorage and re-apply on every refresh via applyTheme().
 */
export function ThemeLabPage() {
  const initial = useMemo(() => {
    const stored = loadStoredTheme()
    const palette = resolvePalette()
    return {
      paletteId: stored?.paletteId ?? palette.id,
      colors: stored?.colors ?? paletteToColors(palette),
    }
  }, [])

  const [paletteId, setPaletteId] = useState(initial.paletteId)
  const [colors, setColors] = useState(initial.colors)
  const [savedAt, setSavedAt] = useState<string | null>(
    loadStoredTheme() ? 'Loaded from browser storage' : null,
  )

  const preview = useMemo(
    () => colorsToPalette(paletteId, colors),
    [paletteId, colors],
  )

  const setColor = (key: ThemeColorKey, value: string) => {
    setColors((prev) => {
      const next = { ...prev, [key]: value }
      paintPalette(colorsToPalette(paletteId, next))
      return next
    })
  }

  const applyPreset = (id: string) => {
    const preset = PALETTE_LIST.find((p) => p.id === id)
    if (!preset) return
    const nextColors = paletteToColors(preset)
    setPaletteId(id)
    setColors(nextColors)
    paintPalette(preset)
    setSavedAt(null)
  }

  const persist = () => {
    saveStoredTheme({ paletteId, colors })
    applyTheme(colorsToPalette(paletteId, colors))
    setSavedAt(`Saved · ${new Date().toLocaleTimeString()}`)
  }

  const reset = () => {
    clearStoredTheme()
    const preset = PALETTE_LIST.find((p) => p.id === 'violet-aurora') ?? PALETTE_LIST[0]
    const nextColors = paletteToColors(preset)
    setPaletteId(preset.id)
    setColors(nextColors)
    applyTheme(preset)
    setSavedAt('Cleared storage · Violet Aurora default')
  }

  const groups = useMemo(() => {
    const map = new Map<string, typeof THEME_COLOR_FIELDS>()
    for (const field of THEME_COLOR_FIELDS) {
      const list = map.get(field.group) ?? []
      list.push(field)
      map.set(field.group, list)
    }
    return [...map.entries()]
  }, [])

  return (
    <div className="min-h-dvh bg-surface text-ink">
      <SiteHeader />

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lagoon">
                Temporary · Theme lab
              </p>
              <h1 className="font-display text-lg font-bold">Colour playground</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-full px-4 py-2 text-xs font-semibold text-ink/70 ring-1 ring-white/15 hover:bg-white/5"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={persist}
                className="rounded-full bg-lagoon px-4 py-2 text-xs font-semibold text-mist shadow-lift hover:bg-lagoon-bright"
              >
                Save prefs
              </button>
            </div>
          </div>
          <section className="theme-card">
            <h2 className="font-display text-base font-bold">Presets</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Click a preset to load it, tweak colours below, then Save prefs so
              refresh keeps your mix.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PALETTE_LIST.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  className={`theme-swatch ${paletteId === p.id ? 'is-active' : ''}`}
                >
                  <div className="mb-2 flex gap-1">
                    {[p.bg, p.accent, p.accent2, p.accent3].map((c) => (
                      <span
                        key={c}
                        className="h-5 w-5 rounded-full ring-1 ring-black/15"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-ink">{p.name}</p>
                  <p className="mt-1 text-xs text-ink-soft">{p.blurb}</p>
                </button>
              ))}
            </div>
          </section>

          {groups.map(([group, fields]) => (
            <section key={group} className="theme-card">
              <h2 className="font-display text-base font-bold text-ink">{group}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="theme-field">
                    <input
                      type="color"
                      value={normalizeColorInput(colors[field.key])}
                      onChange={(e) => setColor(field.key, e.target.value)}
                      className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink">
                        {field.label}
                      </span>
                      <input
                        type="text"
                        value={colors[field.key]}
                        onChange={(e) => setColor(field.key, e.target.value)}
                        className="mt-0.5 w-full bg-transparent font-mono text-xs text-ink-soft outline-none"
                      />
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div
            className="overflow-hidden rounded-2xl p-5 ring-1 ring-black/10"
            style={{
              background: `linear-gradient(160deg, ${preview.bgDeep}, ${preview.bg} 55%, ${preview.bgElevated})`,
              color: preview.text,
            }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: preview.accent2 }}
            >
              Live preview
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">Tayseer</h3>
            <p className="mt-2 text-sm" style={{ color: preview.muted }}>
              Banking, reimagined through AI — sample card using your tokens.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: preview.accent }}
              >
                Primary
              </span>
              <span
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: preview.accent2 }}
              >
                Secondary
              </span>
              <span
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: preview.accent3 }}
              >
                Tertiary
              </span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {preview.slides.map((c, i) => (
                <div
                  key={c + i}
                  className="h-10 rounded-lg ring-1 ring-black/15"
                  style={{ background: c }}
                  title={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="theme-card text-sm text-ink-soft">
            <p className="font-semibold text-ink">Persistence</p>
            <p className="mt-1 text-xs leading-relaxed">
              Save prefs writes to <code className="text-lagoon-bright">localStorage</code>.
              On refresh, <code className="text-lagoon-bright">applyTheme()</code> loads
              it before the app paints. The product hero carousel stays on its
              locked violet atmosphere and is not recolored by Theme Lab.
            </p>
            {savedAt ? (
              <p className="mt-3 text-xs font-medium text-lagoon-bright">{savedAt}</p>
            ) : (
              <p className="mt-3 text-xs">Unsaved tweaks apply live but won’t survive refresh until you save.</p>
            )}
          </div>
        </aside>
      </main>
    </div>
  )
}

function normalizeColorInput(hex: string) {
  const h = hex.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(h)) return h
  if (/^#[0-9a-fA-F]{3}$/.test(h)) {
    const x = h.slice(1)
    return `#${x[0]}${x[0]}${x[1]}${x[1]}${x[2]}${x[2]}`
  }
  return '#000000'
}
