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
    gradient: 'from-[#0f766e] to-[#115e59]',
    soft: 'bg-[#e8f4f2]',
    text: 'text-[#0f766e]',
    chip: 'bg-[#ccfbf1] text-[#115e59]',
  },
  sand: {
    gradient: 'from-[#b45309] to-[#92400e]',
    soft: 'bg-[#fef3c7]',
    text: 'text-[#92400e]',
    chip: 'bg-[#fde68a] text-[#92400e]',
  },
  ocean: {
    gradient: 'from-[#0369a1] to-[#0c4a6e]',
    soft: 'bg-[#e0f2fe]',
    text: 'text-[#0369a1]',
    chip: 'bg-[#bae6fd] text-[#0c4a6e]',
  },
  midnight: {
    gradient: 'from-[#1e293b] to-[#0f172a]',
    soft: 'bg-[#e2e8f0]',
    text: 'text-[#1e293b]',
    chip: 'bg-[#cbd5e1] text-[#0f172a]',
  },
}
