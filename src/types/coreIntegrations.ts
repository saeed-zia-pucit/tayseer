export type CoreGoal =
  | 'new_core'
  | 'modernize'
  | 'multi_country'
  | 'islamic_products'

export type IntegrationTarget =
  | 'cards'
  | 'remittance'
  | 'soft_pos'
  | 'mbuke'
  | 'fahim'
  | 'aml_fraud'
  | 'credit_bureau'
  | 'legacy_cbs'
  | 'erp'

export type IntegrationStyle = 'apis' | 'batch' | 'queue' | 'hybrid'

export type CoreDeployment = 'cloud' | 'on_prem' | 'hybrid'

export type CorePriority = 'speed' | 'compliance' | 'resilience' | 'cost'

export interface CoreIntegrationsAnswers {
  goal: CoreGoal | null
  integrations: IntegrationTarget[]
  style: IntegrationStyle | null
  deployment: CoreDeployment | null
  priority: CorePriority | null
}

export interface ArchitectureNode {
  id: string
  label: string
  layer: 'channel' | 'core' | 'rail' | 'risk' | 'legacy'
  mode: 'realtime' | 'batch' | 'optional'
}

export interface CoreIntegrationsResult {
  title: string
  summary: string
  nodes: ArchitectureNode[]
  stack: string[]
  timelineLabel: string
  styleLabel: string
  deploymentLabel: string
  priorityLabel: string
}
