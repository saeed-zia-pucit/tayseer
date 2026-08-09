import { motion } from 'framer-motion'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useMbukeDemo } from '@/app/mbukeDemoProvider'
import { Button, ButtonLink } from '@/components/ui/Button'
import { buildMbukeResult } from '@/engine/mbukeDemo'
import { routes } from '@/lib/constants'
import { MbukeDemoTheater } from '@/screens/MbukeDemo/MbukeDemoTheater'

export function MbukeDemoResultsPage() {
  const navigate = useNavigate()
  const { answers, reset } = useMbukeDemo()
  const result = buildMbukeResult(answers)

  if (!result || answers.capabilities.length === 0 || !answers.theme) {
    return <Navigate to={routes.mbukeDemo} replace />
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-lagoon-bright/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-8">
        <Link to={routes.home} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-mist">
            T
          </span>
          <span className="font-display text-lg font-bold text-ink">Tayseer</span>
        </Link>
        <ButtonLink
          to={routes.mbukeDemo}
          variant="secondary"
          className="!py-2 !text-xs"
        >
          Edit demo
        </ButtonLink>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
            MBuke demo running
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {result.appName}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink/60">
            Watch a full customer journey — from first launch to operator
            analytics — running on your configuration.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[result.audienceLabel, result.challengeLabel, 'White-label ready'].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink/70 ring-1 ring-line"
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </motion.div>

        <div className="mt-10">
          <MbukeDemoTheater result={result} />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-[1.5rem] bg-white p-6 ring-1 ring-line md:p-7"
          >
            <h2 className="font-display text-xl font-bold text-ink">
              Capabilities on tour
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.modules.map((mod, i) => (
                <motion.span
                  key={mod.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-full bg-mist px-3.5 py-2 text-xs font-semibold text-ink-soft"
                >
                  {mod.name}
                  <span className="ml-1.5 text-[10px] font-medium uppercase text-ink/35">
                    {mod.bucket}
                  </span>
                </motion.span>
              ))}
            </div>

            <h2 className="mt-8 font-display text-xl font-bold text-ink">
              The MBuke advantage
            </h2>
            <ul className="mt-4 space-y-2">
              {result.advantages.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-[1.5rem] bg-ink p-6 text-mist md:p-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lagoon-bright">
              Case study
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">
              {result.caseStudy.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist/70">
              {result.caseStudy.story}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {result.caseStudy.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl bg-white/8 px-3 py-3 ring-1 ring-white/10"
                >
                  <p className="font-display text-xl font-bold text-lagoon-bright">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-mist/55">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() =>
              window.alert(
                'Demo request noted (prototype). Connect to info@tayseer.me or the live Contact Us form.',
              )
            }
          >
            Contact us for demo
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              reset()
              navigate(routes.mbukeDemo)
            }}
          >
            Restart MBuke demo
          </Button>
        </div>
      </main>
    </div>
  )
}
