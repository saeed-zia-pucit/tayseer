import { getProduct, type ProductId } from '@/data/productCatalog'
import type {
  DemoOption,
  ProductDemoAnswers,
  ProductDemoConfig,
  ProductDemoResult,
} from '@/demos/types'

function labelOf(options: DemoOption[], value: string | null | undefined) {
  return options.find((o) => o.value === value)?.label ?? '—'
}

function answersComplete(
  answers: ProductDemoAnswers,
  steps: ProductDemoConfig['steps'],
) {
  for (const step of steps) {
    if (step.mode === 'single' && !answers.single[step.key]) return false
    if (step.mode === 'multi' && !(answers.multi[step.key]?.length > 0))
      return false
  }
  return true
}

function baseResult(
  productId: ProductId,
  title: string,
  summary: string,
  chips: string[],
  moduleValues: string[],
  moduleOptions: DemoOption[],
  highlights: string[],
  journeyTitles: string[],
  accent: string,
): ProductDemoResult {
  const product = getProduct(productId)!
  return {
    productId,
    productName: product.name,
    title,
    summary,
    chips,
    modules: moduleValues.map((id) => {
      const opt = moduleOptions.find((o) => o.value === id)
      return { id, name: opt?.label ?? id, hint: opt?.hint }
    }),
    highlights,
    journey: journeyTitles.map((t, i) => ({
      id: `beat-${i}`,
      title: t,
      detail: `Configured for your ${product.name.toLowerCase()} demo path.`,
    })),
    previewAccent: accent,
  }
}

const orgOptions: DemoOption[] = [
  { value: 'retail_bank', label: 'Retail bank', hint: 'Consumer & SME' },
  { value: 'islamic_bank', label: 'Islamic bank', hint: 'Sharia products' },
  { value: 'fintech', label: 'Fintech / neo-bank', hint: 'Digital-first' },
  { value: 'microfinance', label: 'Microfinance', hint: 'Branch + field' },
  { value: 'government', label: 'Government FI', hint: 'Citizen services' },
]

const regionOptions: DemoOption[] = [
  { value: 'ksa', label: 'Saudi Arabia', hint: 'SAMA-ready posture' },
  { value: 'uae', label: 'UAE', hint: 'Multi-emirate' },
  { value: 'pakistan', label: 'Pakistan', hint: 'High volume retail' },
  { value: 'gcc', label: 'Wider GCC', hint: 'Regional rollout' },
  { value: 'multi', label: 'Multi-country', hint: 'Shared services' },
]

const scaleOptions: DemoOption[] = [
  { value: 'pilot', label: 'Pilot / MVP', hint: 'Prove value fast' },
  { value: 'single', label: 'Single market live', hint: 'Production cutover' },
  { value: 'regional', label: 'Regional scale', hint: 'Multi-entity' },
  { value: 'enterprise', label: 'Enterprise estate', hint: 'High availability' },
]

const coreModules: DemoOption[] = [
  { value: 'ledger', label: 'Real-time ledger', hint: 'Posting & balances' },
  { value: 'products', label: 'Product factory', hint: 'Accounts & deposits' },
  { value: 'payments', label: 'Payments hub', hint: 'Rails & clearing' },
  { value: 'lending', label: 'Lending engine', hint: 'Origination & collect' },
  { value: 'islamic', label: 'Islamic modules', hint: 'Murabaha & more' },
  { value: 'gl', label: 'General ledger', hint: 'Finance close' },
  { value: 'limits', label: 'Limits & fees', hint: 'Policy engine' },
  { value: 'apis', label: 'Open APIs', hint: 'Channel connect' },
]

const fahimModules: DemoOption[] = [
  { value: 'chat', label: 'Natural-language chat', hint: 'Ask & explain' },
  { value: 'codegen', label: 'Code generation', hint: 'Write & refactor' },
  { value: 'review', label: 'Code review', hint: 'Catch issues early' },
  { value: 'tests', label: 'Test authoring', hint: 'Unit & integration' },
  { value: 'docs', label: 'Inline docs', hint: 'Comments & READMEs' },
  { value: 'arabic', label: 'Arabic-first prompts', hint: 'Dialect aware' },
  { value: 'banking', label: 'Banking snippets', hint: 'IBAN, KYC, payments' },
  { value: 'security', label: 'Secure coding tips', hint: 'OWASP-aware' },
]

const smsModules: DemoOption[] = [
  { value: 'releases', label: 'Release management', hint: 'Change windows' },
  { value: 'envs', label: 'Environment control', hint: 'Dev → prod' },
  { value: 'observability', label: 'Observability', hint: 'Logs & traces' },
  { value: 'access', label: 'Access governance', hint: 'Roles & audit' },
  { value: 'incidents', label: 'Incident workflows', hint: 'Runbooks' },
  { value: 'config', label: 'Config as code', hint: 'Drift control' },
  { value: 'reporting', label: 'Ops reporting', hint: 'SLA packs' },
]

const managedModules: DemoOption[] = [
  { value: 'noc', label: '24/7 monitoring', hint: 'NOC coverage' },
  { value: 'sre', label: 'SRE / reliability', hint: 'Error budgets' },
  { value: 'patch', label: 'Patch & upgrade', hint: 'Lifecycle' },
  { value: 'security', label: 'Security ops', hint: 'Hardening' },
  { value: 'capacity', label: 'Capacity planning', hint: 'Growth' },
  { value: 'training', label: 'Team enablement', hint: 'Knowledge transfer' },
  { value: 'sla', label: 'SLA / reporting', hint: 'Board packs' },
]

const grgModules: DemoOption[] = [
  { value: 'atm', label: 'ATM fleet', hint: 'Cash services' },
  { value: 'cdm', label: 'Cash deposit', hint: 'CDM / CRS' },
  { value: 'kiosk', label: 'Smart kiosks', hint: 'Self-service' },
  { value: 'cardless', label: 'Cardless withdraw', hint: 'App + QR' },
  { value: 'branch', label: 'Branch assist', hint: 'Teller + device' },
  { value: 'monitoring', label: 'Device monitoring', hint: 'Fleet health' },
  { value: 'cash', label: 'Cash logistics', hint: 'CIT sync' },
]

const focusCore: DemoOption[] = [
  {
    value: 'replace',
    label: 'Core modernization',
    hint: 'Replace legacy layers',
  },
  {
    value: 'launch',
    label: 'New digital bank',
    hint: 'Greenfield core',
  },
  {
    value: 'islamic',
    label: 'Islamic expansion',
    hint: 'Sharia product depth',
  },
  {
    value: 'realtime',
    label: 'Real-time channels',
    hint: 'Instant posting',
  },
]

const focusFahim: DemoOption[] = [
  { value: 'devtools', label: 'Developer productivity', hint: 'Ship faster' },
  { value: 'onboard', label: 'Engineer onboarding', hint: 'Learn the stack' },
  { value: 'quality', label: 'Code quality', hint: 'Reviews & tests' },
  { value: 'banking_api', label: 'Banking API work', hint: 'Payments & core' },
]

const focusSms: DemoOption[] = [
  { value: 'chaos', label: 'Reduce release chaos', hint: 'Stable ship' },
  { value: 'audit', label: 'Audit readiness', hint: 'Traceability' },
  { value: 'multi', label: 'Multi-product estate', hint: 'Shared ops' },
  { value: 'speed', label: 'Faster delivery', hint: 'DevEx' },
]

const focusManaged: DemoOption[] = [
  { value: 'uptime', label: 'Uptime & resilience', hint: 'Always-on' },
  { value: 'cost', label: 'Cost predictability', hint: 'Managed OPEX' },
  { value: 'talent', label: 'Skill gap coverage', hint: 'Tayseer experts' },
  { value: 'compliance', label: 'Compliance ops', hint: 'Controls' },
]

const focusGrg: DemoOption[] = [
  { value: 'cash', label: 'Cash accessibility', hint: 'ATM density' },
  { value: 'branch', label: 'Branch transformation', hint: 'Self-service' },
  { value: 'digital', label: 'Digital + hardware', hint: 'Omnichannel' },
  { value: 'fleet', label: 'Fleet modernization', hint: 'GRG refresh' },
]

function makeConfig(
  productId: ProductId,
  accent: string,
  eyebrow: string,
  intro: string,
  focusOptions: DemoOption[],
  moduleOptions: DemoOption[],
  journey: string[],
  highlights: string[],
  titleFn: (org: string, focus: string) => string,
  summaryFn: (org: string, focus: string, region: string) => string,
): ProductDemoConfig {
  const product = getProduct(productId)!
  const steps = [
    {
      id: 1,
      key: 'org',
      title: 'Who is this demo for?',
      short: 'Org',
      mode: 'single' as const,
      options: orgOptions,
    },
    {
      id: 2,
      key: 'focus',
      title: 'What outcome matters most?',
      short: 'Focus',
      mode: 'single' as const,
      options: focusOptions,
    },
    {
      id: 3,
      key: 'modules',
      title: `Which ${product.name} capabilities should we include?`,
      short: 'Modules',
      mode: 'multi' as const,
      sectionLabel: 'Select one or more',
      options: moduleOptions,
    },
    {
      id: 4,
      key: 'region',
      title: 'Where will you launch first?',
      short: 'Market',
      mode: 'single' as const,
      options: regionOptions,
    },
    {
      id: 5,
      key: 'scale',
      title: 'What scale should the demo assume?',
      short: 'Scale',
      mode: 'single' as const,
      options: scaleOptions,
    },
  ]

  return {
    productId,
    eyebrow,
    intro,
    launchLabel: `Launch ${product.name} demo`,
    accent,
    steps,
    buildResult: (answers) => {
      if (!answersComplete(answers, steps)) return null
      const org = answers.single.org!
      const focus = answers.single.focus!
      const region = answers.single.region!
      const scale = answers.single.scale!
      const modules = answers.multi.modules ?? []
      return baseResult(
        productId,
        titleFn(labelOf(orgOptions, org), labelOf(focusOptions, focus)),
        summaryFn(
          labelOf(orgOptions, org),
          labelOf(focusOptions, focus),
          labelOf(regionOptions, region),
        ),
        [
          labelOf(orgOptions, org),
          labelOf(focusOptions, focus),
          labelOf(regionOptions, region),
          labelOf(scaleOptions, scale),
        ],
        modules,
        moduleOptions,
        highlights,
        journey,
        accent,
      )
    },
  }
}

export const PRODUCT_DEMO_CONFIGS: Partial<Record<ProductId, ProductDemoConfig>> =
  {
    'core-banking': makeConfig(
      'core-banking',
      'var(--brand-slide-1)',
      'Core Banking demo',
      'Configure a living core blueprint — pick your institution type, modules, and market posture.',
      focusCore,
      coreModules,
      [
        'Institution profile',
        'Product factory setup',
        'Real-time ledger walkthrough',
        'Channel & API connect',
        'Go-live checklist',
      ],
      [
        'Parameter-driven products without code freezes',
        'Real-time balances across channels',
        'Islamic and conventional product coexistence',
        'API-first integration with MBuke & partners',
      ],
      (org, focus) => `${org} · ${focus}`,
      (org, focus, region) =>
        `A tailored Core Banking tour for a ${org.toLowerCase()} focused on ${focus.toLowerCase()}, staged for ${region}.`,
    ),

    'fahim-ai': makeConfig(
      'fahim-ai',
      'var(--brand-accent-2)',
      'Fahim AI demo',
      'Configure your AI code editor session — pick the team focus and capabilities, then watch Fahim write code live.',
      focusFahim,
      fahimModules,
      [
        'Open editor session',
        'Ask a banking question',
        'Fahim explains the approach',
        'Request generated code',
        'Review the file together',
      ],
      [
        'Chat-to-code workflow for banking engineers',
        'Streams explanations and TypeScript side by side',
        'Banking-aware snippets (IBAN, KYC, payments)',
        'Arabic-first prompts when your team needs them',
      ],
      (org) => `Fahim editor · ${org}`,
      (org, focus, region) =>
        `Fahim AI code editor configured for ${focus.toLowerCase()} inside a ${org.toLowerCase()} footprint in ${region}.`,
    ),

    'software-management': makeConfig(
      'software-management',
      'var(--brand-slide-3)',
      'Software Management demo',
      'Build an ops console story — environments, releases, and control planes for your banking estate.',
      focusSms,
      smsModules,
      [
        'Estate inventory',
        'Environment promotion',
        'Release window',
        'Observability pulse',
        'Audit package',
      ],
      [
        'One pane for multi-product estates',
        'Change control with full audit trail',
        'Fewer failed releases and rollbacks',
        'Ops reporting ready for regulators',
      ],
      (org) => `${org} software ops`,
      (org, focus, region) =>
        `Software Management Systems demo for a ${org.toLowerCase()} prioritizing ${focus.toLowerCase()} in ${region}.`,
    ),

    'managed-services': makeConfig(
      'managed-services',
      'var(--brand-slide-4)',
      'Managed Services demo',
      'Compose a managed operating model — coverage, SLAs, and the expertise Tayseer brings to your stack.',
      focusManaged,
      managedModules,
      [
        'Service catalog',
        'Monitoring handover',
        'Incident simulation',
        'Upgrade cadence',
        'SLA scorecard',
      ],
      [
        'Tayseer specialists on-call with your stack',
        'Predictable operating cost',
        'Proactive patching and capacity planning',
        'Board-ready reliability reporting',
      ],
      (org) => `Managed for ${org}`,
      (org, focus, region) =>
        `Managed Services engagement shaped around ${focus.toLowerCase()} for a ${org.toLowerCase()} in ${region}.`,
    ),

    'banking-systems': makeConfig(
      'banking-systems',
      'var(--brand-slide-5)',
      'Banking Systems · GRG demo',
      'Design a GRG hardware + channel story — ATMs, deposit machines, and branch self-service tied to digital banking.',
      focusGrg,
      grgModules,
      [
        'Fleet overview',
        'Customer at the ATM',
        'Cardless / QR withdraw',
        'Branch kiosk assist',
        'Device health dashboard',
      ],
      [
        'GRG devices integrated with digital channels',
        'Cardless journeys with MBuke',
        'Central fleet monitoring',
        'Cash logistics visibility',
      ],
      (_org, focus) => `GRG · ${focus}`,
      (org, focus, region) =>
        `Next-gen GRG banking systems demo for a ${org.toLowerCase()} focused on ${focus.toLowerCase()} in ${region}.`,
    ),
  }

export function getProductDemoConfig(
  productId: string,
): ProductDemoConfig | undefined {
  return PRODUCT_DEMO_CONFIGS[productId as ProductId]
}

export function emptyProductDemoAnswers(
  config: ProductDemoConfig,
): ProductDemoAnswers {
  const single: Record<string, string | null> = {}
  const multi: Record<string, string[]> = {}
  for (const step of config.steps) {
    if (step.mode === 'single') single[step.key] = null
    else multi[step.key] = []
  }
  return { single, multi }
}

export function canProceedDemoStep(
  step: number,
  answers: ProductDemoAnswers,
  config: ProductDemoConfig,
) {
  const meta = config.steps[step - 1]
  if (!meta) return false
  if (meta.mode === 'single') return Boolean(answers.single[meta.key])
  return (answers.multi[meta.key]?.length ?? 0) > 0
}
