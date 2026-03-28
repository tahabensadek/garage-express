'use client'
import { motion } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'

const layers = [
  { key: '1', color: 'from-red-900/60 to-red-800/40', border: 'border-red-700/40', dot: 'bg-red-500', badge: 'bg-red-900/50 text-red-300 border-red-700/40' },
  { key: '2', color: 'from-orange-900/60 to-orange-800/40', border: 'border-orange-700/40', dot: 'bg-orange-500', badge: 'bg-orange-900/50 text-orange-300 border-orange-700/40' },
  { key: '3', color: 'from-amber-900/60 to-amber-800/40', border: 'border-amber-700/40', dot: 'bg-amber-400', badge: 'bg-amber-900/50 text-amber-300 border-amber-700/40' },
  { key: '4', color: 'from-primary/20 to-primary/10', border: 'border-primary/40', dot: 'bg-primary', badge: 'bg-primary/20 text-red-300 border-primary/40' },
]

export default function SystemLayers() {
  const { get, locale } = useTranslations()

  return (
    <section className="py-24 bg-dark noise relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[28rem] h-[28rem] rounded-full bg-primary/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            {get('systemLayers.badge')}
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-4">
            {get('systemLayers.title')}
            <span className="block text-gradient">{get('systemLayers.titleHighlight')}</span>
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            {get('systemLayers.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Layers stack */}
          <div className="space-y-3">
            {layers.map((l, i) => (
              <motion.div
                key={l.key}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl bg-gradient-to-r ${l.color} border ${l.border} p-5 flex items-start gap-4`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-black text-white text-sm bg-white/8 border border-white/12`}>
                  {get(`systemLayers.layer${l.key}Num`)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-display text-lg font-bold text-white uppercase leading-tight">
                      {get(`systemLayers.layer${l.key}Name`)}
                    </h3>
                    {get(`systemLayers.layer${l.key}Thickness`) !== '—' && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${l.badge}`}>
                        {get(`systemLayers.layer${l.key}Thickness`)}
                      </span>
                    )}
                  </div>
                  <p className="text-white/45 text-xs font-mono mb-2">{get(`systemLayers.layer${l.key}Product`)}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{get(`systemLayers.layer${l.key}Desc`)}</p>
                </div>
              </motion.div>
            ))}

            {/* Concrete base */}
            <div className="rounded-2xl bg-white/4 border border-white/8 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 rounded bg-white/20" />
              </div>
              <div>
                <p className="text-white/40 text-sm font-semibold uppercase tracking-wide">{get('systemLayers.concreteLabel')}</p>
                <p className="text-white/25 text-xs">{get('systemLayers.concreteSub')}</p>
              </div>
            </div>
          </div>

          {/* Right column — thickness comparison + key stats */}
          <div className="space-y-5">
            {/* Thickness visual */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/4 border border-white/8 rounded-2xl p-6"
            >
              <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-5">{get('systemLayers.thicknessTitle')}</h3>

              {/* Our system bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold text-sm">{get('systemLayers.ourSystem')}</span>
                  <span className="text-primary font-black text-lg">{get('systemLayers.totalThickness')}</span>
                </div>
                <div className="h-7 bg-gradient-to-r from-primary to-red-700 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.1)_4px,rgba(255,255,255,0.1)_8px)]" />
                </div>
              </div>

              {/* DIY bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/40 text-sm">{get('systemLayers.diyLabel')}</span>
                  <span className="text-white/40 font-bold text-sm">{get('systemLayers.diyThickness')}</span>
                </div>
                <div className="h-7 rounded-lg bg-white/8 border border-white/8 relative overflow-hidden">
                  <div className="h-full bg-white/15 rounded-lg" style={{ width: '12%' }} />
                </div>
              </div>
            </motion.div>

            {/* Key mechanical specs */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/4 border border-white/8 rounded-2xl p-6"
            >
              <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-5">{get('systemLayers.specsTitle')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white/4 rounded-xl p-4 border border-white/6">
                    <div className="font-display text-2xl font-black text-primary leading-none mb-1">{get(`systemLayers.spec${n}Val`)}</div>
                    <div className="text-white/80 text-xs font-semibold mb-1">{get(`systemLayers.spec${n}Label`)}</div>
                    <div className="text-white/35 text-xs">{get(`systemLayers.spec${n}Sub`)}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a href="#tarifs"
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-red-700 text-white font-black px-6 py-4 rounded-xl text-sm transition-all shadow-lg shadow-primary/25">
                {get('systemLayers.cta')} →
              </a>
              <p className="text-center mt-3">
                <a href={`/${locale}/polyaspartique`} className="text-white/40 text-xs hover:text-white/65 transition-colors underline underline-offset-4">
                  {get('common.learnMoreSystem')}
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
