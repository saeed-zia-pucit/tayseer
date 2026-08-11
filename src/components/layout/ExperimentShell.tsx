import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { cn } from '@/lib/cn'

interface ExperimentShellProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  showHeader?: boolean
}

/**
 * Shared chrome for AI Playground flows —
 * near-black canvas, teal + lime atmosphere (matches Product Finder reference).
 */
export function ExperimentShell({
  children,
  className,
  contentClassName,
  showHeader = true,
}: ExperimentShellProps) {
  return (
    <div className={cn('lab-shell relative min-h-dvh overflow-hidden text-ink', className)}>
      <div className="lab-shell__glow" aria-hidden />
      {showHeader ? <SiteHeader /> : null}
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}
