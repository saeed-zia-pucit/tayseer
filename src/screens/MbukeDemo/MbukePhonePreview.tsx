import { AnimatePresence, motion } from 'framer-motion'
import { AnalyzingIndicator } from '@/components/finder/AnalyzingIndicator'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import {
  mbukeAudienceOptions,
  mbukeChallengeOptions,
} from '@/data/mbukeDemoOptions'
import { buildMbukeResult, getMbukeTheme } from '@/engine/mbukeDemo'
import type { MbukeDemoAnswers } from '@/types/mbukeDemo'
import { cn } from '@/lib/cn'

interface MbukePhonePreviewProps {
  answers: MbukeDemoAnswers
  analyzing: boolean
}

export function MbukePhonePreview({
  answers,
  analyzing,
}: MbukePhonePreviewProps) {
  const result = buildMbukeResult(answers)
  const theme = getMbukeTheme(answers.theme)
  const audience =
    mbukeAudienceOptions.find((o) => o.value === answers.audience)?.label ??
    'Institution'
  const challenge =
    mbukeChallengeOptions.find((o) => o.value === answers.challenge)?.label ??
    'Configure demo'
  const modules = result?.modules ?? []

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">
            MBuke live demo
          </p>
          <p className="mt-1 text-sm font-medium text-ink/55">
            White-label app assembling
          </p>
        </div>
        <AnalyzingIndicator show={analyzing} />
      </div>

      <div className="flex justify-center lg:justify-end">
        <PhoneFrame size="md" label="MBuke white-label demo">
          <div className="flex h-full flex-col px-3.5 pb-2 pt-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-[10px] font-bold text-white',
                    theme.gradient,
                  )}
                >
                  MB
                </div>
                <div>
                  <p className="text-[11px] font-bold leading-none text-ink">
                    {result?.appName ?? 'MBuke'}
                  </p>
                  <p className="mt-0.5 text-[9px] text-ink/45">
                    {answers.audience ? audience : 'White-label platform'}
                  </p>
                </div>
              </div>
              <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-semibold', theme.chip)}>
                Demo
              </span>
            </div>

            <motion.div
              layout
              className={cn(
                'mt-3 rounded-2xl bg-gradient-to-br p-3.5 text-white',
                theme.gradient,
              )}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Platform snapshot
              </p>
              <p className="mt-1 font-display text-lg font-bold leading-tight">
                {answers.challenge ? challenge : 'Pick a challenge'}
              </p>
              <p className="mt-2 text-[10px] text-white/75">
                Onboarding · Payments · Agents · USSD
              </p>
            </motion.div>

            <div className="mt-3">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                Touring capabilities
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                <AnimatePresence mode="popLayout">
                  {(modules.length
                    ? modules.slice(0, 4)
                    : [
                        { id: '1', short: 'KYC', name: '' },
                        { id: '2', short: 'Send', name: '' },
                        { id: '3', short: 'USSD', name: '' },
                        { id: '4', short: 'Ops', name: '' },
                      ]
                  ).map((mod) => (
                    <motion.div
                      key={mod.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-1 rounded-xl bg-white py-2 ring-1 ring-ink/5"
                    >
                      <span
                        className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-[8px] font-bold text-white',
                          theme.gradient,
                        )}
                      >
                        {mod.short.slice(0, 2)}
                      </span>
                      <span className="truncate px-0.5 text-[8px] font-semibold text-ink/70">
                        {mod.short}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3 flex-1 space-y-1.5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                Modules
              </p>
              <AnimatePresence mode="popLayout">
                {modules.length === 0 ? (
                  <motion.p className="rounded-2xl border border-dashed border-ink/10 px-3 py-5 text-center text-[10px] text-ink/35">
                    Select capabilities to tour MBuke
                  </motion.p>
                ) : (
                  modules.slice(0, 5).map((mod, i) => (
                    <motion.div
                      key={mod.id}
                      layout
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 ring-1 ring-ink/5"
                    >
                      <div>
                        <p className="text-[11px] font-semibold text-ink">
                          {mod.name}
                        </p>
                        <p className="text-[9px] capitalize text-ink/40">
                          {mod.bucket}
                        </p>
                      </div>
                      <span className={cn('text-[9px] font-bold', theme.text)}>
                        Live
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-auto grid grid-cols-4 gap-1 rounded-2xl bg-white px-1 py-2 ring-1 ring-ink/5">
              {['Home', 'Pay', 'Agents', 'More'].map((item, i) => (
                <div
                  key={item}
                  className={cn(
                    'rounded-xl py-1.5 text-center text-[9px] font-semibold',
                    i === 0 ? cn(theme.soft, theme.text) : 'text-ink/35',
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </PhoneFrame>
      </div>
    </aside>
  )
}
