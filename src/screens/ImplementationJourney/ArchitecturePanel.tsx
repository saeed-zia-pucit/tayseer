import { motion } from 'framer-motion'
import { useImplementationJourney } from '@/app/implementationJourneyProvider'
import { journeyNodes } from '@/data/implementationJourney'
import type { JourneyNodeId } from '@/types/implementationJourney'
import { cn } from '@/lib/cn'

/** Radial layout positions (% of container) around core */
const positions: Record<JourneyNodeId, { x: number; y: number }> = {
  core: { x: 50, y: 50 },
  auth: { x: 20, y: 26 },
  kyc: { x: 16, y: 62 },
  aml: { x: 34, y: 84 },
  payments: { x: 80, y: 26 },
  cards: { x: 86, y: 56 },
  notifications: { x: 68, y: 84 },
  ai: { x: 52, y: 14 },
  analytics: { x: 32, y: 14 },
  crm: { x: 10, y: 44 },
  open_banking: { x: 90, y: 78 },
}

const orbitIds: JourneyNodeId[] = [
  'auth',
  'kyc',
  'aml',
  'payments',
  'cards',
  'notifications',
  'ai',
  'analytics',
  'crm',
  'open_banking',
]

export function ArchitecturePanel() {
  const { connected, selectedId, connectingId, connectNode, canConnect } =
    useImplementationJourney()

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 px-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Interactive Architecture
        </p>
        <p className="mt-1 text-sm text-white/40">
          Tap a node to bring it online
        </p>
      </div>

      <div className="relative min-h-[460px] flex-1 overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.02]">
        {/* Inner glow behind core */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgb(34 211 238 / 0.14), transparent 52%)',
          }}
        />

        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {orbitIds.map((id) => {
            const from = positions.core
            const to = positions[id]
            const isConnected = connected.has(id)
            const isConnecting = connectingId === id
            const isSelected = selectedId === id
            const lit = isConnected || isConnecting || isSelected

            return (
              <g key={id}>
                <line
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={
                    isConnecting
                      ? 'rgb(34 211 238 / 0.8)'
                      : isConnected
                        ? 'rgb(52 211 153 / 0.45)'
                        : isSelected
                          ? 'rgb(34 211 238 / 0.4)'
                          : 'rgb(255 255 255 / 0.06)'
                  }
                  strokeWidth={lit ? 1.5 : 1}
                  strokeDasharray={isConnected || isConnecting ? '0' : '3 7'}
                />
                {/* Fast particles while connecting */}
                {isConnecting ? (
                  <>
                    {[0, 0.45].map((delay) => (
                      <motion.circle
                        key={delay}
                        r="3.5"
                        fill="#22d3ee"
                        filter="url(#node-glow)"
                        initial={{ cx: `${from.x}%`, cy: `${from.y}%` }}
                        animate={{
                          cx: [`${from.x}%`, `${to.x}%`],
                          cy: [`${from.y}%`, `${to.y}%`],
                        }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          ease: 'linear',
                          delay,
                        }}
                      />
                    ))}
                  </>
                ) : null}
                {/* Slow ambient particles on connected lines */}
                {isConnected && !isConnecting ? (
                  <motion.circle
                    r="2.2"
                    fill="#34d399"
                    initial={{ cx: `${from.x}%`, cy: `${from.y}%` }}
                    animate={{
                      cx: [`${from.x}%`, `${to.x}%`, `${from.x}%`],
                      cy: [`${from.y}%`, `${to.y}%`, `${from.y}%`],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (orbitIds.indexOf(id) % 5) * 0.6,
                    }}
                  />
                ) : null}
              </g>
            )
          })}
        </svg>

        {(['core', ...orbitIds] as JourneyNodeId[]).map((id, idx) => {
          const node = journeyNodes[id]
          const pos = positions[id]
          const isCore = id === 'core'
          const isConnected = connected.has(id)
          const isConnecting = connectingId === id
          const isSelected = selectedId === id
          const unlocked = isCore || canConnect(id) || isConnected || isConnecting

          return (
            <motion.button
              key={id}
              type="button"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              animate={{
                y: [0, -5, 0],
                scale: isSelected || isConnecting ? 1.1 : 1,
              }}
              transition={{
                y: {
                  duration: 3.4 + (idx % 4) * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.2,
                },
                scale: { duration: 0.3 },
              }}
              whileHover={{ scale: isSelected ? 1.12 : 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => connectNode(id)}
              className={cn(
                'absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] border px-3.5 py-2.5 text-left backdrop-blur-xl transition-colors duration-300',
                // Base glass
                'bg-white/[0.06] shadow-[0_12px_32px_-12px_rgb(0_0_0_/_0.7)]',
                // Hierarchy
                isCore &&
                  'min-w-[8rem] border-cyan-300/40 bg-[#0a1622]/90 shadow-[0_0_44px_rgb(34_211_238_/_0.3)]',
                !isCore && isSelected
                  ? 'border-cyan-300/80 shadow-[0_0_36px_rgb(34_211_238_/_0.55)]'
                  : !isCore && isConnected
                    ? 'border-emerald-400/40 shadow-[0_0_20px_rgb(52_211_153_/_0.2)]'
                    : !isCore && unlocked
                      ? 'border-white/12 hover:border-sky-400/50'
                      : !isCore
                        ? 'border-white/5 opacity-30'
                        : '',
              )}
            >
              {/* Pulse ring on selected */}
              {(isSelected || isConnecting) && !isCore ? (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-[1.25rem] border border-cyan-300/60"
                  animate={{ opacity: [0.7, 0, 0.7], scale: [1, 1.18, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  aria-hidden
                />
              ) : null}

              <p
                className={cn(
                  'font-semibold text-white',
                  isCore ? 'text-sm' : 'text-xs',
                )}
              >
                {node.label}
              </p>
              <p
                className={cn(
                  'mt-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]',
                  isConnecting
                    ? 'text-cyan-300'
                    : isConnected
                      ? 'text-emerald-400'
                      : 'text-white/30',
                )}
              >
                {isCore
                  ? 'Platform core'
                  : isConnecting
                    ? 'Connecting…'
                    : isConnected
                      ? 'Online'
                      : unlocked
                        ? 'Ready'
                        : 'Locked'}
              </p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
