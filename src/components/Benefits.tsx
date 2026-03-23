'use client'
import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'
import { Lightning, Shield, Drop, Thermometer, Sparkle, Clock } from '@phosphor-icons/react'

function TiltCard({ children, highlight, delay }: { children: React.ReactNode; highlight: boolean; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)
  const current = useRef({ rx: 0, ry: 0 })
  const target = useRef({ rx: 0, ry: 0 })

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    target.current.rx = ((e.clientY - r.top) / r.height - 0.5) * 10
    target.current.ry = ((e.clientX - r.left) / r.width - 0.5) * -10
  }, [])

  const onEnter = useCallback(() => {
    const lerp = () => {
      current.current.rx += (target.current.rx - current.current.rx) * 0.12
      current.current.ry += (target.current.ry - current.current.ry) * 0.12
      if (ref.current) {
        ref.current.style.transform = `perspective(800px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`
      }
      frameRef.current = requestAnimationFrame(lerp)
    }
    frameRef.current = requestAnimationFrame(lerp)
  }, [])

  const onLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    target.current = { rx: 0, ry: 0 }
    const reset = () => {
      current.current.rx += (0 - current.current.rx) * 0.12
      current.current.ry += (0 - current.current.ry) * 0.12
      if (ref.current) {
        ref.current.style.transform = `perspective(800px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`
      }
      if (Math.abs(current.current.rx) > 0.01 || Math.abs(current.current.ry) > 0.01) {
        frameRef.current = requestAnimationFrame(reset)
      } else if (ref.current) {
        ref.current.style.transform = ''
      }
    }
    frameRef.current = requestAnimationFrame(reset)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      viewport={{ once: true }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={`relative rounded-2xl p-7 border overflow-hidden cursor-default h-full ${
          highlight
            ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20'
            : 'bg-white/4 border-white/8'
        }`}
        style={{ willChange: 'transform', '--shine-delay': `${delay}s` } as React.CSSProperties}
      >
        <span className="shine-sweep" />
        {children}
      </div>
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
      {/* CSS-only ambient orbs — no JS */}
      <div className="orb-1 absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="orb-2 absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
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
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
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
              <p className="text-white/75 text-sm leading-relaxed">{b.desc}</p>
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
                  <th className="text-left text-white/65 font-semibold py-3 pr-6">{get('benefits.comparisonFeature')}</th>
                  <th className="text-center text-white/55 font-semibold py-3 px-4">{get('benefits.comparisonEpoxy')}</th>
                  <th className="text-center text-primary font-bold py-3 px-4">{get('benefits.comparisonPoly')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {([1,2,3,4,5,6] as const).map((n, i) => (
                  <tr key={i}>
                    <td className="text-white/70 py-3 pr-6">{get(`benefits.comparisonRow${n}`)}</td>
                    <td className="text-center text-white/50 py-3 px-4">{get(`benefits.comparisonEpoxy${n}`)}</td>
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
