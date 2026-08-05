import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '@/lib/constants'
import { LandingPage } from '@/screens/Landing'
import { ProductFinderPage } from '@/screens/ProductFinder'
import { ResultsPage } from '@/screens/Results'

export function AppRouter() {
  return (
    <Routes>
      <Route path={routes.home} element={<LandingPage />} />
      <Route path={routes.finder} element={<ProductFinderPage />} />
      <Route path={routes.results} element={<ResultsPage />} />
      <Route path="*" element={<Navigate to={routes.home} replace />} />
    </Routes>
  )
}
