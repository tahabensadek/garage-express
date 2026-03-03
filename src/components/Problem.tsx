'use client'
import { useEffect } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { X, AlertTriangle } from 'lucide-react'

export default function Problem() {
  const { get } = useTranslations()

  const problems = [
    { title: get('problem.problem1Title'), desc: get('problem.problem1Desc') },
    { title: get('problem.problem2Title'), desc: get('problem.problem2Desc') },
    { title: get('problem.problem3Title'), desc: get('problem.problem3Desc') },
    { title: get('problem.problem4Title'), desc: get('problem.problem4Desc') },
    { title: get('problem.problem5Title'), desc: get('problem.problem5Desc') },
    { title: get('problem.problem6Title'), desc: get('problem.problem6Desc') },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="pourquoi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" />
            {get('problem.badge')}
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-6">
            {get('problem.title')}
            <span className="block text-gradient">{get('problem.titleHighlight')}</span>
            <span className="block text-dark">{get('problem.titleEnd')}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {get('problem.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {problems.map((p, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 4) + 1} bg-gray-50 border border-gray-100 rounded-2xl p-6 flex gap-4`}>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-dark mb-2 text-base">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal bg-dark text-white rounded-3xl p-10 text-center max-w-3xl mx-auto">
          <div className="font-display text-4xl font-black uppercase mb-4">
            {get('problem.bridgeTitle')}<br />
            <span className="text-gradient">{get('problem.bridgeHighlight')}</span>
          </div>
          <p className="text-white/60 text-lg mb-6">
            {get('problem.bridgeText')}
          </p>
          <a href="#soumission" className="relative overflow-hidden inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl text-base transition-all btn-shimmer">
            {get('problem.bridgeCta')}
          </a>
        </div>
      </div>
    </section>
  )
}