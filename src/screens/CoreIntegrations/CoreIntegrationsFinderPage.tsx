import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCoreIntegrations } from '@/app/coreIntegrationsProvider'
import { FinderProgress } from '@/components/finder/FinderProgress'
import { OptionCard, SectionLabel } from '@/components/finder/OptionCard'
import { Button } from '@/components/ui/Button'
import {
  CORE_TOTAL_STEPS,
  coreDeploymentOptions,
  coreGoalOptions,
  corePriorityOptions,
  coreStepMeta,
  integrationOptions,
  integrationStyleOptions,
} from '@/data/coreIntegrationsOptions'
import { routes } from '@/lib/constants'
import type {
  CoreIntegrationsAnswers,
  IntegrationTarget,
} from '@/types/coreIntegrations'
import { ArchitectureCanvas } from '@/screens/CoreIntegrations/ArchitectureCanvas'

function canProceed(step: number, answers: CoreIntegrationsAnswers) {
  if (step === 1) return Boolean(answers.goal)
  if (step === 2) return answers.integrations.length > 0
  if (step === 3) return Boolean(answers.style)
  if (step === 4) return Boolean(answers.deployment && answers.priority)
  return false
}

export function CoreIntegrationsFinderPage() {
  const navigate = useNavigate()
  const { answers, updateAnswers, step, setStep, reset } = useCoreIntegrations()
  const [analyzing, setAnalyzing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const trigger = (partial: Partial<CoreIntegrationsAnswers>) => {
    updateAnswers(partial)
    setAnalyzing(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setAnalyzing(false), 400)
  }

  const toggleIntegration = (id: IntegrationTarget) => {
    const on = answers.integrations.includes(id)
    trigger({
      integrations: on
        ? answers.integrations.filter((x) => x !== id)
        : [...answers.integrations, id],
    })
  }

  const meta = coreStepMeta[step - 1]
  const ok = canProceed(step, answers)

  return (
    <div className="relative min-h-dvh bg-surface">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-lagoon-bright/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-8">
        <Link to={routes.home} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lagoon text-sm font-bold text-mist">
            T
          </span>
          <div>
            <p className="font-display text-base font-bold leading-none text-ink">
              Tayseer
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45">
              Core & integrations
            </p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => reset()}
          className="text-xs font-semibold text-ink/50 underline-offset-4 hover:underline"
        >
          Reset
        </button>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="mb-8 max-w-xl">
          <FinderProgress
            step={step}
            total={CORE_TOTAL_STEPS}
            steps={coreStepMeta}
          />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_1fr]">
          <section className="brand-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lagoon">
                  Core architect
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {meta.title}
                </h2>

                <div className="mt-8">
                  {step === 1 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {coreGoalOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          selected={answers.goal === opt.value}
                          onClick={() => trigger({ goal: opt.value })}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {integrationOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          multi
                          selected={answers.integrations.includes(opt.value)}
                          onClick={() => toggleIntegration(opt.value)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {integrationStyleOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          selected={answers.style === opt.value}
                          onClick={() => trigger({ style: opt.value })}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="space-y-8">
                      <div>
                        <SectionLabel>Deployment</SectionLabel>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {coreDeploymentOptions.map((opt) => (
                            <OptionCard
                              key={opt.value}
                              label={opt.label}
                              hint={opt.hint}
                              selected={answers.deployment === opt.value}
                              onClick={() => trigger({ deployment: opt.value })}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <SectionLabel>Priority</SectionLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {corePriorityOptions.map((opt) => (
                            <OptionCard
                              key={opt.value}
                              label={opt.label}
                              selected={answers.priority === opt.value}
                              onClick={() => trigger({ priority: opt.value })}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line/80 pt-6">
              <Button
                variant="ghost"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="disabled:opacity-30"
              >
                Back
              </Button>
              {step < CORE_TOTAL_STEPS ? (
                <Button
                  onClick={() => setStep(Math.min(CORE_TOTAL_STEPS, step + 1))}
                  disabled={!ok}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(routes.coreIntegrationsResults)}
                  disabled={!ok}
                >
                  View architecture
                </Button>
              )}
            </div>
          </section>

          <ArchitectureCanvas answers={answers} analyzing={analyzing} />
        </div>
      </div>
    </div>
  )
}
