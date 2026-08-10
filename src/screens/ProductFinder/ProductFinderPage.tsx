import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFinder } from '@/app/providers'
import { FinderProgress } from '@/components/finder/FinderProgress'
import {
  canProceedStep,
  QuestionPanel,
} from '@/components/finder/QuestionPanel'
import { SolutionPhonePreview } from '@/components/finder/SolutionPhonePreview'
import { SolutionSummary } from '@/components/finder/SolutionSummary'
import { routes, TOTAL_FINDER_STEPS } from '@/lib/constants'
import type { FinderAnswers } from '@/types'
import { cn } from '@/lib/cn'

export type FinderVariant = 'panel' | 'phone'

interface ProductFinderPageProps {
  variant: FinderVariant
}

export function ProductFinderPage({ variant }: ProductFinderPageProps) {
  const navigate = useNavigate()
  const { answers, updateAnswers, step, setStep, reset } = useFinder()
  const [analyzing, setAnalyzing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const triggerAnalyze = (partial: Partial<FinderAnswers>) => {
    updateAnswers(partial)
    setAnalyzing(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setAnalyzing(false)
    }, 400)
  }

  const canProceed = canProceedStep(step, answers)
  const isPhone = variant === 'phone'

  return (
    <div className="relative min-h-dvh bg-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
      >
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
              {isPhone ? 'Phone preview flow' : 'Side-by-side flow'}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to={isPhone ? routes.finder : routes.finderPhone}
            className="hidden text-xs font-semibold text-lagoon underline-offset-4 hover:underline sm:inline"
          >
            Switch to {isPhone ? 'side-by-side' : 'phone'} flow
          </Link>
          <button
            type="button"
            onClick={() => {
              reset()
            }}
            className="text-xs font-semibold text-ink/50 underline-offset-4 hover:text-ink hover:underline"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="mb-8 max-w-xl">
          <FinderProgress step={step} />
        </div>

        <div
          className={cn(
            'grid items-start gap-8',
            isPhone ? 'lg:grid-cols-[1.35fr_auto]' : 'lg:grid-cols-[1.45fr_1fr]',
          )}
        >
          <section className="brand-panel">
            <QuestionPanel
              step={step}
              answers={answers}
              onUpdate={triggerAnalyze}
              canProceed={canProceed}
              onBack={() => setStep(Math.max(1, step - 1))}
              onNext={() =>
                setStep(Math.min(TOTAL_FINDER_STEPS, step + 1))
              }
              onSeeResults={() => navigate(routes.results)}
            />
          </section>

          {isPhone ? (
            <SolutionPhonePreview answers={answers} analyzing={analyzing} />
          ) : (
            <SolutionSummary answers={answers} analyzing={analyzing} />
          )}
        </div>
      </div>
    </div>
  )
}
