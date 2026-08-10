import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useProductDemo } from '@/app/productDemoProvider'
import { Button, ButtonLink } from '@/components/ui/Button'
import { getProduct, type ProductId } from '@/data/productCatalog'
import { getProductDemoConfig } from '@/demos/configs'
import type { ProductDemoResult } from '@/demos/types'
import { routes } from '@/lib/constants'
import { FahimAiEditorDemo } from '@/screens/ProductDemo/FahimAiEditorDemo'

export function ProductDemoResultsPage() {
  const { productId: rawId } = useParams<{ productId: string }>()
  const productId = rawId as ProductId

  if (productId === 'mbuke') {
    return <Navigate to={routes.mbukeDemoResults} replace />
  }

  const product = getProduct(productId)
  const config = getProductDemoConfig(productId)
  if (!product || !config) {
    return <Navigate to={routes.experiments} replace />
  }

  return <ProductDemoResultsInner productId={productId} />
}

function ProductDemoResultsInner({ productId }: { productId: ProductId }) {
  const product = getProduct(productId)!
  const config = getProductDemoConfig(productId)!
  const navigate = useNavigate()
  const { answers, reset } = useProductDemo(productId)
  const result = config.buildResult(answers)

  if (!result) {
    return <Navigate to={product.demoPath} replace />
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-lagoon-bright/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-8">
        <Link to={routes.home} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lagoon text-sm font-bold text-mist">
            T
          </span>
          <span className="font-display text-lg font-bold text-ink">Tayseer</span>
        </Link>
        <ButtonLink
          to={product.demoPath}
          variant="secondary"
          className="!py-2 !text-xs"
        >
          Edit demo
        </ButtonLink>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
            {product.name} demo running
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {result.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink/60">
            {productId === 'fahim-ai'
              ? 'Watch a live Fahim coding session — the developer asks questions, Fahim answers, then writes TypeScript in the editor. No typing required.'
              : result.summary}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {result.chips.map((chip) => (
              <span key={chip} className="brand-chip">
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {productId === 'fahim-ai' ? (
          <FahimAiEditorDemo />
        ) : (
          <DemoTheater result={result} accent={config.accent} />
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.5rem] bg-elevated/80 p-6 ring-1 ring-white/12 md:p-7">
            <h2 className="font-display text-xl font-bold text-ink">
              Capabilities on tour
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.modules.map((mod) => (
                <span key={mod.id} className="brand-chip">
                  {mod.name}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] bg-elevated/80 p-6 ring-1 ring-white/12 md:p-7">
            <h2 className="font-display text-xl font-bold text-ink">
              Why this configuration
            </h2>
            <ul className="mt-4 space-y-2.5">
              {result.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-ink/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() =>
              window.alert(
                'Demo request captured (prototype). Connect Formspree or email later.',
              )
            }
          >
            Request this demo live
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              reset()
              navigate(product.demoPath)
            }}
          >
            Build another demo
          </Button>
        </div>
      </main>
    </div>
  )
}

function DemoTheater({
  result,
  accent,
}: {
  result: ProductDemoResult
  accent: string
}) {
  const [index, setIndex] = useState(0)
  const beat = result.journey[index]

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % result.journey.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [result.journey.length])

  return (
    <div className="mt-10 overflow-hidden rounded-[1.75rem] ring-1 ring-white/12">
      <div
        className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]"
        style={{
          background: `linear-gradient(135deg, ${accent}28, var(--brand-bg-deep) 40%, var(--brand-bg-elevated))`,
        }}
      >
        <div className="p-6 md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon-bright">
            Interactive walkthrough
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-4"
            >
              <p className="font-mono text-xs text-mist/45">
                Step {index + 1} / {result.journey.length}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold text-mist">
                {beat.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mist/75">
                {beat.detail} Showing how {result.productName} adapts to your
                selected modules.
              </p>
            </motion.div>
          </AnimatePresence>

          <ol className="mt-8 space-y-2">
            {result.journey.map((j, i) => (
              <li key={j.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    i === index
                      ? 'bg-white/12 text-mist ring-1 ring-white/20'
                      : 'text-mist/55 hover:bg-white/5 hover:text-mist/80'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {j.title}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative flex min-h-[320px] items-center justify-center border-t border-white/10 p-8 lg:border-l lg:border-t-0">
          <motion.div
            key={beat.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="phone-ui w-full max-w-sm rounded-2xl p-5 shadow-lift ring-1 ring-white/15"
          >
            <div className="flex items-center justify-between">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-mist"
                style={{ background: accent }}
              >
                {result.productName}
              </span>
              <span className="text-[10px] font-semibold text-phone-muted">
                Live preview
              </span>
            </div>
            <p className="mt-4 font-display text-xl font-bold tracking-tight text-phone-ink">
              {beat.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-phone-muted">
              {result.modules
                .slice(0, 3)
                .map((m) => m.name)
                .join(' · ') || 'Configured modules'}
            </p>
            <div className="mt-5 space-y-2">
              {result.modules.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-xl bg-phone-card px-3 py-2 text-xs ring-1 ring-phone-ink/8"
                >
                  <span className="font-semibold text-phone-ink">{m.name}</span>
                  <span className="text-phone-muted">Active</span>
                </div>
              ))}
            </div>
            <div
              className="mt-5 h-1.5 overflow-hidden rounded-full bg-phone-ink/10"
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: accent }}
                initial={{ width: '8%' }}
                animate={{
                  width: `${((index + 1) / result.journey.length) * 100}%`,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
