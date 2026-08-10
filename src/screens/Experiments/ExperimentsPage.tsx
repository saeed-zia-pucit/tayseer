import { Link } from 'react-router-dom'
import { routes } from '@/lib/constants'
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

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link to={routes.home} className="group flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-mist"
            style={{ background: 'var(--brand-accent)' }}
          >
            T
          </span>
          <span>
            <span className="block font-display text-lg font-bold leading-none">
              Tayseer
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Experiments
            </span>
          </span>
        </Link>
        <Link
          to={routes.home}
          className="rounded-full px-4 py-2 text-xs font-semibold text-ink/80 ring-1 ring-white/15 hover:bg-white/5"
        >
          Back to site
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6">
        <section className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-bright">
            Interactive lab
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Experiment with Tayseer flows
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Open any experience below — product finders, demo builders, and
            delivery journeys. Try different answers and see how the product
            story changes.
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
