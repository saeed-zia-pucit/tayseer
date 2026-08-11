import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BRAND_ASSETS, SITE_NAME } from '@/lib/brand'
import { routes } from '@/lib/constants'
import { cn } from '@/lib/cn'

/** Same labels / structure as marketing home header. */
const homeNav = [
  { label: 'Solutions', href: '/' },
  { label: 'Services', href: '/' },
  { label: 'Expertise', href: '/' },
  { label: 'Case Studies', href: '/' },
  { label: 'Company', href: '/' },
  { label: 'Blog', href: '/' },
  { label: 'Partnership', href: '/' },
] as const

/**
 * Top bar for /app screens — Tayseer logo, center pill, Contact Us.
 * Marketing homepage lives at `/` (static).
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
        <a href="/" className="site-nav__brand" onClick={() => setOpen(false)}>
          <img
            className="site-nav__logo"
            src={BRAND_ASSETS.logoLight}
            alt={SITE_NAME}
            width={180}
            height={39}
          />
        </a>

        <div className="site-nav__pill" role="presentation">
          <div className="site-nav__links">
            {homeNav.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <NavLink
              to={routes.contact}
              className="site-nav__contact-mobile"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </NavLink>
          </div>
        </div>

        <div className="site-nav__right">
          <NavLink
            to={routes.contact}
            className="site-nav__contact"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </NavLink>
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
