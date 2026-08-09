import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { emptyCoreAnswers } from '@/engine/coreIntegrations'
import type { CoreIntegrationsAnswers } from '@/types/coreIntegrations'

interface CoreIntegrationsContextValue {
  answers: CoreIntegrationsAnswers
  updateAnswers: (partial: Partial<CoreIntegrationsAnswers>) => void
  step: number
  setStep: (step: number) => void
  reset: () => void
}

const CoreIntegrationsContext =
  createContext<CoreIntegrationsContextValue | null>(null)

export function CoreIntegrationsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [answers, setAnswers] =
    useState<CoreIntegrationsAnswers>(emptyCoreAnswers)
  const [step, setStep] = useState(1)

  const updateAnswers = useCallback(
    (partial: Partial<CoreIntegrationsAnswers>) => {
      setAnswers((prev) => ({ ...prev, ...partial }))
    },
    [],
  )

  const reset = useCallback(() => {
    setAnswers(emptyCoreAnswers())
    setStep(1)
  }, [])

  const value = useMemo(
    () => ({ answers, updateAnswers, step, setStep, reset }),
    [answers, updateAnswers, step, reset],
  )

  return (
    <CoreIntegrationsContext.Provider value={value}>
      {children}
    </CoreIntegrationsContext.Provider>
  )
}

export function useCoreIntegrations() {
  const ctx = useContext(CoreIntegrationsContext)
  if (!ctx) {
    throw new Error(
      'useCoreIntegrations must be used within CoreIntegrationsProvider',
    )
  }
  return ctx
}
