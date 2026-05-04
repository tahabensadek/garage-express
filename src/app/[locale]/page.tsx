import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SocialProofBar from '@/components/SocialProofBar'
import Problem from '@/components/Problem'
import UrgencyBanner from '@/components/UrgencyBanner'

// Below-fold — code-split, still SSR'd (bon pour SEO)
const Gallery = dynamic(() => import('@/components/Gallery'))
const Benefits = dynamic(() => import('@/components/Benefits'))
const ReturnToService = dynamic(() => import('@/components/ReturnToService'))
const SystemLayers = dynamic(() => import('@/components/SystemLayers'))
const Stats = dynamic(() => import('@/components/Stats'))
const Pricing = dynamic(() => import('@/components/Pricing'))
const Process = dynamic(() => import('@/components/Process'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const About = dynamic(() => import('@/components/About'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const FinalCTA = dynamic(() => import('@/components/FinalCTA'))
const Footer = dynamic(() => import('@/components/Footer'))

// Composants lourds + interactifs — pas de SSR, chunk séparé
const ColorSelector = dynamic(() => import('@/components/ColorSelector'), { ssr: false })
const LeadForm = dynamic(() => import('@/components/LeadForm'), { ssr: false })
const StickyMobileBar = dynamic(() => import('@/components/StickyMobileBar'), { ssr: false })
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), { ssr: false })

function WaveDivider({ flip = false, from = '#ffffff', to = '#0C0C0C' }: { flip?: boolean; from?: string; to?: string }) {
  return (
    <div className="relative h-16 overflow-hidden" style={{ background: from }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill={to} />
      </svg>
    </div>
  )
}

function DiagDivider({ from = '#ffffff', to = '#0C0C0C' }: { from?: string; to?: string }) {
  return (
    <div className="relative h-14 overflow-hidden" style={{ background: from }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
        <polygon points="0,0 1440,56 1440,56 0,56" fill={to} />
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <UrgencyBanner />
      <Hero />
      <SocialProofBar />
      <Problem />
      <Gallery />

      <Benefits />
      <ReturnToService />
      <SystemLayers />
      <Stats />

      <ColorSelector />

      <WaveDivider from="#0C0C0C" to="#ffffff" />
      <Pricing />
      <Process />

      <WaveDivider flip from="#f9fafb" to="#0C0C0C" />
      <Testimonials />

      <WaveDivider from="#0C0C0C" to="#ffffff" />
      <About />
      <FAQ />

      <DiagDivider from="#ffffff" to="#0C0C0C" />
      <LeadForm />

      <DiagDivider from="#0C0C0C" to="#DC2626" />
      <FinalCTA />
      <Footer />
      <StickyMobileBar />
      <FloatingCTA />
    </main>
  )
}
