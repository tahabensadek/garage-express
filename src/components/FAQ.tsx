'use client'
import { useEffect, useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'

const FAQ_COUNT = 14

export default function FAQ() {
  const { get } = useTranslations()
  const [open, setOpen] = useState<number | null>(0)

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: get(`faq.q${i + 1}`),
    a: get(`faq.a${i + 1}`),
  }))

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            {get('faq.title')}
            <span className="block text-gradient">{get('faq.titleHighlight')}</span>
          </h2>
          <p className="text-gray-600 text-lg">{get('faq.subtitle')}</p>
        </div>

        <div className="space-y-3 reveal">
          {faqs.map((faq, i) => (
            <div key={i} className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-bold text-dark pr-4 text-base">{faq.q}</span>
                <CaretDown weight="bold" size={20} color="#DC2626" className={`flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed text-sm border-t border-gray-200 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center bg-dark border border-white/8 rounded-2xl p-7">
          <p className="text-white/75 mb-4 font-medium">{get('faq.callQuestion')}</p>
          <a href="tel:5148248618"
            onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })}
            className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/25">
            {get('faq.callCta')}
          </a>
        </div>
      </div>
    </section>
  )
}
