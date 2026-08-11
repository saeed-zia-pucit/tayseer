import { Link } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { experiments, type ExperimentItem } from '@/screens/Experiments/experiments'

const accentVar: Record<ExperimentItem['accent'], string> = {
  accent: 'var(--brand-accent)',
  accent2: 'var(--brand-accent-2)',
  accent3: 'var(--brand-accent-3)',
  soft: 'var(--brand-accent-soft)',
}

/**
 * Hub for interactive flows — same dark atmosphere as the marketing home.
 */
export function ExperimentsPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface text-ink">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 55% 40% at 15% 0%, rgb(var(--brand-accent-rgb) / 0.14), transparent 55%),
            radial-gradient(ellipse 45% 35% at 90% 8%, rgb(var(--brand-accent-2-rgb) / 0.1), transparent 50%),
            linear-gradient(180deg, #0b0b0b 0%, #0b0b0b 100%)
          `,
        }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-2 sm:px-6">
        <section className="max-w-2xl">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--brand-accent)' }}
          >
            AI Playground
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Experiment in the AI Playground
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
            Interactive discovery, white-label demos, delivery, and architecture
            flows — continuous with the Tayseer Innovations homepage.
          </p>
          <a
            href="/"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5"
            style={{ color: 'var(--brand-accent)' }}
          >
            ← Back to homepage
          </a>
        </section>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((item, index) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="group flex h-full flex-col rounded-[16px] p-5 transition duration-200 hover:-translate-y-0.5"
                style={{
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="rounded-[8px] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0b0b0b]"
                    style={{ background: accentVar[item.accent] }}
                  >
                    {item.tag}
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-white">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
                  {item.blurb}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold transition group-hover:gap-2.5"
                  style={{ color: 'var(--brand-accent)' }}
                >
                  Open experiment
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
