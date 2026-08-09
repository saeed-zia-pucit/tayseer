import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Check,
  CreditCard,
  Globe,
  KeyRound,
  Landmark,
  Loader2,
  Lock,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react'
import {
  connectionSteps,
  useImplementationJourney,
} from '@/app/implementationJourneyProvider'
import { journeyNodes, journeyStages } from '@/data/implementationJourney'
import type { JourneyNodeId } from '@/types/implementationJourney'
import { cn } from '@/lib/cn'

const nodeIcons: Record<JourneyNodeId, typeof KeyRound> = {
  core: Landmark,
  auth: KeyRound,
  kyc: UserCheck,
  aml: ShieldAlert,
  payments: ArrowLeftRight,
  cards: CreditCard,
  notifications: Bell,
  ai: Sparkles,
  analytics: BarChart3,
  crm: Users,
  open_banking: Globe,
}

export function IntegrationJourneyPanel() {
  const {
    unlockedStageIndex,
    connected,
    connectingId,
    connectingStep,
    selectedId,
    connectNode,
    canConnect,
    isStageUnlocked,
  } = useImplementationJourney()

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Integration Journey
          </p>
          <p className="mt-1 text-sm text-white/40">Stages unlock in order</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-white/60">
          Stage {Math.min(unlockedStageIndex + 1, journeyStages.length)} of{' '}
          {journeyStages.length}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {journeyStages.map((stage, index) => {
          const unlocked = isStageUnlocked(index)
          const done = stage.nodeIds.every((id) => connected.has(id))
          const current = unlocked && !done

          return (
            <motion.div
              key={stage.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'rounded-[1.5rem] border p-4 backdrop-blur-xl transition-colors duration-500',
                done
                  ? 'border-emerald-400/30 bg-emerald-400/[0.05]'
                  : current
                    ? 'border-cyan-300/40 bg-white/[0.05] shadow-[0_0_32px_rgb(34_211_238_/_0.12)]'
                    : unlocked
                      ? 'border-white/10 bg-white/[0.04]'
                      : 'border-white/5 bg-white/[0.015] opacity-45',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <motion.span
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold',
                      done
                        ? 'bg-emerald-400 text-[#05231a]'
                        : current
                          ? 'bg-cyan-300/20 text-cyan-300'
                          : 'bg-white/8 text-white/40',
                    )}
                    animate={done ? { scale: [1, 1.15, 1] } : undefined}
                    transition={{ duration: 0.5 }}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </motion.span>
                  <p className="text-sm font-semibold text-white">{stage.title}</p>
                </div>
                {!unlocked ? <Lock className="h-3.5 w-3.5 text-white/25" /> : null}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {stage.nodeIds.map((id) => {
                  const node = journeyNodes[id]
                  const Icon = nodeIcons[id]
                  const isOn = connected.has(id)
                  const isConnecting = connectingId === id
                  const can = canConnect(id)

                  return (
                    <motion.button
                      key={id}
                      type="button"
                      disabled={!unlocked || (!can && !isOn && !isConnecting)}
                      whileHover={can || isOn ? { y: -2, scale: 1.02 } : undefined}
                      whileTap={can || isOn ? { scale: 0.97 } : undefined}
                      onClick={() => connectNode(id)}
                      className={cn(
                        'relative flex items-center gap-2.5 overflow-hidden rounded-2xl border px-3 py-3 text-left transition-colors duration-300',
                        isOn
                          ? 'border-emerald-400/35 bg-emerald-400/[0.07]'
                          : isConnecting
                            ? 'border-cyan-300/60 bg-cyan-300/[0.06]'
                            : selectedId === id
                              ? 'border-cyan-300/40 bg-white/[0.04]'
                              : can
                                ? 'border-white/10 bg-black/20 hover:border-sky-400/40'
                                : 'border-white/5 bg-black/10 opacity-50',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                          isOn
                            ? 'bg-emerald-400/15 text-emerald-300'
                            : isConnecting
                              ? 'bg-cyan-300/15 text-cyan-300'
                              : 'bg-white/8 text-white/50',
                        )}
                      >
                        {isConnecting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-semibold text-white">
                          {node.label}
                        </span>
                        <span
                          className={cn(
                            'block text-[9px] font-semibold uppercase tracking-[0.1em]',
                            isOn
                              ? 'text-emerald-400'
                              : isConnecting
                                ? 'text-cyan-300'
                                : 'text-white/30',
                          )}
                        >
                          {isOn ? 'Connected' : isConnecting ? 'Live' : can ? 'Ready' : 'Pending'}
                        </span>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Live mode overlay card */}
      <AnimatePresence>
        {connectingId ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-3 rounded-[1.5rem] border border-cyan-300/30 bg-[#08131d]/95 p-4 shadow-[0_0_40px_rgb(34_211_238_/_0.15)] backdrop-blur-xl"
          >
            <p className="text-xs font-semibold text-cyan-300">
              Connecting {journeyNodes[connectingId].label}…
            </p>
            <div className="mt-3 space-y-2.5">
              {connectionSteps.map((label, i) => {
                const active = i === connectingStep
                const doneStep = i < connectingStep
                return (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-[10px]">
                      <span
                        className={cn(
                          doneStep
                            ? 'text-emerald-400'
                            : active
                              ? 'text-white'
                              : 'text-white/25',
                        )}
                      >
                        {label}
                      </span>
                      {doneStep ? (
                        <span className="text-emerald-400">✓</span>
                      ) : null}
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        className={cn(
                          'h-full rounded-full',
                          doneStep ? 'bg-emerald-400' : 'bg-cyan-300',
                        )}
                        initial={{ width: 0 }}
                        animate={{
                          width: doneStep ? '100%' : active ? '100%' : '0%',
                        }}
                        transition={{ duration: active ? 0.55 : 0.2 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
