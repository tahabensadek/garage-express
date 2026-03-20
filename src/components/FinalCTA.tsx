'use client'
import { useEffect } from 'react'
import { Phone, ArrowRight } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'

export default function FinalCTA() {
  const { get } = useTranslations()

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-primary relative overflow-hidden noise">
      {/* Background geometry */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 border-2 border-white rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="reveal">
          <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-white uppercase leading-none mb-6">
            {get('finalCta.title')}
            <span className="block italic">{get('finalCta.titleHighlight')}</span>
            <span className="block text-white/30">{get('finalCta.titleEnd')}</span>
          </h2>
          <p className="text-white/75 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {get('finalCta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#soumission"
              className="group relative overflow-hidden bg-white text-primary hover:bg-gray-50 font-black px-10 py-5 rounded-xl text-lg transition-all shadow-2xl flex items-center justify-center gap-2">
              {get('finalCta.ctaPrimary')}
              <ArrowRight weight="bold" size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`tel:${get('finalCta.ctaPhone').replace(/-/g, '')}`}
              className="bg-white/15 hover:bg-white/25 border-2 border-white/40 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Phone weight="duotone" size={24} />
              {get('finalCta.ctaPhone')}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <span>✓ {get('finalCta.trust1')}</span>
            <span>✓ {get('finalCta.trust2')}</span>
            <span>✓ {get('finalCta.trust3')}</span>
            <span>✓ {get('finalCta.trust4')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
