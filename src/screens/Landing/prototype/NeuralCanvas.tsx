import { useEffect, useRef } from 'react'

function readSlide(i: number, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--brand-slide-${i}`)
    .trim()
  return value || fallback
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const full =
    h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = Number.parseInt(full, 16)
  if (Number.isNaN(n)) return '139, 92, 246'
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

/** Particle neural background — saturated hero slide colours. */
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
        { length: Math.min(80, Math.floor((w * h) / 16000)) },
        () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 0.5,
        }),
      )
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const frame = () => {
      const tones = [
        hexToRgb(readSlide(1, '#8b5cf6')),
        hexToRgb(readSlide(2, '#06b6d4')),
        hexToRgb(readSlide(3, '#6366f1')),
        hexToRgb(readSlide(4, '#a855f7')),
        hexToRgb(readSlide(5, '#0ea5e9')),
        hexToRgb(readSlide(6, '#d8b4fe')),
      ]

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

        const tone = tones[i % tones.length]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${tone},0.75)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 140) {
            const link = tones[j % tones.length]
            ctx.strokeStyle = `rgba(${link},${(1 - d / 140) * 0.4})`
            ctx.lineWidth = 1.1
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
