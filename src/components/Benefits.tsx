'use client'
import { useEffect, useRef } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { Lightning, Shield, Drop, Thermometer, Sparkle, Clock } from '@phosphor-icons/react'

export default function Benefits() {
  const { get } = useTranslations()

  const benefits = [
    { icon: Clock,       title: get('benefits.benefit1Title'), desc: get('benefits.benefit1Desc'), highlight: true  },
    { icon: Shield,      title: get('benefits.benefit2Title'), desc: get('benefits.benefit2Desc'), highlight: false },
    { icon: Drop,        title: get('benefits.benefit3Title'), desc: get('benefits.benefit3Desc'), highlight: false },
    { icon: Thermometer, title: get('benefits.benefit4Title'), desc: get('benefits.benefit4Desc'), highlight: false },
    { icon: Lightning,   title: get('benefits.benefit5Title'), desc: get('benefits.benefit5Desc'), highlight: false },
    { icon: Sparkle,     title: get('benefits.benefit6Title'), desc: get('benefits.benefit6Desc'), highlight: false },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-dark noise relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <div className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            {get('benefits.badge')}
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-4">
            {get('benefits.title')}
            <span className="block text-gradient">{get('benefits.titleHighlight')}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {get('benefits.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} card-lift rounded-2xl p-7 border relative overflow-hidden ${
                b.highlight
                  ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20'
                  : 'bg-white/4 border-white/8'
              }`}
              style={{ '--shine-delay': `${i * 0.4}s` } as React.CSSProperties}
            >
              {/* Shine sweep */}
              <span className="shine-sweep" />

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                b.highlight ? 'bg-primary' : 'bg-white/8'
              }`}>
                <b.icon weight="duotone" size={24} color={b.highlight ? '#ffffff' : '#DC2626'} />
              </div>
              <h3 className="font-display text-xl font-bold text-white uppercase leading-tight mb-3">{b.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 bg-white/4 border border-white/8 rounded-3xl p-8">
          <h3 className="font-display text-3xl font-black text-white uppercase text-center mb-8">
            {get('benefits.comparisonTitle')}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 font-medium py-3 pr-6">{get('benefits.comparisonFeature')}</th>
                  <th className="text-center text-white/40 font-medium py-3 px-4">{get('benefits.comparisonEpoxy')}</th>
                  <th className="text-center text-primary font-bold py-3 px-4">{get('benefits.comparisonPoly')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {([1,2,3,4,5,6] as const).map((n, i) => (
                  <tr key={i}>
                    <td className="text-white/70 py-3 pr-6">{get(`benefits.comparisonRow${n}`)}</td>
                    <td className="text-center text-white/30 py-3 px-4">{get(`benefits.comparisonEpoxy${n}`)}</td>
                    <td className="text-center text-primary font-semibold py-3 px-4">{get(`benefits.comparisonPoly${n}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
