import {
  mbukeAdvantages,
  mbukeAudienceOptions,
  mbukeChallengeOptions,
  mbukeThemeStyles,
} from '@/data/mbukeDemoOptions'
import type {
  MbukeCapability,
  MbukeDemoAnswers,
  MbukeDemoResult,
  MbukeModule,
  MbukeTheme,
} from '@/types/mbukeDemo'

const capabilityModules: Record<MbukeCapability, MbukeModule> = {
  onboarding: {
    id: 'onboarding',
    name: 'Onboarding',
    short: 'KYC',
    bucket: 'user',
  },
  p2p: { id: 'p2p', name: 'P2P Transfers', short: 'Send', bucket: 'user' },
  bills: { id: 'bills', name: 'Bill Payments', short: 'Bills', bucket: 'user' },
  remittance: {
    id: 'remittance',
    name: 'Remittance',
    short: 'FX',
    bucket: 'user',
  },
  ussd: { id: 'ussd', name: 'USSD / Offline', short: 'USSD', bucket: 'user' },
  agent_mgmt: {
    id: 'agent_mgmt',
    name: 'Agent Network',
    short: 'Agents',
    bucket: 'operator',
  },
  operator_dashboard: {
    id: 'operator_dashboard',
    name: 'Operator Dashboard',
    short: 'Ops',
    bucket: 'operator',
  },
  analytics: {
    id: 'analytics',
    name: 'Real-time Analytics',
    short: 'Insights',
    bucket: 'operator',
  },
  compliance: {
    id: 'compliance',
    name: 'Compliance & Reporting',
    short: 'Report',
    bucket: 'operator',
  },
  soft_pos: {
    id: 'soft_pos',
    name: 'Soft POS',
    short: 'POS',
    bucket: 'technical',
  },
  multi_currency: {
    id: 'multi_currency',
    name: 'Multi-currency',
    short: 'FX',
    bucket: 'technical',
  },
  fahim_ai: {
    id: 'fahim_ai',
    name: 'Fahim AI',
    short: 'AI',
    bucket: 'user',
  },
}

const appNames: Record<string, string> = {
  bank: 'Horizon MBuke',
  exchange: 'Sahara Exchange',
  government: 'Citizen Pay',
  telecom: 'Pulse Wallet',
  payment_gateway: 'GatePay',
}

const challengeDefaults: Record<string, MbukeCapability[]> = {
  rural_reach: ['ussd', 'agent_mgmt', 'onboarding', 'p2p', 'operator_dashboard'],
  digital_wallet: ['onboarding', 'p2p', 'bills', 'fahim_ai', 'analytics'],
  agent_network: ['agent_mgmt', 'soft_pos', 'p2p', 'operator_dashboard', 'compliance'],
  full_mobile_bank: [
    'onboarding',
    'p2p',
    'bills',
    'remittance',
    'analytics',
    'fahim_ai',
    'compliance',
  ],
}

export function emptyMbukeAnswers(): MbukeDemoAnswers {
  return {
    audience: null,
    challenge: null,
    capabilities: [],
    theme: null,
  }
}

export function getMbukeTheme(theme: MbukeTheme | null) {
  return mbukeThemeStyles[theme ?? 'lagoon']
}

export function buildMbukeResult(
  answers: MbukeDemoAnswers,
): MbukeDemoResult | null {
  if (!answers.audience || !answers.challenge) return null

  const theme = answers.theme ?? 'lagoon'
  const audienceLabel =
    mbukeAudienceOptions.find((o) => o.value === answers.audience)?.label ?? ''
  const challengeLabel =
    mbukeChallengeOptions.find((o) => o.value === answers.challenge)?.label ??
    ''

  const caps =
    answers.capabilities.length > 0
      ? answers.capabilities
      : challengeDefaults[answers.challenge] ?? [
          'onboarding',
          'p2p',
          'bills',
          'fahim_ai',
        ]

  const modules = caps.map((c) => capabilityModules[c])

  const stack = [
    'MBuke White-label Platform',
    'Unified onboarding & payments',
  ]
  if (caps.includes('fahim_ai')) stack.push('Fahim AI Assistant')
  if (caps.includes('ussd') || caps.includes('agent_mgmt')) {
    stack.push('USSD / Agent banking')
  }
  if (caps.includes('soft_pos')) stack.push('Soft POS')
  if (caps.includes('analytics') || caps.includes('operator_dashboard')) {
    stack.push('Operator analytics suite')
  }
  if (caps.includes('remittance') || caps.includes('multi_currency')) {
    stack.push('Remittance & multi-currency')
  }

  const rural =
    answers.challenge === 'rural_reach' || answers.audience === 'telecom'

  return {
    appName: appNames[answers.audience],
    tagline:
      'AI-powered white-label mobile finance — onboarding, payments, analytics, agents & USSD in one platform.',
    audienceLabel,
    challengeLabel,
    theme,
    modules,
    advantages: mbukeAdvantages,
    stack: [...new Set(stack)],
    caseStudy: rural
      ? {
          title: 'MBuke in action: low-connectivity success',
          story:
            'A leading institution needed to reach rural communities. They launched MBuke’s white-label wallet with USSD/SMS offline flows and a multi-tier agent network.',
          metrics: [
            { value: '250K+', label: 'Users onboarded in year one' },
            { value: '60%', label: 'Cost reduction vs branches' },
            { value: '1,200+', label: 'Agents activated in 12 months' },
            { value: '92%', label: 'Retention from ease of access' },
          ],
        }
      : {
          title: 'MBuke white-label launch pattern',
          story:
            'Institutions deploy MBuke modularly — start with wallet journeys, then add Soft POS, remittance, and operator analytics as they scale.',
          metrics: [
            { value: 'Weeks', label: 'Typical pilot to first users' },
            { value: '1 app', label: 'Unified customer channel' },
            { value: 'API-first', label: 'Fits existing systems' },
            { value: 'Brand', label: 'Fully white-label ready' },
          ],
        },
  }
}
