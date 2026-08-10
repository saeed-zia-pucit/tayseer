import type {
  WhiteLabelAudience,
  WhiteLabelBankType,
  WhiteLabelFeature,
  WhiteLabelLanguage,
  WhiteLabelTheme,
} from '@/types/whiteLabel'

export interface WlOption<T extends string> {
  value: T
  label: string
  hint?: string
}

export const wlBankTypeOptions: WlOption<WhiteLabelBankType>[] = [
  { value: 'retail_bank', label: 'Retail Bank', hint: 'Full-service consumer banking' },
  { value: 'islamic_bank', label: 'Islamic Bank', hint: 'Sharia-compliant journeys' },
  { value: 'neo_bank', label: 'Neo Bank', hint: 'Digital-only challenger' },
  { value: 'wallet_first', label: 'Wallet-first', hint: 'Payments & P2P first' },
  { value: 'microfinance', label: 'Microfinance', hint: 'Agents & small credit' },
]

export const wlAudienceOptions: WlOption<WhiteLabelAudience>[] = [
  { value: 'retail', label: 'Retail customers' },
  { value: 'youth', label: 'Youth / students' },
  { value: 'expats', label: 'Expats / remitters' },
  { value: 'sme', label: 'SME owners' },
  { value: 'agents', label: 'Agent network' },
]

export const wlFeatureOptions: WlOption<WhiteLabelFeature>[] = [
  { value: 'accounts', label: 'Accounts & balance' },
  { value: 'cards', label: 'Debit / credit cards' },
  { value: 'transfers', label: 'P2P & bank transfers' },
  { value: 'bills', label: 'Bill payments' },
  { value: 'loans', label: 'Loans & credit' },
  { value: 'investments', label: 'Savings / invest' },
  { value: 'ai_support', label: 'AI chat support' },
  { value: 'biometrics', label: 'Biometric login' },
  { value: 'soft_pos', label: 'Soft POS' },
  { value: 'rewards', label: 'Rewards' },
  { value: 'multi_currency', label: 'Multi-currency' },
  { value: 'arabic_ux', label: 'Arabic UX' },
]

export const wlThemeOptions: WlOption<WhiteLabelTheme>[] = [
  { value: 'lagoon', label: 'Lagoon', hint: 'Teal banking' },
  { value: 'sand', label: 'Sand', hint: 'Warm GCC' },
  { value: 'ocean', label: 'Ocean', hint: 'Cool blue' },
  { value: 'midnight', label: 'Midnight', hint: 'Premium dark' },
]

export const wlLanguageOptions: WlOption<WhiteLabelLanguage>[] = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
  { value: 'bilingual', label: 'EN + AR' },
]

export const wlStepMeta = [
  { id: 1, title: 'What white-label bank are you launching?', short: 'Bank' },
  { id: 2, title: 'Who is the primary customer?', short: 'Audience' },
  { id: 3, title: 'Which app features do you need?', short: 'Features' },
  { id: 4, title: 'Brand theme & language', short: 'Brand' },
] as const

export const WL_TOTAL_STEPS = 4

export const themeStyles: Record<
  WhiteLabelTheme,
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
