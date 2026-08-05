import { tayseerProducts } from '@/data/products'
import {
  audienceLabels,
  capabilityLabels,
  countryLabels,
  deploymentLabels,
  priorityLabels,
  productTypeLabels,
  regionScopeLabels,
} from '@/lib/constants'
import type {
  Capability,
  FinderAnswers,
  ProductRecommendation,
  ProductType,
  SolutionResult,
  TayseerProduct,
} from '@/types'

type ScoreMap = Record<string, { score: number; reasons: string[] }>

const byId = Object.fromEntries(
  tayseerProducts.map((p) => [p.id, p]),
) as Record<string, TayseerProduct>

const baseStacks: Record<ProductType, string[]> = {
  digital_bank: ['core', 'mbuke', 'fahim', 'fraud'],
  wallet: ['mbuke-wallet', 'payment-gw', 'fahim'],
  core_banking: ['core', 'fraud', 'analytics'],
  lending: ['lending', 'core', 'fahim', 'fraud'],
  remittance: ['remittance', 'mbuke-wallet', 'fraud', 'fahim'],
  islamic: ['islamic', 'core', 'mbuke', 'fahim'],
  investment: ['core', 'mbuke', 'analytics', 'fahim'],
  merchant: ['merchant', 'payment-gw', 'mbuke', 'analytics'],
}

const capabilityBoosts: Partial<Record<Capability, string[]>> = {
  digital_onboarding: ['fahim', 'mbuke'],
  kyc: ['fahim', 'fraud'],
  aml: ['fraud'],
  debit_cards: ['cards', 'payment-gw'],
  credit_cards: ['cards', 'lending'],
  qr_payments: ['payment-gw', 'mbuke-wallet', 'merchant'],
  bill_payments: ['mbuke-wallet', 'payment-gw'],
  intl_transfers: ['remittance', 'fraud'],
  savings: ['core', 'mbuke'],
  loans: ['lending', 'core'],
  ai_chatbot: ['fahim'],
  analytics: ['analytics'],
  notifications: ['mbuke', 'fahim'],
  rewards: ['mbuke', 'mbuke-wallet'],
  multi_language: ['fahim', 'mbuke'],
}

function bump(
  scores: ScoreMap,
  productId: string,
  amount: number,
  reason: string,
) {
  if (!byId[productId]) return
  if (!scores[productId]) scores[productId] = { score: 0, reasons: [] }
  scores[productId].score += amount
  if (reason && !scores[productId].reasons.includes(reason)) {
    scores[productId].reasons.push(reason)
  }
}

/** Soft inferences so the summary panel stays complete without extra questions. */
function deriveDeployment(answers: FinderAnswers): string {
  if (answers.deployment) return deploymentLabels[answers.deployment]
  if (answers.regionScope === 'global') return 'Hybrid'
  if (answers.regionScope === 'multiple') return 'Hybrid'
  if (answers.regionScope === 'single') return 'Cloud'
  return '—'
}

function derivePriority(answers: FinderAnswers): string {
  if (answers.priority) return priorityLabels[answers.priority]
  const caps = answers.capabilities
  if (caps.includes('aml') || caps.includes('kyc')) return 'Compliance'
  if (caps.includes('ai_chatbot')) return 'Innovation / AI'
  if (caps.length >= 8) return 'Speed to market'
  if (answers.productType) return 'Innovation'
  return '—'
}

export function summarizeAnswers(answers: FinderAnswers) {
  const regionParts: string[] = []
  if (answers.regionScope) {
    regionParts.push(regionScopeLabels[answers.regionScope])
  }
  if (answers.countries.length > 0) {
    regionParts.push(answers.countries.map((c) => countryLabels[c]).join(', '))
  }

  return {
    productType: answers.productType
      ? productTypeLabels[answers.productType]
      : '—',
    audience: answers.audience ? audienceLabels[answers.audience] : '—',
    region: regionParts.length ? regionParts.join(' · ') : '—',
    scale: answers.regionScope
      ? regionScopeLabels[answers.regionScope]
      : '—',
    capabilities:
      answers.capabilities.length > 0
        ? answers.capabilities.map((c) => capabilityLabels[c])
        : [],
    deployment: deriveDeployment(answers),
    priority: derivePriority(answers),
  }
}

export function recommendProducts(answers: FinderAnswers): ProductRecommendation[] {
  const scores: ScoreMap = {}

  if (answers.productType) {
    const stack = baseStacks[answers.productType]
    stack.forEach((id, index) => {
      bump(
        scores,
        id,
        40 - index * 4,
        `Fits ${productTypeLabels[answers.productType!]} builds`,
      )
    })
  }

  if (answers.audience === 'agents') {
    bump(scores, 'mbuke', 12, 'Agent network & USSD-ready channels')
    bump(scores, 'merchant', 8, 'Cash-in / Soft POS for agents')
  }
  if (answers.audience === 'sme' || answers.audience === 'business') {
    bump(scores, 'merchant', 10, 'SME & business accepting')
    bump(scores, 'payment-gw', 8, 'Business payment rails')
  }
  if (answers.audience === 'retail' || answers.audience === 'students') {
    bump(scores, 'mbuke', 8, 'Retail-first digital experience')
    bump(scores, 'mbuke-wallet', 8, 'Consumer wallet journeys')
  }
  if (answers.audience === 'government' || answers.audience === 'corporate') {
    bump(scores, 'core', 10, 'Enterprise-grade ledger & controls')
    bump(scores, 'fraud', 8, 'Heightened risk & audit needs')
  }

  if (answers.regionScope === 'global' || answers.regionScope === 'multiple') {
    bump(scores, 'remittance', 10, 'Multi-market / corridor readiness')
    bump(scores, 'fraud', 6, 'Cross-border compliance posture')
  }
  if (answers.countries.includes('SA') || answers.countries.includes('AE')) {
    bump(scores, 'islamic', 6, 'Strong GCC / Sharia product demand')
    bump(scores, 'fahim', 6, 'Arabic CX expected in GCC')
  }
  if (answers.countries.includes('PK')) {
    bump(scores, 'mbuke', 8, 'High mobile-wallet adoption markets')
    bump(scores, 'remittance', 6, 'Remittance-heavy corridors')
  }

  for (const cap of answers.capabilities) {
    const ids = capabilityBoosts[cap] ?? []
    for (const id of ids) {
      bump(scores, id, 7, `Supports ${capabilityLabels[cap]}`)
    }
  }

  if (answers.deployment === 'on_prem') {
    bump(scores, 'core', 6, 'On-prem core deployment patterns')
    bump(scores, 'fraud', 4, 'Local risk processing')
  }
  if (answers.deployment === 'cloud') {
    bump(scores, 'mbuke', 4, 'Cloud-native experience layer')
    bump(scores, 'fahim', 4, 'Managed AI assistant')
  }
  if (answers.priority === 'compliance') {
    bump(scores, 'fraud', 10, 'Compliance-first priority')
    bump(scores, 'fahim', 4, 'Guided KYC workflows')
  }
  if (answers.priority === 'innovation') {
    bump(scores, 'fahim', 12, 'AI / innovation priority')
    bump(scores, 'analytics', 6, 'Intelligence layer')
  }
  if (answers.priority === 'speed') {
    bump(scores, 'mbuke-wallet', 8, 'Faster time-to-market wallet')
    bump(scores, 'mbuke', 6, 'White-label app acceleration')
  }
  if (answers.priority === 'cost') {
    bump(scores, 'mbuke-wallet', 6, 'Cost-efficient launch path')
    bump(scores, 'payment-gw', 4, 'Shared payment infrastructure')
  }

  const ranked = Object.entries(scores)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4)

  if (ranked.length === 0) return []

  const max = ranked[0][1].score

  return ranked.map(([id, data]) => ({
    product: byId[id],
    confidence: Math.min(97, Math.round((data.score / max) * 92 + 5)),
    reasons: data.reasons.slice(0, 3),
  }))
}

export function buildSolution(answers: FinderAnswers): SolutionResult | null {
  if (!answers.productType || !answers.audience || !answers.regionScope) {
    return null
  }

  const products = recommendProducts(answers)
  if (products.length === 0) return null

  const summary = summarizeAnswers(answers)
  const capCount = answers.capabilities.length
  const multiMarket =
    answers.regionScope === 'multiple' || answers.regionScope === 'global'

  let min = 8
  let max = 14
  if (answers.productType === 'digital_bank' || answers.productType === 'islamic') {
    min = 16
    max = 28
  } else if (answers.productType === 'wallet' || answers.productType === 'merchant') {
    min = 10
    max = 18
  } else if (answers.productType === 'core_banking') {
    min = 20
    max = 36
  }
  if (multiMarket) {
    min += 4
    max += 8
  }
  if (capCount > 8) {
    min += 3
    max += 6
  }
  if (answers.deployment === 'on_prem') {
    min += 4
    max += 8
  }
  if (answers.priority === 'speed') {
    min = Math.max(6, min - 3)
    max = Math.max(min + 4, max - 4)
  }

  const architecture = [
    'Channels',
    ...products.slice(0, 3).map((p) => p.product.name),
    'Core Ledger / Integrations',
  ]

  return {
    title: `${summary.productType} for ${summary.audience}`,
    summary: `A Tayseer stack tailored for ${summary.audience.toLowerCase()} ${summary.productType.toLowerCase()} across ${summary.region}, optimized for ${summary.priority.toLowerCase()} on ${summary.deployment.toLowerCase()} deployment.`,
    products,
    architecture,
    timelineWeeks: { min, max },
    timelineLabel: `${min}–${max} weeks typical implementation`,
  }
}
