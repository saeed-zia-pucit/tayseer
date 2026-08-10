import { PRODUCT_CATALOG } from '@/data/productCatalog'
import { routes } from '@/lib/constants'

export type ExperimentItem = {
  id: string
  title: string
  blurb: string
  tag: string
  path: string
  accent: 'accent' | 'accent2' | 'accent3' | 'soft'
}

const accents: ExperimentItem['accent'][] = [
  'accent',
  'accent2',
  'accent3',
  'soft',
  'accent',
  'accent2',
]

/** Product interactive demos — one card per Tayseer product. */
const productExperiments: ExperimentItem[] = PRODUCT_CATALOG.map(
  (product, index) => ({
    id: `demo-${product.id}`,
    title: `${product.name} Demo`,
    blurb: product.blurb,
    tag: product.tag,
    path: product.demoPath,
    accent: accents[index % accents.length],
  }),
)

/** Internal flows users can open and try from the Experiments hub. */
export const experiments: ExperimentItem[] = [
  ...productExperiments,
  {
    id: 'product-finder',
    title: 'Product Finder',
    blurb:
      'Answer a short guided flow and get a recommended Tayseer product stack for your bank or fintech.',
    tag: 'Discovery',
    path: routes.finder,
    accent: 'accent',
  },
  {
    id: 'white-label',
    title: 'White-Label Demo Builder',
    blurb:
      'Configure brand, modules, and language — then preview a tailored banking app shell live.',
    tag: 'Demo builder',
    path: routes.whiteLabel,
    accent: 'accent2',
  },
  {
    id: 'core-integrations',
    title: 'Core & Integrations',
    blurb:
      'Map channels, rails, and systems — explore how Tayseer connects into your architecture.',
    tag: 'Architecture',
    path: routes.coreIntegrations,
    accent: 'soft',
  },
  {
    id: 'implementation',
    title: 'Implementation Journey',
    blurb:
      'Follow an interactive delivery path from kickoff through integration and go-live milestones.',
    tag: 'Delivery',
    path: routes.implementationJourney,
    accent: 'accent',
  },
  {
    id: 'theme-lab',
    title: 'Theme Lab',
    blurb:
      'Tweak brand colours, save prefs in the browser, and preview the palette across the app.',
    tag: 'Design',
    path: routes.themeLab,
    accent: 'accent2',
  },
]
