'use client'
import { useState } from 'react'

import { useTranslations } from '@/hooks/useTranslations'

const featured = [
  { file: 'FB-612_SWAN_PILE', name: 'Blanc Immaculé', nameEn: 'Pure White', tag: 'Clair', tagEn: 'Light' },
  { file: 'FB-951_SAND_DOLLAR_PILE', name: 'Sable Chaud', nameEn: 'Warm Sand', tag: 'Beige', tagEn: 'Beige' },
  { file: 'FB-901_OPAL_PILE', name: 'Gris Perle', nameEn: 'Pearl Gray', tag: 'Neutre', tagEn: 'Neutral', popular: true },
  { file: 'FB-902_SIBERIAN_PILE', name: 'Gris Classique', nameEn: 'Classic Gray', tag: 'Neutre', tagEn: 'Neutral', popular: true },
  { file: 'FB-6003_WEATHERED_GRAY_PILE-2', name: 'Gris Ardoise', nameEn: 'Slate Gray', tag: 'Neutre foncé', tagEn: 'Dark Neutral' },
  { file: 'F9202_CARBON_PILE', name: 'Anthracite', nameEn: 'Anthracite', tag: 'Sombre', tagEn: 'Dark' },
  { file: 'FB-915_RAVEN_PILE', name: 'Noir Absolu', nameEn: 'Absolute Black', tag: 'Sombre', tagEn: 'Dark' },
  { file: 'FB-933_SMOKEY_BLUE_PILE', name: 'Bleu Fumé', nameEn: 'Smokey Blue', tag: 'Couleur', tagEn: 'Color' },
  { file: 'FB-927_JUNIPER_PILE', name: 'Vert Forêt', nameEn: 'Forest Green', tag: 'Couleur', tagEn: 'Color' },
  { file: 'F9305_GARNET_PILE', name: 'Rouge Brique', nameEn: 'Brick Red', tag: 'Couleur', tagEn: 'Color' },
  { file: 'FB-504_SAFARI_PILE', name: 'Brun Naturel', nameEn: 'Natural Brown', tag: 'Terre', tagEn: 'Earth' },
  { file: 'FB-907_GALAXY_PILE', name: 'Galaxie', nameEn: 'Galaxy', tag: 'Spectaculaire', tagEn: 'Spectacular' },
]

export default function ColorSelector() {
  const { locale } = useTranslations()
  const [hovered, setHovered] = useState<number | null>(null)
  const fr = locale !== 'en'

  return (
    <section className="py-24 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase mb-4">
            {fr ? '137 nuances disponibles' : '137 shades available'}
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-4">
            {fr ? 'Votre garage,' : 'Your garage,'}
            <span className="block text-gradient">{fr ? 'votre signature.' : 'your signature.'}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {fr
              ? '137 mélanges exclusifs Torginol. Du plus classique au plus spectaculaire — un seul bon choix.'
              : '137 exclusive Torginol blends. From the most classic to the most spectacular — one perfect choice.'}
          </p>
        </div>

        {/* Color grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {featured.map((color, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-48 sm:h-56"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/flakes/${color.file}.avif`}
                alt={fr ? color.name : color.nameEn}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Popular badge */}
              {color.popular && (
                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {fr ? '⭐ Populaire' : '⭐ Popular'}
                </div>
              )}

              {/* Color info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white/60 text-xs mb-1">{fr ? color.tag : color.tagEn}</div>
                <div className="font-bold text-white text-sm leading-tight">{fr ? color.name : color.nameEn}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm mb-6">
            {fr
              ? 'Vous hésitez entre plusieurs nuances ? On vous conseille lors de l\'estimé gratuit.'
              : 'Can\'t decide between shades? We\'ll guide you during your free estimate.'}
          </p>
          <a
            href="#soumission"
            className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-sm uppercase tracking-wide"
          >
            {fr ? 'Obtenir mon estimé gratuit' : 'Get my free estimate'}
          </a>
        </div>
      </div>
    </section>
  )
}
