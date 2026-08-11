import { AnimatePresence, motion } from 'framer-motion'
import { AnalyzingIndicator } from '@/components/finder/AnalyzingIndicator'
import { buildCoreResult } from '@/engine/coreIntegrations'
import type {
  ArchitectureNode,
  CoreIntegrationsAnswers,
} from '@/types/coreIntegrations'
import { cn } from '@/lib/cn'

interface ArchitectureCanvasProps {
  answers: CoreIntegrationsAnswers
  analyzing: boolean
  /** Stronger motion for final screen */
  animated?: boolean
}

/** Layer chrome — dark elevated tiles + white text for lab contrast. */
const layerStyle: Record<
  ArchitectureNode['layer'],
  { ring: string; bg: string; label: string }
> = {
  core: {
    ring: 'ring-[color-mix(in_srgb,var(--brand-accent)_50%,transparent)]',
    bg: 'bg-[#222222] text-white',
    label: 'Core',
  },
  channel: {
    ring: 'ring-[color-mix(in_srgb,var(--brand-accent-2)_45%,transparent)]',
    bg: 'bg-[#222222] text-white',
    label: 'Channel',
  },
  rail: {
    ring: 'ring-white/20',
    bg: 'bg-[#1a1a1a] text-white',
    label: 'Rail',
  },
  risk: {
    ring: 'ring-[color-mix(in_srgb,var(--brand-accent-soft)_40%,transparent)]',
    bg: 'bg-[#222222] text-white',
    label: 'Risk',
  },
  legacy: {
    ring: 'ring-white/15',
    bg: 'bg-[#1a1a1a] text-[#c8c8c8]',
    label: 'Legacy',
  },
}

function NodeCard({
  node,
  animated,
  index,
}: {
  node: ArchitectureNode
  animated?: boolean
  index: number
}) {
  const style = layerStyle[node.layer]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        animated
          ? {
              opacity: 1,
              scale: 1,
              y: [0, -4, 0],
            }
          : { opacity: 1, scale: 1 }
      }
      exit={{ opacity: 0, scale: 0.92 }}
      transition={
        animated
          ? {
              y: { duration: 2.4, repeat: Infinity, delay: index * 0.15 },
              opacity: { duration: 0.3 },
            }
          : { duration: 0.28 }
      }
      className={cn(
        'relative rounded-2xl px-3 py-3 text-center shadow-sm ring-1',
        style.bg,
        style.ring,
        node.layer === 'core' && 'px-4 py-4 shadow-lift',
      )}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a8a8a8]">
        {style.label}
      </p>
      <p
        className={cn(
          'mt-1 font-semibold text-white',
          node.layer === 'core' ? 'text-sm' : 'text-xs',
        )}
      >
        {node.label}
      </p>
      <p className="mt-1 text-[9px] font-medium capitalize text-[#a8a8a8]">
        {node.mode}
      </p>
      {animated && node.layer === 'core' ? (
        <span className="absolute -end-1 -top-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lagoon-bright opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lagoon-bright" />
        </span>
      ) : null}
    </motion.div>
  )
}

export function ArchitectureCanvas({
  answers,
  analyzing,
  animated = false,
}: ArchitectureCanvasProps) {
  const result = buildCoreResult(answers)
  const nodes = result?.nodes ?? []
  const core = nodes.find((n) => n.layer === 'core')
  const satellites = nodes.filter((n) => n.layer !== 'core')
  const channels = satellites.filter((n) => n.layer === 'channel')
  const rails = satellites.filter((n) => n.layer === 'rail')
  const risk = satellites.filter((n) => n.layer === 'risk')
  const legacy = satellites.filter((n) => n.layer === 'legacy')

  return (
    <aside className={animated ? '' : 'lg:sticky lg:top-6'}>
      {!animated ? (
        <div className="mb-4 flex items-center justify-between gap-3 px-1">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">
              Architecture canvas
            </p>
            <p className="mt-1 text-sm font-medium text-[#a8a8a8]">
              Core & integrations lighting up
            </p>
          </div>
          <AnalyzingIndicator show={analyzing} />
        </div>
      ) : null}

      <div className="brand-aside !p-5 md:!p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lagoon">
              {result?.title ?? 'Awaiting goal'}
            </p>
            <p className="mt-1 text-xs text-[#a8a8a8]">
              {answers.style
                ? `${result?.styleLabel ?? ''} pattern`
                : 'Select integrations to connect'}
            </p>
          </div>
          {animated ? (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live topology
            </span>
          ) : null}
        </div>

        <div className="relative min-h-[320px] rounded-2xl bg-black/40 p-4 ring-1 ring-white/10">
          {animated && satellites.length > 0 ? (
            <motion.div
              className="pointer-events-none absolute inset-8 rounded-full border border-dashed border-lagoon/30"
              animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3.2, repeat: Infinity }}
              aria-hidden
            />
          ) : null}

          <div className="relative z-10 grid gap-4">
            {channels.length > 0 ? (
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a8a8a8]">
                  Channels
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {channels.map((n, i) => (
                      <NodeCard
                        key={n.id}
                        node={n}
                        animated={animated}
                        index={i}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col items-center gap-2 py-1">
              {animated && (channels.length > 0 || satellites.length > 0) ? (
                <motion.div
                  className="h-6 w-px bg-gradient-to-b from-lagoon/10 via-lagoon/70 to-lagoon/10"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              ) : (
                <div className="h-4 w-px bg-white/20" />
              )}

              {core ? (
                <div className="w-full max-w-[220px]">
                  <NodeCard node={core} animated={animated} index={0} />
                </div>
              ) : (
                <div className="w-full max-w-[220px] rounded-2xl border border-dashed border-white/20 px-4 py-6 text-center text-xs text-[#a8a8a8]">
                  Pick a core goal to place Tayseer Core
                </div>
              )}

              {animated && satellites.length > 0 ? (
                <motion.div
                  className="h-6 w-px bg-gradient-to-b from-lagoon/10 via-lagoon/70 to-lagoon/10"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 }}
                />
              ) : satellites.length > 0 ? (
                <div className="h-4 w-px bg-white/20" />
              ) : null}
            </div>

            {(rails.length > 0 || risk.length > 0) && (
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a8a8a8]">
                  Rails & risk
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {[...rails, ...risk].map((n, i) => (
                      <NodeCard
                        key={n.id}
                        node={n}
                        animated={animated}
                        index={i + 2}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {legacy.length > 0 ? (
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a8a8a8]">
                  Legacy bridges
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence mode="popLayout">
                    {legacy.map((n, i) => (
                      <NodeCard
                        key={n.id}
                        node={n}
                        animated={animated}
                        index={i + 4}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ) : null}

            {!answers.goal && satellites.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#a8a8a8]">
                Answer questions to assemble your integration map.
              </p>
            ) : null}
          </div>
        </div>

        {result && answers.integrations.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {result.nodes
              .filter((n) => n.id !== 'core')
              .slice(0, 6)
              .map((n) => (
                <span
                  key={n.id}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white ring-1 ring-white/15"
                >
                  {n.label} · {n.mode}
                </span>
              ))}
          </div>
        ) : null}
      </div>
    </aside>
  )
}
