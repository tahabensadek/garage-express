'use client'
import { useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import { useTranslations } from '@/hooks/useTranslations'

const reviewNames = [
  { name: 'Marc-André Tremblay', city: 'Longueuil' },
  { name: 'Sophie Gagnon-Roy',   city: 'Brossard' },
  { name: 'Jean-François Côté',  city: 'Laval' },
  { name: 'Isabelle Pelletier',  city: 'Saint-Hubert' },
  { name: 'Patrick Bouchard',    city: 'La Prairie' },
  { name: 'Nathalie Viens',      city: 'Boucherville' },
]

export default function Testimonials() {
  const { get } = useTranslations()

  const reviews = reviewNames.map((r, i) => ({
    name: r.name,
    city: r.city,
    type: get(`testimonials.review${i + 1}Type`),
    date: get(`testimonials.review${i + 1}Date`),
    title: get(`testimonials.review${i + 1}Title`),
    text: get(`testimonials.review${i + 1}Text`),
    stars: 5,
  }))

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            {[...Array(5)].map((_,i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            <span className="font-bold text-dark ml-1">{get('testimonials.rating')}</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            {get('testimonials.title')}
            <span className="block text-gradient">{get('testimonials.titleHighlight')}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {get('testimonials.subtitle')}
          </p>
        </div>

        {/* Featured review */}
        <div className="reveal max-w-3xl mx-auto mb-8">
          <div className="relative bg-dark text-white rounded-3xl p-8 overflow-hidden">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-primary/15" />
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_,i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-white mb-4">{reviews[0].title}</h3>
            <p className="text-white/60 leading-relaxed mb-6">{reviews[0].text}</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <div className="font-bold text-white">{reviews[0].name}</div>
                <div className="text-white/40 text-sm">{reviews[0].city} · {reviews[0].type}</div>
              </div>
              <div className="text-white/30 text-xs">{reviews[0].date}</div>
            </div>
          </div>
        </div>

        {/* Grid reviews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {reviews.slice(1).map((r, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} bg-gray-50 border border-gray-100 rounded-2xl p-6 card-lift`}>
              <div className="flex gap-1 mb-3">
                {[...Array(r.stars)].map((_,j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <h4 className="font-bold text-dark mb-2 text-sm leading-snug">{r.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{r.text}</p>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-dark text-sm">{r.name}</div>
                  <div className="text-gray-400 text-xs">{r.city} · {r.type}</div>
                </div>
                <div className="text-gray-300 text-xs">{r.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div className="reveal text-center">
          <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-6 py-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-bold text-dark">5.0</span>
          </div>
        </div>
      </div>
    </section>
  )
}
