import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useImplementationJourney } from '@/app/implementationJourneyProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Button } from '@/components/ui/Button'
import { ApiExplorerPanel } from '@/screens/ImplementationJourney/ApiExplorerPanel'
import { ArchitecturePanel } from '@/screens/ImplementationJourney/ArchitecturePanel'
import { ConsolePanel } from '@/screens/ImplementationJourney/ConsolePanel'
import { IntegrationJourneyPanel } from '@/screens/ImplementationJourney/IntegrationJourneyPanel'

export function ImplementationJourneyPage() {
  const { complete, reset } = useImplementationJourney()

  return (
    <div className="relative min-h-dvh overflow-hidden bg-void text-white">
      <Background />

      <SiteHeader />

      <div className="relative z-10 mx-auto max-w-[1680px] px-5 pb-6 pt-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 flex max-w-3xl flex-wrap items-start justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Watch your platform come alive
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/50">
              Connect each capability and see the architecture, APIs, and logs
              respond in real time.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="text-xs font-semibold text-white/45 underline-offset-4 hover:text-white hover:underline"
          >
            Reset journey
          </button>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[35fr_30fr_35fr] xl:gap-5">
          <GlassPanel delay={0}>
            <ArchitecturePanel />
          </GlassPanel>
          <GlassPanel delay={0.08}>
            <IntegrationJourneyPanel />
          </GlassPanel>
          <GlassPanel delay={0.16}>
            <ApiExplorerPanel />
          </GlassPanel>
        </div>

        <div className="mt-4">
          <ConsolePanel />
        </div>

        {complete ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-lagoon-bright/10 p-6 md:p-8"
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background:
                  'radial-gradient(circle at 30% 40%, rgb(52 211 153 / 0.2), transparent 50%)',
              }}
            />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Platform ready
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold">
                  Fully integrated
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">
                  Every capability is online. Your banking platform is ready
                  for deployment.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="!bg-mist !text-void"
                  onClick={() =>
                    window.alert('Delivery Journey — mocked for prototype.')
                  }
                >
                  View Delivery Journey
                </Button>
                <Button
                  variant="secondary"
                  className="!bg-white/10 !text-white !ring-white/20"
                  onClick={() =>
                    window.alert('Proposal download — mocked for prototype.')
                  }
                >
                  Download Proposal
                </Button>
              </div>
            </div>
          </motion.section>
        ) : null}
      </div>
    </div>
  )
}

/** Ambient mesh gradient, drifting orbs, and faint particle grid */
function Background() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 18% 8%, rgb(34 211 238 / 0.09), transparent), radial-gradient(ellipse 55% 45% at 85% 90%, rgb(56 189 248 / 0.08), transparent), radial-gradient(ellipse 40% 35% at 55% 45%, rgb(129 140 248 / 0.05), transparent)',
        }}
      />
      <motion.div
        className="absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-lagoon-bright/10 blur-[110px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-sky-500/10 blur-[110px]"
        animate={{ x: [0, -40, 0], y: [0, -25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/4 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/8 blur-[90px]"
        animate={{ y: [0, 40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Floating particles */}
      {[
        { left: '12%', top: '30%', d: 9 },
        { left: '28%', top: '72%', d: 11 },
        { left: '55%', top: '18%', d: 8 },
        { left: '74%', top: '60%', d: 12 },
        { left: '88%', top: '28%', d: 10 },
        { left: '42%', top: '86%', d: 13 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-lagoon-bright/40"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -24, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  )
}

function GlassPanel({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="flex min-h-[600px] flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_80px_-40px_rgb(0_0_0_/_0.8)] backdrop-blur-2xl"
    >
      {children}
    </motion.div>
  )
}
