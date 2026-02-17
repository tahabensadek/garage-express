'use client'
import { useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'

const problems = [
  { title: 'Taches d\'huile impossibles à enlever', desc: 'Le béton poreux absorbe tout. Plus vous frottez, pire c\'est.' },
  { title: 'Le sel corrode et détériore en hiver', desc: 'Chaque hiver, la salive calcium ronge lentement votre plancher.' },
  { title: 'Fissures qui s\'agrandissent chaque année', desc: 'L\'eau s\'infiltre, gèle, et fait éclater le béton progressivement.' },
  { title: 'Plancher qui poudroie et salit tout', desc: 'La poussière de béton se dépose sur vos roues, vos outils, votre auto.' },
  { title: 'Look de sous-sol, pas de garage', desc: 'Un plancher gris et taché donne une image qui ne représente pas la valeur de votre maison.' },
  { title: 'Entretien constant, résultats nuls', desc: 'Vous nettoyez, ça resalit aussitôt. Le béton non-scellé est ingérable.' },
]

export default function Problem() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="pourquoi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" />
            Ce que vous vivez probablement
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-6">
            Votre plancher de garage
            <span className="block text-gradient"> vous coûte cher</span>
            <span className="block text-dark">en image et en nerfs.</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Un béton vieillissant et non-traité, c'est un problème qui empire à chaque saison québécoise. 
            La bonne nouvelle ? Il existe une solution permanente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {problems.map((p, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 4) + 1} bg-gray-50 border border-gray-100 rounded-2xl p-6 flex gap-4`}>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-dark mb-2 text-base">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge to solution */}
        <div className="reveal bg-dark text-white rounded-3xl p-10 text-center max-w-3xl mx-auto">
          <div className="font-display text-4xl font-black uppercase mb-4">
            La solution existe.<br />
            <span className="text-gradient">Elle prend 1 journée.</span>
          </div>
          <p className="text-white/60 text-lg mb-6">
            Le revêtement polyaspartique est la même technologie utilisée dans les concessions automobiles, 
            les entrepôts commerciaux et les garages industriels. On l'apporte chez vous.
          </p>
          <a href="#soumission" className="relative overflow-hidden inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl text-base transition-all btn-shimmer">
            Régler mon problème maintenant
          </a>
        </div>
      </div>
    </section>
  )
}
