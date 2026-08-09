import { themeStyles } from '@/data/whiteLabelOptions'
import type {
  WhiteLabelAnswers,
  WhiteLabelFeature,
  WhiteLabelModule,
  WhiteLabelResult,
  WhiteLabelTheme,
} from '@/types/whiteLabel'

const featureModules: Record<WhiteLabelFeature, WhiteLabelModule> = {
  accounts: { id: 'accounts', name: 'Accounts', short: 'Balance' },
  cards: { id: 'cards', name: 'Cards', short: 'Cards' },
  transfers: { id: 'transfers', name: 'Transfers', short: 'Send' },
  bills: { id: 'bills', name: 'Bill Pay', short: 'Bills' },
  loans: { id: 'loans', name: 'Loans', short: 'Credit' },
  investments: { id: 'investments', name: 'Invest', short: 'Grow' },
  ai_support: { id: 'ai_support', name: 'Fahim AI', short: 'Chat' },
  biometrics: { id: 'biometrics', name: 'Biometrics', short: 'Face ID' },
  soft_pos: { id: 'soft_pos', name: 'Soft POS', short: 'Accept' },
  rewards: { id: 'rewards', name: 'Rewards', short: 'Points' },
  multi_currency: { id: 'multi_currency', name: 'Multi-FX', short: 'FX' },
  arabic_ux: { id: 'arabic_ux', name: 'Arabic UX', short: 'عربي' },
}

const bankNames: Record<string, string> = {
  retail_bank: 'Horizon Bank',
  islamic_bank: 'Noor Bank',
  neo_bank: 'Pulse Neo',
  wallet_first: 'MBuke Wallet',
  microfinance: 'Seed Finance',
}

const bankTaglines: Record<string, string> = {
  retail_bank: 'Your everyday banking app, white-labeled.',
  islamic_bank: 'Sharia-ready journeys on MBuke.',
  neo_bank: 'Launch a challenger in weeks.',
  wallet_first: 'Payments-first mobile money.',
  microfinance: 'Agents, credit & cash-in on one app.',
}

export function emptyWhiteLabelAnswers(): WhiteLabelAnswers {
  return {
    bankType: null,
    audience: null,
    features: [],
    theme: null,
    language: null,
  }
}

export function buildWhiteLabelResult(
  answers: WhiteLabelAnswers,
): WhiteLabelResult | null {
  if (!answers.bankType || !answers.audience) return null

  const theme: WhiteLabelTheme = answers.theme ?? 'lagoon'
  const language = answers.language ?? 'bilingual'

  const selected =
    answers.features.length > 0
      ? answers.features
      : (['accounts', 'transfers', 'cards', 'ai_support'] as WhiteLabelFeature[])

  const modules = selected.map((f) => featureModules[f])

  const stack = ['MBuke White-label App', 'Fahim AI', 'Core Banking APIs']
  if (selected.includes('soft_pos')) stack.push('Merchant Soft POS')
  if (selected.includes('loans')) stack.push('Lending Engine')
  if (selected.includes('multi_currency') || answers.audience === 'expats') {
    stack.push('Remittance Rails')
  }

  let min = 10
  let max = 16
  if (answers.bankType === 'retail_bank' || answers.bankType === 'islamic_bank') {
    min = 14
    max = 22
  }
  if (selected.length > 7) {
    min += 2
    max += 4
  }

  return {
    appName: bankNames[answers.bankType],
    tagline: bankTaglines[answers.bankType],
    theme,
    language,
    modules,
    stack: [...new Set(stack)],
    timelineLabel: `${min}–${max} weeks to pilot`,
  }
}

export function getTheme(theme: WhiteLabelTheme | null) {
  return themeStyles[theme ?? 'lagoon']
}
