'use client'
import { useEffect } from 'react'
import { MapPin, Medal, Users, Wrench } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'

const cities = ['Longueuil', 'Brossard', 'Saint-Hubert', 'La Prairie', 'Boucherville', 'Sainte-Julie', 'Laval']
const cardIcons = [MapPin, Medal, Users, Wrench]

export default function About() {
  const { get } = useTranslations()

  const cards = cardIcons.map((Icon, i) => ({
    Icon,
    title: get(`about.card${i + 1}Title`),
    desc: get(`about.card${i + 1}Desc`),
  }))

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="inline-block bg-primary/8 border border-primary/15 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {get('about.badge')}
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-6">
              {get('about.title')}
              <span className="block text-gradient">{get('about.titleHighlight')}</span>
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p className="text-lg">
                {get('about.p1Pre')} <strong className="text-dark">{get('about.p1Bold')}</strong>
              </p>
              <p>{get('about.p2')}</p>
              <p>
                {get('about.p3Pre')} <strong className="text-dark">{get('about.p3Bold')}</strong>{get('about.p3Post')}
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="grid grid-cols-2 gap-4">
              {cards.map(({ Icon, title, desc }, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm card-lift">
                  <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center mb-4">
                    <Icon weight="duotone" size={20} color="#DC2626" />
                  </div>
                  <h3 className="font-bold text-dark text-sm mb-2">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Zone map */}
            <div className="mt-4 bg-dark text-white rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">{get('about.zoneLabel')}</div>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <span key={city} className="bg-white/8 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-lg">{city}</span>
                ))}
                <span className="bg-white/8 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-lg">{get('about.zoneOther')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
