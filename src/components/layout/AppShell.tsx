import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { cn } from '@/lib/cn'

interface AppShellProps {
  children: ReactNode
  className?: string
  showHeader?: boolean
}

/** Shared page chrome — reuse on every screen. */
export function AppShell({
  children,
  className,
  showHeader = true,
}: AppShellProps) {
  return (
    <div className={cn('relative min-h-dvh overflow-hidden bg-surface text-ink', className)}>
      {showHeader ? <SiteHeader /> : null}
      {children}
    </div>
  )
}
