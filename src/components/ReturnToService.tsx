'use client'
import { motion } from 'framer-motion'
import { Footprints, Car, Drop, Shield } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'

const steps = [
  { icon: Footprints, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  { icon: Car,        color: 'text-blue-400',  bg: 'bg-blue-400/10 border-blue-400/20'  },
  { icon: Drop,       color: 'text-cyan-400',  bg: 'bg-cyan-400/10 border-cyan-400/20'  },
  { icon: Shield,     color: 'text-primary',   bg: 'bg-primary/10 border-primary/20'    },
]

export default function ReturnToService() {
  const { get } = useTranslations()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-dark/5 border border-dark/10 text-dark/60 font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            {get('returnToService.badge')}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight">
            {get('returnToService.title')}
            <span className="block text-gradient">{get('returnToService.titleHighlight')}</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[2.25rem] right-[2.25rem] h-0.5 bg-gradient-to-r from-green-400/30 via-blue-400/30 via-cyan-400/30 to-primary/30 hidden sm:block" />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-[4.5rem] h-[4.5rem] rounded-2xl border flex items-center justify-center mb-4 relative z-10 bg-white shadow-sm ${s.bg}`}>
                  <s.icon weight="duotone" size={28} className={s.color} />
                </div>
                <div className={`font-display text-2xl font-black mb-1 ${s.color}`}>
                  {get(`returnToService.step${i + 1}Time`)}
                </div>
                <div className="font-bold text-dark text-sm mb-2">
                  {get(`returnToService.step${i + 1}Label`)}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {get(`returnToService.step${i + 1}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-10 bg-dark rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 text-sm text-center sm:text-left">
            À titre de comparaison — l'époxy traditionnel : <strong className="text-white">3 à 5 jours</strong> avant de pouvoir marcher dessus.
          </p>
          <a href="#soumission"
            className="flex-shrink-0 bg-primary hover:bg-red-700 text-white font-black px-6 py-3 rounded-xl text-sm transition-all whitespace-nowrap">
            Obtenir ma soumission →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
