import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { routes } from '@/lib/constants'
import { cn } from '@/lib/cn'

const nav = [
  { to: routes.products, label: 'Products' },
  { to: routes.architecture, label: 'Architecture' },
  { to: routes.contact, label: 'Contact' },
] as const

/**
 * Global site header — identical on home, marketing, demos, and lab pages.
 */
export function SiteHeader({ className }: { className?: string }) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className={cn('site-header', scrolled && 'is-scrolled', className)}>
      <nav className={cn('site-nav', open && 'is-open')} id="nav" aria-label="Site">
        <Link
          to={routes.home}
          className="site-nav__brand"
          onClick={() => setOpen(false)}
        >
          <span className="site-nav__mark" aria-hidden />
          <span>Tayseer</span>
        </Link>

        <div className="site-nav__links">
          {nav.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="site-nav__right">
          <Link
            to={routes.experiments}
            className="site-nav__lab"
            onClick={() => setOpen(false)}
          >
            AI Playground
          </Link>
          <button
            className="site-nav__toggle"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  )
}
