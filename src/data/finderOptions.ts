import type {
  Audience,
  Capability,
  CountryCode,
  Deployment,
  Priority,
  ProductType,
  RegionScope,
} from '@/types'

export interface OptionItem<T extends string> {
  value: T
  label: string
  hint?: string
}

export const productTypeOptions: OptionItem<ProductType>[] = [
  { value: 'digital_bank', label: 'Digital Bank', hint: 'Full-stack retail platform' },
  { value: 'wallet', label: 'Wallet', hint: 'Mobile money & payments' },
  { value: 'core_banking', label: 'Core Banking', hint: 'Ledger & products' },
  { value: 'lending', label: 'Lending Platform', hint: 'Credit & origination' },
  { value: 'remittance', label: 'Remittance', hint: 'Cross-border transfers' },
  { value: 'islamic', label: 'Islamic Banking', hint: 'Sharia-compliant' },
  { value: 'investment', label: 'Investment Platform', hint: 'Wealth & portfolios' },
  { value: 'merchant', label: 'Merchant Platform', hint: 'Accepting & Soft POS' },
]

export const audienceOptions: OptionItem<Audience>[] = [
  { value: 'retail', label: 'Retail' },
  { value: 'business', label: 'Business' },
  { value: 'sme', label: 'SME' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'government', label: 'Government' },
  { value: 'students', label: 'Students' },
  { value: 'agents', label: 'Agents' },
]

export const regionScopeOptions: OptionItem<RegionScope>[] = [
  { value: 'single', label: 'Single Country', hint: 'Launch in one market' },
  { value: 'multiple', label: 'Multiple Countries', hint: 'Regional footprint' },
  { value: 'global', label: 'Global', hint: 'Multi-region scale' },
]

export const countryOptions: OptionItem<CountryCode>[] = [
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'AE', label: 'UAE' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'QA', label: 'Qatar' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'OM', label: 'Oman' },
]

export const capabilityOptions: OptionItem<Capability>[] = [
  { value: 'digital_onboarding', label: 'Digital Onboarding' },
  { value: 'kyc', label: 'KYC' },
  { value: 'aml', label: 'AML' },
  { value: 'debit_cards', label: 'Debit Cards' },
  { value: 'credit_cards', label: 'Credit Cards' },
  { value: 'qr_payments', label: 'QR Payments' },
  { value: 'bill_payments', label: 'Bill Payments' },
  { value: 'intl_transfers', label: 'International Transfers' },
  { value: 'savings', label: 'Savings' },
  { value: 'loans', label: 'Loans' },
  { value: 'ai_chatbot', label: 'AI Chatbot' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'rewards', label: 'Rewards' },
  { value: 'multi_language', label: 'Multi-language' },
]

export const deploymentOptions: OptionItem<Deployment>[] = [
  { value: 'cloud', label: 'Cloud', hint: 'Fastest to launch' },
  { value: 'on_prem', label: 'On-prem', hint: 'Full data residency' },
  { value: 'hybrid', label: 'Hybrid', hint: 'Best of both' },
]

export const priorityOptions: OptionItem<Priority>[] = [
  { value: 'speed', label: 'Speed to market' },
  { value: 'cost', label: 'Cost efficiency' },
  { value: 'compliance', label: 'Compliance first' },
  { value: 'innovation', label: 'Innovation / AI' },
]

export const finderStepMeta = [
  { id: 1, title: 'What are you building?', short: 'Product' },
  { id: 2, title: 'Who are your customers?', short: 'Audience' },
  { id: 3, title: 'Where will it operate?', short: 'Region' },
  { id: 4, title: 'Select required capabilities', short: 'Capabilities' },
] as const
