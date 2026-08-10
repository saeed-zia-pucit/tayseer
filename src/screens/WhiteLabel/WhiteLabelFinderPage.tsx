import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWhiteLabel } from '@/app/whiteLabelProvider'
import { AnalyzingIndicator } from '@/components/finder/AnalyzingIndicator'
import { FinderProgress } from '@/components/finder/FinderProgress'
import { Chip, OptionCard, SectionLabel } from '@/components/finder/OptionCard'
import { Button } from '@/components/ui/Button'
import {
  WL_TOTAL_STEPS,
  wlAudienceOptions,
  wlBankTypeOptions,
  wlFeatureOptions,
  wlLanguageOptions,
  wlStepMeta,
  wlThemeOptions,
} from '@/data/whiteLabelOptions'
import { routes } from '@/lib/constants'
import type { WhiteLabelAnswers, WhiteLabelFeature } from '@/types/whiteLabel'
import { WhiteLabelPhonePreview } from '@/screens/WhiteLabel/WhiteLabelPhonePreview'
import { AnimatePresence, motion } from 'framer-motion'

function canProceed(step: number, answers: WhiteLabelAnswers) {
  if (step === 1) return Boolean(answers.bankType)
  if (step === 2) return Boolean(answers.audience)
  if (step === 3) return answers.features.length > 0
  if (step === 4) return Boolean(answers.theme && answers.language)
  return false
}

export function WhiteLabelFinderPage() {
  const navigate = useNavigate()
  const { answers, updateAnswers, step, setStep, reset } = useWhiteLabel()
  const [analyzing, setAnalyzing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const trigger = (partial: Partial<WhiteLabelAnswers>) => {
    updateAnswers(partial)
    setAnalyzing(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setAnalyzing(false), 400)
  }

  const toggleFeature = (feature: WhiteLabelFeature) => {
    const selected = answers.features.includes(feature)
    trigger({
      features: selected
        ? answers.features.filter((f) => f !== feature)
        : [...answers.features, feature],
    })
  }

  const meta = wlStepMeta[step - 1]
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
              White-label demo
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <AnalyzingIndicator show={analyzing} />
          <button
            type="button"
            onClick={() => reset()}
            className="text-xs font-semibold text-ink/50 underline-offset-4 hover:underline"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="mb-8 max-w-xl">
          <FinderProgress step={step} total={WL_TOTAL_STEPS} steps={wlStepMeta} />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_auto]">
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
                  Customize white-label demo
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {meta.title}
                </h2>

                <div className="mt-8">
                  {step === 1 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {wlBankTypeOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          selected={answers.bankType === opt.value}
                          onClick={() => trigger({ bankType: opt.value })}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {wlAudienceOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          selected={answers.audience === opt.value}
                          onClick={() => trigger({ audience: opt.value })}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {wlFeatureOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          multi
                          selected={answers.features.includes(opt.value)}
                          onClick={() => toggleFeature(opt.value)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="space-y-8">
                      <div>
                        <SectionLabel>Brand theme</SectionLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {wlThemeOptions.map((opt) => (
                            <OptionCard
                              key={opt.value}
                              label={opt.label}
                              hint={opt.hint}
                              selected={answers.theme === opt.value}
                              onClick={() => trigger({ theme: opt.value })}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <SectionLabel>App language</SectionLabel>
                        <div className="flex flex-wrap gap-2">
                          {wlLanguageOptions.map((opt) => (
                            <Chip
                              key={opt.value}
                              label={opt.label}
                              selected={answers.language === opt.value}
                              onClick={() => trigger({ language: opt.value })}
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
              {step < WL_TOTAL_STEPS ? (
                <Button
                  onClick={() => setStep(Math.min(WL_TOTAL_STEPS, step + 1))}
                  disabled={!ok}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(routes.whiteLabelResults)}
                  disabled={!ok}
                >
                  Launch white-label demo
                </Button>
              )}
            </div>
          </section>

          <WhiteLabelPhonePreview answers={answers} analyzing={analyzing} />
        </div>
      </div>
    </div>
  )
}
