export type MbukeAudience =
  | 'bank'
  | 'exchange'
  | 'government'
  | 'telecom'
  | 'payment_gateway'

export type MbukeChallenge =
  | 'rural_reach'
  | 'digital_wallet'
  | 'agent_network'
  | 'full_mobile_bank'

export type MbukeCapability =
  | 'onboarding'
  | 'p2p'
  | 'bills'
  | 'remittance'
  | 'ussd'
  | 'agent_mgmt'
  | 'operator_dashboard'
  | 'analytics'
  | 'soft_pos'
  | 'multi_currency'
  | 'fahim_ai'
  | 'compliance'

export type MbukeTheme = 'lagoon' | 'sand' | 'ocean' | 'midnight'

export interface MbukeDemoAnswers {
  audience: MbukeAudience | null
  challenge: MbukeChallenge | null
  capabilities: MbukeCapability[]
  theme: MbukeTheme | null
}

export interface MbukeModule {
  id: string
  name: string
  short: string
  bucket: 'user' | 'operator' | 'technical'
}

export interface MbukeDemoResult {
  appName: string
  tagline: string
  audienceLabel: string
  challengeLabel: string
  theme: MbukeTheme
  modules: MbukeModule[]
  advantages: string[]
  stack: string[]
  caseStudy: {
    title: string
    story: string
    metrics: { value: string; label: string }[]
  }
}
