'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'
import { X, Warning, ArrowRight } from '@phosphor-icons/react'

export default function Problem() {
  const { get, locale } = useTranslations()
  const fr = locale !== 'en'

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
            <Warning weight="duotone" size={16} />
            {get('problem.badge')}
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-6">
            {get('problem.title')}
            <span className="block text-gradient">{get('problem.titleHighlight')}</span>
            <span className="block text-dark">{get('problem.titleEnd')}</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {get('problem.subtitle')}
          </p>
        </div>

        {/* Bento grid — stat card + 6 problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 auto-rows-fr">

          {/* Stat card — spans 2 cols on md+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 bg-dark rounded-2xl p-7 flex flex-col justify-between overflow-hidden relative"
          >
            {/* subtle red glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                {fr ? 'Époxy classique' : 'Classic epoxy'}
              </div>
              <div className="font-display text-6xl sm:text-7xl font-black text-white leading-none mb-2">
                3–5
                <span className="text-primary ml-2 text-4xl sm:text-5xl">{fr ? 'jours' : 'days'}</span>
              </div>
              <p className="text-white/55 text-base mb-6">
                {fr
                  ? 'avant de pouvoir marcher sur un plancher époxy classique'
                  : 'before walking on traditional epoxy coating'}
              </p>
              <div className="h-px bg-white/10 mb-5" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                <p className="text-white font-bold text-sm">
                  {fr
                    ? 'Notre polyaspartique\u00a0: accessible dès le soir même ✓'
                    : 'Our polyaspartic: walkable same evening ✓'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Problem cards */}
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`bg-gray-50 border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-primary/20 hover:bg-red-50/40 transition-colors ${
                i === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X weight="bold" size={16} color="#DC2626" />
              </div>
              <div>
                <h3 className="font-bold text-dark mb-2 text-base">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="reveal bg-dark text-white rounded-3xl p-10 text-center max-w-3xl mx-auto">
          <div className="font-display text-4xl font-black uppercase mb-4">
            {get('problem.bridgeTitle')}<br />
            <span className="text-gradient">{get('problem.bridgeHighlight')}</span>
          </div>
          <p className="text-white/80 text-lg mb-6">
            {get('problem.bridgeText')}
          </p>
          <a href="#soumission" className="relative overflow-hidden inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl text-base transition-all btn-shimmer">
            {get('problem.bridgeCta')}
            <ArrowRight weight="bold" size={18} />
          </a>
          <div className="mt-5">
            <a href={`/${locale}/polyaspartique`} className="text-white/50 text-sm hover:text-white/80 transition-colors underline underline-offset-4">
              {get('common.learnMoreSystem')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
