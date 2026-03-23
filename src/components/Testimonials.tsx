'use client'
import { useEffect } from 'react'
import { Star, Quotes } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'

// ── Update this to your Google Maps business profile URL ──────────────────────
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Garage+Express'
// ─────────────────────────────────────────────────────────────────────────────

function timeAgo(date: Date, locale: string): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  const days = Math.floor(diff / 86400)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  if (locale === 'fr') {
    if (days < 7) return `Il y a ${days} jour${days !== 1 ? 's' : ''}`
    if (weeks < 5) return `Il y a ${weeks} semaine${weeks !== 1 ? 's' : ''}`
    if (months < 12) return `Il y a ${months} mois`
    return `Il y a plus d'un an`
  } else {
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
    if (weeks < 5) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`
    return 'Over a year ago'
  }
}

const reviewData = {
  fr: [
    {
      name: 'Sonia Boulianne',
      title: 'Un produit supérieur, installé en une journée.',
      text: 'Très beau service du début à la fin, entièrement satisfaite de mon plancher de garage ! Arrivé à l\'heure, parti à 17h comme convenu. Toutes les autres entreprises m\'ont estimé deux jours de travail, avec lui ça pris une journée et un produit supérieur garanti. Je recommande.',
      date: new Date('2026-03-16'),
    },
    {
      name: 'François Landry',
      title: 'C\'est de l\'art et un métier en même temps.',
      text: 'Bravo ! Travaux bien exécutés, résultat final incroyable, les nuances dans le plancher ont l\'air naturel. C\'est de l\'art et un métier en même temps. Je donne un 5 étoiles bien mérités 👌🏼',
      date: new Date('2026-03-02'),
    },
    {
      name: 'Philippe-Alexandre Alarie',
      title: 'Service hors pair du début à la fin.',
      text: 'Merci à Garage Express pour les travaux bien exécutés, service avant, pendant et après installation hors pair ! Je recommande !',
      date: new Date('2026-03-17'),
    },
    {
      name: 'Richard Theriault',
      title: 'Belle job, bon service.',
      text: 'Belle job, bon service.',
      date: new Date('2026-03-21'),
    },
  ],
  en: [
    {
      name: 'Sonia Boulianne',
      title: 'Superior product, installed in one day.',
      text: 'Very beautiful service from start to finish, completely satisfied with my garage floor! Arrived on time, left at 5pm as agreed. All other companies estimated two days of work, with him it took one day and a superior product guaranteed. I recommend.',
      date: new Date('2026-03-16'),
    },
    {
      name: 'François Landry',
      title: 'It\'s art and a craft at the same time.',
      text: 'Bravo! Work well done, incredible final result, the shades in the floor look natural. It\'s art and a craft at the same time. I give a well-deserved 5 stars 👌🏼',
      date: new Date('2026-03-02'),
    },
    {
      name: 'Philippe-Alexandre Alarie',
      title: 'Top-notch service from start to finish.',
      text: 'Thank you to Garage Express for the work well done, service before, during and after installation is top notch! I recommend!',
      date: new Date('2026-03-17'),
    },
    {
      name: 'Richard Theriault',
      title: 'Great job, good service.',
      text: 'Great job, good service.',
      date: new Date('2026-03-21'),
    },
  ],
}

export default function Testimonials() {
  const { get, locale } = useTranslations()
  const reviews = reviewData[locale as 'fr' | 'en'] ?? reviewData.fr

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const featured = reviews[0]
  const grid = reviews.slice(1)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={20} color="#DC2626" />)}
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
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative bg-dark text-white rounded-3xl p-8 overflow-hidden hover:ring-2 hover:ring-primary/40 transition-all group"
          >
            <Quotes weight="duotone" size={64} color="rgba(220,38,38,0.15)" className="absolute top-6 right-8" />
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={20} color="#DC2626" />)}
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-white mb-4">{featured.title}</h3>
            <p className="text-white/60 leading-relaxed mb-6">{featured.text}</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <div className="font-bold text-white">{featured.name}</div>
                <div className="text-white/40 text-sm">Google</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-xs">{timeAgo(featured.date, locale)}</span>
                <span className="text-primary/70 text-xs font-semibold group-hover:text-primary transition-colors">
                  {locale === 'fr' ? 'Voir sur Google ↗' : 'View on Google ↗'}
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Grid reviews */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {grid.map((r, i) => (
            <a
              key={i}
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal reveal-delay-${i + 1} block bg-gray-50 border border-gray-100 rounded-2xl p-6 card-lift hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group`}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} weight="fill" size={16} color="#DC2626" />)}
              </div>
              <h4 className="font-bold text-dark mb-2 text-sm leading-snug">{r.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{r.text}</p>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-dark text-sm">{r.name}</div>
                  <div className="text-gray-400 text-xs">Google</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-gray-300 text-xs">{timeAgo(r.date, locale)}</span>
                  <span className="text-primary/50 text-xs font-semibold group-hover:text-primary transition-colors">
                    {locale === 'fr' ? 'Vérifier ↗' : 'Verify ↗'}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Google badge */}
        <div className="reveal text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 hover:border-primary/30 rounded-full px-6 py-3 transition-all group"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={16} color="#facc15" />)}
            </div>
            <span className="font-bold text-dark">5.0 Google</span>
            <span className="text-gray-400 text-xs group-hover:text-primary transition-colors">
              {locale === 'fr' ? 'Voir les avis ↗' : 'See reviews ↗'}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
