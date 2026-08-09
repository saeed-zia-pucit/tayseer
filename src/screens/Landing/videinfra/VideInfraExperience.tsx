import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  VI_SEGMENT_COUNT,
  viSlides,
  type ViSlide,
} from '@/screens/Landing/videinfra/slideData'

const INTRO_COLOR = '#3a2a6e'
const COLOR_STOPS = [INTRO_COLOR, ...viSlides.map((s) => s.color)]
/** Full travel time — long so the path feels slow once motion has started */
const SNAP_MS = 2600
/** Brief pin after settle (visual only — does not block the next scroll) */
const PIN_MS = 180
/** Wheel idle gap that marks a new gesture */
const GESTURE_IDLE_MS = 100

/** Ease-out: reacts immediately, then decelerates into place */
function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

/**
 * Full-viewport scroll experience inspired by
 * https://ai-in-banking-ux-design.videinfra.com/
 *
 * Phones enter from the left screen edge; backgrounds use layered
 * gradients (live site uses WebGL gradient canvases).
 */
export function VideInfraExperience() {
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const targetRef = useRef(0)
  const animatingRef = useRef(false)
  const pinUntilRef = useRef(0)
  const gestureArmedRef = useRef(true)
  const pendingDirRef = useRef<0 | 1 | -1>(0)
  const idleTimerRef = useRef(0)
  const pinningRef = useRef(false)
  const rafRef = useRef(0)
  const animRef = useRef(0)
  const animateToRef = useRef<(index: number) => void>(() => {})
  const [progress, setProgress] = useState(0)
  const [viewport, setViewport] = useState({ w: 1280, h: 800 })

  const segment = Math.min(
    VI_SEGMENT_COUNT - 1,
    Math.max(0, Math.round(progress)),
  )
  const bar =
    segment === 0 ? 0 : (segment / viSlides.length) * 100

  const atmos = useMemo(() => atmosFromProgress(progress), [progress])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const readProgress = () => {
      const total = track.offsetHeight - window.innerHeight
      if (total <= 0) return 0
      const scrolled = Math.min(
        Math.max(-track.getBoundingClientRect().top, 0),
        total,
      )
      return (scrolled / total) * (VI_SEGMENT_COUNT - 1)
    }

    const syncScroll = (p: number) => {
      const total = Math.max(track.offsetHeight - window.innerHeight, 1)
      const absTop =
        track.getBoundingClientRect().top +
        window.scrollY +
        (p / (VI_SEGMENT_COUNT - 1)) * total
      pinningRef.current = true
      window.scrollTo(0, absTop)
      requestAnimationFrame(() => {
        pinningRef.current = false
      })
    }

    const publish = (next: number) => {
      progressRef.current = next
      setProgress(next)
    }

    const isExperiencePinned = () => {
      const rect = track.getBoundingClientRect()
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1
    }

    const onScroll = () => {
      if (pinningRef.current || animatingRef.current) return

      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        if (pinningRef.current || animatingRef.current) return

        // Hold the settled slide so inertia can't flash the next product
        if (isExperiencePinned()) {
          const t = targetRef.current
          const hold =
            performance.now() < pinUntilRef.current ||
            (t > 0 && t < VI_SEGMENT_COUNT - 1)
          if (hold) {
            publish(t)
            syncScroll(t)
            return
          }
        }
        publish(readProgress())
        targetRef.current = Math.round(progressRef.current)
      })
    }

    const onResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight })
      syncScroll(progressRef.current)
    }

    const flushPending = () => {
      const dir = pendingDirRef.current
      if (!dir || animatingRef.current) return
      pendingDirRef.current = 0
      const next = Math.min(
        VI_SEGMENT_COUNT - 1,
        Math.max(0, targetRef.current + dir),
      )
      if (next !== targetRef.current) animateTo(next)
    }

    const armGestureWhenIdle = () => {
      window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = window.setTimeout(() => {
        if (animatingRef.current) return
        gestureArmedRef.current = true
        flushPending()
      }, GESTURE_IDLE_MS)
    }

    const animateTo = (index: number) => {
      const toP = Math.min(VI_SEGMENT_COUNT - 1, Math.max(0, index))
      targetRef.current = toP
      gestureArmedRef.current = false
      pendingDirRef.current = 0
      if (animRef.current) cancelAnimationFrame(animRef.current)

      const fromP = progressRef.current
      if (Math.abs(fromP - toP) < 0.001) {
        animatingRef.current = false
        publish(toP)
        syncScroll(toP)
        pinUntilRef.current = performance.now() + PIN_MS
        armGestureWhenIdle()
        return
      }

      animatingRef.current = true
      const start = performance.now()
      const first = fromP + (toP - fromP) * 0.02
      publish(first)
      syncScroll(first)

      const tick = (now: number) => {
        const u = Math.min(1, (now - start) / SNAP_MS)
        const p = fromP + (toP - fromP) * easeOutCubic(u)
        publish(p)
        syncScroll(p)
        if (u < 1) {
          animRef.current = requestAnimationFrame(tick)
        } else {
          animRef.current = 0
          animatingRef.current = false
          publish(toP)
          syncScroll(toP)
          pinUntilRef.current = performance.now() + PIN_MS
          // Ready for the next scroll almost immediately after a tiny idle gap
          armGestureWhenIdle()
        }
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animateToRef.current = animateTo

    const onWheel = (e: WheelEvent) => {
      if (!isExperiencePinned()) return

      const goingDown = e.deltaY > 0
      const basis = targetRef.current
      const atStart = basis <= 0 && !goingDown
      const atEnd = basis >= VI_SEGMENT_COUNT - 1 && goingDown
      // Let the user leave the experience at the ends
      if (atStart || atEnd) return

      // Consume wheel so native scroll can't whip through slides
      e.preventDefault()

      if (Math.abs(e.deltaY) < 4) return

      const dir: 1 | -1 = goingDown ? 1 : -1

      // During a snap: ignore (don't queue — avoids inertia chaining)
      if (animatingRef.current) {
        armGestureWhenIdle()
        return
      }

      // Between snaps: queue the intent so a quick follow-up isn't lost
      if (!gestureArmedRef.current) {
        pendingDirRef.current = dir
        armGestureWhenIdle()
        return
      }

      pendingDirRef.current = 0
      const next = Math.min(
        VI_SEGMENT_COUNT - 1,
        Math.max(0, basis + dir),
      )
      animateTo(next)
    }

    setViewport({ w: window.innerWidth, h: window.innerHeight })
    const initial = readProgress()
    publish(initial)
    targetRef.current = Math.round(initial)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('wheel', onWheel)
      window.clearTimeout(idleTimerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const goToSegment = (index: number) => {
    animateToRef.current(index)
  }

  return (
    <section
      className="vi-experience"
      id="hero"
      aria-label="AI-driven banking features"
      style={{ ['--vi-bg' as string]: atmos.base }}
    >
      <div
        className="vi-track"
        ref={trackRef}
        style={{ ['--vi-segments' as string]: String(VI_SEGMENT_COUNT) }}
      >
        <div className="vi-sticky">
          {/* Atmospheric mesh-like gradient (stand-in for live js-gradient-canvas) */}
          <div className="vi-atmos" style={atmos.style} aria-hidden />

          <div className="vi-stage">
            <IntroPanel progress={progress} index={0} />
            {viSlides.map((s, i) => (
              <SlidePanel
                key={s.id}
                slide={s}
                progress={progress}
                index={i + 1}
                viewport={viewport}
              />
            ))}
          </div>

          <div className="vi-progress" aria-hidden>
            <i style={{ width: `${bar}%` }} />
            <span style={{ width: `${Math.max(0, 100 - bar)}%` }} />
          </div>

          <p className="vi-hint">
            <span /> {segment === 0 ? 'scroll to explore' : 'scroll'}
          </p>

          <div className="vi-dots" role="tablist" aria-label="Features">
            {viSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-label={s.title}
                aria-selected={segment === i + 1}
                className={segment === i + 1 ? 'is-active' : undefined}
                onClick={() => goToSegment(i + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- color / atmosphere ---------- */

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

function mixHex(a: string, b: string, t: number) {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  return rgbToHex({
    r: A.r + (B.r - A.r) * t,
    g: A.g + (B.g - A.g) * t,
    b: A.b + (B.b - A.b) * t,
  })
}

function shade(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex)
  const f = amount < 0 ? 1 + amount : 1
  const lift = amount > 0 ? amount : 0
  return rgbToHex({
    r: r * f + 255 * lift,
    g: g * f + 255 * lift,
    b: b * f + 255 * lift,
  })
}

function atmosFromProgress(progress: number) {
  const max = COLOR_STOPS.length - 1
  const i = Math.min(max - 1, Math.max(0, Math.floor(progress)))
  const t = Math.min(1, Math.max(0, progress - i))
  const base = mixHex(COLOR_STOPS[i], COLOR_STOPS[i + 1], t)
  // Stronger depth like the live js-gradient-canvas scenes
  const deep = mixHex(shade(base, -0.55), '#12081f', 0.35)
  const mid = shade(base, -0.18)
  const lift = shade(base, 0.32)
  const glow = mixHex(shade(base, 0.45), '#e0d2ff', 0.25)
  const accent = mixHex(base, '#d4a8f0', 0.4)
  const cool = mixHex(base, '#7aa0e8', 0.35)

  return {
    base,
    style: {
      background: [
        `radial-gradient(ellipse 95% 75% at 12% 92%, ${accent}77 0%, transparent 58%)`,
        `radial-gradient(ellipse 70% 55% at 78% 8%, ${glow}66 0%, transparent 50%)`,
        `radial-gradient(ellipse 55% 45% at 40% 35%, ${cool}40 0%, transparent 55%)`,
        `radial-gradient(ellipse 50% 40% at 55% 55%, ${lift}2e 0%, transparent 60%)`,
        `radial-gradient(ellipse 130% 100% at 50% 130%, ${deep}ee 0%, transparent 58%)`,
        `linear-gradient(148deg, ${deep} 0%, ${mid} 38%, ${base} 68%, ${lift} 100%)`,
      ].join(','),
    } as CSSProperties,
  }
}

/* ---------- motion helpers ---------- */

function panelStyle(progress: number, index: number) {
  const d = progress - index
  const t = Math.min(1.2, Math.abs(d))
  // Stay visible while content travels in from the left edge
  const opacity =
    t > 1.15
      ? 0
      : d < 0
        ? Math.max(0, 1 - Math.max(0, t - 0.05) * 0.95)
        : Math.max(0, 1 - Math.max(0, t - 0.45) * 2.4)
  const visible = opacity > 0.03
  const active = Math.abs(d) < 0.5

  return {
    opacity,
    visibility: (visible ? 'visible' : 'hidden') as 'visible' | 'hidden',
    pointerEvents: (active ? 'auto' : 'none') as 'auto' | 'none',
    zIndex: active ? 2 : Math.abs(d) < 1 ? 1 : 0,
    ['--vi-settle' as string]: String(
      Math.max(0, 1 - Math.min(1, Math.abs(d))),
    ),
  }
}

function childOffset(progress: number, index: number, order: number) {
  const d = progress - index
  const lag = 0.07 * order
  const local = d + lag
  // Copy starts near left edge (vw-ish via large px) then settles
  const from = Math.max(0, -local)
  const x = local < 0 ? -from * 120 - from * 40 : local * 36
  const opacity = Math.max(0, 1 - Math.abs(local) * 1.05)
  return {
    transform: `translate3d(${x}px, 0, 0)`,
    opacity,
  }
}

function IntroPanel({
  progress,
  index,
}: {
  progress: number
  index: number
}) {
  const style = panelStyle(progress, index)
  const settle = Number(style['--vi-settle'])
  return (
    <div
      className={`vi-panel vi-intro${settle > 0.55 ? ' is-active' : ''}`}
      style={style}
      aria-hidden={settle < 0.4}
    >
      <img
        className="vi-intro-bg"
        src="/videinfra/images/siri.avif"
        alt=""
        aria-hidden
      />
      <div className="vi-intro-veil" aria-hidden />
      <p
        className="vi-intro-kicker vi-anim"
        style={childOffset(progress, index, 0)}
      >
        A fresh look at finance UX
      </p>
      <p
        className="vi-intro-count vi-anim"
        style={childOffset(progress, index, 1)}
      >
        10
      </p>
      <div
        className="vi-intro-copy vi-anim"
        style={childOffset(progress, index, 2)}
      >
        <h1>
          AI-driven
          <br />
          Features
        </h1>
        <p>Revolutionizing Banking UX</p>
      </div>
    </div>
  )
}

function SlidePanel({
  slide,
  progress,
  index,
  viewport,
}: {
  slide: ViSlide
  progress: number
  index: number
  viewport: { w: number; h: number }
}) {
  const style = panelStyle(progress, index)
  const settle = Number(style['--vi-settle'])
  return (
    <div
      className={`vi-panel vi-slide${settle > 0.55 ? ' is-active' : ''}`}
      data-count={slide.images.length}
      style={style}
      aria-hidden={settle < 0.4}
    >
      <div className="vi-slide-copy">
        <p
          className="vi-slide-number vi-anim"
          style={childOffset(progress, index, 0)}
        >
          {slide.id}
        </p>
        <p
          className="vi-slide-caption vi-anim"
          style={childOffset(progress, index, 1)}
        >
          {slide.caption}
        </p>
        <h2 className="vi-slide-title">
          {slide.titleLines.map((line, i) => (
            <span
              key={line}
              className="vi-anim"
              style={childOffset(progress, index, 2 + i)}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="vi-slide-media" aria-hidden>
        {slide.images.map((src, i) => (
          <figure
            key={src}
            className={`vi-phone vi-phone-${i + 1} vi-anim`}
            style={phoneStyle(
              progress,
              index,
              i,
              slide.images.length,
              viewport,
            )}
          >
            <img src={`${src}?v=4`} alt="" draggable={false} />
          </figure>
        ))}
      </div>
    </div>
  )
}

/**
 * Phones start at the left screen boundary (left-center / left-bottom)
 * and travel into their resting pose on the right.
 */
function phoneStyle(
  progress: number,
  index: number,
  i: number,
  count: number,
  viewport: { w: number; h: number },
) {
  const d = progress - index
  const lag = 0.08 + i * 0.06
  const local = d + lag

  // 1 at left boundary, 0 settled in place
  const from = Math.max(0, Math.min(1, -local))
  // Ease-out so they decelerate into place
  const e = from * from * (3 - 2 * from)

  // Resting pose
  let baseX = 0
  let baseY = 0
  let rot = 0
  let scale = 1
  if (count === 2) {
    if (i === 0) {
      baseX = -40
      baseY = 10
      rot = -4
    } else {
      baseX = 50
      baseY = -8
      rot = 5
    }
  } else if (count === 3) {
    if (i === 0) {
      baseX = -70
      baseY = 24
      rot = -6
      scale = 0.92
    } else if (i === 1) {
      baseY = -6
    } else {
      baseX = 72
      baseY = 18
      rot = 6
      scale = 0.92
    }
  }

  // Travel from left edge of viewport into the media column
  const travelX = viewport.w * 0.78 + i * 36
  // Start slightly low (left-bottom / left-center), rise into place
  const travelY = viewport.h * (0.14 + i * 0.03)

  const x = baseX - e * travelX
  const y = baseY + e * travelY
  const r = rot - e * (10 + i * 4)
  const s = scale * (0.88 + (1 - e) * 0.12)

  // Stay visible while entering from the edge (don't fade out off-screen)
  const opacity =
    local < 0
      ? Math.max(0.2, 1 - from * 0.45)
      : Math.max(0, 1 - Math.abs(local) * 1.15)

  return {
    transform: `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`,
    opacity,
  }
}
