import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '@/lib/constants'
import {
  CoreIntegrationsFinderPage,
  CoreIntegrationsResultsPage,
} from '@/screens/CoreIntegrations'
import { ImplementationJourneyPage } from '@/screens/ImplementationJourney'
import { LandingPage } from '@/screens/Landing'
import {
  MbukeDemoFinderPage,
  MbukeDemoResultsPage,
} from '@/screens/MbukeDemo'
import { ExperimentsPage } from '@/screens/Experiments'
import { ThemeLabPage } from '@/screens/ThemeLab'
import {
  ProductDemoFinderPage,
  ProductDemoResultsPage,
} from '@/screens/ProductDemo'
import { ProductFinderPage } from '@/screens/ProductFinder'
import { ResultsPage } from '@/screens/Results'
import {
  WhiteLabelFinderPage,
  WhiteLabelResultsPage,
} from '@/screens/WhiteLabel'

export function AppRouter() {
  return (
    <Routes>
      <Route path={routes.home} element={<LandingPage />} />
      <Route
        path={routes.finder}
        element={<ProductFinderPage variant="panel" />}
      />
      <Route
        path={routes.finderPhone}
        element={<ProductFinderPage variant="phone" />}
      />
      <Route path={routes.whiteLabel} element={<WhiteLabelFinderPage />} />
      <Route
        path={routes.whiteLabelResults}
        element={<WhiteLabelResultsPage />}
      />
      <Route path={routes.mbukeDemo} element={<MbukeDemoFinderPage />} />
      <Route
        path={routes.mbukeDemoResults}
        element={<MbukeDemoResultsPage />}
      />
      <Route
        path="/demo/:productId"
        element={<ProductDemoFinderPage />}
      />
      <Route
        path="/demo/:productId/results"
        element={<ProductDemoResultsPage />}
      />
      <Route
        path={routes.coreIntegrations}
        element={<CoreIntegrationsFinderPage />}
      />
      <Route
        path={routes.coreIntegrationsResults}
        element={<CoreIntegrationsResultsPage />}
      />
      <Route
        path={routes.implementationJourney}
        element={<ImplementationJourneyPage />}
      />
      <Route path={routes.results} element={<ResultsPage />} />
      <Route path={routes.experiments} element={<ExperimentsPage />} />
      <Route path={routes.themeLab} element={<ThemeLabPage />} />
      <Route path="*" element={<Navigate to={routes.home} replace />} />
    </Routes>
  )
}
