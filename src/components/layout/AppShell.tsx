import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
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
    <div className={cn('relative min-h-dvh overflow-hidden', className)}>
      {showHeader ? <Header /> : null}
      {children}
    </div>
  )
}
