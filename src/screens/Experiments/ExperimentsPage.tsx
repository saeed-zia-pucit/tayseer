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
 * Hub for internal interactive flows — product finder, demos, journey, theme lab.
 * Colours come entirely from the global brand token system.
 */
export function ExperimentsPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface text-ink">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 12% -5%, rgb(var(--brand-accent-rgb) / 0.32), transparent 55%),
            radial-gradient(ellipse 55% 45% at 92% 10%, rgb(var(--brand-accent-2-rgb) / 0.22), transparent 52%),
            radial-gradient(ellipse 50% 40% at 50% 105%, rgb(var(--brand-accent-3-rgb) / 0.16), transparent 55%),
            linear-gradient(165deg, var(--brand-bg-deep), var(--brand-bg) 48%, var(--brand-bg-elevated))
          `,
        }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <section className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-bright">
            AI Playground
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Experiment in the AI Playground
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Internal flows for discovery, white-label demos, delivery, and
            architecture. Product demos live on the homepage carousel.
          </p>
        </section>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((item, index) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="group flex h-full flex-col rounded-2xl p-5 ring-1 ring-white/12 transition duration-200 hover:-translate-y-0.5 hover:ring-white/25"
                style={{
                  background:
                    'color-mix(in srgb, var(--brand-bg-elevated) 78%, transparent)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white"
                    style={{ background: accentVar[item.accent] }}
                  >
                    {item.tag}
                  </span>
                  <span className="font-mono text-xs text-ink/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {item.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-lagoon-bright transition group-hover:gap-2.5">
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
