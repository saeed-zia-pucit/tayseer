import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Loader2, Play, Terminal } from 'lucide-react'
import { useImplementationJourney } from '@/app/implementationJourneyProvider'
import { journeyNodes, sequenceSteps } from '@/data/implementationJourney'
import { cn } from '@/lib/cn'

const tabs = ['Overview', 'Endpoints', 'Example', 'Sequence'] as const
type Tab = (typeof tabs)[number]

export function ApiExplorerPanel() {
  const { selectedId, connectingId, connected } = useImplementationJourney()
  const [tab, setTab] = useState<Tab>('Overview')

  const node = selectedId ? journeyNodes[selectedId] : null
  const loading = Boolean(connectingId && connectingId === selectedId)

  useEffect(() => {
    setTab('Overview')
  }, [selectedId])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 px-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          Live API Explorer
        </p>
        <p className="mt-1 text-sm text-white/40">
          {node ? node.label : 'Select an integration to explore its API'}
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-[1.75rem] border border-white/8 bg-white/[0.02]">
        {!node ? (
          <EmptyState />
        ) : loading ? (
          <LoadingState label={node.label} />
        ) : (
          <>
            <div className="flex gap-1 border-b border-white/8 px-4 pt-3">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    'relative rounded-t-lg px-3 py-2 text-xs font-semibold transition-colors',
                    tab === t ? 'text-white' : 'text-white/40 hover:text-white/70',
                  )}
                >
                  {t}
                  {tab === t ? (
                    <motion.span
                      layoutId="api-tab-underline"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-cyan-300"
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${node.id}-${tab}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === 'Overview' ? <OverviewTab nodeId={node.id} /> : null}
                  {tab === 'Endpoints' ? <EndpointsTab nodeId={node.id} /> : null}
                  {tab === 'Example' ? <ExampleTab nodeId={node.id} /> : null}
                  {tab === 'Sequence' ? <SequenceTab /> : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <Playground live={connected.has(node.id)} />
          </>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <motion.div
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Terminal className="h-6 w-6 text-cyan-300/70" />
      </motion.div>
      <p className="text-sm font-medium text-white/60">Nothing selected yet</p>
      <p className="max-w-[220px] text-xs text-white/35">
        Pick any integration from the journey to open its live documentation.
      </p>
    </div>
  )
}

function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <Loader2 className="h-7 w-7 animate-spin text-cyan-300" />
      <p className="text-sm font-medium text-white/70">
        Loading {label} documentation…
      </p>
    </div>
  )
}

function OverviewTab({ nodeId }: { nodeId: keyof typeof journeyNodes }) {
  const node = journeyNodes[nodeId]
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-white/70">{node.purpose}</p>
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
          Supported operations
        </p>
        <div className="flex flex-wrap gap-1.5">
          {node.endpoints.map((e) => (
            <span
              key={e.path}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60"
            >
              {e.summary}
            </span>
          ))}
        </div>
      </div>
      <p className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-3 text-xs leading-relaxed text-cyan-100/80">
        {node.recommendation}
      </p>
    </div>
  )
}

function EndpointsTab({ nodeId }: { nodeId: keyof typeof journeyNodes }) {
  const node = journeyNodes[nodeId]
  return (
    <div className="space-y-2.5">
      {node.endpoints.map((e, i) => (
        <motion.div
          key={e.path}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -2 }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-3.5 py-3 hover:border-sky-400/40"
        >
          <span
            className={cn(
              'rounded-md px-2 py-0.5 font-mono text-[10px] font-bold',
              e.method === 'GET'
                ? 'bg-sky-400/15 text-sky-300'
                : 'bg-emerald-400/15 text-emerald-300',
            )}
          >
            {e.method}
          </span>
          <span className="flex-1 truncate font-mono text-xs text-white/80">
            {e.path}
          </span>
          <span className="hidden text-[11px] text-white/35 sm:block">
            {e.summary}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function ExampleTab({ nodeId }: { nodeId: keyof typeof journeyNodes }) {
  const node = journeyNodes[nodeId]
  return (
    <div className="space-y-3">
      <TypedCodeBlock key={`${nodeId}-req`} title="Request" code={node.requestExample} />
      <div className="flex justify-center text-white/25">↓</div>
      <TypedCodeBlock
        key={`${nodeId}-res`}
        title="Response"
        code={node.responseExample}
        delayMs={600}
      />
    </div>
  )
}

/** Code block that types itself in with a copy button */
function TypedCodeBlock({
  title,
  code,
  delayMs = 0,
}: {
  title: string
  code: string
  delayMs?: number
}) {
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCount(0)
    let i = 0
    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 3
        setCount(i)
        if (i >= code.length && interval) window.clearInterval(interval)
      }, 12)
    }, delayMs)
    return () => {
      window.clearTimeout(start)
      if (interval) window.clearInterval(interval)
    }
  }, [code, delayMs])

  const shown = code.slice(0, count)

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#060b12]">
      <div className="flex items-center justify-between border-b border-white/8 px-3.5 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
          {title}
        </span>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1500)
          }}
          className="flex items-center gap-1 text-[10px] text-white/40 transition-colors hover:text-white"
        >
          {copied ? (
            <Check className="h-3 w-3 text-emerald-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="min-h-[72px] whitespace-pre-wrap p-3.5 font-mono text-[11px] leading-relaxed text-cyan-100/90">
        {shown}
        {count < code.length ? (
          <span className="animate-pulse text-cyan-300">▍</span>
        ) : null}
      </pre>
    </div>
  )
}

function SequenceTab() {
  return (
    <div className="flex flex-col items-center py-2">
      {sequenceSteps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.25 }}
            className={cn(
              'rounded-xl border px-4 py-2 text-xs font-semibold',
              i === sequenceSteps.length - 1
                ? 'border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-300'
                : 'border-white/12 bg-white/[0.04] text-white/80',
            )}
          >
            {step}
          </motion.div>
          {i < sequenceSteps.length - 1 ? (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: i * 0.25 + 0.12, duration: 0.2 }}
              className="my-0.5 h-5 w-px origin-top bg-gradient-to-b from-cyan-300/70 to-cyan-300/20"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}

function Playground({ live }: { live: boolean }) {
  const [amount, setAmount] = useState('500')
  const [currency, setCurrency] = useState('SAR')
  const [customer, setCustomer] = useState('CUS_102')
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')

  const response = useMemo(
    () =>
      JSON.stringify(
        {
          status: 'SUCCESS',
          transactionId: `TXN_${Math.floor(300 + Math.random() * 600)}`,
          amount: Number(amount) || 0,
          currency,
        },
        null,
        2,
      ),
    // Regenerate only when a new request is sent
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state === 'done'],
  )

  const send = () => {
    if (state === 'sending') return
    setState('sending')
    window.setTimeout(() => setState('done'), 1200)
  }

  return (
    <div className="border-t border-white/8 p-4">
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
        API Playground
      </p>
      <div className="grid grid-cols-3 gap-2">
        <PlaygroundField label="Amount" value={amount} onChange={setAmount} />
        <PlaygroundField label="Currency" value={currency} onChange={setCurrency} />
        <PlaygroundField label="Customer" value={customer} onChange={setCustomer} />
      </div>
      <motion.button
        type="button"
        onClick={send}
        disabled={!live || state === 'sending'}
        whileHover={live ? { scale: 1.01 } : undefined}
        whileTap={live ? { scale: 0.98 } : undefined}
        className={cn(
          'mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-colors',
          live
            ? 'bg-cyan-300 text-[#04222b] hover:bg-cyan-200'
            : 'cursor-not-allowed bg-white/8 text-white/30',
        )}
      >
        {state === 'sending' ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5" />
            {live ? 'Send Request' : 'Connect integration first'}
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {state === 'done' ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 rounded-xl border border-emerald-400/25 bg-[#060b12] p-3">
              <p className="mb-1.5 font-mono text-[10px] font-bold text-emerald-400">
                200 OK
              </p>
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-emerald-100/80">
                {response}
              </pre>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function PlaygroundField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 font-mono text-[11px] text-white outline-none transition-colors focus:border-cyan-300/50"
      />
    </label>
  )
}
