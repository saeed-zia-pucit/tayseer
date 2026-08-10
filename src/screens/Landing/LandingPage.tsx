import { useEffect, useState } from 'react'
import {
  ArchitectureSection,
  ContactSection,
  EcosystemSection,
  HomeFooter,
  PresenceSection,
  StatsSection,
  StoriesSection,
} from '@/screens/Landing/prototype/HomeSections'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { VideInfraExperience } from '@/screens/Landing/videinfra/VideInfraExperience'

const PROTO_CSS_HREF = '/prototype/styles.css?v=11'
const VI_CSS_HREF = '/videinfra/styles.css?v=17'

/**
 * Homepage: Vide Infra–style horizontal product scroll for the top,
 * then existing Tayseer modules below.
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
        <VideInfraExperience />
        <EcosystemSection />
        <ArchitectureSection />
        <StatsSection />
        <PresenceSection />
        <StoriesSection />
        <ContactSection />
      </main>

      <HomeFooter />
    </div>
  )
}
