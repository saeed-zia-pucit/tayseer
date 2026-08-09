import { routes, type AppRoute } from '@/lib/constants'

export type StoryVisualId =
  | 'ecosystem'
  | 'ai-atm'
  | 'wallet'
  | 'core'
  | 'assistant'
  | 'network'

export interface StoryProduct {
  id: string
  title: string
  tag: string
  desc: string
  glow: string
  features: string[]
  visual: StoryVisualId
  /** Internal demo flow opened by the action button */
  cta: {
    label: string
    to: AppRoute
    reset: 'journey' | 'mbuke' | 'wl' | 'core' | 'finder' | null
  }
}

export const storyProducts: StoryProduct[] = [
  {
    id: 'ecosystem',
    title: 'Digital Banking Ecosystem',
    tag: 'Scene 01 · Platforms',
    desc: 'A unified digital fabric where mobile, cards, payments, and intelligence move as one — engineered for institutions that lead the Gulf’s financial future.',
    glow: 'rgba(15, 118, 110, 0.35)',
    features: [
      'Omnichannel customer journeys',
      'Real-time product orchestration',
      'Secure API mesh across services',
      'White-label ready for every brand',
    ],
    visual: 'ecosystem',
    cta: {
      label: 'Open Implementation Journey',
      to: routes.implementationJourney,
      reset: 'journey',
    },
  },
  {
    id: 'ai-atm',
    title: 'AI ATM',
    tag: 'Scene 02 · Channels',
    desc: 'Intelligent self-service terminals that recognize intent, prevent fraud in-frame, and keep cash & digital channels perfectly synchronized.',
    glow: 'rgba(58, 64, 72, 0.45)',
    features: [
      'Vision-assisted fraud safeguards',
      'Cash recycling & smart monitoring',
      'Branchless service at every corner',
      'Fleet analytics for every device',
    ],
    visual: 'ai-atm',
    cta: {
      label: 'Explore Core & Integrations',
      to: routes.coreIntegrations,
      reset: 'core',
    },
  },
  {
    id: 'wallet',
    title: 'Digital Wallet',
    tag: 'Scene 03 · Payments',
    desc: 'A luminous wallet experience for instant P2P, QR, cards, and cross-border value — designed to feel effortless and unmistakably premium.',
    glow: 'rgba(212, 175, 120, 0.35)',
    features: [
      'Instant P2P & QR settlements',
      'Multi-currency balances',
      'Card tokenization & controls',
      'Biometric unlock everywhere',
    ],
    visual: 'wallet',
    cta: {
      label: 'Try MBuke Demo',
      to: routes.mbukeDemo,
      reset: 'mbuke',
    },
  },
  {
    id: 'core',
    title: 'Core Banking Platform',
    tag: 'Scene 04 · Engine',
    desc: 'The institutional heart of modern finance — modular ledgers, product factories, and compliance rails built for scale without compromise.',
    glow: 'rgba(23, 53, 47, 0.4)',
    features: [
      'Real-time multi-currency ledger',
      'Deposits, lending & cards factory',
      'Regulatory audit trails by design',
      'Cloud or on-premise deployment',
    ],
    visual: 'core',
    cta: {
      label: 'Open Core & Integrations',
      to: routes.coreIntegrations,
      reset: 'core',
    },
  },
  {
    id: 'assistant',
    title: 'AI Banking Assistant',
    tag: 'Scene 05 · Intelligence',
    desc: 'Fahim AI — a conversational co-pilot that detects risk, answers customers, and recommends the next best action in milliseconds.',
    glow: 'rgba(15, 118, 110, 0.4)',
    features: [
      'Fraud & anomaly detection',
      'Natural-language banking support',
      'Credit & risk intelligence',
      'Personalized next-best actions',
    ],
    visual: 'assistant',
    cta: {
      label: 'Try MBuke Demo',
      to: routes.mbukeDemo,
      reset: 'mbuke',
    },
  },
  {
    id: 'network',
    title: 'Connected Banking Network',
    tag: 'Scene 06 · Presence',
    desc: 'A living network linking institutions, partners, and customers across KSA, UAE, and beyond — always on, always trusted.',
    glow: 'rgba(22, 50, 79, 0.4)',
    features: [
      'Cross-border corridor readiness',
      'Partner & correspondent mesh',
      'Live regional presence map',
      'Enterprise-grade trust & uptime',
    ],
    visual: 'network',
    cta: {
      label: 'Customize White-Label',
      to: routes.whiteLabel,
      reset: 'wl',
    },
  },
]

export const ecoNodes = [
  { label: 'Fraud Detection', x: 16, y: 18 },
  { label: 'Customer Support', x: 84, y: 16 },
  { label: 'Loan Processing', x: 92, y: 48 },
  { label: 'Real-time Analytics', x: 80, y: 82 },
  { label: 'Payment Systems', x: 20, y: 80 },
  { label: 'Mobile Apps', x: 8, y: 48 },
  { label: 'ATM Integration', x: 50, y: 10 },
]

export const archNodes = [
  { title: 'Customer', sub: 'Channels' },
  { title: 'Mobile Banking', sub: 'MBuke' },
  { title: 'API Gateway', sub: 'Secure edge' },
  { title: 'Core Engine', sub: 'Ledger' },
  { title: 'Payments', sub: 'Rails' },
  { title: 'Database', sub: 'Systems of record' },
  { title: 'Analytics', sub: 'Fahim AI' },
]
