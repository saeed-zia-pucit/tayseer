import { AnimatePresence, motion } from 'framer-motion'
import { AnalyzingIndicator } from '@/components/finder/AnalyzingIndicator'
import { recommendProducts, summarizeAnswers } from '@/engine/recommend'
import type { FinderAnswers } from '@/types'

interface SolutionSummaryProps {
  answers: FinderAnswers
  analyzing: boolean
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-0">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist/45">
        {label}
      </span>
      <span className="max-w-[60%] text-right text-sm font-medium text-mist">
        {value}
      </span>
    </div>
  )
}

export function SolutionSummary({ answers, analyzing }: SolutionSummaryProps) {
  const summary = summarizeAnswers(answers)
  const recs = recommendProducts(answers)

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="brand-aside">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-bright">
              Your Solution
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
              Live blueprint
            </h2>
          </div>
          <AnalyzingIndicator show={analyzing} />
        </div>

        <div className="mt-6">
          <Row label="Product Type" value={summary.productType} />
          <Row label="Audience" value={summary.audience} />
          <Row label="Region" value={summary.region} />
          <Row label="Scale" value={summary.scale} />
          <Row
            label="Capabilities"
            value={
              summary.capabilities.length
                ? `${summary.capabilities.length} selected`
                : '—'
            }
          />
          <Row label="Deployment" value={summary.deployment} />
          <Row label="Priority" value={summary.priority} />
        </div>

        {summary.capabilities.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {summary.capabilities.slice(0, 8).map((cap) => (
              <span
                key={cap}
                className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-medium text-mist/80 ring-1 ring-white/10"
              >
                {cap}
              </span>
            ))}
            {summary.capabilities.length > 8 ? (
              <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] text-mist/60">
                +{summary.capabilities.length - 8}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist/45">
            Recommended products
          </p>
          <div className="mt-3 space-y-2.5">
            <AnimatePresence mode="popLayout">
              {recs.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl bg-white/5 px-4 py-5 text-sm text-mist/50 ring-1 ring-white/10"
                >
                  Answer a few questions to generate your Tayseer stack.
                </motion.p>
              ) : (
                recs.map((rec) => (
                  <motion.div
                    key={rec.product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{rec.product.name}</p>
                        <p className="mt-0.5 text-[11px] text-mist/55">
                          {rec.product.tagline}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-lagoon-bright">
                        {rec.confidence}%
                      </span>
                    </div>
                    <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-lagoon-bright"
                        initial={{ width: 0 }}
                        animate={{ width: `${rec.confidence}%` }}
                        transition={{ duration: 0.45 }}
                      />
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </aside>
  )
}
