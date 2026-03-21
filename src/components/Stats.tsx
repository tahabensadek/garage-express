'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'

function Counter({ target, suffix, decimal }: { target: number; suffix: string; decimal: boolean }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(decimal ? Math.round(eased * target * 10) / 10 : Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, decimal])

  return (
    <div ref={ref} className="font-display text-6xl sm:text-7xl font-black text-white tabular-nums leading-none">
      {val}{suffix}
    </div>
  )
}

export default function Stats() {
  const { locale } = useTranslations()
  const fr = locale !== 'en'

  const stats = [
    { value: 127, suffix: '+',              decimal: false, label: fr ? 'Garages transformés'             : 'Garages transformed' },
    { value: 5, suffix: '★',              decimal: false,  label: fr ? 'Note Google'                     : 'Google rating' },
    { value: 1,   suffix: fr ? ' jour' : ' day', decimal: false, label: fr ? 'Installation complète'    : 'Full installation' },
    { value: 15,  suffix: fr ? ' ans' : ' yrs',  decimal: false, label: fr ? 'Garantie mat. + main-d\'œuvre' : 'Material + labor warranty' },
  ]

  return (
    <section className="relative py-20 bg-dark overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center py-8 px-6 border-r border-white/8 last:border-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Counter target={s.value} suffix={s.suffix} decimal={s.decimal} />
              <div className="text-white/40 text-xs uppercase tracking-widest mt-3 leading-relaxed">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
