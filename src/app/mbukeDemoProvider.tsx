import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { emptyMbukeAnswers } from '@/engine/mbukeDemo'
import type { MbukeDemoAnswers } from '@/types/mbukeDemo'

interface MbukeDemoContextValue {
  answers: MbukeDemoAnswers
  updateAnswers: (partial: Partial<MbukeDemoAnswers>) => void
  step: number
  setStep: (step: number) => void
  reset: () => void
}

const MbukeDemoContext = createContext<MbukeDemoContextValue | null>(null)

export function MbukeDemoProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<MbukeDemoAnswers>(emptyMbukeAnswers)
  const [step, setStep] = useState(1)

  const updateAnswers = useCallback((partial: Partial<MbukeDemoAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...partial }))
  }, [])

  const reset = useCallback(() => {
    setAnswers(emptyMbukeAnswers())
    setStep(1)
  }, [])

  const value = useMemo(
    () => ({ answers, updateAnswers, step, setStep, reset }),
    [answers, updateAnswers, step, reset],
  )

  return (
    <MbukeDemoContext.Provider value={value}>{children}</MbukeDemoContext.Provider>
  )
}

export function useMbukeDemo() {
  const ctx = useContext(MbukeDemoContext)
  if (!ctx) {
    throw new Error('useMbukeDemo must be used within MbukeDemoProvider')
  }
  return ctx
}
