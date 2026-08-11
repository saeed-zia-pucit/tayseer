import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface OptionCardProps {
  label: string
  hint?: string
  selected?: boolean
  onClick: () => void
  multi?: boolean
  className?: string
}

export function OptionCard({
  label,
  hint,
  selected,
  onClick,
  multi,
  className,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      layout
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn('option-card group', selected && 'is-selected', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-tight sm:text-[0.95rem]">
            {label}
          </p>
          {hint ? <p className="option-card__hint mt-1 text-xs leading-snug">{hint}</p> : null}
        </div>
        <span
          className={cn(
            'option-card__mark mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
            multi && 'rounded-md',
          )}
        >
          {selected ? '✓' : ''}
        </span>
      </div>
    </motion.button>
  )
}

interface ChipProps {
  label: string
  selected?: boolean
  onClick: () => void
}

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn('lab-chip', selected && 'is-selected')}
    >
      {label}
    </motion.button>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#a8a8a8]">
      {children}
    </p>
  )
}
