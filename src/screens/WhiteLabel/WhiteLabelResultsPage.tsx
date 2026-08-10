import { motion } from 'framer-motion'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useWhiteLabel } from '@/app/whiteLabelProvider'
import { Button, ButtonLink } from '@/components/ui/Button'
import { buildWhiteLabelResult } from '@/engine/whiteLabel'
import { routes } from '@/lib/constants'
import { AnimatedBankApp } from '@/screens/WhiteLabel/AnimatedBankApp'
import {
  wlAudienceOptions,
  wlBankTypeOptions,
} from '@/data/whiteLabelOptions'

export function WhiteLabelResultsPage() {
  const navigate = useNavigate()
  const { answers, reset } = useWhiteLabel()
  const result = buildWhiteLabelResult(answers)

  if (!result) {
    return <Navigate to={routes.whiteLabel} replace />
  }

  const bankLabel =
    wlBankTypeOptions.find((o) => o.value === answers.bankType)?.label ?? ''
  const audienceLabel =
    wlAudienceOptions.find((o) => o.value === answers.audience)?.label ?? ''

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
          to={routes.whiteLabel}
          variant="secondary"
          className="!py-2 !text-xs"
        >
          Edit app
        </ButtonLink>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 md:px-8 lg:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
            White-label demo
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {result.appName} is running
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/60">
            {result.tagline} Built for {audienceLabel.toLowerCase()} as a{' '}
            {bankLabel.toLowerCase()} experience — modules animate live in the
            preview.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[bankLabel, audienceLabel, result.language, result.timelineLabel].map(
              (chip) => (
                <span
                  key={chip}
                  className="brand-chip"
                >
                  {chip}
                </span>
              ),
            )}
          </div>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-ink">
              Included modules
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.modules.map((mod, i) => (
                <motion.span
                  key={mod.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="brand-chip"
                >
                  {mod.name}
                </motion.span>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-ink">
              Tayseer stack
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

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              onClick={() =>
                window.alert('Demo request captured (prototype).')
              }
            >
Request Demo
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  reset()
                  navigate(routes.whiteLabel)
                }}
              >
                Customize another demo
              </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center py-6"
        >
          <AnimatedBankApp result={result} />
        </motion.div>
      </main>
    </div>
  )
}
