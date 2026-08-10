import { AnimatePresence, motion } from 'framer-motion'
import { getProduct } from '@/data/productCatalog'
import type { ProductDemoAnswers, ProductDemoConfig } from '@/demos/types'

interface ProductDemoPreviewProps {
  config: ProductDemoConfig
  answers: ProductDemoAnswers
  analyzing: boolean
}

export function ProductDemoPreview({
  config,
  answers,
  analyzing,
}: ProductDemoPreviewProps) {
  const product = getProduct(config.productId)!
  const org = answers.single.org
  const focus = answers.single.focus
  const region = answers.single.region
  const scale = answers.single.scale
  const modules = answers.multi.modules ?? []

  const orgLabel =
    config.steps[0]?.options.find((o) => o.value === org)?.label ?? 'Your institution'
  const focusLabel =
    config.steps[1]?.options.find((o) => o.value === focus)?.label ?? 'Outcome TBD'
  const moduleOptions = config.steps.find((s) => s.key === 'modules')?.options ?? []

  return (
    <aside className="lg:sticky lg:top-6">
      <div
        className="brand-aside"
        style={{
          background: `linear-gradient(165deg, ${config.accent}40, var(--brand-bg-deep) 42%, var(--brand-bg-elevated))`,
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-bright">
              Live demo preview
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-mist/70">{product.tagline}</p>
          </div>
          <AnimatePresence>
            {analyzing ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
              >
                Updating
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <Row label="Institution" value={org ? orgLabel : '—'} />
          <Row label="Focus" value={focus ? focusLabel : '—'} />
          <Row
            label="Market"
            value={
              region
                ? (config.steps.find((s) => s.key === 'region')?.options.find(
                    (o) => o.value === region,
                  )?.label ?? region)
                : '—'
            }
          />
          <Row
            label="Scale"
            value={
              scale
                ? (config.steps.find((s) => s.key === 'scale')?.options.find(
                    (o) => o.value === scale,
                  )?.label ?? scale)
                : '—'
            }
          />
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist/45">
            Selected modules
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {modules.length === 0 ? (
              <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] text-mist/50 ring-1 ring-white/10">
                Pick capabilities on step 3
              </span>
            ) : (
              modules.map((id) => {
                const opt = moduleOptions.find((o) => o.value === id)
                return (
                  <span
                    key={id}
                    className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium ring-1 ring-white/15"
                  >
                    {opt?.label ?? id}
                  </span>
                )
              })
            )}
          </div>
        </div>

        <div
          className="mt-8 rounded-2xl p-4 ring-1 ring-white/15"
          style={{ background: `${config.accent}22` }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mist/55">
            Demo storyline
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist/85">
            {modules.length
              ? `We’ll walk ${modules.length} capability area${modules.length === 1 ? '' : 's'} tailored to ${orgLabel}.`
              : 'Answer the steps to compose your interactive walkthrough.'}
          </p>
        </div>
      </div>
    </aside>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-2.5 last:border-0">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist/45">
        {label}
      </span>
      <span className="max-w-[60%] text-right text-sm font-medium">{value}</span>
    </div>
  )
}
