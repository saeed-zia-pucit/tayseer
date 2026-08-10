import { useEffect, useState } from 'react'
import {
  ArchitectureSection,
  ContactSection,
  EcosystemSection,
  HomeFooter,
  StatsSection,
  StoriesSection,
} from '@/screens/Landing/prototype/HomeSections'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HomeHubHero } from '@/screens/Landing/videinfra/HomeHubHero'
import { VideInfraExperience } from '@/screens/Landing/videinfra/VideInfraExperience'

const PROTO_CSS_HREF = '/prototype/styles.css?v=15'
const VI_CSS_HREF = '/videinfra/styles.css?v=23'

/**
 * Homepage: brand hub hero → Vide Infra product carousel → modules.
 */
export function LandingPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ensureLink = (href: string, key: string) => {
      let link = document.querySelector<HTMLLinkElement>(
        `link[data-tayseer-css="${key}"]`,
      )
      if (!link) {
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.dataset.tayseerCss = key
        document.head.appendChild(link)
      }
      link.href = href
      return link
    }

    const proto = ensureLink(PROTO_CSS_HREF, 'proto')
    const vi = ensureLink(VI_CSS_HREF, 'vi')

    const prevBg = document.body.style.background
    document.body.style.background = 'var(--brand-bg)'

    // Always land on the hub hero when entering home (logo / route restore).
    window.scrollTo(0, 0)

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.body.style.background = prevBg
      window.removeEventListener('scroll', onScroll)
      proto.remove()
      vi.remove()
    }
  }, [])

  return (
    <div className="tayseer-home vi-home">
      <div
        className="scroll-progress"
        id="scrollProgress"
        aria-hidden
        style={{ width: `${progress}%` }}
      />

      <SiteHeader />

      <main>
        <HomeHubHero />
        <VideInfraExperience />
        <EcosystemSection />
        <ArchitectureSection />
        <StatsSection />
        <StoriesSection />
        <ContactSection />
      </main>

      <HomeFooter />
    </div>
  )
}
