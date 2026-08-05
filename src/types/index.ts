/** Domain types for Tayseer Product Finder */

export type Locale = 'en' | 'ar'

export type ProductType =
  | 'digital_bank'
  | 'wallet'
  | 'core_banking'
  | 'lending'
  | 'remittance'
  | 'islamic'
  | 'investment'
  | 'merchant'

export type Audience =
  | 'retail'
  | 'business'
  | 'sme'
  | 'corporate'
  | 'government'
  | 'students'
  | 'agents'

export type RegionScope = 'single' | 'multiple' | 'global'

export type CountryCode =
  | 'SA'
  | 'AE'
  | 'PK'
  | 'QA'
  | 'BH'
  | 'KW'
  | 'OM'

export type Capability =
  | 'digital_onboarding'
  | 'kyc'
  | 'aml'
  | 'debit_cards'
  | 'credit_cards'
  | 'qr_payments'
  | 'bill_payments'
  | 'intl_transfers'
  | 'savings'
  | 'loans'
  | 'ai_chatbot'
  | 'analytics'
  | 'notifications'
  | 'rewards'
  | 'multi_language'

export type Deployment = 'cloud' | 'on_prem' | 'hybrid'
export type Priority = 'speed' | 'cost' | 'compliance' | 'innovation'

export interface FinderAnswers {
  productType: ProductType | null
  audience: Audience | null
  regionScope: RegionScope | null
  countries: CountryCode[]
  capabilities: Capability[]
  deployment: Deployment | null
  priority: Priority | null
}

export interface TayseerProduct {
  id: string
  name: string
  tagline: string
  description: string
  category: string
}

export interface ProductRecommendation {
  product: TayseerProduct
  confidence: number
  reasons: string[]
}

export interface SolutionResult {
  title: string
  summary: string
  products: ProductRecommendation[]
  architecture: string[]
  timelineWeeks: { min: number; max: number }
  timelineLabel: string
}
