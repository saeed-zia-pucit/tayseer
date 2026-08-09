import type {
  CoreDeployment,
  CoreGoal,
  CorePriority,
  IntegrationStyle,
  IntegrationTarget,
} from '@/types/coreIntegrations'

export interface CoreOption<T extends string> {
  value: T
  label: string
  hint?: string
}

export const coreGoalOptions: CoreOption<CoreGoal>[] = [
  { value: 'new_core', label: 'New core', hint: 'Greenfield ledger & products' },
  { value: 'modernize', label: 'Modernize core', hint: 'Replace / wrap legacy' },
  { value: 'multi_country', label: 'Multi-country ledger', hint: 'Regional scale' },
  { value: 'islamic_products', label: 'Islamic products', hint: 'Sharia product factory' },
]

export const integrationOptions: CoreOption<IntegrationTarget>[] = [
  { value: 'cards', label: 'Cards issuing', hint: 'Debit / credit programs' },
  { value: 'remittance', label: 'Remittance rails', hint: 'Cross-border send/receive' },
  { value: 'soft_pos', label: 'Soft POS', hint: 'Merchant accepting' },
  { value: 'mbuke', label: 'MBuke / wallet app', hint: 'White-label channels + USSD' },
  { value: 'fahim', label: 'Fahim AI', hint: 'KYC & support' },
  { value: 'aml_fraud', label: 'AML / Fraud', hint: 'Monitoring & risk' },
  { value: 'credit_bureau', label: 'Credit bureau', hint: 'Score & inquiry' },
  { value: 'legacy_cbs', label: 'Legacy CBS', hint: 'Existing core bridge' },
  { value: 'erp', label: 'ERP / GL', hint: 'Finance back-office' },
]

export const integrationStyleOptions: CoreOption<IntegrationStyle>[] = [
  { value: 'apis', label: 'APIs', hint: 'Real-time REST / events' },
  { value: 'batch', label: 'File batch', hint: 'Scheduled files' },
  { value: 'queue', label: 'Message queue', hint: 'Async messaging' },
  { value: 'hybrid', label: 'Hybrid', hint: 'APIs + batch where needed' },
]

export const coreDeploymentOptions: CoreOption<CoreDeployment>[] = [
  { value: 'cloud', label: 'Cloud', hint: 'Managed platform' },
  { value: 'on_prem', label: 'On-prem', hint: 'Data residency' },
  { value: 'hybrid', label: 'Hybrid', hint: 'Split workloads' },
]

export const corePriorityOptions: CoreOption<CorePriority>[] = [
  { value: 'speed', label: 'Go-live speed' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'resilience', label: 'Resilience' },
  { value: 'cost', label: 'Cost efficiency' },
]

export const coreStepMeta = [
  { id: 1, title: 'What is your core banking goal?', short: 'Goal' },
  { id: 2, title: 'What must integrate with core?', short: 'Integrations' },
  { id: 3, title: 'Preferred integration style?', short: 'Style' },
  { id: 4, title: 'Deployment & priority', short: 'Ops' },
] as const

export const CORE_TOTAL_STEPS = 4
