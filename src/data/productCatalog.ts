/**
 * Canonical Tayseer product lineup — marketing + interactive demos.
 * Images can be swapped later; copy is the source of truth for slides/CTAs.
 */

export type ProductId =
  | 'core-banking'
  | 'fahim-ai'
  | 'mbuke'
  | 'software-management'
  | 'managed-services'
  | 'banking-systems'

export type TayseerCatalogProduct = {
  id: ProductId
  name: string
  /** Short hero line under the name */
  tagline: string
  /** Longer supporting sentence for captions / demos */
  blurb: string
  /** Broken for the Vide Infra title stack */
  titleLines: string[]
  /** Route to the interactive demo builder */
  demoPath: string
  /** Results / theater route after the builder */
  demoResultsPath: string
  /** Temporary slide art (replace later) */
  images: string[]
  tag: string
}

const img = (name: string) => `/videinfra/images/${name}`

export const PRODUCT_CATALOG: TayseerCatalogProduct[] = [
  {
    id: 'core-banking',
    name: 'Core Banking',
    tagline: 'Future-Proof Core Banking. Growth Unleashed.',
    blurb:
      'Modern core ledgers, product factories, and real-time posting — built to scale retail, SME, and Islamic portfolios without rip-and-replace pain.',
    titleLines: ['Future-Proof', 'Core Banking'],
    demoPath: '/demo/core-banking',
    demoResultsPath: '/demo/core-banking/results',
    images: [
      img('slider-6-1@xxl.webp'),
      img('slider-6-2@xxl.webp'),
      img('slider-6-3@xxl.webp'),
    ],
    tag: 'Core',
  },
  {
    id: 'fahim-ai',
    name: 'Fahim AI',
    tagline: 'Intelligence to Revolutionize Your Business',
    blurb:
      'AI code editor for banking teams — ask in natural language, get explanations, and watch Fahim write production-ready code beside you.',
    titleLines: ['Fahim AI', 'Code Editor'],
    demoPath: '/demo/fahim-ai',
    demoResultsPath: '/demo/fahim-ai/results',
    images: [img('slider-7-1@xxl.webp')],
    tag: 'AI',
  },
  {
    id: 'mbuke',
    name: 'MBuke',
    tagline: 'White-Label Mobile Banking Platform',
    blurb:
      'Launch branded mobile finance in weeks — onboarding, wallets, P2P, bills, agents, and analytics on one white-label stack.',
    titleLines: ['MBuke', 'Mobile Banking'],
    demoPath: '/mbuke-demo',
    demoResultsPath: '/mbuke-demo/results',
    images: [
      img('slider-8-1@xxl.webp'),
      img('slider-8-2@xxl.webp'),
      img('slider-8-3@xxl.webp'),
    ],
    tag: 'Mobile',
  },
  {
    id: 'software-management',
    name: 'Software Management Systems',
    tagline: 'Effortless Solutions. Powerful Results.',
    blurb:
      'Operate banking software portfolios with clarity — release control, environments, observability, and change workflows in one console.',
    titleLines: ['Software', 'Management', 'Systems'],
    demoPath: '/demo/software-management',
    demoResultsPath: '/demo/software-management/results',
    images: [img('slider-9-1@xxl.webp'), img('slider-9-2@xxl.webp')],
    tag: 'Ops',
  },
  {
    id: 'managed-services',
    name: 'Managed Services',
    tagline: 'Peak Performance via Managed Expertise.',
    blurb:
      'Tayseer run teams keep platforms healthy — monitoring, incident response, upgrades, and SLA-backed operations so your bank stays focused on growth.',
    titleLines: ['Managed', 'Services'],
    demoPath: '/demo/managed-services',
    demoResultsPath: '/demo/managed-services/results',
    images: [img('slider-10-1@xxl.webp')],
    tag: 'Services',
  },
  {
    id: 'banking-systems',
    name: 'Banking Systems',
    tagline: 'Experience Next-Gen Banking with GRG Banking',
    blurb:
      'GRG-powered self-service and branch hardware — ATMs, CDMs, and intelligent kiosks wired into your digital channels and core.',
    titleLines: ['Banking Systems', 'with GRG'],
    demoPath: '/demo/banking-systems',
    demoResultsPath: '/demo/banking-systems/results',
    images: [
      img('slider-6-1@xxl.webp'),
      img('slider-9-1@xxl.webp'),
    ],
    tag: 'Hardware',
  },
]

export function getProduct(id: string): TayseerCatalogProduct | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id)
}

export function productDemoPath(id: ProductId): string {
  return getProduct(id)?.demoPath ?? `/demo/${id}`
}
