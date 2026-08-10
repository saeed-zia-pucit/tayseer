import type {
  MbukeAudience,
  MbukeCapability,
  MbukeChallenge,
  MbukeTheme,
} from '@/types/mbukeDemo'

export interface MbOption<T extends string> {
  value: T
  label: string
  hint?: string
}

export const mbukeAudienceOptions: MbOption<MbukeAudience>[] = [
  { value: 'bank', label: 'Bank', hint: 'Retail & digital banking' },
  { value: 'exchange', label: 'Exchange house', hint: 'FX & remittance' },
  { value: 'government', label: 'Government', hint: 'Citizen payments' },
  { value: 'telecom', label: 'Telecom', hint: 'Wallet & USSD reach' },
  { value: 'payment_gateway', label: 'Payment gateway', hint: 'Merchant & acquiring' },
]

export const mbukeChallengeOptions: MbOption<MbukeChallenge>[] = [
  {
    value: 'rural_reach',
    label: 'Rural / low connectivity',
    hint: 'USSD, SMS & agents',
  },
  {
    value: 'digital_wallet',
    label: 'Digital wallet launch',
    hint: 'P2P, bills & top-up',
  },
  {
    value: 'agent_network',
    label: 'Agent banking network',
    hint: 'Cash-in/out at scale',
  },
  {
    value: 'full_mobile_bank',
    label: 'Full mobile bank',
    hint: 'Onboarding to analytics',
  },
]

export const mbukeCapabilityOptions: MbOption<MbukeCapability>[] = [
  { value: 'onboarding', label: 'Digital onboarding', hint: 'User features' },
  { value: 'p2p', label: 'P2P transfers', hint: 'User features' },
  { value: 'bills', label: 'Bill pay & e-commerce', hint: 'User features' },
  { value: 'remittance', label: 'Remittance support', hint: 'User features' },
  { value: 'ussd', label: 'USSD / offline', hint: 'User features' },
  { value: 'agent_mgmt', label: 'Agent network management', hint: 'Operator' },
  {
    value: 'operator_dashboard',
    label: 'Operator dashboard',
    hint: 'Operator',
  },
  { value: 'analytics', label: 'Real-time analytics', hint: 'Operator' },
  { value: 'compliance', label: 'Compliance & reporting', hint: 'Operator' },
  { value: 'soft_pos', label: 'Soft POS', hint: 'Technical' },
  { value: 'multi_currency', label: 'Multi-currency', hint: 'Technical' },
  { value: 'fahim_ai', label: 'Fahim AI support', hint: 'AI-powered CX' },
]

export const mbukeThemeOptions: MbOption<MbukeTheme>[] = [
  { value: 'lagoon', label: 'Lagoon', hint: 'Teal banking' },
  { value: 'sand', label: 'Sand', hint: 'Warm GCC' },
  { value: 'ocean', label: 'Ocean', hint: 'Cool blue' },
  { value: 'midnight', label: 'Midnight', hint: 'Premium dark' },
]

export const mbukeStepMeta = [
  { id: 1, title: 'Who is taking this MBuke demo?', short: 'Audience' },
  { id: 2, title: 'What challenge are you solving?', short: 'Challenge' },
  { id: 3, title: 'Which MBuke capabilities should we tour?', short: 'Features' },
  { id: 4, title: 'Pick a white-label brand look', short: 'Brand' },
] as const

export const MBUKE_TOTAL_STEPS = 4

export const mbukeThemeStyles: Record<
  MbukeTheme,
  { gradient: string; soft: string; text: string; chip: string }
> = {
  lagoon: {
    gradient: 'from-[var(--brand-accent)] to-[var(--brand-bg-elevated)]',
    soft: 'bg-phone-chip',
    text: 'text-[var(--brand-accent)]',
    chip: 'bg-phone-chip text-phone-ink',
  },
  sand: {
    gradient: 'from-[var(--brand-accent-soft)] to-[var(--brand-bg-elevated)]',
    soft: 'bg-[#fce7f3]',
    text: 'text-[#9d174d]',
    chip: 'bg-[#fbcfe8] text-[#9d174d]',
  },
  ocean: {
    gradient: 'from-[var(--brand-accent-2)] to-[var(--brand-bg-deep)]',
    soft: 'bg-[#cffafe]',
    text: 'text-[#0e7490]',
    chip: 'bg-[#a5f3fc] text-[#155e75]',
  },
  midnight: {
    gradient: 'from-[var(--brand-bg-elevated)] to-[var(--brand-bg-deep)]',
    soft: 'bg-phone-chip',
    text: 'text-phone-ink',
    chip: 'bg-phone-ink/10 text-phone-ink',
  },
}

export const mbukeAdvantages = [
  'Unified platform — onboarding, payments, transfers, analytics',
  'Modular & scalable — deploy what you need now',
  'Seamless integration with existing systems',
  'Enterprise-grade security & observability',
  'White-label ready for your brand',
]
