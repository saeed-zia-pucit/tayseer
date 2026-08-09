import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCoreIntegrations } from '@/app/coreIntegrationsProvider'
import { useImplementationJourney } from '@/app/implementationJourneyProvider'
import { useMbukeDemo } from '@/app/mbukeDemoProvider'
import { useWhiteLabel } from '@/app/whiteLabelProvider'
import { StoryVisual } from '@/screens/Landing/prototype/StoryVisuals'
import {
  storyProducts,
  type StoryProduct,
} from '@/screens/Landing/prototype/storyData'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/**
 * Scroll-driven circular 3D carousel from the reference prototype.
 * Sticky viewport; scroll rotates products; CTA opens internal demos.
 */
export function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const fxRef = useRef<HTMLCanvasElement>(null)

  const [index, setIndex] = useState(0)
  const [fresh, setFresh] = useState(false)
  const active = storyProducts[index]
  const n = storyProducts.length
  const step = (Math.PI * 2) / n

  const { reset: resetWl } = useWhiteLabel()
  const { reset: resetMbuke } = useMbukeDemo()
  const { reset: resetCore } = useCoreIntegrations()
  const { reset: resetJourney } = useImplementationJourney()

  const onCta = (product: StoryProduct) => {
    switch (product.cta.reset) {
      case 'journey':
        resetJourney()
        break
      case 'mbuke':
        resetMbuke()
        break
      case 'wl':
        resetWl()
        break
      case 'core':
        resetCore()
        break
      default:
        break
    }
  }

  useEffect(() => {
    const track = trackRef.current
    const ring = ringRef.current
    if (!track || !ring) return

    let lastIndex = -1
    let smoothRot = 0
    let targetRot = 0
    let rafId = 0

    const layout = (rot: number) => {
      const mobile = window.innerWidth < 900
      const radius = mobile
        ? Math.min(140, window.innerWidth * 0.3)
        : Math.min(230, window.innerWidth * 0.2)
      const tilt = mobile ? 52 : 56
      // Keep the ring low enough that the front product clears the chapter title
      ring.style.transform = `translateY(${mobile ? 48 : 64}px) rotateX(${tilt}deg)`

      let best = 0
      let bestDepth = -1

      itemRefs.current.forEach((item, i) => {
        if (!item) return
        const angle = i * step - rot
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        const depth = (z + radius) / (radius * 2)
        const scale = lerp(0.4, 1, easeOutCubic(depth))
        const opacity = lerp(0.28, 1, depth)
        const blur = (1 - depth) * 3.2
        const yFace = (-angle * 180) / Math.PI
        const face = `rotateX(${-tilt}deg) rotateY(${yFace}deg)`

        item.style.transform = `translate3d(${x}px, 0, ${z}px) ${face} scale(${scale})`
        item.style.opacity = String(opacity)
        item.style.filter = blur > 0.4 ? `blur(${blur}px)` : 'none'
        item.style.zIndex = String(Math.round(40 + depth * 60))
        item.classList.toggle('is-front', depth > 0.82)

        if (depth > bestDepth) {
          bestDepth = depth
          best = i
        }
      })

      if (best !== lastIndex) {
        lastIndex = best
        setIndex(best)
        setFresh(true)
        window.setTimeout(() => setFresh(false), 40)
      }
    }

    const tick = () => {
      smoothRot += (targetRot - smoothRot) * 0.12
      if (Math.abs(targetRot - smoothRot) < 0.0005) smoothRot = targetRot
      layout(smoothRot)
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      const scrolled =
        total <= 0 ? 0 : Math.min(Math.max(-rect.top, 0), total)
      const progress = total <= 0 ? 0 : scrolled / total
      targetRot = progress * (n - 1) * step
    }

    onScroll()
    smoothRot = targetRot
    layout(smoothRot)
    rafId = requestAnimationFrame(tick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [n, step])

  /* Story FX particles */
  useEffect(() => {
    const canvas = fxRef.current
    const sticky = stickyRef.current
    if (!canvas || !sticky) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      r: number
    }[] = []
    let raf = 0

    const resize = () => {
      const r = sticky.getBoundingClientRect()
      canvas.width = Math.floor(r.width * devicePixelRatio)
      canvas.height = Math.floor(r.height * devicePixelRatio)
      canvas.style.width = `${r.width}px`
      canvas.style.height = `${r.height}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      particles = Array.from({ length: 48 }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.35,
        r: 0.6 + Math.random() * 1.8,
      }))
    }

    const frame = () => {
      const rw = canvas.clientWidth
      const rh = canvas.clientHeight
      ctx.clearRect(0, 0, rw, rh)
      for (let i = 0; i < 5; i++) {
        const x = ((Date.now() / 40 + i * 120) % (rw + 80)) - 40
        const grad = ctx.createLinearGradient(x, 0, x + 80, rh)
        grad.addColorStop(0, 'rgba(0,242,255,0)')
        grad.addColorStop(0.5, `rgba(0,242,255,${0.04 + i * 0.01})`)
        grad.addColorStop(1, 'rgba(0,242,255,0)')
        ctx.fillStyle = grad
        ctx.fillRect(x, 0, 2, rh)
      }
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) {
          p.y = rh + 10
          p.x = Math.random() * rw
        }
        if (p.x < 0 || p.x > rw) p.vx *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,242,255,${0.2 + p.z * 0.5})`
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const jumpTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const total = Math.max(track.offsetHeight - window.innerHeight, 1)
    // offsetTop is relative to offsetParent (.scroll-story), use absolute page Y
    const trackTop =
      track.getBoundingClientRect().top + window.scrollY
    const top = trackTop + (i / Math.max(n - 1, 1)) * total
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      className="scroll-story"
      id="solutions"
      aria-label="Product storytelling experience"
    >
      <div
        className="scroll-story-track"
        id="scrollStoryTrack"
        ref={trackRef}
        style={{ ['--slides' as string]: String(n) }}
      >
        <div
          className="scroll-story-sticky"
          id="scrollStorySticky"
          ref={stickyRef}
          style={{ ['--scene-glow' as string]: active.glow }}
        >
          <canvas className="story-fx" id="storyFx" ref={fxRef} aria-hidden />
          <div className="story-vignette" aria-hidden />
          <div className="story-streams" aria-hidden>
            <span /><span /><span /><span /><span />
          </div>

          <header className="story-chrome">
            <div className="story-chrome-left">
              <p className="eyebrow">Tayseer · Product Carousel</p>
              <p className="story-chapter" id="storyChapter">
                {active.title}
              </p>
            </div>
            <div className="story-chrome-right">
              <span className="mono" id="storyCounter">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(n).padStart(2, '0')}
              </span>
              <div className="story-progress">
                <i
                  id="storyProgressFill"
                  style={{
                    width: `${(index / Math.max(n - 1, 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </header>

          <div className="carousel-layout" id="storyCamera">
            <div className="carousel-stage">
              <div className="carousel-ring-scene">
                <div className="carousel-disc" aria-hidden />
                <div className="carousel-ring" id="carouselRing" ref={ringRef}>
                  {storyProducts.map((s, i) => (
                    <div
                      key={s.id}
                      className="carousel-item"
                      data-i={i}
                      ref={(el) => {
                        itemRefs.current[i] = el
                      }}
                      style={{ ['--slide-glow' as string]: s.glow }}
                    >
                      <div className="carousel-item-glow" />
                      <div className="carousel-item-visual">
                        <StoryVisual type={s.visual} />
                      </div>
                      <div className="carousel-item-label">{s.title}</div>
                    </div>
                  ))}
                </div>
                <div className="carousel-focus" aria-hidden />
              </div>
              <div
                className="carousel-thumbs"
                id="carouselThumbs"
                role="tablist"
                aria-label="Select product"
              >
                {storyProducts.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`carousel-thumb${i === index ? ' active' : ''}`}
                    aria-label={s.title}
                    style={{ ['--thumb-glow' as string]: s.glow }}
                    onClick={() => jumpTo(i)}
                  >
                    <span className="carousel-thumb-icon">{i + 1}</span>
                    <span className="carousel-thumb-name">
                      {s.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <aside
              className={`story-info carousel-info${fresh ? ' is-fresh' : ''}`}
              id="storyInfoPanel"
            >
              <p className="eyebrow" id="infoTag">
                {active.tag}
              </p>
              <h3 id="infoTitle">{active.title}</h3>
              <p className="story-desc" id="infoDesc">
                {active.desc}
              </p>
              <ul className="story-features" id="infoFeatures">
                {active.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="story-actions">
                <Link
                  to={active.cta.to}
                  className="btn btn-primary btn-glow magnetic story-book"
                  id="storyBookBtn"
                  onClick={() => onCta(active)}
                >
                  <span>{active.cta.label}</span>
                </Link>
              </div>
            </aside>
          </div>

          <nav className="story-dots" id="storyDots" role="tablist" aria-label="Products">
            {storyProducts.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-label={s.title}
                className={i === index ? 'active' : undefined}
                onClick={() => jumpTo(i)}
              />
            ))}
          </nav>
          <p className="story-hint">
            <span /> Scroll to rotate the carousel
          </p>
        </div>
      </div>
    </section>
  )
}
