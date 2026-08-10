import { useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCT_CATALOG } from '@/data/productCatalog'
import { cn } from '@/lib/cn'

/** Evenly spaced orbit around the hub — starts at top, equal angle steps */
function orbitPositions(count: number, radiusX = 36, radiusY = 34) {
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / count
    return {
      x: 50 + Math.cos(angle) * radiusX,
      y: 50 + Math.sin(angle) * radiusY,
    }
  })
}

function curvePath(
  cx: number,
  cy: number,
  x: number,
  y: number,
  i: number,
) {
  const mx = (cx + x) / 2
  const my = (cy + y) / 2
  const dx = x - cx
  const dy = y - cy
  const len = Math.hypot(dx, dy) || 1
  const bend = (i % 2 === 0 ? 1 : -1) * Math.min(40, len * 0.16)
  const ox = (-dy / len) * bend
  const oy = (dx / len) * bend
  return `M${cx},${cy} Q${mx + ox},${my + oy} ${x},${y}`
}

/**
 * Simple hub hero — tagline, product constellation, CTA into carousel.
 */
export function HomeHubHero() {
  const [active, setActive] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)
  const products = useMemo(() => {
    const slots = orbitPositions(PRODUCT_CATALOG.length)
    return PRODUCT_CATALOG.map((p, i) => ({
      ...p,
      x: slots[i]?.x ?? 50,
      y: slots[i]?.y ?? 50,
    }))
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (canvasRef.current?.matches(':hover')) return
      setActive((i) => (i + 1) % products.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [products.length])

  const vbW = 1000
  const vbH = 700
  const cx = vbW / 2
  const cy = vbH / 2

  const scrollToProducts = () => {
    const el = document.getElementById('products')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      className="vi-experience vi-hub-hero"
      id="hero"
      aria-label="Tayseer platform hub"
    >
      <div className="vi-hub-sticky">
        <div className="vi-hub-atmos" aria-hidden />
        <div className="vi-hub-grid" aria-hidden />

        <div className="vi-hub-copy">
          <p className="vi-hub-tagline">Every product. One banking hub.</p>
        </div>

        <div className="vi-hub-canvas" ref={canvasRef}>
          <svg
            className="vi-hub-lines"
            viewBox={`0 0 ${vbW} ${vbH}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="hubSignal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.35" />
              </linearGradient>
              <filter id="hubGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {products.map((p, i) => {
              const x = (p.x / 100) * vbW
              const y = (p.y / 100) * vbH
              const d = curvePath(cx, cy, x, y, i)
              const dur = (2.1 + (i % 4) * 0.4).toFixed(2)
              return (
                <g key={p.id}>
                  <path
                    className={cn('vi-hub-link', i === active && 'is-active')}
                    d={d}
                  />
                  <path
                    className={cn('vi-hub-pulse', i === active && 'is-active')}
                    d={d}
                    pathLength={100}
                  />
                  <circle
                    className="vi-hub-dot"
                    r={i === active ? 4.5 : 3}
                    filter="url(#hubGlow)"
                  >
                    <animateMotion
                      dur={`${dur}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                </g>
              )
            })}
          </svg>

          <div className="vi-hub-core">
            <div className="vi-hub-core-glow" />
            <div className="vi-hub-core-rings" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="vi-hub-core-orb">
              <span className="vi-hub-core-mark">Tayseer</span>
              <small>AI Banking Hub</small>
            </div>
          </div>

          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={cn('vi-hub-node', i === active && 'is-active')}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={scrollToProducts}
            >
              <span className="vi-hub-node-tag">{p.tag}</span>
              <span className="vi-hub-node-name">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="vi-hub-cta">
          <button
            type="button"
            className="vi-hub-scroll"
            onClick={scrollToProducts}
          >
            Explore products
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
