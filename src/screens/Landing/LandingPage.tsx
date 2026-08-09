import { useEffect, useState } from 'react'
import { NeuralCanvas } from '@/screens/Landing/prototype/NeuralCanvas'
import { ProductCarousel } from '@/screens/Landing/prototype/ProductCarousel'
import {
  ArchitectureSection,
  ContactSection,
  EcosystemSection,
  HeroSection,
  HomeFooter,
  HomeNav,
  PresenceSection,
  StatsSection,
  StoriesSection,
} from '@/screens/Landing/prototype/HomeSections'

const PROTO_CSS_HREF = '/prototype/styles.css?v=7'

/**
 * Marketing homepage ported from `_reference/tayseer-prototype`.
 * Circular product carousel CTAs open existing internal demo flows.
 */
export function LandingPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Load prototype CSS from /public so Tailwind/Vite never parse it
    let link = document.querySelector<HTMLLinkElement>(
      `link[data-tayseer-proto="1"]`,
    )
    if (!link) {
      link = document.createElement('link')
      link.rel = 'stylesheet'
      link.dataset.tayseerProto = '1'
      document.head.appendChild(link)
    }
    link.href = PROTO_CSS_HREF

    const prevBg = document.body.style.background
    document.body.style.background = '#03060F'

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.body.style.background = prevBg
      window.removeEventListener('scroll', onScroll)
      link?.remove()
    }
  }, [])

  return (
    <div className="tayseer-home">
      <div className="cursor-glow" id="cursorGlow" aria-hidden />
      <div
        className="scroll-progress"
        id="scrollProgress"
        aria-hidden
        style={{ width: `${progress}%` }}
      />
      <NeuralCanvas />

      <HomeNav />

      <main>
        <HeroSection />
        <ProductCarousel />
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
