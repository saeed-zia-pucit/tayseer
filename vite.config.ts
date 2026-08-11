import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/**
 * SPA fallback for /app/* so React Router deep links work in dev + preview,
 * while / stays the static marketing homepage.
 */
function appSpaFallback(): Plugin {
  const rewrite = (
    req: { url?: string },
    _res: unknown,
    next: () => void,
  ) => {
    const raw = req.url ?? ''
    const url = raw.split('?')[0] ?? ''
    const isAppPath = url === '/app' || url.startsWith('/app/')
    const looksLikeFile = /\.[a-zA-Z0-9]+$/.test(url)
    if (isAppPath && !looksLikeFile && url !== '/app/index.html') {
      req.url = '/app/index.html'
    }
    next()
  }

  return {
    name: 'app-spa-fallback',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss(), appSpaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, 'index.html'),
        app: path.resolve(rootDir, 'app/index.html'),
      },
    },
  },
})
