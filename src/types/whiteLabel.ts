export type WhiteLabelBankType =
  | 'retail_bank'
  | 'islamic_bank'
  | 'neo_bank'
  | 'wallet_first'
  | 'microfinance'

export type WhiteLabelAudience =
  | 'retail'
  | 'youth'
  | 'expats'
  | 'sme'
  | 'agents'

export type WhiteLabelFeature =
  | 'accounts'
  | 'cards'
  | 'transfers'
  | 'bills'
  | 'loans'
  | 'investments'
  | 'ai_support'
  | 'biometrics'
  | 'soft_pos'
  | 'rewards'
  | 'multi_currency'
  | 'arabic_ux'

export type WhiteLabelTheme = 'lagoon' | 'sand' | 'ocean' | 'midnight'

export type WhiteLabelLanguage = 'en' | 'ar' | 'bilingual'

export interface WhiteLabelAnswers {
  bankType: WhiteLabelBankType | null
  audience: WhiteLabelAudience | null
  features: WhiteLabelFeature[]
  theme: WhiteLabelTheme | null
  language: WhiteLabelLanguage | null
}

export interface WhiteLabelModule {
  id: string
  name: string
  short: string
}

export interface WhiteLabelResult {
  appName: string
  tagline: string
  theme: WhiteLabelTheme
  language: WhiteLabelLanguage
  modules: WhiteLabelModule[]
  stack: string[]
  timelineLabel: string
}
