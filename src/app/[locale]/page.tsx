import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SocialProofBar from '@/components/SocialProofBar'
import Problem from '@/components/Problem'
import BeforeAfter from '@/components/BeforeAfter'
import Benefits from '@/components/Benefits'
import Pricing from '@/components/Pricing'
import Process from '@/components/Process'
import LeadForm from '@/components/LeadForm'
import ColorSelector from '@/components/ColorSelector'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SocialProofBar />
      <Problem />
      <BeforeAfter />
      <ColorSelector />
      <Benefits />
      <Pricing />
      <Process />
      <LeadForm />
      <Testimonials />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
