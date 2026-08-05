import { Link } from 'react-router-dom'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-mist shadow-lift hover:bg-ink-soft focus-visible:ring-lagoon-bright',
  secondary:
    'bg-white/80 text-ink ring-1 ring-line backdrop-blur hover:bg-white focus-visible:ring-lagoon',
  ghost:
    'bg-transparent text-ink/80 hover:bg-white/40 focus-visible:ring-lagoon',
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant
  children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
