import { motion } from 'framer-motion'
import { TOTAL_FINDER_STEPS } from '@/lib/constants'
import { finderStepMeta } from '@/data/finderOptions'
import { cn } from '@/lib/cn'

interface StepMeta {
  id: number
  short: string
}

interface FinderProgressProps {
  step: number
  total?: number
  steps?: readonly StepMeta[]
}

export function FinderProgress({
  step,
  total = TOTAL_FINDER_STEPS,
  steps = finderStepMeta,
}: FinderProgressProps) {
  const pct = Math.round((step / total) * 100)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
          Step {step} of {total}
        </p>
        <p className="text-xs font-medium text-ink/50">{pct}%</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line/70">
        <motion.div
          className="h-full rounded-full bg-lagoon-bright"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
      <div className="hidden gap-2 sm:flex">
        {steps.map((s) => (
          <span
            key={s.id}
            className={cn(
              'rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide',
              s.id === step
                ? 'bg-lagoon text-mist'
                : s.id < step
                  ? 'bg-lagoon/20 text-lagoon-bright'
                  : 'bg-white/5 text-ink/40',
            )}
          >
            {s.short}
          </span>
        ))}
      </div>
    </div>
  )
}
