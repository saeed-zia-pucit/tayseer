import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useMbukeDemo } from '@/app/mbukeDemoProvider'
import { FinderProgress } from '@/components/finder/FinderProgress'
import { OptionCard, SectionLabel } from '@/components/finder/OptionCard'
import { Button } from '@/components/ui/Button'
import {
  MBUKE_TOTAL_STEPS,
  mbukeAudienceOptions,
  mbukeCapabilityOptions,
  mbukeChallengeOptions,
  mbukeStepMeta,
  mbukeThemeOptions,
} from '@/data/mbukeDemoOptions'
import { routes } from '@/lib/constants'
import type { MbukeCapability, MbukeDemoAnswers } from '@/types/mbukeDemo'
import { MbukePhonePreview } from '@/screens/MbukeDemo/MbukePhonePreview'

function canProceed(step: number, answers: MbukeDemoAnswers) {
  if (step === 1) return Boolean(answers.audience)
  if (step === 2) return Boolean(answers.challenge)
  if (step === 3) return answers.capabilities.length > 0
  if (step === 4) return Boolean(answers.theme)
  return false
}

export function MbukeDemoFinderPage() {
  const navigate = useNavigate()
  const { answers, updateAnswers, step, setStep, reset } = useMbukeDemo()
  const [analyzing, setAnalyzing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const trigger = (partial: Partial<MbukeDemoAnswers>) => {
    updateAnswers(partial)
    setAnalyzing(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setAnalyzing(false), 400)
  }

  const toggleCap = (cap: MbukeCapability) => {
    const on = answers.capabilities.includes(cap)
    trigger({
      capabilities: on
        ? answers.capabilities.filter((c) => c !== cap)
        : [...answers.capabilities, cap],
    })
  }

  const meta = mbukeStepMeta[step - 1]
  const ok = canProceed(step, answers)

  return (
    <div className="relative min-h-dvh bg-surface">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-lagoon-bright/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-8">
        <Link to={routes.home} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-mist">
            T
          </span>
          <div>
            <p className="font-display text-base font-bold leading-none text-ink">
              Tayseer
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45">
              MBuke product demo
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
            total={MBUKE_TOTAL_STEPS}
            steps={mbukeStepMeta}
          />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_auto]">
          <section className="rounded-[1.75rem] bg-white/70 p-6 shadow-[0_20px_60px_-40px_rgb(6_38_47_/_0.45)] ring-1 ring-line backdrop-blur md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lagoon">
                  Try MBuke demo
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {meta.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm text-ink/55">
                  AI-powered white-label mobile finance — tour the same capabilities
                  from tayseer.me/mbuke.
                </p>

                <div className="mt-8">
                  {step === 1 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {mbukeAudienceOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          selected={answers.audience === opt.value}
                          onClick={() => trigger({ audience: opt.value })}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {mbukeChallengeOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          selected={answers.challenge === opt.value}
                          onClick={() => trigger({ challenge: opt.value })}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div>
                      <SectionLabel>
                        User · Operator · Technical features
                      </SectionLabel>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {mbukeCapabilityOptions.map((opt) => (
                          <OptionCard
                            key={opt.value}
                            label={opt.label}
                            hint={opt.hint}
                            multi
                            selected={answers.capabilities.includes(opt.value)}
                            onClick={() => toggleCap(opt.value)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {mbukeThemeOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          selected={answers.theme === opt.value}
                          onClick={() => trigger({ theme: opt.value })}
                        />
                      ))}
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
              {step < MBUKE_TOTAL_STEPS ? (
                <Button
                  onClick={() => setStep(Math.min(MBUKE_TOTAL_STEPS, step + 1))}
                  disabled={!ok}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(routes.mbukeDemoResults)}
                  disabled={!ok}
                >
                  Launch MBuke demo
                </Button>
              )}
            </div>
          </section>

          <MbukePhonePreview answers={answers} analyzing={analyzing} />
        </div>
      </div>
    </div>
  )
}
