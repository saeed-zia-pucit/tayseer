import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  emptyProductDemoAnswers,
  getProductDemoConfig,
} from '@/demos/configs'
import type { ProductDemoAnswers } from '@/demos/types'
import type { ProductId } from '@/data/productCatalog'

type Session = {
  answers: ProductDemoAnswers
  step: number
}

interface ProductDemoContextValue {
  getSession: (productId: ProductId) => Session
  updateAnswers: (
    productId: ProductId,
    partial: Partial<ProductDemoAnswers> | ((prev: ProductDemoAnswers) => ProductDemoAnswers),
  ) => void
  setStep: (productId: ProductId, step: number) => void
  reset: (productId: ProductId) => void
}

const ProductDemoContext = createContext<ProductDemoContextValue | null>(null)

function ensureSession(
  map: Record<string, Session>,
  productId: ProductId,
): Session {
  const existing = map[productId]
  if (existing) return existing
  const config = getProductDemoConfig(productId)
  if (!config) {
    return { answers: { single: {}, multi: {} }, step: 1 }
  }
  return { answers: emptyProductDemoAnswers(config), step: 1 }
}

export function ProductDemoProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Record<string, Session>>({})

  const getSession = useCallback(
    (productId: ProductId) => ensureSession(sessions, productId),
    [sessions],
  )

  const updateAnswers = useCallback(
    (
      productId: ProductId,
      partial:
        | Partial<ProductDemoAnswers>
        | ((prev: ProductDemoAnswers) => ProductDemoAnswers),
    ) => {
      setSessions((prev) => {
        const current = ensureSession(prev, productId)
        const nextAnswers =
          typeof partial === 'function'
            ? partial(current.answers)
            : {
                single: { ...current.answers.single, ...partial.single },
                multi: { ...current.answers.multi, ...partial.multi },
              }
        return {
          ...prev,
          [productId]: { ...current, answers: nextAnswers },
        }
      })
    },
    [],
  )

  const setStep = useCallback((productId: ProductId, step: number) => {
    setSessions((prev) => {
      const current = ensureSession(prev, productId)
      return { ...prev, [productId]: { ...current, step } }
    })
  }, [])

  const reset = useCallback((productId: ProductId) => {
    setSessions((prev) => {
      const config = getProductDemoConfig(productId)
      if (!config) return prev
      return {
        ...prev,
        [productId]: { answers: emptyProductDemoAnswers(config), step: 1 },
      }
    })
  }, [])

  const value = useMemo(
    () => ({ getSession, updateAnswers, setStep, reset }),
    [getSession, updateAnswers, setStep, reset],
  )

  return (
    <ProductDemoContext.Provider value={value}>
      {children}
    </ProductDemoContext.Provider>
  )
}

export function useProductDemo(productId: ProductId) {
  const ctx = useContext(ProductDemoContext)
  if (!ctx) {
    throw new Error('useProductDemo must be used within ProductDemoProvider')
  }
  const session = ctx.getSession(productId)
  return {
    answers: session.answers,
    step: session.step,
    setStep: (step: number) => ctx.setStep(productId, step),
    updateAnswers: (
      partial:
        | Partial<ProductDemoAnswers>
        | ((prev: ProductDemoAnswers) => ProductDemoAnswers),
    ) => ctx.updateAnswers(productId, partial),
    reset: () => ctx.reset(productId),
  }
}
