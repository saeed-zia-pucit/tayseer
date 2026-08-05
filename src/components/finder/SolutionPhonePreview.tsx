import { AnimatePresence, motion } from 'framer-motion'
import { AnalyzingIndicator } from '@/components/finder/AnalyzingIndicator'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import { recommendProducts, summarizeAnswers } from '@/engine/recommend'
import { productTypeLabels } from '@/lib/constants'
import type { FinderAnswers, ProductType } from '@/types'
import { cn } from '@/lib/cn'

interface SolutionPhonePreviewProps {
  answers: FinderAnswers
  analyzing: boolean
}

const accentByType: Partial<Record<ProductType, string>> = {
  digital_bank: 'from-[#0f766e] to-[#115e59]',
  wallet: 'from-[#0d9488] to-[#0f766e]',
  core_banking: 'from-[#0f3d4a] to-[#06262f]',
  lending: 'from-[#b45309] to-[#92400e]',
  remittance: 'from-[#0369a1] to-[#0c4a6e]',
  islamic: 'from-[#047857] to-[#065f46]',
  investment: 'from-[#0e7490] to-[#155e75]',
  merchant: 'from-[#c2410c] to-[#9a3412]',
}

function brandInitial(label: string) {
  return label
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function SolutionPhonePreview({
  answers,
  analyzing,
}: SolutionPhonePreviewProps) {
  const summary = summarizeAnswers(answers)
  const recs = recommendProducts(answers)
  const productLabel = answers.productType
    ? productTypeLabels[answers.productType]
    : 'Your platform'
  const accent =
    (answers.productType && accentByType[answers.productType]) ||
    'from-[#0f766e] to-[#0d3d4a]'
  const hasStart = Boolean(answers.productType)

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">
            Live preview
          </p>
          <p className="mt-1 text-sm font-medium text-ink/55">
            Watch your stack assemble
          </p>
        </div>
        <AnalyzingIndicator show={analyzing} />
      </div>

      <div className="flex justify-center lg:justify-end">
        <PhoneFrame size="md" label="Tayseer platform preview">
          <div className="flex h-full flex-col px-3.5 pb-2 pt-1">
            {/* App header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-[10px] font-bold text-white',
                    accent,
                  )}
                >
                  {hasStart ? brandInitial(productLabel) : 'T'}
                </div>
                <div>
                  <p className="text-[11px] font-bold leading-none text-ink">
                    {hasStart ? productLabel : 'Tayseer'}
                  </p>
                  <p className="mt-0.5 text-[9px] text-ink/45">
                    {summary.audience !== '—'
                      ? `${summary.audience} · powered by Tayseer`
                      : 'Powered by Tayseer'}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[9px] font-semibold text-ink/50">
                Demo
              </span>
            </div>

            {/* Hero balance card */}
            <motion.div
              layout
              className={cn(
                'mt-3 overflow-hidden rounded-2xl bg-gradient-to-br p-3.5 text-white shadow-sm',
                accent,
              )}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {hasStart ? 'Platform snapshot' : 'Waiting for inputs'}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={summary.productType + summary.scale}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-2 font-display text-lg font-bold leading-tight"
                >
                  {hasStart ? summary.productType : 'Design in progress'}
                </motion.p>
              </AnimatePresence>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[summary.scale, summary.deployment, summary.priority]
                  .filter((v) => v && v !== '—')
                  .slice(0, 3)
                  .map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium text-white/90"
                    >
                      {chip}
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* Region + capabilities strip */}
            <div className="mt-3 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-ink/5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Markets
                </p>
                <p className="truncate text-[10px] font-medium text-ink/70">
                  {summary.region === '—' ? 'Not set' : summary.region}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <AnimatePresence>
                  {summary.capabilities.length === 0 ? (
                    <motion.span
                      key="cap-empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] text-ink/35"
                    >
                      Capabilities appear as you select them
                    </motion.span>
                  ) : (
                    summary.capabilities.slice(0, 5).map((cap) => (
                      <motion.span
                        key={cap}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-md bg-mist px-1.5 py-0.5 text-[9px] font-semibold text-ink-soft"
                      >
                        {cap}
                      </motion.span>
                    ))
                  )}
                  {summary.capabilities.length > 5 ? (
                    <span className="rounded-md bg-mist px-1.5 py-0.5 text-[9px] font-semibold text-ink/50">
                      +{summary.capabilities.length - 5}
                    </span>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* Recommended modules as app tiles */}
            <div className="mt-3 flex-1">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Stack modules
                </p>
                {recs.length > 0 ? (
                  <p className="text-[9px] font-semibold text-lagoon">
                    {recs.length} matched
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <AnimatePresence mode="popLayout">
                  {recs.length === 0 ? (
                    <motion.div
                      key="empty-mods"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl border border-dashed border-ink/10 bg-white/60 px-3 py-6 text-center"
                    >
                      <p className="text-[11px] font-medium text-ink/40">
                        Answer questions to assemble modules
                      </p>
                    </motion.div>
                  ) : (
                    recs.map((rec, index) => (
                      <motion.div
                        key={rec.product.id}
                        layout
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ delay: index * 0.04 }}
                        className="flex items-center gap-2.5 rounded-2xl bg-white px-2.5 py-2 ring-1 ring-ink/5"
                      >
                        <div
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-[10px] font-bold text-white',
                            accent,
                          )}
                        >
                          {rec.product.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-bold text-ink">
                            {rec.product.name}
                          </p>
                          <p className="truncate text-[9px] text-ink/45">
                            {rec.product.category}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-lagoon">
                          {rec.confidence}%
                        </span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom nav mock */}
            <div className="mt-auto grid grid-cols-4 gap-1 rounded-2xl bg-white px-1 py-2 ring-1 ring-ink/5">
              {['Home', 'Pay', 'Cards', 'More'].map((item, i) => (
                <div
                  key={item}
                  className={cn(
                    'rounded-xl py-1.5 text-center text-[9px] font-semibold',
                    i === 0 ? 'bg-mist text-ink' : 'text-ink/35',
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </PhoneFrame>
      </div>
    </aside>
  )
}
