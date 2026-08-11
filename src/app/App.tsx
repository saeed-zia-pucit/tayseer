import { BrowserRouter } from 'react-router-dom'
import { CoreIntegrationsProvider } from '@/app/coreIntegrationsProvider'
import { FinderProvider } from '@/app/providers'
import { ImplementationJourneyProvider } from '@/app/implementationJourneyProvider'
import { MbukeDemoProvider } from '@/app/mbukeDemoProvider'
import { ProductDemoProvider } from '@/app/productDemoProvider'
import { WhiteLabelProvider } from '@/app/whiteLabelProvider'
import { AppRouter } from '@/app/router'

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <FinderProvider>
        <WhiteLabelProvider>
          <MbukeDemoProvider>
            <ProductDemoProvider>
              <CoreIntegrationsProvider>
                <ImplementationJourneyProvider>
                  <AppRouter />
                </ImplementationJourneyProvider>
              </CoreIntegrationsProvider>
            </ProductDemoProvider>
          </MbukeDemoProvider>
        </WhiteLabelProvider>
      </FinderProvider>
    </BrowserRouter>
  )
}
