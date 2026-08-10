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
      className={cn(
        'option-card group relative rounded-2xl border px-4 py-4 text-left transition duration-200',
        selected
          ? 'is-selected border-lagoon/60 bg-lagoon text-mist shadow-lift'
          : 'border-ink/10 bg-[color-mix(in_srgb,var(--brand-bg-deep)_22%,white)] text-ink hover:border-lagoon/35 hover:bg-[color-mix(in_srgb,var(--brand-slide-1)_8%,white)]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-tight sm:text-[0.95rem]">
            {label}
          </p>
          {hint ? (
            <p
              className={cn(
                'mt-1 text-xs leading-snug',
                selected ? 'text-mist/70' : 'text-ink/50',
              )}
            >
              {hint}
            </p>
          ) : null}
        </div>
        <span
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
            selected
              ? 'border-lagoon-bright bg-lagoon-bright text-void'
              : 'border-line text-transparent',
            multi && !selected && 'rounded-md',
            multi && selected && 'rounded-md',
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
      className={cn(
        'rounded-full px-3.5 py-2 text-xs font-semibold transition',
        selected
          ? 'bg-lagoon text-mist shadow-sm'
          : 'bg-[color-mix(in_srgb,var(--brand-bg-deep)_24%,white)] text-ink/70 ring-1 ring-ink/12 hover:bg-[color-mix(in_srgb,var(--brand-slide-1)_10%,white)] hover:ring-lagoon/30',
      )}
    >
      {label}
    </motion.button>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
      {children}
    </p>
  )
}
