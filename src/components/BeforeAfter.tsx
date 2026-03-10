'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import Image from 'next/image'
import { ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react'

const pairs = [
  { b: '/images/before-1.png', a: '/images/after-1.png', city: 'Longueuil', type: 'Garage double' },
  { b: '/images/before-2.png', a: '/images/after-2.png', city: 'Brossard', type: 'Garage simple' },
  { b: '/images/before-3.png', a: '/images/after-3.png', city: 'Saint-Hubert', type: 'Garage double' },
  { b: '/images/before-4.png', a: '/images/after-4.png', city: 'Laval', type: 'Garage double' },
  { b: '/images/before-5.png', a: '/images/after-5.png', city: 'La Prairie', type: 'Garage simple' },
]

function SliderCard({ pair, beforeText, afterText, onReady }: {
  pair: typeof pairs[0]
  beforeText: string
  afterText: string
  onReady?: () => void
}) {
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const getPos = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging.current) getPos(e.clientX) }, [getPos])
  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging.current || !touchStart.current) return
    const dx = Math.abs(e.touches[0].clientX - touchStart.current.x)
    const dy = Math.abs(e.touches[0].clientY - touchStart.current.y)
    if (dx > dy) {
      e.preventDefault()
      getPos(e.touches[0].clientX)
    } else {
      dragging.current = false
    }
  }, [getPos])
  const stopDrag = useCallback(() => { dragging.current = false; touchStart.current = null }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', stopDrag)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [onMouseMove, onTouchMove, stopDrag])

  // Reset slider position when pair changes
  useEffect(() => { setPos(50) }, [pair])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={() => { dragging.current = true }}
      onTouchStart={(e) => { dragging.current = true; touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }}
    >
      {/* After image (base) */}
      <Image src={pair.a} alt={`Plancher de garage après revêtement polyaspartique — ${pair.city}, ${pair.type}`} fill className="object-cover pointer-events-none" draggable={false} onLoad={onReady} />

      {/* Before image (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={pair.b} alt={`Plancher de garage avant revêtement polyaspartique — ${pair.city}, ${pair.type}`} fill className="object-cover pointer-events-none" draggable={false} />
        <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
          {beforeText}
        </div>
      </div>

      {/* Divider line + handle */}
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-xl pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center ring-2 ring-primary/20">
          <ArrowLeftRight className="w-5 h-5 text-dark" />
        </div>
      </div>

      {/* After label */}
      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
        {afterText}
      </div>

      {/* Location badge */}
      <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg">
        <span className="font-bold">{pair.city}</span> · {pair.type}
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs flex items-center gap-1 pointer-events-none">
        <ArrowLeftRight className="w-3 h-3" />
        <span>Glisser</span>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const { get } = useTranslations()
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + pairs.length) % pairs.length)
  const next = () => setActive(i => (i + 1) % pairs.length)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
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

        {/* Main slider */}
        <div className="reveal relative">
          <SliderCard
            pair={pairs[active]}
            beforeText={get('beforeAfter.before')}
            afterText={get('beforeAfter.after')}
          />

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5 text-dark" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-dark" />
          </button>
        </div>

        {/* Thumbnail navigation */}
        <div className="mt-4 flex gap-3 justify-center reveal">
          {pairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                i === active
                  ? 'ring-2 ring-primary scale-105 shadow-md'
                  : 'opacity-50 hover:opacity-80'
              }`}
              aria-label={`Voir ${pair.city}`}
            >
              <Image src={pair.a} alt={`Transformation garage ${pair.city} — ${pair.type}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-dark/20" />
              <span className="absolute bottom-1 left-0 right-0 text-center text-white text-[9px] font-semibold">
                {pair.city}
              </span>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4 reveal">
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <a
            href="#soumission"
            className="relative overflow-hidden inline-flex items-center gap-2 bg-dark hover:bg-dark-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-all btn-shimmer"
          >
            {get('beforeAfter.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
