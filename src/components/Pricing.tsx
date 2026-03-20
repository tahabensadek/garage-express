'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { Check, X, CaretDown, Shield, Star, ArrowRight } from '@phosphor-icons/react'

export default function Pricing() {
  const { get } = useTranslations()
  const [addonsOpen, setAddonsOpen] = useState(false)

  const plans = [
    {
      name: get('pricing.simple'),
      tagline: get('pricing.simpleTagline'),
      price: get('pricing.simplePrice'),
      size: '≤ 300 pi²',
      popular: false,
      includes: Array.from({ length: 11 }, (_, i) => get(`pricing.simpleIncludes${i + 1}`)),
      excludes: [get('pricing.simpleExcludes1')],
      cta: get('pricing.cta'),
    },
    {
      name: get('pricing.storage'),
      tagline: get('pricing.storageTagline'),
      price: get('pricing.storagePrice'),
      size: get('pricing.storageSize'),
      popular: false,
      includes: Array.from({ length: 11 }, (_, i) => get(`pricing.storageIncludes${i + 1}`)),
      excludes: [get('pricing.storageExcludes1')],
      cta: get('pricing.cta'),
    },
    {
      name: get('pricing.double'),
      tagline: get('pricing.doubleTagline'),
      price: get('pricing.doublePrice'),
      size: '450-600 pi²',
      popular: true,
      badge: get('pricing.popularBadge'),
      includes: Array.from({ length: 12 }, (_, i) => get(`pricing.doubleIncludes${i + 1}`)),
      excludes: [get('pricing.doubleExcludes1')],
      cta: get('pricing.cta'),
    },
  ]

  const addons = [1, 2, 3, 4].map(n => ({
    name: get(`pricing.addon${n}Name`),
    price: get(`pricing.addon${n}Price`),
    note: get(`pricing.addon${n}Note`),
  }))

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="tarifs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <div className="inline-block bg-primary/8 border border-primary/15 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            {get('pricing.badge')}
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            {get('pricing.title')}
            <span className="block text-gradient">{get('pricing.titleHighlight')}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {get('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-10">
          {plans.map((plan, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} relative rounded-3xl overflow-hidden card-lift ${
              plan.popular
                ? 'shadow-2xl shadow-primary/20 ring-2 ring-primary'
                : 'border-2 border-gray-100 shadow-lg'
            }`}>
              {plan.badge && (
                <div className="bg-gradient-to-r from-primary to-red-500 text-white text-center py-3 text-sm font-bold tracking-wide">
                  {plan.badge}
                </div>
              )}

              <div className="p-6">
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-black text-dark uppercase">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{plan.tagline}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">{plan.size}</div>
                  </div>

                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="font-display text-6xl font-black text-dark leading-none">{plan.price}</span>
                    <span className="font-display text-3xl font-black text-gray-400">,99$</span>
                  </div>
                  <div className="mt-2 flex gap-3 flex-wrap">
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">{get('pricing.fixedPrice')}</span>
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">{get('pricing.install1Day')}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{get('pricing.included')}</div>
                  <ul className="space-y-2.5">
                    {plan.includes.map((item, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <Check weight="bold" size={16} color="#DC2626" className="flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.excludes.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-dashed border-gray-100">
                    <div className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3">{get('pricing.notIncluded')}</div>
                    <ul className="space-y-2">
                      {plan.excludes.map((item, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <X weight="bold" size={16} color="#d1d5db" className="flex-shrink-0 mt-0.5" />
                          <span className="text-gray-400 text-sm leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a href="#soumission"
                  className={`relative overflow-hidden w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 btn-shimmer ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/25'
                      : 'bg-dark hover:bg-dark-700 text-white shadow-lg'
                  }`}>
                  {plan.cta}
                  <ArrowRight weight="bold" size={20} />
                </a>
                <p className="text-center text-xs text-gray-400 mt-3">{get('pricing.responseNote')}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal max-w-6xl mx-auto">
          <button
            onClick={() => setAddonsOpen(!addonsOpen)}
            className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary/30 rounded-2xl p-6 transition-all duration-200 group">
            <div className="text-left">
              <div className="font-bold text-dark text-lg">{get('pricing.addonsTitle')}</div>
              <div className="text-gray-500 text-sm">{get('pricing.addonsSubtitle')}</div>
            </div>
            <CaretDown weight="bold" size={24} color="#DC2626" className={`transition-transform duration-300 ${addonsOpen ? 'rotate-180' : ''}`} />
          </button>

          {addonsOpen && (
            <div className="mt-2 bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 space-y-4">
              {addons.map((addon, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div>
                    <div className="font-semibold text-dark text-sm">{addon.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{addon.note}</div>
                  </div>
                  <div className="font-display text-xl font-black text-primary whitespace-nowrap">{addon.price}</div>
                </div>
              ))}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-600 text-center">
                💬 {get('pricing.addonsNote')}
              </div>
            </div>
          )}
        </div>

        <div className="reveal mt-14 grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {[
            { icon: Shield, title: get('pricing.guarantee1'), desc: get('pricing.guarantee1Desc') },
            { icon: Star, title: get('pricing.guarantee2'), desc: get('pricing.guarantee2Desc') },
            { icon: Check, title: get('pricing.guarantee3'), desc: get('pricing.guarantee3Desc') },
          ].map(({icon: Icon, title, desc}, i) => (
            <div key={i} className="bg-dark text-white rounded-2xl p-6 card-lift">
              <Icon weight="duotone" size={28} color="#DC2626" className="mb-4" />
              <div className="font-display text-xl font-black uppercase mb-2">{title}</div>
              <div className="text-white/50 text-sm leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
