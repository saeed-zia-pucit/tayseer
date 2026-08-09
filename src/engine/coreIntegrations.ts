import {
  coreDeploymentOptions,
  coreGoalOptions,
  corePriorityOptions,
  integrationOptions,
  integrationStyleOptions,
} from '@/data/coreIntegrationsOptions'
import type {
  ArchitectureNode,
  CoreIntegrationsAnswers,
  CoreIntegrationsResult,
  IntegrationTarget,
} from '@/types/coreIntegrations'

const integrationNodes: Record<
  IntegrationTarget,
  Omit<ArchitectureNode, 'mode'>
> = {
  cards: { id: 'cards', label: 'Cards', layer: 'rail' },
  remittance: { id: 'remittance', label: 'Remittance', layer: 'rail' },
  soft_pos: { id: 'soft_pos', label: 'Soft POS', layer: 'channel' },
  mbuke: { id: 'mbuke', label: 'MBuke', layer: 'channel' },
  fahim: { id: 'fahim', label: 'Fahim AI', layer: 'channel' },
  aml_fraud: { id: 'aml_fraud', label: 'AML / Fraud', layer: 'risk' },
  credit_bureau: { id: 'credit_bureau', label: 'Bureau', layer: 'rail' },
  legacy_cbs: { id: 'legacy_cbs', label: 'Legacy CBS', layer: 'legacy' },
  erp: { id: 'erp', label: 'ERP / GL', layer: 'legacy' },
}

export function emptyCoreAnswers(): CoreIntegrationsAnswers {
  return {
    goal: null,
    integrations: [],
    style: null,
    deployment: null,
    priority: null,
  }
}

function modeFor(
  target: IntegrationTarget,
  style: CoreIntegrationsAnswers['style'],
): ArchitectureNode['mode'] {
  if (target === 'erp' || target === 'legacy_cbs') {
    return style === 'apis' ? 'batch' : 'batch'
  }
  if (style === 'batch') return 'batch'
  if (target === 'aml_fraud' || target === 'mbuke' || target === 'fahim') {
    return 'realtime'
  }
  return style === 'queue' ? 'realtime' : 'realtime'
}

export function buildCoreResult(
  answers: CoreIntegrationsAnswers,
): CoreIntegrationsResult | null {
  if (!answers.goal) return null

  const goalLabel =
    coreGoalOptions.find((o) => o.value === answers.goal)?.label ?? 'Core'
  const styleLabel =
    integrationStyleOptions.find((o) => o.value === answers.style)?.label ??
    'Hybrid'
  const deploymentLabel =
    coreDeploymentOptions.find((o) => o.value === answers.deployment)?.label ??
    '—'
  const priorityLabel =
    corePriorityOptions.find((o) => o.value === answers.priority)?.label ?? '—'

  const selected =
    answers.integrations.length > 0
      ? answers.integrations
      : (['mbuke', 'aml_fraud'] as IntegrationTarget[])

  const nodes: ArchitectureNode[] = [
    { id: 'core', label: 'Tayseer Core', layer: 'core', mode: 'realtime' },
    ...selected.map((id) => ({
      ...integrationNodes[id],
      mode: modeFor(id, answers.style),
    })),
  ]

  const stack = ['Tayseer Core Banking']
  if (selected.includes('mbuke') || selected.includes('soft_pos')) {
    stack.push('MBuke Channels')
  }
  if (selected.includes('fahim')) stack.push('Fahim AI')
  if (selected.includes('aml_fraud')) stack.push('Fraud / AML Hub')
  if (selected.includes('cards')) stack.push('Card Issuing')
  if (selected.includes('remittance')) stack.push('Remittance Rails')
  if (selected.includes('legacy_cbs')) stack.push('Legacy Bridge')
  if (selected.includes('erp')) stack.push('GL / ERP Connectors')

  let min = 16
  let max = 28
  if (answers.goal === 'new_core') {
    min = 20
    max = 36
  }
  if (answers.goal === 'modernize') {
    min = 18
    max = 32
  }
  if (selected.length > 5) {
    min += 4
    max += 6
  }
  if (answers.deployment === 'on_prem') {
    min += 4
    max += 8
  }
  if (answers.priority === 'speed') {
    min = Math.max(12, min - 4)
    max = Math.max(min + 6, max - 4)
  }

  const integrationNames = selected
    .map((id) => integrationOptions.find((o) => o.value === id)?.label)
    .filter(Boolean)
    .slice(0, 4)
    .join(', ')

  return {
    title: `${goalLabel} architecture`,
    summary: `A Tayseer Core blueprint with ${integrationNames || 'key'} integrations over ${styleLabel.toLowerCase()} patterns${deploymentLabel !== '—' ? `, deployed ${deploymentLabel.toLowerCase()}` : ''}.`,
    nodes,
    stack: [...new Set(stack)],
    timelineLabel: `${min}–${max} weeks typical integration program`,
    styleLabel,
    deploymentLabel,
    priorityLabel,
  }
}
