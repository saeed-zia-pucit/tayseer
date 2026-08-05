import { BrowserRouter } from 'react-router-dom'
import { FinderProvider } from '@/app/providers'
import { AppRouter } from '@/app/router'

export default function App() {
  return (
    <BrowserRouter>
      <FinderProvider>
        <AppRouter />
      </FinderProvider>
    </BrowserRouter>
  )
}
