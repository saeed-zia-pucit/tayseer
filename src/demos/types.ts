import type { ProductId } from '@/data/productCatalog'

export type DemoOption = {
  value: string
  label: string
  hint?: string
}

export type DemoStepConfig = {
  id: number
  key: string
  title: string
  short: string
  mode: 'single' | 'multi'
  sectionLabel?: string
  options: DemoOption[]
}

export type ProductDemoAnswers = {
  single: Record<string, string | null>
  multi: Record<string, string[]>
}

export type DemoJourneyBeat = {
  id: string
  title: string
  detail: string
}

export type ProductDemoResult = {
  productId: ProductId
  productName: string
  title: string
  summary: string
  chips: string[]
  modules: { id: string; name: string; hint?: string }[]
  highlights: string[]
  journey: DemoJourneyBeat[]
  previewAccent: string
}

export type ProductDemoConfig = {
  productId: ProductId
  eyebrow: string
  intro: string
  launchLabel: string
  steps: DemoStepConfig[]
  /** Default accent hex for preview chrome */
  accent: string
  buildResult: (answers: ProductDemoAnswers) => ProductDemoResult | null
}
