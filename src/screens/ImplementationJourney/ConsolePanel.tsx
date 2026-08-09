import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TerminalSquare } from 'lucide-react'
import { useImplementationJourney } from '@/app/implementationJourneyProvider'

export function ConsolePanel() {
  const { logs } = useImplementationJourney()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [logs])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-[1.25rem] border border-white/8 bg-[#05090f]/90 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2">
        <TerminalSquare className="h-3.5 w-3.5 text-cyan-300/70" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          Deployment Console
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          live
        </span>
      </div>
      <div
        ref={scrollRef}
        className="h-24 overflow-y-auto px-4 py-2 font-mono text-[11px] leading-relaxed"
      >
        {logs.map((log) => (
          <motion.p
            key={log.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/60"
          >
            <span className="text-cyan-300/60">[{log.time}]</span>{' '}
            <span className="text-white/75">{log.message}</span>
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}
