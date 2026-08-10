import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type PhoneFrameSize = 'sm' | 'md' | 'lg'

const sizeClass: Record<
  PhoneFrameSize,
  { shell: string; screen: string; island: string }
> = {
  sm: {
    shell: 'w-[240px] rounded-[2rem] p-[10px]',
    screen: 'rounded-[1.45rem] min-h-[460px]',
    island: 'h-5 w-20 rounded-full',
  },
  md: {
    shell: 'w-[280px] rounded-[2.35rem] p-[11px]',
    screen: 'rounded-[1.75rem] min-h-[540px]',
    island: 'h-6 w-24 rounded-full',
  },
  lg: {
    shell: 'w-[320px] rounded-[2.6rem] p-3',
    screen: 'rounded-[2rem] min-h-[620px]',
    island: 'h-7 w-28 rounded-full',
  },
}

export interface PhoneFrameProps {
  children: ReactNode
  /** Outer wrapper class (centering, margins). */
  className?: string
  /** Classes merged onto the scrollable screen surface. */
  screenClassName?: string
  size?: PhoneFrameSize
  /** Show Dynamic Island / notch bar. Default true. */
  showIsland?: boolean
  /** Show home indicator bar. Default true. */
  showHomeIndicator?: boolean
  /** Optional status row inside the screen (time / signal). */
  statusBar?: ReactNode | false
  /** Accessible label for the device chrome. */
  label?: string
}

/**
 * Reusable phone device chrome for prototypes and demos.
 * Pass any screen UI as children — used by Product Finder and future flows.
 */
export function PhoneFrame({
  children,
  className,
  screenClassName,
  size = 'md',
  showIsland = true,
  showHomeIndicator = true,
  statusBar,
  label = 'Phone preview',
}: PhoneFrameProps) {
  const s = sizeClass[size]

  return (
    <div className={cn('relative inline-flex', className)} role="img" aria-label={label}>
      {/* Soft device shadow */}
      <div
        className="pointer-events-none absolute inset-3 rounded-[2.2rem] bg-void/25 blur-2xl"
        aria-hidden
      />

      <div
        className={cn(
          'relative bg-gradient-to-b from-[#1a1a1c] via-[#0c0c0e] to-[#050506] shadow-lift ring-1 ring-white/10',
          s.shell,
        )}
      >
        {/* Side buttons (visual only) */}
        <span
          className="absolute -start-[2px] top-24 h-8 w-[3px] rounded-s-sm bg-[#2a2a2e]"
          aria-hidden
        />
        <span
          className="absolute -start-[2px] top-36 h-12 w-[3px] rounded-s-sm bg-[#2a2a2e]"
          aria-hidden
        />
        <span
          className="absolute -end-[2px] top-32 h-16 w-[3px] rounded-e-sm bg-[#2a2a2e]"
          aria-hidden
        />

        <div
          className={cn(
            'phone-ui relative flex flex-col overflow-hidden',
            s.screen,
            screenClassName,
          )}
        >
          {showIsland ? (
            <div className="pointer-events-none absolute inset-x-0 top-2 z-20 flex justify-center">
              <div className={cn('bg-black shadow-inner', s.island)} />
            </div>
          ) : null}

          {statusBar !== false ? (
            <div className="relative z-10 flex items-center justify-between px-5 pb-1 pt-3 text-[10px] font-semibold text-phone-ink/70">
              {statusBar ?? (
                <>
                  <span>9:41</span>
                  <span className="flex items-center gap-1 tracking-tight">
                    <span className="inline-block h-1.5 w-3 rounded-sm bg-void/70" />
                    <span className="inline-block h-2 w-1 rounded-sm bg-void/70" />
                  </span>
                </>
              )}
            </div>
          ) : null}

          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>

          {showHomeIndicator ? (
            <div className="relative z-10 flex justify-center pb-2 pt-1">
              <div className="h-1 w-24 rounded-full bg-void/20" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
