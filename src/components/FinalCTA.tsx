'use client'
import { motion } from 'framer-motion'
import { Phone, ArrowRight } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'

export default function FinalCTA() {
  const { get } = useTranslations()

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25 bg-red-900"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 80, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-30%', left: '-15%' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 bg-orange-600"
        animate={{ x: [0, -60, 50, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{ bottom: '-20%', right: '-10%' }}
      />
      <motion.div
        className="absolute w-60 h-60 rounded-full blur-3xl opacity-15 bg-white"
        animate={{ x: [0, 40, -60, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ top: '20%', right: '30%' }}
      />

      {/* Background geometry */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 border-2 border-white rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-white uppercase leading-none mb-6">
            {get('finalCta.title')}
            <span className="block italic">{get('finalCta.titleHighlight')}</span>
            <span className="block text-white/30">{get('finalCta.titleEnd')}</span>
          </h2>
          <p className="text-white/75 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {get('finalCta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a
              href="#soumission"
              className="group relative overflow-hidden bg-white text-primary hover:bg-gray-50 font-black px-10 py-5 rounded-xl text-lg transition-all shadow-2xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {get('finalCta.ctaPrimary')}
              <ArrowRight weight="bold" size={24} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href={`tel:${get('finalCta.ctaPhone').replace(/-/g, '')}`}
              onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })}
              className="bg-white/15 hover:bg-white/25 border-2 border-white/40 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone weight="duotone" size={24} />
              {get('finalCta.ctaPhone')}
            </motion.a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <span>✓ {get('finalCta.trust1')}</span>
            <span>✓ {get('finalCta.trust2')}</span>
            <span>✓ {get('finalCta.trust3')}</span>
            <span>✓ {get('finalCta.trust4')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
