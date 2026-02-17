'use client'
import { useEffect } from 'react'
import { Zap, Shield, Droplets, Thermometer, Sparkles, Clock } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: 'Installation en 1 seule journée',
    desc: 'Nos techniciens arrivent le matin et repartent le soir. Le plancher est prêt à utiliser 24h après l\'application. Zéro inconvénient prolongé.',
    highlight: true,
  },
  {
    icon: Shield,
    title: 'Garanti 15 ans — Matériaux & main-d\'oeuvre',
    desc: 'Pas juste les matériaux. Notre garantie couvre l\'ensemble du travail. Si quelque chose arrive dans les 15 ans, on revient. Point.',
  },
  {
    icon: Droplets,
    title: 'Résistant à tout ce qu\'un hiver québécois peut lancer',
    desc: 'Sel de déglaçage, calcium, huile à moteur, antigel. Le polyaspartique ne s\'imprègne pas — il repousse tout. Une vadrouille humide et c\'est propre.',
  },
  {
    icon: Thermometer,
    title: 'Conçu pour les -30°C à +40°C',
    desc: 'Le béton se contracte et se dilate. Notre revêtement est flexible et suit le mouvement — sans fissurer, sans décoller, saison après saison.',
  },
  {
    icon: Zap,
    title: 'Deux fois plus dur que l\'époxy traditionnel',
    desc: 'Le polyaspartique durcit plus rapidement et atteint une résistance supérieure à l\'époxy. Idéal pour les garages avec véhicules lourds, VTT, ou équipements.',
  },
  {
    icon: Sparkles,
    title: 'Fini professionnel — choix de couleurs',
    desc: 'Flocons décoratifs, couleurs personnalisées, fini mat ou lustré. Votre garage peut ressembler à ce que vous voyez dans les concessions automobiles.',
  },
]

export default function Benefits() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-dark noise relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <div className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            Technologie de classe commerciale
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-4">
            Ce n'est pas de l'époxy.
            <span className="block text-gradient">C'est bien mieux.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Le polyaspartique est ce que les professionnels utilisent quand l'époxy ne suffit pas. 
            Cure 5× plus rapide, résistance supérieure, durée de vie plus longue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} card-lift rounded-2xl p-7 border ${
              b.highlight
                ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20'
                : 'bg-white/4 border-white/8'
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                b.highlight ? 'bg-primary' : 'bg-white/8'
              }`}>
                <b.icon className={`w-6 h-6 ${b.highlight ? 'text-white' : 'text-primary'}`} />
              </div>
              <h3 className="font-display text-xl font-bold text-white uppercase leading-tight mb-3">{b.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table teaser */}
        <div className="reveal mt-14 bg-white/4 border border-white/8 rounded-3xl p-8">
          <h3 className="font-display text-3xl font-black text-white uppercase text-center mb-8">
            Pourquoi pas juste de l'époxy ?
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 font-medium py-3 pr-6">Caractéristique</th>
                  <th className="text-center text-white/40 font-medium py-3 px-4">Époxy</th>
                  <th className="text-center text-primary font-bold py-3 px-4">Polyaspartique ✦</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Temps de cure', '24–72h', '2–4h'],
                  ['Résistance UV (jaunissement)', '✗ Jaunit', '✓ Stable'],
                  ['Résistance aux chocs', 'Moyenne', 'Supérieure'],
                  ['Flexibilité (gel/dégel)', 'Rigide', '✓ Flexible'],
                  ['Durée de vie', '5–10 ans', '15–20 ans'],
                  ['Installation 1 jour', '✗ Impossible', '✓ Standard'],
                ].map(([feat, epoxy, poly], i) => (
                  <tr key={i}>
                    <td className="text-white/70 py-3 pr-6">{feat}</td>
                    <td className="text-center text-white/30 py-3 px-4">{epoxy}</td>
                    <td className="text-center text-primary font-semibold py-3 px-4">{poly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
