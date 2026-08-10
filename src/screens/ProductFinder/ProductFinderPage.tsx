import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFinder } from '@/app/providers'
import { SiteHeader } from '@/components/layout/SiteHeader'
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

      <SiteHeader />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-6 md:px-8">
        <div className="mb-8 flex max-w-xl flex-wrap items-center justify-between gap-3">
          <FinderProgress step={step} />
          <div className="flex items-center gap-3">
            <Link
              to={isPhone ? routes.finder : routes.finderPhone}
              className="hidden text-xs font-semibold text-lagoon underline-offset-4 hover:underline sm:inline"
            >
              Switch to {isPhone ? 'side-by-side' : 'phone'} flow
            </Link>
            <button
              type="button"
              onClick={() => reset()}
              className="text-xs font-semibold text-ink/50 underline-offset-4 hover:text-ink hover:underline"
            >
              Reset
            </button>
          </div>
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
