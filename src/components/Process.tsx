'use client'
import { useEffect } from 'react'
import { useTranslations } from '@/hooks/useTranslations'

export default function Process() {
  const { get } = useTranslations()

  const steps = [
    { num: '01', time: get('process.step1Time'), title: get('process.step1Title'), desc: get('process.step1Desc'), detail: get('process.step1Detail') },
    { num: '02', time: get('process.step2Time'), title: get('process.step2Title'), desc: get('process.step2Desc'), detail: get('process.step2Detail') },
    { num: '03', time: get('process.step3Time'), title: get('process.step3Title'), desc: get('process.step3Desc'), detail: get('process.step3Detail') },
    { num: '04', time: get('process.step4Time'), title: get('process.step4Title'), desc: get('process.step4Desc'), detail: get('process.step4Detail') },
    { num: '05', time: get('process.step5Time'), title: get('process.step5Title'), desc: get('process.step5Desc'), detail: get('process.step5Detail') },
    { num: '06', time: get('process.step6Time'), title: get('process.step6Title'), desc: get('process.step6Desc'), detail: get('process.step6Detail') },
  ]

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
        <div className="text-center mb-16 reveal">
          <div className="inline-block bg-primary/8 border border-primary/15 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            {get('process.badge')}
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            {get('process.title')}
            <span className="block text-gradient">{get('process.titleHighlight')}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {get('process.subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/25 hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} relative flex gap-6`}>
                {/* Circle + number */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-display font-black ${
                    i === 0 ? 'bg-primary text-white' : 'bg-white border-2 border-primary/30 text-primary'
                  }`}>
                    <div className={`text-xs font-semibold ${i === 0 ? 'text-white/80' : 'text-primary/70'}`}>{step.time}</div>
                    <div className="text-lg leading-none">{step.num}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-2">
                  <h3 className="font-display text-xl font-black text-dark uppercase mb-2">{step.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{step.desc}</p>
                  <div className="bg-primary/8 border-l-4 border-primary text-primary text-xs font-medium px-4 py-2.5 rounded-r-lg leading-relaxed">
                    💡 {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* End badge */}
          <div className="reveal mt-8 text-center bg-dark text-white rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="font-display text-3xl font-black uppercase mb-2">
              {get('process.endBadge')}
            </div>
            <div className="text-white/75 text-sm">
              {get('process.endText')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
