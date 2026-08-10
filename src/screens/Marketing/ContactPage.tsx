import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { routes } from '@/lib/constants'

const steps = [
  {
    bot: 'Hi — I’m Tayseer’s guide. What best describes your organisation?',
    options: ['Bank / FI', 'Fintech', 'Telecom / Wallet', 'Enterprise'],
  },
  {
    bot: 'What are you looking to explore first?',
    options: ['Core banking', 'Mobile / MBuke', 'AI / Fahim', 'Managed services'],
  },
  {
    bot: 'How soon are you hoping to start a conversation?',
    options: ['This week', 'This month', 'Exploring only'],
  },
] as const

export function ContactPage() {
  const [step, setStep] = useState(0)
  const [log, setLog] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: steps[0].bot },
  ])

  const pick = (opt: string) => {
    const next = step + 1
    const msgs: { role: 'bot' | 'user'; text: string }[] = [
      ...log,
      { role: 'user', text: opt },
    ]
    if (next < steps.length) {
      msgs.push({ role: 'bot', text: steps[next].bot })
      setStep(next)
    } else {
      msgs.push({
        role: 'bot',
        text: 'Thank you. Reach us at info@tayseer.me — or book a product walkthrough from the lab.',
      })
      setStep(steps.length)
    }
    setLog(msgs)
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface text-ink">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 50% -10%, rgb(var(--brand-accent-rgb) / 0.26), transparent 55%),
            radial-gradient(ellipse 45% 35% at 100% 70%, rgb(var(--brand-accent-2-rgb) / 0.18), transparent 50%),
            linear-gradient(165deg, var(--brand-bg-deep), var(--brand-bg) 48%, var(--brand-bg-elevated))
          `,
        }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="max-w-lg">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-bright">
            Connect
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Tell us about your business
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            An AI-guided conversation — no cluttered forms. Prefer email?
            We&apos;re at{' '}
            <a
              href="mailto:info@tayseer.me"
              className="font-semibold text-ink underline-offset-4 hover:underline"
            >
              info@tayseer.me
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={routes.products}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-white/15 hover:bg-white/5"
            >
              Browse products
            </Link>
            <Link
              to={routes.experiments}
              className="rounded-full bg-lagoon px-5 py-2.5 text-sm font-semibold text-mist shadow-lift hover:bg-lagoon-bright"
            >
              Open the lab
            </Link>
          </div>
        </section>

        <div className="rounded-2xl bg-void/45 p-5 ring-1 ring-white/12 sm:p-6">
          <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
            {log.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user' ? 'ml-auto' : ''
                }`}
                style={{
                  background:
                    m.role === 'user'
                      ? 'color-mix(in srgb, var(--brand-slide-1) 38%, transparent)'
                      : 'color-mix(in srgb, var(--brand-slide-2) 22%, transparent)',
                }}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            {step < steps.length
              ? steps[step].options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => pick(o)}
                    className="rounded-full px-3.5 py-2 text-xs font-semibold text-ink ring-1 ring-white/15 transition hover:bg-white/8"
                  >
                    {o}
                  </button>
                ))
              : (
                <a
                  href="mailto:info@tayseer.me"
                  className="rounded-full bg-lagoon px-4 py-2 text-xs font-semibold text-mist shadow-lift hover:bg-lagoon-bright"
                >
                  Email info@tayseer.me
                </a>
              )}
          </div>
        </div>
      </main>
    </div>
  )
}
