export type DemoStepId =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'send'
  | 'bills'
  | 'agents'
  | 'analytics'
  | 'done'

export interface DemoStep {
  id: DemoStepId
  title: string
  description: string
  /** Floating label shown next to the phone during this step */
  callout: string
  /** Which side of the phone the callout appears on */
  side: 'left' | 'right'
  /** Vertical position of the callout (% from top of phone area) */
  calloutTop: number
  duration: number
  /** Operations show a success animation before moving on */
  operation: boolean
}

export const mbukeDemoScript: DemoStep[] = [
  {
    id: 'splash',
    title: 'App launch',
    description: 'The white-label shell boots with your brand and theme.',
    callout: 'Your brand, MBuke engine',
    side: 'left',
    calloutTop: 18,
    duration: 2600,
    operation: false,
  },
  {
    id: 'onboarding',
    title: 'Customer onboarding',
    description: 'Fahim AI scans the ID and verifies KYC in seconds.',
    callout: 'Fahim AI · ID scan',
    side: 'right',
    calloutTop: 26,
    duration: 3600,
    operation: true,
  },
  {
    id: 'home',
    title: 'Wallet home',
    description: 'Balance, quick actions, and a live activity feed.',
    callout: 'Real-time balance',
    side: 'left',
    calloutTop: 30,
    duration: 3000,
    operation: false,
  },
  {
    id: 'send',
    title: 'P2P transfer',
    description: 'SAR 250 sent to Amina — instant and fee-free.',
    callout: 'Instant ledger update',
    side: 'right',
    calloutTop: 46,
    duration: 3800,
    operation: true,
  },
  {
    id: 'bills',
    title: 'Bill payment',
    description: 'Electricity bill settled straight from the wallet.',
    callout: 'Biller network connected',
    side: 'left',
    calloutTop: 52,
    duration: 3400,
    operation: true,
  },
  {
    id: 'agents',
    title: 'Agent cash-in',
    description: 'A nearby agent tops up the wallet, synced live.',
    callout: 'Agent network · online',
    side: 'right',
    calloutTop: 64,
    duration: 3200,
    operation: true,
  },
  {
    id: 'analytics',
    title: 'Operator view',
    description: 'Every transaction lands in the operator dashboard.',
    callout: 'Operator analytics',
    side: 'left',
    calloutTop: 70,
    duration: 3200,
    operation: false,
  },
  {
    id: 'done',
    title: 'Demo complete',
    description: 'One platform — onboarding to analytics, fully white-label.',
    callout: 'Ready to launch',
    side: 'right',
    calloutTop: 40,
    duration: 4000,
    operation: false,
  },
]
