import { BrowserRouter } from 'react-router-dom'
import { CoreIntegrationsProvider } from '@/app/coreIntegrationsProvider'
import { FinderProvider } from '@/app/providers'
import { ImplementationJourneyProvider } from '@/app/implementationJourneyProvider'
import { MbukeDemoProvider } from '@/app/mbukeDemoProvider'
import { WhiteLabelProvider } from '@/app/whiteLabelProvider'
import { AppRouter } from '@/app/router'

export default function App() {
  return (
    <BrowserRouter>
      <FinderProvider>
        <WhiteLabelProvider>
          <MbukeDemoProvider>
            <CoreIntegrationsProvider>
              <ImplementationJourneyProvider>
                <AppRouter />
              </ImplementationJourneyProvider>
            </CoreIntegrationsProvider>
          </MbukeDemoProvider>
        </WhiteLabelProvider>
      </FinderProvider>
    </BrowserRouter>
  )
}
