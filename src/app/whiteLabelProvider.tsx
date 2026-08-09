import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { emptyWhiteLabelAnswers } from '@/engine/whiteLabel'
import type { WhiteLabelAnswers } from '@/types/whiteLabel'

interface WhiteLabelContextValue {
  answers: WhiteLabelAnswers
  updateAnswers: (partial: Partial<WhiteLabelAnswers>) => void
  step: number
  setStep: (step: number) => void
  reset: () => void
}

const WhiteLabelContext = createContext<WhiteLabelContextValue | null>(null)

export function WhiteLabelProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<WhiteLabelAnswers>(emptyWhiteLabelAnswers)
  const [step, setStep] = useState(1)

  const updateAnswers = useCallback((partial: Partial<WhiteLabelAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...partial }))
  }, [])

  const reset = useCallback(() => {
    setAnswers(emptyWhiteLabelAnswers())
    setStep(1)
  }, [])

  const value = useMemo(
    () => ({ answers, updateAnswers, step, setStep, reset }),
    [answers, updateAnswers, step, reset],
  )

  return (
    <WhiteLabelContext.Provider value={value}>
      {children}
    </WhiteLabelContext.Provider>
  )
}

export function useWhiteLabel() {
  const ctx = useContext(WhiteLabelContext)
  if (!ctx) {
    throw new Error('useWhiteLabel must be used within WhiteLabelProvider')
  }
  return ctx
}
