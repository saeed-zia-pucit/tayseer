import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ScanFace, Zap } from 'lucide-react'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import { getMbukeTheme } from '@/engine/mbukeDemo'
import type { MbukeDemoResult } from '@/types/mbukeDemo'
import type { DemoStepId } from '@/screens/MbukeDemo/mbukeDemoScript'
import { cn } from '@/lib/cn'

interface MbukeDemoPhoneProps {
  result: MbukeDemoResult
  stepId: DemoStepId
  stepDuration: number
}

/** Phone running the scripted MBuke demo, one screen per step */
export function MbukeDemoPhone({ result, stepId, stepDuration }: MbukeDemoPhoneProps) {
  const theme = getMbukeTheme(result.theme)

  return (
    <PhoneFrame
      size="md"
      label="MBuke live demo"
      statusBar={stepId === 'splash' || stepId === 'done' ? false : undefined}
      screenClassName={
        stepId === 'splash' || stepId === 'done'
          ? cn('bg-gradient-to-br', theme.gradient)
          : undefined
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={stepId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-1 flex-col px-4 pb-2 pt-1"
        >
          {stepId === 'splash' ? <SplashScreen result={result} /> : null}
          {stepId === 'onboarding' ? (
            <OnboardingScreen result={result} duration={stepDuration} />
          ) : null}
          {stepId === 'home' ? <HomeScreen result={result} /> : null}
          {stepId === 'send' ? (
            <SendScreen result={result} duration={stepDuration} />
          ) : null}
          {stepId === 'bills' ? (
            <BillsScreen result={result} duration={stepDuration} />
          ) : null}
          {stepId === 'agents' ? (
            <AgentsScreen result={result} duration={stepDuration} />
          ) : null}
          {stepId === 'analytics' ? <AnalyticsScreen result={result} /> : null}
          {stepId === 'done' ? <DoneScreen result={result} /> : null}
        </motion.div>
      </AnimatePresence>
    </PhoneFrame>
  )
}

/* ---------- shared bits ---------- */

function AppHeader({ result }: { result: MbukeDemoResult }) {
  const theme = getMbukeTheme(result.theme)
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-[10px] font-bold text-white',
            theme.gradient,
          )}
        >
          MB
        </span>
        <p className="text-xs font-bold text-ink">{result.appName}</p>
      </div>
      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        Live
      </span>
    </div>
  )
}

/** Green check burst shown when an operation finishes */
function SuccessOverlay({ delayMs, label }: { delayMs: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delayMs / 1000 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/85 backdrop-blur-[2px]"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delayMs / 1000, type: 'spring', stiffness: 260, damping: 16 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_30px_-8px_rgb(16_185_129_/_0.6)]"
      >
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-emerald-400"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ delay: delayMs / 1000 + 0.1, duration: 0.7 }}
        />
        <Check className="h-8 w-8" strokeWidth={3} />
      </motion.span>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delayMs / 1000 + 0.15 }}
        className="mt-3 text-sm font-bold text-ink"
      >
        {label}
      </motion.p>
    </motion.div>
  )
}

function CountUp({ to, prefix = '' }: { to: number; prefix?: string }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1300, 1)
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to])
  return (
    <span>
      {prefix}
      {value.toLocaleString()}
    </span>
  )
}

/* ---------- screens ---------- */

function SplashScreen({ result }: { result: MbukeDemoResult }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-white">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-white/15 text-2xl font-bold backdrop-blur"
      >
        MB
      </motion.span>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-4 font-display text-xl font-bold"
      >
        {result.appName}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/80"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50"
      >
        Powered by MBuke
      </motion.p>
    </div>
  )
}

function OnboardingScreen({
  result,
  duration,
}: {
  result: MbukeDemoResult
  duration: number
}) {
  const theme = getMbukeTheme(result.theme)
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader result={result} />
      <p className="mt-4 font-display text-lg font-bold text-ink">
        Verify your identity
      </p>
      <p className="mt-1 text-[11px] text-ink/50">
        Hold your national ID inside the frame
      </p>

      <div className="relative mx-auto mt-5 w-full max-w-[210px] overflow-hidden rounded-2xl border-2 border-dashed border-void/15 bg-white p-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl',
              theme.soft,
            )}
          >
            <ScanFace className={cn('h-6 w-6', theme.text)} />
          </span>
          <div className="space-y-1.5">
            <div className="h-2 w-24 rounded bg-void/10" />
            <div className="h-2 w-16 rounded bg-void/10" />
            <div className="h-2 w-20 rounded bg-void/10" />
          </div>
        </div>
        {/* Scan line */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-emerald-400/35 to-transparent"
          animate={{ top: ['-15%', '100%'] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="mt-5 space-y-2">
        {['Document detected', 'Face match', 'AML screening'].map((row, i) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.55 }}
            className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-[11px] ring-1 ring-void/5"
          >
            <span className="font-medium text-ink">{row}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.75 + i * 0.55, type: 'spring' }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </motion.span>
          </motion.div>
        ))}
      </div>

      <SuccessOverlay delayMs={duration - 1100} label="Identity verified" />
    </div>
  )
}

function HomeScreen({ result }: { result: MbukeDemoResult }) {
  const theme = getMbukeTheme(result.theme)
  const actions = result.modules.slice(0, 4)
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader result={result} />
      <div className={cn('mt-4 rounded-2xl bg-gradient-to-br p-4 text-white', theme.gradient)}>
        <p className="text-[9px] uppercase tracking-[0.14em] text-white/70">
          Wallet balance
        </p>
        <p className="mt-1 font-display text-3xl font-bold">
          SAR <CountUp to={12640} />
        </p>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {actions.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex flex-col items-center gap-1 rounded-xl bg-white py-2.5 ring-1 ring-void/5"
          >
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-[9px] font-bold text-white',
                theme.gradient,
              )}
            >
              {mod.short.slice(0, 2)}
            </span>
            <span className="text-[8px] font-semibold text-ink/70">{mod.short}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {[
          ['P2P received', '+320'],
          ['Bill · SEC', '-85'],
          ['Agent cash-in', '+500'],
        ].map(([row, amount], i) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.15 }}
            className="flex justify-between rounded-xl bg-white px-3 py-2.5 text-[11px] ring-1 ring-void/5"
          >
            <span className="font-medium text-ink">{row}</span>
            <span className={cn('font-bold', theme.text)}>{amount}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SendScreen({
  result,
  duration,
}: {
  result: MbukeDemoResult
  duration: number
}) {
  const theme = getMbukeTheme(result.theme)
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader result={result} />
      <p className="mt-4 font-display text-lg font-bold text-ink">Send money</p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-3 flex items-center gap-3 rounded-2xl bg-white px-3 py-3 ring-1 ring-void/5"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/15 text-sm font-bold text-coral">
          A
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Amina K.</p>
          <p className="text-[10px] text-ink/45">+966 · frequent</p>
        </div>
      </motion.div>

      <div className="mt-4 rounded-2xl bg-white px-4 py-5 text-center ring-1 ring-void/5">
        <p className="text-[9px] uppercase tracking-[0.14em] text-ink/40">Amount</p>
        <p className="mt-1 font-display text-3xl font-bold text-ink">
          SAR <CountUp to={250} />
        </p>
      </div>

      {/* Send button fills like a hold-to-confirm */}
      <div className="relative mt-4 h-11 overflow-hidden rounded-2xl bg-void/8">
        <motion.div
          className={cn('absolute inset-y-0 left-0 rounded-2xl bg-gradient-to-r', theme.gradient)}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.9, duration: 1.1, ease: 'easeInOut' }}
        />
        <span className="relative z-10 flex h-full items-center justify-center gap-1.5 text-sm font-bold text-white mix-blend-luminosity">
          <Zap className="h-4 w-4" /> Sending…
        </span>
      </div>

      <SuccessOverlay delayMs={duration - 1100} label="SAR 250 sent to Amina" />
    </div>
  )
}

function BillsScreen({
  result,
  duration,
}: {
  result: MbukeDemoResult
  duration: number
}) {
  const theme = getMbukeTheme(result.theme)
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader result={result} />
      <p className="mt-4 font-display text-lg font-bold text-ink">Pay bills</p>
      <div className="mt-3 space-y-2">
        {[
          ['Electricity · SEC', 'SAR 85.00', true],
          ['Water · NWC', 'SAR 42.50', false],
          ['Mobile · STC', 'SAR 115.00', false],
        ].map(([name, amount, active], i) => (
          <motion.div
            key={name as string}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.15 }}
            className={cn(
              'flex items-center justify-between rounded-2xl bg-white px-3 py-3 ring-1',
              active ? 'ring-2 ring-emerald-400/60' : 'ring-void/5',
            )}
          >
            <div>
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="text-[10px] text-ink/45">Due this week</p>
            </div>
            <span className={cn('text-xs font-bold', theme.text)}>{amount}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-void/5"
      >
        <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-ink/50">
          <span>Processing payment</span>
          <span>SEC</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-void/8">
          <motion.div
            className={cn('h-full rounded-full bg-gradient-to-r', theme.gradient)}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.1, duration: 1, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      <SuccessOverlay delayMs={duration - 1100} label="Bill paid · receipt saved" />
    </div>
  )
}

function AgentsScreen({
  result,
  duration,
}: {
  result: MbukeDemoResult
  duration: number
}) {
  const theme = getMbukeTheme(result.theme)
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader result={result} />
      <p className="mt-4 font-display text-lg font-bold text-ink">Agent network</p>
      <p className="mt-1 text-[11px] text-ink/50">Cash-in at a nearby agent</p>
      <div className="mt-3 space-y-2">
        {['Agent · Riyadh 12', 'Agent · Jeddah 04', 'Agent · Rural 08'].map(
          (agent, i) => (
            <motion.div
              key={agent}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.15 }}
              className={cn(
                'flex items-center justify-between rounded-2xl bg-white px-3 py-3 ring-1',
                i === 0 ? 'ring-2 ring-emerald-400/60' : 'ring-void/5',
              )}
            >
              <span className="text-sm font-semibold text-ink">{agent}</span>
              <span className="text-[10px] font-bold text-emerald-600">Online</span>
            </motion.div>
          ),
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className={cn(
          'mt-4 rounded-2xl bg-gradient-to-br p-4 text-white',
          theme.gradient,
        )}
      >
        <p className="text-[9px] uppercase tracking-[0.14em] text-white/70">
          Cash-in from Agent · Riyadh 12
        </p>
        <p className="mt-1 font-display text-2xl font-bold">
          + SAR <CountUp to={500} />
        </p>
      </motion.div>

      <SuccessOverlay delayMs={duration - 1100} label="Wallet topped up" />
    </div>
  )
}

function AnalyticsScreen({ result }: { result: MbukeDemoResult }) {
  const theme = getMbukeTheme(result.theme)
  const bars = [42, 65, 50, 80, 58, 92, 74]
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader result={result} />
      <p className="mt-4 font-display text-lg font-bold text-ink">
        Operator dashboard
      </p>
      <p className="mt-1 text-[11px] text-ink/50">
        Today's transactions across all channels
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ['Volume', 'SAR 84K'],
          ['Transactions', '1,204'],
        ].map(([label, value], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.12 }}
            className="rounded-2xl bg-white px-3 py-3 ring-1 ring-void/5"
          >
            <p className={cn('font-display text-lg font-bold', theme.text)}>{value}</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/40">
              {label}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex flex-1 items-end gap-2 rounded-2xl bg-white p-4 ring-1 ring-void/5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={cn('flex-1 rounded-t-md bg-gradient-to-t', theme.gradient)}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.5 + i * 0.09, duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  )
}

function DoneScreen({ result }: { result: MbukeDemoResult }) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center text-white">
      {/* Celebration particles */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/70"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 90,
            y: Math.sin((i / 8) * Math.PI * 2) * 90,
            opacity: 0,
          }}
          transition={{ delay: 0.3, duration: 1.1, ease: 'easeOut' }}
        />
      ))}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 15 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur"
      >
        <Check className="h-10 w-10" strokeWidth={2.5} />
      </motion.span>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-4 font-display text-xl font-bold"
      >
        Demo complete
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-2 max-w-[200px] text-center text-[11px] leading-relaxed text-white/70"
      >
        {result.appName} — onboarding to analytics on one MBuke platform.
      </motion.p>
    </div>
  )
}
