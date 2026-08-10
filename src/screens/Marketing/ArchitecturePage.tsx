import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { routes } from '@/lib/constants'
import { archNodes } from '@/screens/Landing/prototype/storyData'

export function ArchitecturePage() {
  const [active, setActive] = useState(0)

  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface text-ink">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 90% 0%, rgb(var(--brand-accent-2-rgb) / 0.24), transparent 55%),
            radial-gradient(ellipse 50% 40% at 5% 80%, rgb(var(--brand-accent-3-rgb) / 0.16), transparent 50%),
            linear-gradient(165deg, var(--brand-bg-deep), var(--brand-bg) 48%, var(--brand-bg-elevated))
          `,
        }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <section className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-bright">
            Core banking
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            System architecture that stays clear
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            From customer channels through mobile, APIs, core ledger, payments,
            and analytics — one path you can explain to any stakeholder.
          </p>
        </section>

        <div className="mt-12 overflow-x-auto pb-2">
          <div className="flex min-w-[720px] items-stretch gap-2">
            {archNodes.map((node, i) => (
              <button
                key={node.title}
                type="button"
                onClick={() => setActive(i)}
                className={`flex min-w-[6.5rem] flex-1 flex-col rounded-2xl px-3 py-4 text-left transition ring-1 ${
                  i <= active
                    ? 'bg-lagoon/25 ring-lagoon/50'
                    : 'bg-white/5 ring-white/10 hover:bg-white/8'
                }`}
              >
                <span className="font-display text-sm font-bold">{node.title}</span>
                <span className="mt-1 text-[11px] text-ink-soft">{node.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-void/40 p-6 ring-1 ring-white/10 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lagoon-bright">
            Focus · Step {active + 1} of {archNodes.length}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold">
            {archNodes[active].title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
            {archNodes[active].sub} sits in the live transaction path. Explore
            the interactive Core &amp; Integrations demo to compose your own
            blueprint.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={routes.coreIntegrations}
              className="rounded-full bg-lagoon px-5 py-2.5 text-sm font-semibold text-mist shadow-lift hover:bg-lagoon-bright"
            >
              Open Core &amp; Integrations
            </Link>
            <Link
              to={routes.implementationJourney}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-white/15 hover:bg-white/5"
            >
              Implementation Journey
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
