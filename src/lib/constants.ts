import type {
  Audience,
  Capability,
  CountryCode,
  Deployment,
  FinderAnswers,
  Priority,
  ProductType,
  RegionScope,
} from '@/types'

export const emptyFinderAnswers = (): FinderAnswers => ({
  productType: null,
  audience: null,
  regionScope: null,
  countries: [],
  capabilities: [],
  deployment: null,
  priority: null,
})

export const routes = {
  home: '/',
  finder: '/finder',
  finderPhone: '/finder/phone',
  whiteLabel: '/white-label',
  whiteLabelResults: '/white-label/results',
  mbukeDemo: '/mbuke-demo',
  mbukeDemoResults: '/mbuke-demo/results',
  coreIntegrations: '/core-integrations',
  coreIntegrationsResults: '/core-integrations/results',
  implementationJourney: '/implementation-journey',
  results: '/results',
} as const

export type AppRoute = (typeof routes)[keyof typeof routes]

export const productTypeLabels: Record<ProductType, string> = {
  digital_bank: 'Digital Bank',
  wallet: 'Wallet',
  core_banking: 'Core Banking',
  lending: 'Lending Platform',
  remittance: 'Remittance',
  islamic: 'Islamic Banking',
  investment: 'Investment Platform',
  merchant: 'Merchant Platform',
}

export const audienceLabels: Record<Audience, string> = {
  retail: 'Retail',
  business: 'Business',
  sme: 'SME',
  corporate: 'Corporate',
  government: 'Government',
  students: 'Students',
  agents: 'Agents',
}

export const regionScopeLabels: Record<RegionScope, string> = {
  single: 'Single Country',
  multiple: 'Multiple Countries',
  global: 'Global',
}

export const countryLabels: Record<CountryCode, string> = {
  SA: 'Saudi Arabia',
  AE: 'UAE',
  PK: 'Pakistan',
  QA: 'Qatar',
  BH: 'Bahrain',
  KW: 'Kuwait',
  OM: 'Oman',
}

export const capabilityLabels: Record<Capability, string> = {
  digital_onboarding: 'Digital Onboarding',
  kyc: 'KYC',
  aml: 'AML',
  debit_cards: 'Debit Cards',
  credit_cards: 'Credit Cards',
  qr_payments: 'QR Payments',
  bill_payments: 'Bill Payments',
  intl_transfers: 'International Transfers',
  savings: 'Savings',
  loans: 'Loans',
  ai_chatbot: 'AI Chatbot',
  analytics: 'Analytics',
  notifications: 'Notifications',
  rewards: 'Rewards',
  multi_language: 'Multi-language',
}

export const deploymentLabels: Record<Deployment, string> = {
  cloud: 'Cloud',
  on_prem: 'On-prem',
  hybrid: 'Hybrid',
}

export const priorityLabels: Record<Priority, string> = {
  speed: 'Speed to market',
  cost: 'Cost efficiency',
  compliance: 'Compliance',
  innovation: 'Innovation',
}

export const TOTAL_FINDER_STEPS = 4
