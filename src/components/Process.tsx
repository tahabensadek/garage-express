'use client'
import { useEffect } from 'react'

const steps = [
  {
    num: '01',
    time: '8h00',
    title: 'Préparation et meulage',
    desc: 'On commence tôt. Nos techniciens meulent le béton à la rectifieuse professionnelle pour créer la bonne texture d\'adhérence. Les poussières sont captées par aspirateur HEPA — pas de désordre.',
    detail: 'C\'est l\'étape la plus importante. Une mauvaise préparation est la cause #1 des planchers qui décollent. On ne coupe pas les coins.',
  },
  {
    num: '02',
    time: '9h30',
    title: 'Réparation des fissures',
    desc: 'On injecte un polymère haute résistance dans chaque fissure, pore et irrégularité. On laisse durcir, on meule à niveau. Résultat : une surface parfaitement plane.',
    detail: 'Les petites fissures mineures sont incluses dans le prix. Les fissures structurelles majeures font l\'objet d\'une évaluation sur place.',
  },
  {
    num: '03',
    time: '10h30',
    title: 'Couche de base polyaspartique',
    desc: 'Application de la couche primaire haute adhérence. Le polyaspartique pénètre dans le béton et crée un ancrage chimique quasi-permanent — bien plus fort que l\'époxy standard.',
    detail: 'Temps de séchage express : 45 minutes seulement, contre 8–24h pour l\'époxy. C\'est pour ça qu\'on peut tout faire en 1 jour.',
  },
  {
    num: '04',
    time: '12h00',
    title: 'Application des flocons décoratifs',
    desc: 'Dispersion à la main des flocons colorés sur toute la surface. Vous avez choisi votre couleur à l\'avance. Densité uniforme, pas de zones vides, pas de zones surchargées.',
    detail: '8 couleurs standard incluses. Les mélanges personnalisés sont disponibles en option. Le fini ressemble à du granit naturel.',
  },
  {
    num: '05',
    time: '14h00',
    title: 'Top coat de finition double couche',
    desc: 'La couche de protection finale est appliquée en deux passes. C\'est elle qui donne le brillant, l\'antidérapant et la résistance aux taches. C\'est votre armure pour 15 ans.',
    detail: 'UV-stable — ne jaunit pas comme l\'époxy. Résistant aux produits chimiques. Nettoyable à la vadrouille sans produits spéciaux.',
  },
  {
    num: '06',
    time: '16h30',
    title: 'Inspection finale & nettoyage',
    desc: 'On inspecte chaque pied carré avec vous. On ramasse notre équipement, on nettoie le périmètre. Votre garage est rendu comme on l\'a trouvé — sauf pour le plancher.',
    detail: 'Vous pouvez marcher dessus le soir même. Les véhicules peuvent rentrer après 24h. La pleine résistance est atteinte en 72h.',
  },
]

export default function Process() {
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
        <div className="text-center mb-16 reveal">
          <div className="inline-block bg-primary/8 border border-primary/15 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            Transparence totale
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            Ce qui se passe
            <span className="block text-gradient">dans votre garage ce jour-là</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            On ne croit pas aux boîtes noires. Voici exactement ce que nos techniciens font, 
            étape par étape, de leur arrivée à leur départ.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} relative flex gap-6`}>
                {/* Circle + number */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-display font-black ${
                    i === 0 ? 'bg-primary text-white' : 'bg-white border-2 border-gray-200 text-dark'
                  }`}>
                    <div className="text-xs opacity-60">{step.time}</div>
                    <div className="text-lg leading-none">{step.num}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-2">
                  <h3 className="font-display text-xl font-black text-dark uppercase mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                  <div className="bg-primary/5 border-l-2 border-primary text-primary/80 text-xs px-4 py-2.5 rounded-r-lg leading-relaxed">
                    💡 {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* End badge */}
          <div className="reveal mt-8 text-center bg-dark text-white rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="font-display text-3xl font-black uppercase mb-2">
              17h00 — On part. Vous aimez.
            </div>
            <div className="text-white/50 text-sm">
              Installation complète en ~8h. Prêt à marcher dessus le soir même. 
              Véhicules admis après 24h. Pleine résistance en 72h.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
