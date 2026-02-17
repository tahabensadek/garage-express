'use client'
import { Star, MapPin, Award } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Garages transformés', sub: 'depuis notre fondation' },
  { value: '4.9★', label: 'Note Google', sub: 'sur 200+ avis vérifiés' },
  { value: '15 ans', label: 'Garantie complète', sub: 'matériaux & main-d\'oeuvre' },
  { value: '1 jour', label: 'Installation', sub: 'prêt à utiliser dès demain' },
]

export default function SocialProofBar() {
  return (
    <section className="bg-dark-800 border-y border-white/5 py-0">
      {/* Scrolling ticker for mobile, grid for desktop */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {stats.map((s, i) => (
            <div key={i} className="px-6 py-6 text-center">
              <div className="font-display text-4xl font-black text-primary leading-none mb-1">{s.value}</div>
              <div className="text-white font-semibold text-sm mb-0.5">{s.label}</div>
              <div className="text-white/40 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
