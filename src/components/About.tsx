'use client'
import { useEffect } from 'react'
import { MapPin, Award, Users, Wrench } from 'lucide-react'

export default function About() {
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="inline-block bg-primary/8 border border-primary/15 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Qui on est
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-6">
              Une équipe locale.
              <span className="block text-gradient">Un standard commercial.</span>
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Garage Express, c'est une équipe de techniciens certifiés basés sur la Rive-Sud. 
                On fait ça depuis des années, et on a appris une chose : <strong className="text-dark">les propriétaires veulent juste que ça soit bien fait, au prix annoncé, sans douleur.</strong>
              </p>
              <p>
                On utilise exclusivement du polyaspartique de grade commercial — la même technologie 
                qu'on retrouve dans les garages de concessionnaires automobiles, les entrepôts industriels 
                et les cliniques médicales. Pas des produits de quincaillerie grande surface.
              </p>
              <p>
                Notre modèle est simple : <strong className="text-dark">moins de chantiers, mieux faits</strong>. 
                On limite volontairement notre volume pour que chaque client reçoive le niveau de soin 
                qu'il mérite. C'est pour ça qu'on a une note de 4.9/5 sur Google.
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, title: 'Basés sur la Rive-Sud', desc: 'On connaît les conditions hivernales d\'ici. On installe pour elles.' },
                { icon: Award, title: 'Techniciens certifiés', desc: 'Formation continue, produits de grade commercial, standards élevés.' },
                { icon: Users, title: '500+ clients dans la région', desc: 'Vos voisins nous connaissent. Demandez-leur.' },
                { icon: Wrench, title: 'Équipement professionnel', desc: 'Rectifieuses diamant, aspirateurs HEPA, systèmes de mélange précis.' },
              ].map(({icon: Icon, title, desc}, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm card-lift">
                  <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-dark text-sm mb-2">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Zone map */}
            <div className="mt-5 bg-dark text-white rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Zone de service</div>
              <div className="flex flex-wrap gap-2">
                {['Longueuil', 'Brossard', 'Saint-Hubert', 'La Prairie', 'Boucherville', 'Sainte-Julie', 'Laval', 'et environs'].map(city => (
                  <span key={city} className="bg-white/8 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-lg">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
