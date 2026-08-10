import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, MoveLeft, Pause, Play, RotateCcw } from 'lucide-react'
import type { MbukeDemoResult } from '@/types/mbukeDemo'
import { MbukeDemoPhone } from '@/screens/MbukeDemo/MbukeDemoPhone'
import { mbukeDemoScript } from '@/screens/MbukeDemo/mbukeDemoScript'
import { cn } from '@/lib/cn'

/**
 * Dashboard window that plays one scripted MBuke demo:
 * 3D phone on the left, live narration with pointers on the right.
 */
export function MbukeDemoTheater({ result }: { result: MbukeDemoResult }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const step = mbukeDemoScript[stepIndex]
  const isLast = stepIndex === mbukeDemoScript.length - 1

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => {
      setStepIndex((i) => (i + 1) % mbukeDemoScript.length)
    }, step.duration)
    return () => window.clearTimeout(id)
  }, [playing, stepIndex, step.duration])

  const restart = useCallback(() => {
    setStepIndex(0)
    setPlaying(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="overflow-hidden rounded-[1.75rem] bg-void shadow-[0_40px_90px_-30px_rgb(10_30_28_/_0.55)] ring-1 ring-white/10"
    >
      {/* Window title bar */}
      <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <p className="text-xs font-semibold text-mist/70">
          {result.appName} — MBuke live demo
        </p>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </span>
      </div>

      <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:gap-10">
        {/* 3D phone stage with floating callouts */}
        <div className="relative mx-auto flex items-center justify-center px-2 py-4 lg:px-14">
          <div style={{ perspective: '1400px' }}>
            <motion.div
              animate={{ y: [0, -10, 0], rotateY: [-10, -7, -10] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
              style={{ rotateX: 5, transformStyle: 'preserve-3d' }}
            >
              <MbukeDemoPhone
                result={result}
                stepId={step.id}
                stepDuration={step.duration}
              />
            </motion.div>
          </div>

          {/* Glow + reflection under the phone */}
          <div
            className="pointer-events-none absolute bottom-2 left-1/2 h-8 w-56 -translate-x-1/2 rounded-full bg-lagoon-bright/25 blur-2xl"
            aria-hidden
          />

          {/* Step callout pointing at the phone */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: step.side === 'left' ? -14 : 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={cn(
                'absolute z-20 hidden items-center gap-0 lg:flex',
                step.side === 'left' ? 'left-0 flex-row' : 'right-0 flex-row-reverse',
              )}
              style={{ top: `${step.calloutTop}%` }}
            >
              <span className="whitespace-nowrap rounded-full bg-mist px-3 py-1.5 text-[11px] font-bold text-void shadow-lg">
                {step.callout}
              </span>
              {/* Connector line + pulsing dot toward the phone */}
              <span className="relative flex items-center" aria-hidden>
                <motion.span
                  className="h-px w-10 bg-gradient-to-r from-white/80 to-white/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  style={{
                    transformOrigin: step.side === 'left' ? 'left' : 'right',
                  }}
                />
                <motion.span
                  className={cn(
                    'absolute h-2 w-2 rounded-full bg-lagoon-bright',
                    step.side === 'left' ? '-right-1' : '-left-1',
                  )}
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Narration timeline */}
        <div className="flex min-w-0 flex-col">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon-bright">
            What's happening inside the app
          </p>

          <div className="mt-4 flex-1 space-y-2">
            {mbukeDemoScript.map((s, i) => {
              const active = i === stepIndex
              const done = i < stepIndex || (isLast && active && !playing)
              return (
                <motion.div
                  key={s.id}
                  layout
                  animate={{ scale: active ? 1.02 : 1 }}
                  className={cn(
                    'relative flex items-start gap-3 rounded-2xl border px-4 py-3 transition-colors duration-300',
                    active
                      ? 'border-lagoon-bright/50 bg-white/[0.07] shadow-[0_0_28px_rgb(45_212_191_/_0.15)]'
                      : done
                        ? 'border-emerald-400/25 bg-emerald-400/[0.04]'
                        : 'border-white/8 bg-white/[0.02] opacity-55',
                  )}
                >
                  {/* Arrow pointing from the active step toward the phone */}
                  {active ? (
                    <motion.span
                      className="absolute -left-8 top-1/2 hidden -translate-y-1/2 text-lagoon-bright lg:block"
                      animate={{ x: [0, -6, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      aria-hidden
                    >
                      <MoveLeft className="h-5 w-5" />
                    </motion.span>
                  ) : null}

                  <span
                    className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                      done
                        ? 'bg-emerald-400 text-[#05231a]'
                        : active
                          ? 'bg-lagoon-bright/20 text-lagoon-bright'
                          : 'bg-white/8 text-mist/40',
                    )}
                  >
                    {done ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </motion.span>
                    ) : (
                      i + 1
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        active ? 'text-white' : done ? 'text-mist/80' : 'text-mist/50',
                      )}
                    >
                      {s.title}
                    </p>
                    <AnimatePresence initial={false}>
                      {active ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-1 text-xs leading-relaxed text-mist/60">
                            {s.description}
                          </p>
                          {playing ? (
                            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                              <motion.div
                                key={`${s.id}-progress`}
                                className="h-full rounded-full bg-lagoon-bright"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{
                                  duration: s.duration / 1000,
                                  ease: 'linear',
                                }}
                              />
                            </div>
                          ) : null}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-void transition-transform hover:scale-105"
              aria-label={playing ? 'Pause demo' : 'Play demo'}
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="ml-0.5 h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={restart}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-mist transition-colors hover:bg-white/20"
              aria-label="Restart demo"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <p className="ml-auto text-[11px] font-semibold text-mist/45">
              Step {stepIndex + 1} of {mbukeDemoScript.length} · {step.title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
