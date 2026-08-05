import { AnimatePresence, motion } from 'framer-motion'

export function AnalyzingIndicator({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex items-center gap-2 text-xs font-medium text-lagoon"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lagoon-bright opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lagoon-bright" />
          </span>
          <span className="tracking-wide">
            Analyzing
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
            >
              …
            </motion.span>
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
