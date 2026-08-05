import { motion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/Button'
import { routes } from '@/lib/constants'

export function LandingPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-lagoon-bright/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-[22rem] w-[22rem] rounded-full bg-coral/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(6 38 47 / 0.07) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <header className="relative z-10 flex items-center px-6 py-5 md:px-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-mist">
            T
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Tayseer
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 pb-24 pt-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lagoon">
            Product Finder
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Design Your Financial Platform
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            Discover the best Tayseer products for your bank, wallet, or fintech —
            shaped by what you&apos;re building, who you serve, and the
            capabilities you need.
          </p>
          <div className="mt-10">
            <ButtonLink to={routes.finder} className="!px-8 !py-3.5 !text-base">
              Start Product Finder
            </ButtonLink>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
