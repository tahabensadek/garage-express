'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'

const pairs = [
  { b: '/images/before-1.png', a: '/images/after-1.png', city: 'Longueuil', type: 'Garage double' },
  { b: '/images/before-2.png', a: '/images/after-2.png', city: 'Brossard', type: 'Garage simple' },
  { b: '/images/before-3.png', a: '/images/after-3.png', city: 'Saint-Hubert', type: 'Garage double' },
  { b: '/images/before-4.png', a: '/images/after-4.png', city: 'Laval', type: 'Garage double' },
  { b: '/images/before-5.png', a: '/images/after-5.png', city: 'La Prairie', type: 'Garage simple' },
]

function SliderCard({ pair, beforeText, afterText }: { pair: typeof pairs[0], beforeText: string, afterText: string }) {
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getPos = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging.current) getPos(e.clientX) }, [getPos])
  const onTouchMove = useCallback((e: TouchEvent) => { getPos(e.touches[0].clientX) }, [getPos])
  const stopDrag = useCallback(() => { dragging.current = false }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', stopDrag)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [onMouseMove, onTouchMove, stopDrag])

  return (
    <div ref={containerRef} className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none group"
      onMouseDown={() => { dragging.current = true }}
      onTouchStart={() => { dragging.current = true }}>
      
      <Image src={pair.a} alt="Après" fill className="object-cover" />
      
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={pair.b} alt="Avant" fill className="object-cover" />
        <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">{beforeText}</div>
      </div>
      
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-xl pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center">
          <ArrowLeftRight className="w-5 h-5 text-dark" />
        </div>
      </div>

      <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">{afterText}</div>
      
      <div className="absolute bottom-3 left-3 bg-dark/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-lg">
        <span className="font-bold">{pair.city}</span> · {pair.type}
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const { get } = useTranslations()

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <div className="inline-block bg-primary/8 border border-primary/15 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            {get('beforeAfter.badge')}
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            {get('beforeAfter.title')}
            <span className="block text-gradient">{get('beforeAfter.titleHighlight')}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {get('beforeAfter.subtitle')}
          </p>
        </div>

        <div className="reveal mb-5 max-w-4xl mx-auto">
          <SliderCard pair={pairs[0]} beforeText={get('beforeAfter.before')} afterText={get('beforeAfter.after')} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto reveal">
          {pairs.slice(1).map((pair, i) => (
            <SliderCard key={i} pair={pair} beforeText={get('beforeAfter.before')} afterText={get('beforeAfter.after')} />
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <a href="#soumission" className="relative overflow-hidden inline-flex items-center gap-2 bg-dark hover:bg-dark-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-all btn-shimmer">
            {get('beforeAfter.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}