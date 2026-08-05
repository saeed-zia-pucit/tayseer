import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { emptyFinderAnswers } from '@/lib/constants'
import type { FinderAnswers, Locale } from '@/types'

interface FinderContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  answers: FinderAnswers
  setAnswers: (answers: FinderAnswers) => void
  updateAnswers: (partial: Partial<FinderAnswers>) => void
  step: number
  setStep: (step: number) => void
  reset: () => void
}

const FinderContext = createContext<FinderContextValue | null>(null)

export function FinderProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [answers, setAnswers] = useState<FinderAnswers>(emptyFinderAnswers)
  const [step, setStep] = useState(1)

  const updateAnswers = useCallback((partial: Partial<FinderAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...partial }))
  }, [])

  const reset = useCallback(() => {
    setAnswers(emptyFinderAnswers())
    setStep(1)
  }, [])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      answers,
      setAnswers,
      updateAnswers,
      step,
      setStep,
      reset,
    }),
    [locale, answers, updateAnswers, step, reset],
  )

  return (
    <FinderContext.Provider value={value}>{children}</FinderContext.Provider>
  )
}

export function useFinder() {
  const ctx = useContext(FinderContext)
  if (!ctx) {
    throw new Error('useFinder must be used within FinderProvider')
  }
  return ctx
}
