'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/hooks/useTranslations'

const pairs = [
  { b: '/images/before-1.png', a: '/images/after-1.png', city: 'Longueuil', type: 'Garage double' },
  { b: '/images/before-2.png', a: '/images/after-2.png', city: 'Brossard', type: 'Garage simple' },
  { b: '/images/before-3.png', a: '/images/after-3.png', city: 'Saint-Hubert', type: 'Garage double' },
  { b: '/images/before-4.png', a: '/images/after-4.png', city: 'Laval', type: 'Garage double' },
]

function MiniSlider({ b, a, city, type }: { b: string; a: string; city: string; type: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) update(e.clientX) }
    const onTouch = (e: TouchEvent) => { if (dragging.current) update(e.touches[0].clientX) }
    const stop = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', stop)
    window.addEventListener('touchmove', onTouch)
    window.addEventListener('touchend', stop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', stop)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', stop)
    }
  }, [update])

  return (
    <div
      ref={ref}
      className="relative aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none group"
      onMouseDown={() => { dragging.current = true }}
      onTouchStart={() => { dragging.current = true }}
    >
      <Image src={a} alt={`Après — ${city}`} fill className="object-cover pointer-events-none" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={b} alt={`Avant — ${city}`} fill className="object-cover pointer-events-none" />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-xl pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-2xl flex items-center justify-center text-[11px] font-black text-dark ring-2 ring-primary/20">
          ◀▶
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">Avant</div>
      <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">Après</div>
      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg">
        <span className="font-bold">{city}</span> · {type}
      </div>
    </div>
  )
}

export default function Gallery() {
  const { locale } = useTranslations()
  const fr = locale !== 'en'

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase border border-primary/30 bg-primary/10 px-4 py-2 rounded-full mb-5">
            {fr ? 'Nos réalisations' : 'Our work'}
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-4">
            {fr ? 'Résultats' : 'Results'}
            <span className="block text-gradient">{fr ? 'réels.' : 'that speak.'}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {fr ? 'Glisse sur chaque photo pour voir la transformation.' : 'Drag on each photo to see the transformation.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {pairs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <MiniSlider b={p.b} a={p.a} city={p.city} type={p.type} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="#soumission"
            className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-sm uppercase tracking-wide"
          >
            {fr ? 'Obtenir mon estimé gratuit' : 'Get my free estimate'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
