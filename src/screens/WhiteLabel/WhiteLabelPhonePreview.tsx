import { AnimatePresence, motion } from 'framer-motion'
import { AnalyzingIndicator } from '@/components/finder/AnalyzingIndicator'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import {
  wlAudienceOptions,
  wlBankTypeOptions,
  wlLanguageOptions,
} from '@/data/whiteLabelOptions'
import { buildWhiteLabelResult, getTheme } from '@/engine/whiteLabel'
import type { WhiteLabelAnswers } from '@/types/whiteLabel'
import { cn } from '@/lib/cn'

interface WhiteLabelPhonePreviewProps {
  answers: WhiteLabelAnswers
  analyzing: boolean
}

export function WhiteLabelPhonePreview({
  answers,
  analyzing,
}: WhiteLabelPhonePreviewProps) {
  const result = buildWhiteLabelResult(answers)
  const theme = getTheme(answers.theme)
  const bankLabel =
    wlBankTypeOptions.find((o) => o.value === answers.bankType)?.label ??
    'Your Bank'
  const audienceLabel =
    wlAudienceOptions.find((o) => o.value === answers.audience)?.label ??
    'Customers'
  const langLabel =
    wlLanguageOptions.find((o) => o.value === answers.language)?.label ?? '—'
  const modules = result?.modules ?? []
  const isRtl = answers.language === 'ar'

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">
            White-label preview
          </p>
          <p className="mt-1 text-sm font-medium text-ink/55">
            Branded banking app live build
          </p>
        </div>
        <AnalyzingIndicator show={analyzing} />
      </div>

      <div className="flex justify-center lg:justify-end">
        <PhoneFrame size="md" label="White-label demo preview">
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="flex h-full flex-col px-3.5 pb-2 pt-1"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-[10px] font-bold text-white',
                    theme.gradient,
                  )}
                >
                  {(result?.appName ?? 'TB').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-[11px] font-bold leading-none text-ink">
                    {result?.appName ?? 'White-label Bank'}
                  </p>
                  <p className="mt-0.5 text-[9px] text-ink/45">
                    {answers.bankType ? bankLabel : 'Configure your app'}
                  </p>
                </div>
              </div>
              <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-semibold', theme.chip)}>
                {langLabel}
              </span>
            </div>

            <motion.div
              layout
              className={cn(
                'mt-3 overflow-hidden rounded-2xl bg-gradient-to-br p-3.5 text-white',
                theme.gradient,
              )}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Available balance
              </p>
              <p className="mt-1 font-display text-2xl font-bold tracking-tight">
                {answers.bankType ? 'SAR 24,850.00' : '— — —'}
              </p>
              <p className="mt-2 text-[10px] text-white/75">
                {answers.audience ? audienceLabel : 'Select audience'}
              </p>
            </motion.div>

            <div className="mt-3">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                Quick actions
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                <AnimatePresence mode="popLayout">
                  {(modules.length
                    ? modules.slice(0, 4)
                    : [
                        { id: 'a', name: 'Pay', short: 'Pay' },
                        { id: 'b', name: 'Top up', short: 'Add' },
                        { id: 'c', name: 'Scan', short: 'QR' },
                        { id: 'd', name: 'More', short: 'More' },
                      ]
                  ).map((mod, i) => (
                    <motion.div
                      key={mod.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.04 }}
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
                App modules
              </p>
              <AnimatePresence mode="popLayout">
                {modules.length === 0 ? (
                  <motion.p
                    key="empty"
                    className="rounded-2xl border border-dashed border-ink/10 px-3 py-5 text-center text-[10px] text-ink/35"
                  >
                    Features appear as you select them
                  </motion.p>
                ) : (
                  modules.slice(0, 5).map((mod, i) => (
                    <motion.div
                      key={mod.id}
                      layout
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 ring-1 ring-ink/5"
                    >
                      <span className="text-[11px] font-semibold text-ink">
                        {mod.name}
                      </span>
                      <span className={cn('text-[9px] font-bold', theme.text)}>
                        Live
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-auto grid grid-cols-4 gap-1 rounded-2xl bg-white px-1 py-2 ring-1 ring-ink/5">
              {['Home', 'Pay', 'Cards', 'More'].map((item, i) => (
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
