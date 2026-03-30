'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'

function Counter({ to, suffix, duration = 1800 }: { to: number; suffix: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref} className="tabular-nums">{val}{suffix}</span>
}

export default function SocialProofBar() {
  const { get, locale } = useTranslations()
  const fr = locale !== 'en'

  const stats = [
    { animated: true,  to: 127, suffix: '+',                  label: get('socialProof.stat1Label'), sub: get('socialProof.stat1Sub') },
    { animated: true,  to: 5,   suffix: '★',                  label: get('socialProof.stat2Label'), sub: get('socialProof.stat2Sub') },
    { animated: true,  to: 15,  suffix: fr ? ' ans' : ' yrs', label: get('socialProof.stat3Label'), sub: get('socialProof.stat3Sub') },
    { animated: false, static: fr ? '1 jour' : '1 day',       label: get('socialProof.stat4Label'), sub: get('socialProof.stat4Sub') },
  ]

  return (
    <section className="bg-dark-800 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 py-7 text-center"
            >
              <div className="font-display text-4xl font-black text-primary leading-none mb-1">
                {s.animated
                  ? <Counter to={s.to!} suffix={s.suffix!} />
                  : s.static}
              </div>
              <div className="text-white font-semibold text-sm mb-0.5">{s.label}</div>
              <div className="text-white/60 text-xs font-medium">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
