import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ChatRole = 'user' | 'assistant' | 'system'

type ScriptBeat =
  | { kind: 'pause'; ms: number }
  | { kind: 'user'; text: string }
  | { kind: 'assistant'; text: string }
  | { kind: 'code'; filename: string; code: string }
  | { kind: 'status'; text: string }

type VisibleMessage = {
  id: string
  role: ChatRole
  text: string
  streaming?: boolean
}

const SCRIPT: ScriptBeat[] = [
  { kind: 'pause', ms: 600 },
  { kind: 'status', text: 'Fahim is ready' },
  { kind: 'pause', ms: 400 },
  {
    kind: 'user',
    text: 'How should I validate an IBAN for Saudi accounts in TypeScript?',
  },
  { kind: 'pause', ms: 500 },
  {
    kind: 'assistant',
    text:
      'Use the ISO 13616 mod-97 check after normalizing the string. For KSA, expect country code SA and a length of 24 characters. I can draft a small utility next.',
  },
  { kind: 'pause', ms: 900 },
  {
    kind: 'user',
    text: 'Write that as a reusable function with clear errors.',
  },
  { kind: 'pause', ms: 450 },
  { kind: 'status', text: 'Fahim is writing code…' },
  {
    kind: 'code',
    filename: 'iban.ts',
    code: `export function isValidIban(raw: string): boolean {
  const iban = raw.replace(/\\s+/g, '').toUpperCase()

  if (!/^SA\\d{22}$/.test(iban)) {
    throw new Error('Expected a Saudi IBAN (SA + 22 digits)')
  }

  const rearranged = iban.slice(4) + iban.slice(0, 4)
  const expanded = rearranged.replace(/[A-Z]/g, (ch) =>
    String(ch.charCodeAt(0) - 55),
  )

  return mod97(expanded) === 1
}

function mod97(value: string): number {
  let checksum = 0
  for (const digit of value) {
    checksum = (checksum * 10 + Number(digit)) % 97
  }
  return checksum
}
`,
  },
  { kind: 'pause', ms: 700 },
  {
    kind: 'assistant',
    text:
      'Done. `isValidIban` normalizes input, enforces the SA length, and runs the mod-97 check. Want tests or Arabic error messages next?',
  },
  { kind: 'pause', ms: 2200 },
]

function typeDelay(char: string) {
  if (char === '\n') return 28
  if (char === ' ') return 18
  return 12 + Math.floor(Math.random() * 18)
}

/**
 * Hardcoded Fahim AI code-editor demo — auto-plays a chat + code typing
 * sequence. Users watch; they do not type.
 */
export function FahimAiEditorDemo() {
  const [messages, setMessages] = useState<VisibleMessage[]>([
    {
      id: 'sys-0',
      role: 'system',
      text: 'Session started · Fahim AI code editor',
    },
  ])
  const [composer, setComposer] = useState('')
  const [composerBusy, setComposerBusy] = useState(false)
  const [filename, setFilename] = useState('untitled.ts')
  const [code, setCode] = useState('// Fahim will write here…\n')
  const [status, setStatus] = useState('Idle')
  const [playing, setPlaying] = useState(true)
  const [cycle, setCycle] = useState(0)
  const chatRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLPreElement>(null)
  const cancelled = useRef(false)

  useEffect(() => {
    cancelled.current = false

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const typeInto = async (
      full: string,
      onTick: (partial: string) => void,
      speed = 1,
    ) => {
      let out = ''
      for (const ch of full) {
        if (cancelled.current) return
        out += ch
        onTick(out)
        await sleep(typeDelay(ch) * speed)
      }
    }

    const run = async () => {
      setMessages([
        {
          id: `sys-${cycle}`,
          role: 'system',
          text: 'Session started · Fahim AI code editor',
        },
      ])
      setComposer('')
      setComposerBusy(false)
      setFilename('untitled.ts')
      setCode('// Fahim will write here…\n')
      setStatus('Idle')
      setPlaying(true)

      let msgCount = 0

      for (const beat of SCRIPT) {
        if (cancelled.current) return

        if (beat.kind === 'pause') {
          await sleep(beat.ms)
          continue
        }

        if (beat.kind === 'status') {
          setStatus(beat.text)
          continue
        }

        if (beat.kind === 'user') {
          setComposerBusy(true)
          setStatus('Developer is typing…')
          await typeInto(beat.text, setComposer, 1.15)
          if (cancelled.current) return
          await sleep(280)
          const id = `u-${cycle}-${msgCount++}`
          setMessages((prev) => [
            ...prev,
            { id, role: 'user', text: beat.text },
          ])
          setComposer('')
          setComposerBusy(false)
          setStatus('Fahim is thinking…')
          continue
        }

        if (beat.kind === 'assistant') {
          const id = `a-${cycle}-${msgCount++}`
          setMessages((prev) => [
            ...prev,
            { id, role: 'assistant', text: '', streaming: true },
          ])
          setStatus('Fahim is responding…')
          await typeInto(
            beat.text,
            (partial) => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === id ? { ...m, text: partial } : m,
                ),
              )
            },
            0.85,
          )
          if (cancelled.current) return
          setMessages((prev) =>
            prev.map((m) =>
              m.id === id ? { ...m, streaming: false } : m,
            ),
          )
          setStatus('Fahim is ready')
          continue
        }

        if (beat.kind === 'code') {
          setFilename(beat.filename)
          setCode('')
          setStatus(`Writing ${beat.filename}…`)
          const id = `a-${cycle}-${msgCount++}`
          setMessages((prev) => [
            ...prev,
            {
              id,
              role: 'assistant',
              text: `Creating \`${beat.filename}\`…`,
              streaming: true,
            },
          ])
          await typeInto(beat.code, setCode, 0.55)
          if (cancelled.current) return
          setMessages((prev) =>
            prev.map((m) =>
              m.id === id
                ? {
                    ...m,
                    text: `Created \`${beat.filename}\` with IBAN validation helpers.`,
                    streaming: false,
                  }
                : m,
            ),
          )
          setStatus('Code ready')
        }
      }

      if (!cancelled.current) {
        setPlaying(false)
        setStatus('Demo complete · replaying shortly')
        await sleep(2800)
        if (!cancelled.current) setCycle((c) => c + 1)
      }
    }

    void run()
    return () => {
      cancelled.current = true
    }
  }, [cycle])

  useEffect(() => {
    const el = chatRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, composer])

  useEffect(() => {
    const el = codeRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [code])

  return (
    <div className="mt-10 overflow-hidden rounded-[1.75rem] ring-1 ring-white/12">
      <div
        className="border-b border-white/10 px-5 py-3.5 md:px-6"
        style={{
          background:
            'linear-gradient(120deg, rgb(var(--brand-accent-2-rgb) / 0.18), var(--brand-bg-deep) 50%, var(--brand-bg-elevated))',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon-bright">
              Fahim AI · live editor
            </p>
            <p className="mt-1 text-sm text-mist/70">
              Auto-playing coding session — watch the conversation and generated
              file.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-mist/80 ring-1 ring-white/15">
              <span
                className={`h-1.5 w-1.5 rounded-full ${playing ? 'animate-pulse bg-lagoon-bright' : 'bg-mist/40'}`}
              />
              {status}
            </span>
            <button
              type="button"
              onClick={() => setCycle((c) => c + 1)}
              className="rounded-full bg-mist px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-void hover:bg-white"
            >
              Replay
            </button>
          </div>
        </div>
      </div>

      <div className="grid min-h-[520px] lg:grid-cols-[1.05fr_1fr]">
        {/* Chat pane */}
        <div className="flex min-h-[280px] flex-col border-b border-white/10 bg-void/70 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lagoon-bright/20 text-[10px] font-bold text-lagoon-bright">
              F
            </span>
            <div>
              <p className="text-xs font-semibold text-mist">Fahim chat</p>
              <p className="text-[10px] text-mist/45">AI code editor assistant</p>
            </div>
          </div>

          <div
            ref={chatRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={
                    m.role === 'user'
                      ? 'ml-auto max-w-[88%]'
                      : m.role === 'system'
                        ? 'mx-auto max-w-[92%]'
                        : 'mr-auto max-w-[90%]'
                  }
                >
                  <div
                    className={
                      m.role === 'user'
                        ? 'rounded-2xl rounded-br-md bg-lagoon/35 px-3.5 py-2.5 text-sm leading-relaxed text-mist ring-1 ring-lagoon/30'
                        : m.role === 'system'
                          ? 'rounded-full bg-white/5 px-3 py-1.5 text-center text-[11px] text-mist/50'
                          : 'rounded-2xl rounded-bl-md bg-white/8 px-3.5 py-2.5 text-sm leading-relaxed text-mist/90 ring-1 ring-white/10'
                    }
                  >
                    {m.text}
                    {m.streaming ? (
                      <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-lagoon-bright align-middle" />
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="border-t border-white/8 px-4 py-3">
            <div className="flex items-end gap-2 rounded-2xl bg-white/5 px-3 py-2.5 ring-1 ring-white/10">
              <p className="min-h-[1.4rem] flex-1 font-mono text-xs leading-relaxed text-mist/85">
                {composer || (
                  <span className="text-mist/35">
                    {composerBusy ? '' : 'Message Fahim…'}
                  </span>
                )}
                {composerBusy ? (
                  <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-mist align-middle" />
                ) : null}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
                  composerBusy
                    ? 'bg-white/10 text-mist/40'
                    : 'bg-lagoon-bright/20 text-lagoon-bright'
                }`}
              >
                Send
              </span>
            </div>
            <p className="mt-2 text-center text-[10px] text-mist/35">
              Demonstration only — input is automated
            </p>
          </div>
        </div>

        {/* Editor pane */}
        <div className="flex min-h-[280px] flex-col bg-[#0d0818]">
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
            <div className="flex gap-1.5 px-1" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              <span className="text-[10px] font-semibold text-lagoon-bright">
                TS
              </span>
              <span className="text-[11px] font-medium text-mist/80">
                {filename}
              </span>
            </div>
            <span className="ms-auto text-[10px] font-medium text-mist/40">
              Fahim · write
            </span>
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div
              className="select-none border-e border-white/5 px-2 py-3 text-right font-mono text-[10px] leading-5 text-mist/25"
              aria-hidden
            >
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre
              ref={codeRef}
              className="flex-1 overflow-auto px-3 py-3 font-mono text-[11px] leading-5 text-[#d6c9ff] sm:text-xs"
            >
              <code>
                {code}
                {status.includes('Writing') ? (
                  <span className="inline-block h-3.5 w-1.5 animate-pulse bg-lagoon-bright align-middle" />
                ) : null}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
