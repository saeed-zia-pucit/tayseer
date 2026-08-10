import { motion } from 'framer-motion'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFinder } from '@/app/providers'
import { Button, ButtonLink } from '@/components/ui/Button'
import { buildSolution, summarizeAnswers } from '@/engine/recommend'
import { routes } from '@/lib/constants'

export function ResultsPage() {
  const navigate = useNavigate()
  const { answers, reset } = useFinder()
  const solution = buildSolution(answers)
  const summary = summarizeAnswers(answers)

  if (!solution) {
    return <Navigate to={routes.finder} replace />
  }

  return (
    <div className="relative min-h-dvh bg-surface">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-lagoon-bright/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-8">
        <Link to={routes.home} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lagoon text-sm font-bold text-mist">
            T
          </span>
          <span className="font-display text-lg font-bold text-ink">Tayseer</span>
        </Link>
        <ButtonLink to={routes.finder} variant="secondary" className="!py-2 !text-xs">
          Edit answers
        </ButtonLink>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-20 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
            Recommended solution
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {solution.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60">
            {solution.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              summary.productType,
              summary.audience,
              summary.scale,
              summary.deployment,
              summary.priority,
            ].map((chip) => (
              <span
                key={chip}
                className="brand-chip"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">
            Recommended products
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {solution.products.map((rec, index) => (
              <motion.article
                key={rec.product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index }}
                className="rounded-[1.5rem] bg-elevated/80 p-6 shadow-lift ring-1 ring-white/12"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-lagoon">
                      {rec.product.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">
                      {rec.product.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink/55">{rec.product.tagline}</p>
                  </div>
                  <span className="brand-chip !text-lagoon-bright">
                    {rec.confidence}% match
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  {rec.product.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {rec.reasons.map((reason) => (
                    <li key={reason} className="flex gap-2 text-xs text-ink/60">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-bright" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-ink">
            Suggested architecture
          </h2>
          <div className="mt-6 overflow-x-auto rounded-[1.5rem] bg-void p-6 text-mist shadow-lift md:p-8">
            <div className="flex min-w-[36rem] items-center justify-between gap-2">
              {solution.architecture.map((node, i) => (
                <div key={`${node}-${i}`} className="flex flex-1 items-center gap-2">
                  <div className="w-full rounded-2xl bg-white/8 px-3 py-4 text-center ring-1 ring-white/10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-lagoon-bright">
                      Layer {i + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-snug">{node}</p>
                  </div>
                  {i < solution.architecture.length - 1 ? (
                    <span className="shrink-0 text-lagoon-bright" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[1.5rem] bg-elevated/80 p-6 ring-1 ring-white/12 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Estimated implementation timeline
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-ink">
              {solution.timelineLabel}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              Timeline reflects product type, market footprint, capability depth,
              and deployment posture. Final scoping happens in a discovery workshop.
            </p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-lagoon"
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[1.5rem] bg-lagoon p-6 text-white md:p-8">
            <div>
              <h3 className="font-display text-2xl font-bold">Next step</h3>
              <p className="mt-2 text-sm text-white/80">
                Share this blueprint with your team or book a live walkthrough with
                Tayseer.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                className="!bg-mist !text-void hover:!bg-white"
                onClick={() =>
                  window.alert(
                    'Demo request captured (prototype). Connect Formspree or email later.',
                  )
                }
              >
                Request Demo
              </Button>
              <Button
                variant="secondary"
                className="!border-0 !bg-white/15 !text-white !ring-white/25 hover:!bg-white/25"
                onClick={() =>
                  window.alert('Proposal download is mocked for this prototype.')
                }
              >
                Download Proposal
              </Button>
            </div>
          </div>
        </section>

        <div className="mt-10">
          <Button
            variant="ghost"
            onClick={() => {
              reset()
              navigate(routes.finder)
            }}
          >
            Start over
          </Button>
        </div>
      </main>
    </div>
  )
}
