import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { journeyNodes, journeyStages } from '@/data/implementationJourney'
import type {
  JourneyNodeId,
  LogEntry,
} from '@/types/implementationJourney'

export const connectionSteps = [
  'Generating API Keys',
  'Registering Webhooks',
  'Verifying Authentication',
  'Running Health Checks',
] as const

interface ImplementationJourneyContextValue {
  unlockedStageIndex: number
  connected: Set<JourneyNodeId>
  selectedId: JourneyNodeId | null
  /** Node currently running the live connection simulation */
  connectingId: JourneyNodeId | null
  /** Index into connectionSteps, -1 when idle */
  connectingStep: number
  logs: LogEntry[]
  complete: boolean
  selectNode: (id: JourneyNodeId) => void
  connectNode: (id: JourneyNodeId) => void
  canConnect: (id: JourneyNodeId) => boolean
  isStageUnlocked: (stageIndex: number) => boolean
  reset: () => void
}

const ImplementationJourneyContext =
  createContext<ImplementationJourneyContextValue | null>(null)

function stageFullyConnected(
  stageIndex: number,
  connected: Set<JourneyNodeId>,
) {
  const stage = journeyStages[stageIndex]
  if (!stage) return false
  return stage.nodeIds.every((id) => connected.has(id) || id === 'core')
}

function now() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ImplementationJourneyProvider({
  children,
}: {
  children: ReactNode
}) {
  const [unlockedStageIndex, setUnlockedStageIndex] = useState(0)
  const [connected, setConnected] = useState<Set<JourneyNodeId>>(
    () => new Set<JourneyNodeId>(['core']),
  )
  const [selectedId, setSelectedId] = useState<JourneyNodeId | null>(null)
  const [connectingId, setConnectingId] = useState<JourneyNodeId | null>(null)
  const [connectingStep, setConnectingStep] = useState(-1)
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'boot', time: now(), message: 'Tayseer integration console ready' },
  ])
  const timersRef = useRef<number[]>([])

  const pushLog = useCallback((message: string) => {
    setLogs((prev) => [
      ...prev.slice(-40),
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        time: now(),
        message,
      },
    ])
  }, [])

  const isStageUnlocked = useCallback(
    (stageIndex: number) => stageIndex <= unlockedStageIndex,
    [unlockedStageIndex],
  )

  const canConnect = useCallback(
    (id: JourneyNodeId) => {
      if (connected.has(id) || connectingId) return false
      const node = journeyNodes[id]
      const stageIndex = journeyStages.findIndex((s) => s.nodeIds.includes(id))
      if (stageIndex > unlockedStageIndex) return false
      return node.dependencies.every((d) => connected.has(d))
    },
    [connected, connectingId, unlockedStageIndex],
  )

  const selectNode = useCallback((id: JourneyNodeId) => {
    setSelectedId(id)
  }, [])

  const finishConnection = useCallback(
    (id: JourneyNodeId) => {
      setConnected((prev) => {
        const next = new Set(prev)
        next.add(id)
        const stageIdx = journeyStages.findIndex((s) => s.nodeIds.includes(id))
        if (
          stageFullyConnected(stageIdx, next) &&
          stageIdx === unlockedStageIndex &&
          unlockedStageIndex < journeyStages.length - 1
        ) {
          setUnlockedStageIndex((u) => u + 1)
          pushLog(`${journeyStages[stageIdx + 1].title} stage unlocked`)
        }
        return next
      })
      setConnectingId(null)
      setConnectingStep(-1)
      pushLog(`${journeyNodes[id].label} integration complete ✓`)
    },
    [pushLog, unlockedStageIndex],
  )

  const connectNode = useCallback(
    (id: JourneyNodeId) => {
      if (connected.has(id)) {
        setSelectedId(id)
        return
      }
      if (!canConnect(id)) {
        setSelectedId(id)
        return
      }

      setSelectedId(id)
      setConnectingId(id)
      setConnectingStep(0)
      pushLog(`Connecting ${journeyNodes[id].label}…`)

      const stepMs = 620
      connectionSteps.forEach((label, i) => {
        timersRef.current.push(
          window.setTimeout(() => {
            setConnectingStep(i)
            pushLog(label)
          }, i * stepMs),
        )
      })
      timersRef.current.push(
        window.setTimeout(
          () => finishConnection(id),
          connectionSteps.length * stepMs + 300,
        ),
      )
    },
    [canConnect, connected, finishConnection, pushLog],
  )

  const reset = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
    setUnlockedStageIndex(0)
    setConnected(new Set<JourneyNodeId>(['core']))
    setSelectedId(null)
    setConnectingId(null)
    setConnectingStep(-1)
    setLogs([{ id: 'boot', time: now(), message: 'Journey reset — console ready' }])
  }, [])

  const complete = useMemo(() => {
    const required = journeyStages.flatMap((s) => s.nodeIds)
    return required.every((id) => connected.has(id) || id === 'core')
  }, [connected])

  const value = useMemo(
    () => ({
      unlockedStageIndex,
      connected,
      selectedId,
      connectingId,
      connectingStep,
      logs,
      complete,
      selectNode,
      connectNode,
      canConnect,
      isStageUnlocked,
      reset,
    }),
    [
      unlockedStageIndex,
      connected,
      selectedId,
      connectingId,
      connectingStep,
      logs,
      complete,
      selectNode,
      connectNode,
      canConnect,
      isStageUnlocked,
      reset,
    ],
  )

  return (
    <ImplementationJourneyContext.Provider value={value}>
      {children}
    </ImplementationJourneyContext.Provider>
  )
}

export function useImplementationJourney() {
  const ctx = useContext(ImplementationJourneyContext)
  if (!ctx) {
    throw new Error(
      'useImplementationJourney must be used within ImplementationJourneyProvider',
    )
  }
  return ctx
}
