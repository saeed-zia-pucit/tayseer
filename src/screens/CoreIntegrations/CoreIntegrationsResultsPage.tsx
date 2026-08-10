import { motion } from 'framer-motion'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useCoreIntegrations } from '@/app/coreIntegrationsProvider'
import { Button, ButtonLink } from '@/components/ui/Button'
import { buildCoreResult } from '@/engine/coreIntegrations'
import { routes } from '@/lib/constants'
import { ArchitectureCanvas } from '@/screens/CoreIntegrations/ArchitectureCanvas'
import {
  coreGoalOptions,
  integrationOptions,
} from '@/data/coreIntegrationsOptions'

export function CoreIntegrationsResultsPage() {
  const navigate = useNavigate()
  const { answers, reset } = useCoreIntegrations()
  const result = buildCoreResult(answers)

  if (!result || !answers.goal || answers.integrations.length === 0) {
    return <Navigate to={routes.coreIntegrations} replace />
  }

  const goalLabel =
    coreGoalOptions.find((o) => o.value === answers.goal)?.label ?? ''

  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-lagoon-bright/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-8">
        <Link to={routes.home} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lagoon text-sm font-bold text-mist">
            T
          </span>
          <span className="font-display text-lg font-bold text-ink">Tayseer</span>
        </Link>
        <ButtonLink
          to={routes.coreIntegrations}
          variant="secondary"
          className="!py-2 !text-xs"
        >
          Edit blueprint
        </ButtonLink>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl items-start gap-12 px-5 pb-20 md:px-8 lg:grid-cols-[1fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
            Core & integrations
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {result.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/60">
            {result.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              goalLabel,
              result.styleLabel,
              result.deploymentLabel,
              result.priorityLabel,
            ].map((chip) => (
              <span
                key={chip}
                className="brand-chip"
              >
                {chip}
              </span>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-ink">
              Integration pack
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {answers.integrations.map((id, i) => {
                const label =
                  integrationOptions.find((o) => o.value === id)?.label ?? id
                return (
                  <motion.span
                    key={id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="brand-chip"
                  >
                    {label}
                  </motion.span>
                )
              })}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-ink">
              Suggested stack
            </h2>
            <ul className="mt-4 space-y-2">
              {result.stack.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-ink/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-lagoon-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 rounded-[1.5rem] bg-elevated/80 p-6 ring-1 ring-white/12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Estimated program
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-ink">
              {result.timelineLabel}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-lagoon"
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              onClick={() =>
                window.alert('Integration workshop request captured (prototype).')
              }
            >
              Request integration workshop
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                reset()
                navigate(routes.coreIntegrations)
              }}
            >
              Design another blueprint
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ArchitectureCanvas
            answers={answers}
            analyzing={false}
            animated
          />
        </motion.div>
      </main>
    </div>
  )
}
