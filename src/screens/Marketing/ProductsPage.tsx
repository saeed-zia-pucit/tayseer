import { Link } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PRODUCT_CATALOG } from '@/data/productCatalog'
import { routes } from '@/lib/constants'

export function ProductsPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface text-ink">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 65% 45% at 8% -5%, rgb(var(--brand-accent-rgb) / 0.28), transparent 55%),
            radial-gradient(ellipse 50% 40% at 95% 8%, rgb(var(--brand-accent-2-rgb) / 0.2), transparent 50%),
            linear-gradient(165deg, var(--brand-bg-deep), var(--brand-bg) 50%, var(--brand-bg-elevated))
          `,
        }}
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <section className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon-bright">
            Product lineup
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Banking platforms built to ship
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Six products spanning core, AI, mobile, operations, managed services,
            and branch hardware — each with a live interactive demo.
          </p>
        </section>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATALOG.map((product) => (
            <li key={product.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl ring-1 ring-white/12">
                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, var(--brand-slide-1), var(--brand-slide-2))`,
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    className="h-full w-full object-cover opacity-90"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                    {product.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-xl font-bold">{product.name}</h2>
                  <p className="mt-1 text-sm font-medium text-lagoon-bright">
                    {product.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {product.blurb}
                  </p>
                  <Link
                    to={product.demoPath}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-lagoon-bright"
                  >
                    Open demo
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            to={routes.finder}
            className="rounded-full bg-lagoon px-5 py-2.5 text-sm font-semibold text-mist shadow-lift hover:bg-lagoon-bright"
          >
            Find your stack
          </Link>
          <Link
            to={routes.contact}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-white/15 hover:bg-white/5"
          >
            Talk to us
          </Link>
        </div>
      </main>
    </div>
  )
}
