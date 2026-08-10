import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useProductDemo } from '@/app/productDemoProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { FinderProgress } from '@/components/finder/FinderProgress'
import { OptionCard, SectionLabel } from '@/components/finder/OptionCard'
import { Button } from '@/components/ui/Button'
import { getProduct, type ProductId } from '@/data/productCatalog'
import {
  canProceedDemoStep,
  getProductDemoConfig,
} from '@/demos/configs'
import { routes } from '@/lib/constants'
import { ProductDemoPreview } from '@/screens/ProductDemo/ProductDemoPreview'

export function ProductDemoFinderPage() {
  const { productId: rawId } = useParams<{ productId: string }>()
  const productId = rawId as ProductId
  const product = getProduct(productId)
  const config = getProductDemoConfig(productId)

  // MBuke keeps its richer dedicated demo
  if (productId === 'mbuke') {
    return <Navigate to={routes.mbukeDemo} replace />
  }

  if (!product || !config) {
    return <Navigate to={routes.experiments} replace />
  }

  return <ProductDemoFinderInner productId={productId} />
}

function ProductDemoFinderInner({ productId }: { productId: ProductId }) {
  const product = getProduct(productId)!
  const config = getProductDemoConfig(productId)!
  const navigate = useNavigate()
  const { answers, updateAnswers, step, setStep, reset } =
    useProductDemo(productId)
  const [analyzing, setAnalyzing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const pulse = () => {
    setAnalyzing(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setAnalyzing(false), 400)
  }

  const setSingle = (key: string, value: string) => {
    updateAnswers({ single: { [key]: value } })
    pulse()
  }

  const toggleMulti = (key: string, value: string) => {
    updateAnswers((prev) => {
      const list = prev.multi[key] ?? []
      const on = list.includes(value)
      return {
        ...prev,
        multi: {
          ...prev.multi,
          [key]: on ? list.filter((v) => v !== value) : [...list, value],
        },
      }
    })
    pulse()
  }

  const meta = config.steps[step - 1]
  const total = config.steps.length
  const ok = canProceedDemoStep(step, answers, config)

  return (
    <div className="relative min-h-dvh bg-surface">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-lagoon-bright/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
      </div>

      <SiteHeader />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-6 md:px-8">
        <div className="mb-8 flex max-w-xl flex-wrap items-center justify-between gap-3">
          <FinderProgress
            step={step}
            total={total}
            steps={config.steps.map((s) => ({
              id: s.id,
              title: s.title,
              short: s.short,
            }))}
          />
          <button
            type="button"
            onClick={() => reset()}
            className="text-xs font-semibold text-ink/50 underline-offset-4 hover:underline"
          >
            Reset
          </button>
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
                  {config.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {meta.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm text-ink/55">{config.intro}</p>

                <div className="mt-8">
                  {meta.sectionLabel ? (
                    <SectionLabel>{meta.sectionLabel}</SectionLabel>
                  ) : null}
                  <div
                    className={
                      meta.mode === 'multi'
                        ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid gap-3 sm:grid-cols-2'
                    }
                  >
                    {meta.options.map((opt) => {
                      const selected =
                        meta.mode === 'single'
                          ? answers.single[meta.key] === opt.value
                          : (answers.multi[meta.key] ?? []).includes(opt.value)
                      return (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          hint={opt.hint}
                          multi={meta.mode === 'multi'}
                          selected={selected}
                          onClick={() =>
                            meta.mode === 'single'
                              ? setSingle(meta.key, opt.value)
                              : toggleMulti(meta.key, opt.value)
                          }
                        />
                      )
                    })}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Button
                    variant="secondary"
                    disabled={step <= 1}
                    onClick={() => setStep(Math.max(1, step - 1))}
                  >
                    Back
                  </Button>
                  {step < total ? (
                    <Button
                      disabled={!ok}
                      onClick={() => setStep(Math.min(total, step + 1))}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      disabled={!ok}
                      onClick={() => navigate(product.demoResultsPath)}
                    >
                      {config.launchLabel}
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </section>

          <ProductDemoPreview
            config={config}
            answers={answers}
            analyzing={analyzing}
          />
        </div>
      </div>
    </div>
  )
}
