import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import { getTheme } from '@/engine/whiteLabel'
import type { WhiteLabelResult } from '@/types/whiteLabel'
import { cn } from '@/lib/cn'

const screens = ['home', 'pay', 'cards', 'more'] as const
type Screen = (typeof screens)[number]

interface AnimatedBankAppProps {
  result: WhiteLabelResult
}

export function AnimatedBankApp({ result }: AnimatedBankAppProps) {
  const [screen, setScreen] = useState<Screen>('home')
  const [pulse, setPulse] = useState(0)
  const theme = getTheme(result.theme)
  const isRtl = result.language === 'ar'
  const modules = result.modules

  useEffect(() => {
    const id = window.setInterval(() => {
      setScreen((prev) => {
        const i = screens.indexOf(prev)
        return screens[(i + 1) % screens.length]
      })
      setPulse((p) => p + 1)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative flex justify-center">
      {/* Orbiting feature chips around the phone */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        {modules.slice(0, 6).map((mod, i) => {
          const angle = (i / Math.max(modules.length, 1)) * Math.PI * 2
          const radius = 170
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius * 0.7
          return (
            <motion.div
              key={mod.id}
              className={cn(
                'absolute left-1/2 top-1/2 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-sm ring-1 ring-white/40',
                theme.chip,
              )}
              animate={{
                x: [x, x + 10, x - 8, x],
                y: [y, y - 12, y + 8, y],
                opacity: [0.85, 1, 0.9, 0.85],
              }}
              transition={{
                duration: 4 + i * 0.35,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ marginLeft: -28, marginTop: -12 }}
            >
              {mod.short}
            </motion.div>
          )
        })}
      </div>

      <PhoneFrame size="lg" label="Running white-label bank app" className="relative z-10">
        <div dir={isRtl ? 'rtl' : 'ltr'} className="flex h-full flex-col px-4 pb-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 6, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-[11px] font-bold text-white',
                  theme.gradient,
                )}
              >
                {result.appName.slice(0, 2).toUpperCase()}
              </motion.div>
              <div>
                <p className="text-xs font-bold text-ink">{result.appName}</p>
                <p className="text-[9px] text-ink/45">Live demo · {result.language}</p>
              </div>
            </div>
            <motion.span
              key={pulse}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Running
            </motion.span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-3 flex flex-1 flex-col"
            >
              {screen === 'home' ? (
                <>
                  <div
                    className={cn(
                      'rounded-2xl bg-gradient-to-br p-4 text-white',
                      theme.gradient,
                    )}
                  >
                    <p className="text-[9px] uppercase tracking-[0.14em] text-white/70">
                      Total balance
                    </p>
                    <motion.p
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-1 font-display text-3xl font-bold"
                    >
                      SAR 24,850.00
                    </motion.p>
                    <div className="mt-3 flex gap-2">
                      {['+2.4% today', '3 accounts'].map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/15 px-2 py-0.5 text-[9px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {modules.slice(0, 4).map((mod, i) => (
                      <motion.div
                        key={mod.id}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="flex flex-col items-center gap-1 rounded-xl bg-white py-2.5 ring-1 ring-ink/5"
                      >
                        <span
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-[9px] font-bold text-white',
                            theme.gradient,
                          )}
                        >
                          {mod.short.slice(0, 2)}
                        </span>
                        <span className="text-[8px] font-semibold text-ink/70">
                          {mod.short}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-3 space-y-2">
                    {['Salary received', 'Card · Apple Pay', 'Bill · SEC'].map(
                      (row, i) => (
                        <motion.div
                          key={row}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 ring-1 ring-ink/5"
                        >
                          <span className="text-[11px] font-medium text-ink">{row}</span>
                          <span className={cn('text-[10px] font-bold', theme.text)}>
                            {i === 0 ? '+8,200' : i === 1 ? '-42.50' : '-120'}
                          </span>
                        </motion.div>
                      ),
                    )}
                  </div>
                </>
              ) : null}

              {screen === 'pay' ? (
                <div className="flex flex-1 flex-col">
                  <p className="font-display text-lg font-bold text-ink">Send money</p>
                  <p className="mt-1 text-[11px] text-ink/50">
                    Animated transfer sheet
                  </p>
                  <div className="mt-4 space-y-2">
                    {modules
                      .filter((m) =>
                        ['transfers', 'bills', 'multi_currency', 'accounts'].includes(
                          m.id,
                        ),
                      )
                      .concat(modules)
                      .slice(0, 4)
                      .map((mod, i) => (
                        <motion.div
                          key={`${mod.id}-pay`}
                          animate={{ x: [0, 6, 0] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 ring-1 ring-ink/5"
                        >
                          <span
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-[10px] font-bold text-white',
                              theme.gradient,
                            )}
                          >
                            {mod.short.slice(0, 2)}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-ink">{mod.name}</p>
                            <p className="text-[10px] text-ink/45">Tap to open</p>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={cn(
                      'mt-auto rounded-2xl bg-gradient-to-r py-3.5 text-center text-sm font-bold text-white',
                      theme.gradient,
                    )}
                  >
                    Continue transfer
                  </motion.div>
                </div>
              ) : null}

              {screen === 'cards' ? (
                <div className="flex flex-1 flex-col">
                  <p className="font-display text-lg font-bold text-ink">Your cards</p>
                  <motion.div
                    animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className={cn(
                      'mt-4 rounded-2xl bg-gradient-to-br p-5 text-white shadow-lg',
                      theme.gradient,
                    )}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                      {result.appName}
                    </p>
                    <p className="mt-6 font-mono text-sm tracking-[0.2em]">
                      •••• •••• •••• 4281
                    </p>
                    <div className="mt-4 flex justify-between text-[10px]">
                      <span>VIRTUAL</span>
                      <span>09/28</span>
                    </div>
                  </motion.div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {['Freeze', 'Limits', 'Apple Pay', 'Replace'].map((action, i) => (
                      <motion.button
                        key={action}
                        type="button"
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.12,
                        }}
                        className="rounded-xl bg-white py-3 text-xs font-semibold text-ink ring-1 ring-ink/5"
                      >
                        {action}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : null}

              {screen === 'more' ? (
                <div className="flex flex-1 flex-col">
                  <p className="font-display text-lg font-bold text-ink">More</p>
                  <div className="mt-3 space-y-2">
                    {modules.map((mod, i) => (
                      <motion.div
                        key={`more-${mod.id}`}
                        animate={{
                          x: [0, i % 2 === 0 ? 5 : -5, 0],
                          opacity: [0.85, 1, 0.85],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="flex items-center justify-between rounded-2xl bg-white px-3 py-3 ring-1 ring-ink/5"
                      >
                        <span className="text-sm font-semibold text-ink">{mod.name}</span>
                        <span className={cn('text-[10px] font-bold', theme.text)}>
                          Open
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto grid grid-cols-4 gap-1 rounded-2xl bg-white px-1 py-2 ring-1 ring-ink/5">
            {screens.map((item) => (
              <div
                key={item}
                className={cn(
                  'rounded-xl py-1.5 text-center text-[9px] font-semibold capitalize transition',
                  screen === item
                    ? cn(theme.soft, theme.text)
                    : 'text-ink/35',
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}
