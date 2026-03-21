'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'
import { Lightning, Shield, Drop, Thermometer, Sparkle, Clock } from '@phosphor-icons/react'

function TiltCard({ children, highlight, delay }: { children: React.ReactNode; highlight: boolean; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 })
  const gx = useTransform(x, [-0.5, 0.5], ['20%', '80%'])
  const gy = useTransform(y, [-0.5, 0.5], ['20%', '80%'])

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', '--shine-delay': `${delay}s` } as React.CSSProperties}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      viewport={{ once: true }}
      className={`relative rounded-2xl p-7 border overflow-hidden cursor-default ${
        highlight
          ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20'
          : 'bg-white/4 border-white/8'
      }`}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: highlight
            ? undefined
            : `radial-gradient(circle at ${gx} ${gy}, rgba(220,38,38,0.08), transparent 60%)`,
          opacity: 1,
        }}
      />
      <span className="shine-sweep" />
      {children}
    </motion.div>
  )
}

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

  return (
    <section className="py-24 bg-dark noise relative overflow-hidden">
      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-primary/8 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/6 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4" style={{ perspective: '1200px' }}>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <TiltCard key={i} highlight={b.highlight} delay={i * 0.08}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                b.highlight ? 'bg-primary' : 'bg-white/8'
              }`}>
                <b.icon weight="duotone" size={24} color={b.highlight ? '#ffffff' : '#DC2626'} />
              </div>
              <h3 className="font-display text-xl font-bold text-white uppercase leading-tight mb-3">{b.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
            </TiltCard>
          ))}
        </div>

        <motion.div
          className="mt-14 bg-white/4 border border-white/8 rounded-3xl p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
        </motion.div>
      </div>
    </section>
  )
}
