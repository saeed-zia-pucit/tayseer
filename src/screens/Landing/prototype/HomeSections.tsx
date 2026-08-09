import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/lib/constants'
import { archNodes, ecoNodes } from '@/screens/Landing/prototype/storyData'

export function HomeNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`} id="nav">
      <a href="#hero" className="nav-brand">
        <span className="brand-mark" />
        <span>Tayseer</span>
      </a>
      <div className="nav-links">
        <a href="#hero" onClick={() => setOpen(false)}>
          Products
        </a>
        <a href="#ecosystem" onClick={() => setOpen(false)}>
          AI Ecosystem
        </a>
        <a href="#architecture" onClick={() => setOpen(false)}>
          Architecture
        </a>
        <a href="#presence" onClick={() => setOpen(false)}>
          Presence
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Connect
        </a>
      </div>
      <a href="#contact" className="btn btn-primary btn-sm magnetic">
        Book a Demo
      </a>
      <button
        className="nav-toggle"
        id="navToggle"
        aria-label="Menu"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span />
      </button>
    </nav>
  )
}

export function HeroSection() {
  return (
    <section className="hero hero-cinematic" id="hero">
      <div className="hero-grid">
        <div className="hero-copy reveal visible">
          <p className="eyebrow">Tayseer Innovations · Product Story</p>
          <h1>
            Banking,
            <br />
            <span className="gradient-text">Reimagined</span>
            <br />
            Through AI.
          </h1>
          <p className="hero-sub">
            An immersive journey through the platforms powering modern finance —
            from digital ecosystems to connected banking networks across KSA &amp; the
            UAE.
          </p>
          <div className="hero-ctas">
            <a href="#solutions" className="btn btn-primary magnetic">
              <span>Begin the Journey</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link to={routes.mbukeDemo} className="btn btn-ghost magnetic">
              Try a live demo
            </Link>
          </div>
          <div className="hero-trust">
            <span>ISO 27001 Certified</span>
            <span className="dot" />
            <span>KSA · UAE</span>
            <span className="dot" />
            <span>Enterprise Fintech</span>
          </div>
        </div>

        <div className="hero-stage reveal visible" data-delay="120">
          <div className="dash-orbit">
            <div className="glass-card dash-main float-a">
              <div className="dash-header">
                <span className="live-dot" />
                <span>Live Banking Pulse</span>
                <span className="mono">+12.4%</span>
              </div>
              <div className="sparkline" id="sparkline" />
              <div className="dash-metrics">
                <div>
                  <small>Volume</small>
                  <strong className="mono">$2.4M</strong>
                </div>
                <div>
                  <small>TXN/s</small>
                  <strong className="mono">1,842</strong>
                </div>
                <div>
                  <small>AI Score</small>
                  <strong className="mono">98.7</strong>
                </div>
              </div>
            </div>

            <div className="glass-card float-card ai-panel float-b">
              <div className="ai-avatar">AI</div>
              <div>
                <strong>Fahim AI</strong>
                <p>Fraud anomaly detected · cleared in 0.4s</p>
              </div>
            </div>

            <div className="glass-card float-card wallet-card float-c">
              <small>Digital Wallet</small>
              <strong className="mono">AED 48,290</strong>
              <div className="mini-bars">
                <i /><i /><i /><i /><i />
              </div>
            </div>

            <div className="glass-card float-card notif-card float-d">
              <span className="notif-icon">↗</span>
              <div>
                <strong>Payment received</strong>
                <p className="mono">+SAR 12,500</p>
              </div>
            </div>

            <div className="glass-card float-card api-card float-e">
              <small>API Gateway</small>
              <div className="api-pills">
                <span>Core</span>
                <span>Payments</span>
                <span>Cards</span>
              </div>
            </div>

            <div className="phone-mini float-f">
              <div className="phone-bezel">
                <div className="phone-notch" />
                <div className="phone-screen-mini">
                  <div className="mini-balance">Balance</div>
                  <div className="mini-amount mono">$24,850</div>
                  <div className="mini-chart" />
                </div>
              </div>
              <div className="signal-rings" aria-hidden>
                <span /><span /><span />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-hint">
        <span>Scroll to explore products</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
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
  const bend = (i % 2 === 0 ? 1 : -1) * Math.min(48, len * 0.18)
  const ox = (-dy / len) * bend
  const oy = (dx / len) * bend
  return `M${cx},${cy} Q${mx + ox},${my + oy} ${x},${y}`
}

export function EcosystemSection() {
  const [active, setActive] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (canvasRef.current && !canvasRef.current.matches(':hover')) {
        setActive((i) => (i + 1) % ecoNodes.length)
      }
    }, 1600)
    return () => window.clearInterval(id)
  }, [])

  const vbW = 800
  const vbH = 560
  const cx = vbW / 2
  const cy = vbH * 0.48

  return (
    <section className="section ecosystem" id="ecosystem">
      <div className="section-head reveal visible">
        <p className="eyebrow">Fahim AI · Neural Core</p>
        <h2>
          Tayseer AI &amp;{' '}
          <span className="gradient-text">Core Banking Architecture</span>
        </h2>
        <p className="section-sub">
          Watch signals pulse from the AI brain into every banking capability.
        </p>
      </div>
      <div className="eco-canvas reveal visible" id="ecoCanvas" ref={canvasRef}>
        <div className="eco-circuit-bg" aria-hidden />
        <svg
          className="eco-lines"
          id="ecoLines"
          viewBox={`0 0 ${vbW} ${vbH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="signalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.1" />
              <stop offset="40%" stopColor="#00F2FF" />
              <stop offset="100%" stopColor="#7CFFB2" />
            </linearGradient>
            <radialGradient id="nodeHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00F2FF" stopOpacity="0" />
            </radialGradient>
            <filter id="softNeon" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {ecoNodes.map((n, i) => {
            const x = (n.x / 100) * vbW
            const y = (n.y / 100) * vbH
            const d = curvePath(cx, cy, x, y, i)
            const dur = (2 + (i % 4) * 0.35).toFixed(2)
            return (
              <g key={n.label}>
                <path className="eco-link-base" d={d} />
                <path
                  className={`eco-link-pulse delay-${i % 7}`}
                  d={d}
                  pathLength={100}
                />
                <circle className="eco-signal-dot" r="3.5" filter="url(#softNeon)">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
                </circle>
                <circle cx={x} cy={y} r="10" fill="url(#nodeHalo)" opacity="0.55" />
              </g>
            )
          })}
        </svg>
        <div className="eco-core">
          <div className="brain-glow" />
          <div className="brain-rings" aria-hidden>
            <span /><span /><span />
          </div>
          <div className="brain-visual" aria-hidden>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 40% 35%, #00F2FF, #0066FF 70%)',
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--font-h)',
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: 2,
                color: '#fff',
                boxShadow: '0 0 40px rgba(0,242,255,0.5)',
              }}
            >
              AI
            </div>
          </div>
          <div className="brain-label">
            <span>Fahim</span>
            <small>AI Core</small>
          </div>
        </div>
        <div className="eco-nodes" id="ecoNodes">
          {ecoNodes.map((n, i) => (
            <div
              key={n.label}
              className={`eco-node${i === active ? ' active' : ''}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              onPointerEnter={() => setActive(i)}
            >
              {n.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ArchitectureSection() {
  const [upTo, setUpTo] = useState(0)
  const flowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (flowRef.current && !flowRef.current.matches(':hover')) {
        setUpTo((v) => (v + 1) % archNodes.length)
      }
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="section architecture" id="architecture">
      <div className="section-head reveal visible">
        <p className="eyebrow">Core Banking</p>
        <h2>
          Interactive <span className="gradient-text">system architecture</span>
        </h2>
        <p className="section-sub">Click any node to illuminate the transaction path.</p>
      </div>
      <div className="arch-flow reveal visible" id="archFlow" ref={flowRef}>
        {archNodes.flatMap((n, i) => {
          const nodes = [
            <button
              key={n.title}
              type="button"
              className={`arch-node${i <= upTo ? ' active' : ''}`}
              onClick={() => setUpTo(i)}
            >
              {n.title}
              <small>{n.sub}</small>
            </button>,
          ]
          if (i < archNodes.length - 1) {
            nodes.push(
              <span
                key={`a-${n.title}`}
                className={`arch-arrow${i < upTo ? ' lit' : ''}`}
              >
                →
              </span>,
            )
          }
          return nodes
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to={routes.coreIntegrations} className="btn btn-primary magnetic">
          Open Core &amp; Integrations demo
        </Link>
      </div>
    </section>
  )
}

const STAT_RING_C = 2 * Math.PI * 48

function StatCard({
  value,
  suffix,
  label,
  ring,
  playKey,
}: {
  value: number
  suffix: string
  label: string
  ring: number
  playKey: number
}) {
  const [n, setN] = useState(0)
  const [ringP, setRingP] = useState(0)
  const [running, setRunning] = useState(false)
  const gradId = useId()

  useEffect(() => {
    if (playKey === 0) {
      setN(0)
      setRingP(0)
      setRunning(false)
      return
    }

    let cancelled = false
    let raf = 0
    const duration = 1600
    const start = performance.now()
    setN(0)
    setRingP(0)
    setRunning(true)

    const tick = (now: number) => {
      if (cancelled) return
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      setRingP(ring * eased)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setN(value)
        setRingP(ring)
        setRunning(false)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [playKey, value, ring])

  return (
    <div className={`stat-card glass-panel${running ? ' is-counting' : ''}`}>
      <div className="ring" aria-hidden>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#00F2FF" />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="rgba(0,242,255,0.12)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(ringP / 100) * STAT_RING_C} ${STAT_RING_C}`}
            transform="rotate(-90 60 60)"
          />
        </svg>
      </div>
      <div>
        <strong className="mono counter">{n.toLocaleString()}</strong>
        {suffix ? <span>{suffix}</span> : null}
        <p>{label}</p>
      </div>
    </div>
  )
}

const STATS = [
  {
    value: 5500,
    suffix: '+',
    label: 'Professionals & partners in delivery network',
    ring: 92,
  },
  {
    value: 20,
    suffix: '+',
    label: 'Nationalities collaborating across teams',
    ring: 78,
  },
  {
    value: 4,
    suffix: 'M+',
    label: 'Customers impacted through partner banks',
    ring: 96,
  },
  {
    value: 2016,
    suffix: '',
    label: 'Founded — pioneering regional fintech',
    ring: 88,
  },
] as const

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inViewRef = useRef(false)
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let raf = 0
    const measure = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // Section is "in view" when a solid mid-band of the viewport covers it
      const visible = rect.top < vh * 0.7 && rect.bottom > vh * 0.3
      if (visible === inViewRef.current) return
      inViewRef.current = visible
      if (visible) {
        // Replay count-up + ring fill every time the module enters view
        setPlayKey((k) => k + 1)
      } else {
        // Reset so the next visit clearly starts from zero
        setPlayKey(0)
      }
    }

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return (
    <section className="section stats" id="stats" ref={sectionRef}>
      <div className="stats-grid reveal visible">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} playKey={playKey} />
        ))}
      </div>
    </section>
  )
}

export function PresenceSection() {
  return (
    <section className="section presence" id="presence">
      <div className="section-head reveal visible">
        <p className="eyebrow">Global Presence</p>
        <h2>
          Connected across the <span className="gradient-text">Gulf &amp; beyond</span>
        </h2>
      </div>
      <div className="map-wrap reveal visible">
        <svg
          className="world-map"
          viewBox="0 0 900 420"
          role="img"
          aria-label="Regional presence map"
        >
          <defs>
            <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          <ellipse className="map-land" cx="450" cy="220" rx="380" ry="150" />
          <path
            className="map-arc"
            d="M310 250 Q450 120 580 230"
            fill="none"
            stroke="url(#linkGrad)"
            strokeWidth="2"
          />
          <g className="city" transform="translate(310,250)">
            <circle className="city-glow" r="28" fill="url(#cityGlow)" />
            <circle className="city-dot" r="6" />
            <text y="-18">Riyadh · KSA</text>
          </g>
          <g className="city" transform="translate(580,230)">
            <circle className="city-glow" r="28" fill="url(#cityGlow)" />
            <circle className="city-dot" r="6" />
            <text y="-18">Dubai · UAE</text>
          </g>
          <g className="city soft" transform="translate(450,180)">
            <circle className="city-dot" r="4" />
            <text y="-14">Partners</text>
          </g>
        </svg>
        <div className="presence-cards">
          <div className="glass-panel">
            <h4>Saudi Arabia</h4>
            <p>Office 7, Selam Building, Al Rawabi, Riyadh</p>
            <span className="mono">+966 555203079</span>
          </div>
          <div className="glass-panel">
            <h4>United Arab Emirates</h4>
            <p>601, One Lake Plaza, Cluster T, JLT, Dubai</p>
            <span className="mono">+971 43997558</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StoriesSection() {
  return (
    <section className="section stories" id="stories">
      <div className="section-head reveal visible">
        <p className="eyebrow">Client Speak</p>
        <h2>
          Trusted by institutions shaping{' '}
          <span className="gradient-text">digital finance</span>
        </h2>
      </div>
      <div className="stories-track reveal visible" id="storiesTrack">
        <article className="story-card glass-panel">
          <p>
            “Tayseer has been a key partner in driving growth and innovation
            within our individual banking services.”
          </p>
          <footer>
            <strong>Saber Alkahtani</strong>
            <span>Head of Individual Services Sector</span>
          </footer>
        </article>
        <article className="story-card glass-panel">
          <p>
            “Their innovative FinTech solutions provide a robust foundation for
            continuous improvement.”
          </p>
          <footer>
            <strong>Abdulla Alttowi</strong>
            <span>Manager – R&amp;D</span>
          </footer>
        </article>
        <article className="story-card glass-panel">
          <p>
            “The app has been a huge hit, and our customer satisfaction ratings
            have soared since its launch.”
          </p>
          <footer>
            <strong>Bassma Alzailay</strong>
            <span>Development &amp; Systems Analyst Manager</span>
          </footer>
        </article>
      </div>
    </section>
  )
}

const chatSteps = [
  {
    bot: 'Welcome. What best describes your institution?',
    options: ['Bank', 'Exchange house', 'Telecom', 'Fintech / other'],
  },
  {
    bot: 'Which capability are you exploring first?',
    options: ['Core banking', 'Digital wallet / MBuke', 'White-label app', 'Integrations'],
  },
  {
    bot: 'Great — our team can walk you through a tailored demo. Prefer email or a call?',
    options: ['Email info@tayseer.me', 'Book a call'],
  },
]

export function ContactSection() {
  const [step, setStep] = useState(0)
  const [log, setLog] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: chatSteps[0].bot },
  ])

  const pick = (opt: string) => {
    const next = step + 1
    const msgs: { role: 'bot' | 'user'; text: string }[] = [
      ...log,
      { role: 'user', text: opt },
    ]
    if (next < chatSteps.length) {
      msgs.push({ role: 'bot', text: chatSteps[next].bot })
      setStep(next)
    } else {
      msgs.push({
        role: 'bot',
        text: 'Thank you. Reach us at info@tayseer.me — or explore a live product demo above.',
      })
      setStep(chatSteps.length)
    }
    setLog(msgs)
  }

  return (
    <section className="section contact" id="contact">
      <div className="section-head reveal visible">
        <p className="eyebrow">Connect</p>
        <h2>
          Tell us about your <span className="gradient-text">business</span>
        </h2>
        <p className="section-sub">An AI-guided conversation — no cluttered forms.</p>
      </div>
      <div className="chat-shell glass-panel reveal visible">
        <div className="chat-messages" id="chatMessages">
          {log.map((m, i) => (
            <div
              key={i}
              className={m.role === 'bot' ? 'chat-bot' : 'chat-user'}
              style={{
                margin: '0.5rem 0',
                padding: '0.75rem 1rem',
                borderRadius: 14,
                maxWidth: '85%',
                marginLeft: m.role === 'user' ? 'auto' : 0,
                background:
                  m.role === 'bot'
                    ? 'rgba(0,242,255,0.08)'
                    : 'rgba(0,102,255,0.25)',
              }}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="chat-options" id="chatOptions">
          {step < chatSteps.length
            ? chatSteps[step].options.map((o) => (
                <button
                  key={o}
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => pick(o)}
                >
                  {o}
                </button>
              ))
            : (
              <a href="mailto:info@tayseer.me" className="btn btn-primary btn-sm">
                Email info@tayseer.me
              </a>
              )}
        </div>
      </div>
    </section>
  )
}

export function HomeFooter() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="brand-mark" />
        <div>
          <strong>Tayseer Innovations</strong>
          <p>Premier fintech · AI &amp; digital banking · KSA &amp; UAE</p>
        </div>
      </div>
      <div className="footer-links">
        <a href="https://www.tayseer.me/" target="_blank" rel="noopener noreferrer">
          Current site
        </a>
        <a href="mailto:info@tayseer.me">info@tayseer.me</a>
        <Link to={routes.finder}>Product Finder</Link>
      </div>
      <p className="footer-copy">
        © Tayseer Innovations. Interactive product experience.
      </p>
    </footer>
  )
}
