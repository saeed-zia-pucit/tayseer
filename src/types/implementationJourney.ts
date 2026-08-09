export type JourneyNodeId =
  | 'core'
  | 'auth'
  | 'kyc'
  | 'aml'
  | 'cards'
  | 'payments'
  | 'notifications'
  | 'analytics'
  | 'ai'
  | 'open_banking'
  | 'crm'

export type JourneyStageId =
  | 'foundation'
  | 'compliance'
  | 'payments'
  | 'experience'
  | 'insights'

export interface JourneyNode {
  id: JourneyNodeId
  label: string
  short: string
  purpose: string
  effortDays: number
  dependencies: JourneyNodeId[]
  apiVersion: string
  endpoints: { method: string; path: string; summary: string }[]
  requestExample: string
  responseExample: string
  risks: string[]
  recommendation: string
}

export interface JourneyStage {
  id: JourneyStageId
  title: string
  description: string
  nodeIds: JourneyNodeId[]
}

export interface LogEntry {
  id: string
  time: string
  message: string
}
