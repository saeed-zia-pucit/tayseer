import { useEffect, useRef } from 'react'

function readBrandRgb(
  name: '--brand-accent-rgb' | '--brand-accent-2-rgb' | '--brand-accent-3-rgb',
  fallback: string,
) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || fallback
}

/** Particle neural background — colours follow the central brand theme. */
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] =
      []
    const mouse = { x: null as number | null, y: null as number | null }

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      particles = Array.from(
        { length: Math.min(70, Math.floor((w * h) / 18000)) },
        () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.4,
        }),
      )
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const frame = () => {
      const accent = readBrandRgb('--brand-accent-rgb', '155, 124, 255')
      const accent2 = readBrandRgb('--brand-accent-2-rgb', '45, 212, 232')
      const accent3 = readBrandRgb('--brand-accent-3-rgb', '196, 181, 253')

      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        if (mouse.x != null && mouse.y != null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140 && dist > 0.01) {
            p.x += (dx / dist) * 0.35
            p.y += (dy / dist) * 0.35
          }
        }

        const tone = i % 3 === 0 ? accent : i % 3 === 1 ? accent2 : accent3
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${tone},0.65)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 130) {
            const link = j % 2 === 0 ? accent2 : accent
            ctx.strokeStyle = `rgba(${link},${(1 - d / 130) * 0.32})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas id="bgCanvas" ref={ref} aria-hidden />
}
