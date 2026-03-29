import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SocialProofBar from '@/components/SocialProofBar'
import Problem from '@/components/Problem'
import Gallery from '@/components/Gallery'
import Benefits from '@/components/Benefits'
import Stats from '@/components/Stats'
import Pricing from '@/components/Pricing'
import Process from '@/components/Process'
import ColorSelector from '@/components/ColorSelector'
import LeadForm from '@/components/LeadForm'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import UrgencyBanner from '@/components/UrgencyBanner'
import StickyMobileBar from '@/components/StickyMobileBar'
import FloatingCTA from '@/components/FloatingCTA'
import SystemLayers from '@/components/SystemLayers'
import ReturnToService from '@/components/ReturnToService'

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
