'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Phone, ArrowDown, Shield, Clock, Star, CaretRight } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'
import ResinBg from '@/components/ResinBg'

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '')
  return digits.startsWith('1') && digits.length === 11 ? digits.slice(1) : digits
}

const heroCopy = {
  fr: {
    namePlaceholder: 'Votre prénom',
    phonePlaceholder: 'Votre téléphone',
    submitCta: 'Soumission gratuite →',
    success: '✓ On vous rappelle en moins de 15 min !',
  },
  en: {
    namePlaceholder: 'Your first name',
    phonePlaceholder: 'Your phone number',
    submitCta: 'Free quote →',
    success: '✓ We\'ll call you back in under 15 min!',
  },
}

function SplitReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const { get, locale } = useTranslations()
  const hc = heroCopy[locale as 'fr' | 'en'] ?? heroCopy.fr
  const containerRef = useRef<HTMLElement>(null)

  const [heroName, setHeroName] = useState('')
  const [heroPhone, setHeroPhone] = useState('')
  const [heroSent, setHeroSent] = useState(false)
  const [heroLoading, setHeroLoading] = useState(false)

  const heroSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHeroLoading(true)
    ;(window as any).gtag?.('event', 'conversion', {
      send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC',
      value: 1.0,
      currency: 'CAD',
    })
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: heroName,
          phone: formatPhone(heroPhone),
          locale,
          source: 'hero-mini',
          garageSize: '',
          email: '',
          city: '',
          cracks: '',
        }),
      })
    } catch (_) { /* silent */ }
    setHeroLoading(false)
    setHeroSent(true)
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const rawImgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imgY = useSpring(rawImgY, { stiffness: 80, damping: 20 })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="/images/hero-car3.png"
          alt="Garage avec plancher polyaspartique professionnel — Garage Express Montréal, Rive-Sud & Laval"
          className="w-full h-full object-cover scale-110"
          style={{ objectPosition: 'center center' }}
          fetchPriority="high"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/97 via-dark/85 to-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
      <ResinBg />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16 w-full"
        style={{ y: textY }}
      >
        <div className="max-w-2xl">
          <motion.div
            className="flex items-center gap-2.5 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} weight="fill" size={16} color="#DC2626" />
              ))}
            </div>
            <span className="text-white/70 text-sm">{get('hero.reviews')}</span>
          </motion.div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-[6rem] font-black leading-none text-white uppercase tracking-tight mb-4">
            <SplitReveal text={get('hero.title')} delay={0.2} />
            <span className="block text-gradient overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                {get('hero.titleHighlight')}
              </motion.span>
            </span>
            <span className="block text-white overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                {get('hero.titleEnd')}
              </motion.span>
            </span>
            <span className="block text-white overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                {get('hero.titleLast')}
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            dangerouslySetInnerHTML={{ __html: get('hero.subtitle') }}
          />

          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
          >
            <a href="#tarifs" className="bg-white/8 hover:bg-white/15 backdrop-blur border border-white/12 rounded-xl px-5 py-3 transition-all cursor-pointer">
              <div className="text-white/50 text-xs uppercase tracking-widest mb-1">{get('hero.startingFrom')}</div>
              <div className="font-display text-3xl font-black text-white">2 749<span className="text-lg text-white/70">,99$</span></div>
            </a>
            <div className="flex items-center">
              <span className="text-white/40 text-xs leading-tight">
                {get('hero.fixedPrice')}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {heroSent ? (
              <div className="inline-flex items-center gap-3 bg-green-500/15 border border-green-500/30 text-green-400 font-bold px-6 py-4 rounded-xl text-base mb-4">
                {hc.success}
              </div>
            ) : (
              <form onSubmit={heroSubmit} className="flex flex-col sm:flex-row gap-2 mb-3 max-w-lg">
                <input
                  type="tel"
                  required
                  placeholder={hc.phonePlaceholder}
                  value={heroPhone}
                  onChange={e => setHeroPhone(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={heroLoading}
                  className="relative overflow-hidden bg-primary hover:bg-red-700 disabled:opacity-70 text-white font-black px-6 py-3.5 rounded-xl text-sm transition-all shadow-2xl shadow-primary/30 btn-shimmer whitespace-nowrap"
                >
                  {heroLoading ? '...' : hc.submitCta}
                </button>
              </form>
            )}
            <a href={`tel:${get('nav.phone').replace(/-/g, '')}`}
              onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })}
              className="group bg-white/8 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 inline-flex items-center justify-center gap-2 backdrop-blur-sm">
              <Phone weight="duotone" size={20} color="#DC2626" />
              {get('hero.ctaPhone')}
            </a>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {[
              { icon: Clock, label: get('hero.trust1') },
              { icon: Shield, label: get('hero.trust2') },
              { icon: Star, label: get('hero.trust3') },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon weight="duotone" size={16} color="#DC2626" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <a href="#pourquoi" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group">
        <span className="text-xs uppercase tracking-widest">{get('hero.scroll')}</span>
        <ArrowDown weight="bold" size={20} className="animate-bounce" />
      </a>
    </section>
  )
}
