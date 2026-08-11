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
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c8c8c8]">
          Step {step} of {total}
        </p>
        <p className="text-xs font-medium text-[#c8c8c8]">{pct}%</p>
      </div>
      <div className="lab-progress__track">
        <motion.div
          className="lab-progress__fill"
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
              'lab-progress__step',
              s.id === step && 'is-active',
              s.id < step && 'is-done',
            )}
          >
            {s.short}
          </span>
        ))}
      </div>
    </div>
  )
}
