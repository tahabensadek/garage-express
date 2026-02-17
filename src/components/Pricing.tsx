'use client'
import { useEffect, useState } from 'react'
import { Check, X, ChevronDown, Shield, Star, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Garage Simple',
    tagline: 'Pour un véhicule',
    price: '2 749',
    cents: ',99$',
    size: '≤ 300 pi²',
    popular: false,
    includes: [
      'Surface jusqu\'à 300 pi²',
      'Préparation & meulage professionnel du béton',
      'Réparation des fissures mineures incluse',
      'Couche primaire polyaspartique haute adhérence',
      'Flocons décoratifs (au choix parmi 8 couleurs)',
      'Top coat polyaspartique double couche',
      'Fini antidérapant certifié',
      'Résistant sel, huile, calcium, UV',
      'Nettoyage complet post-installation',
      'Garantie 15 ans — matériaux & main-d\'oeuvre',
      'Prêt à utiliser en 24h',
    ],
    excludes: ['Fissures structurelles majeures (supplément)', 'Surface > 300 pi²'],
    cta: 'Je veux ce forfait',
  },
  {
    name: 'Garage Double',
    tagline: 'Pour deux véhicules — le plus populaire',
    price: '4 449',
    cents: ',99$',
    size: '> 300 pi²',
    popular: true,
    badge: '⚡ Plus populaire',
    includes: [
      'Surface illimitée au-delà de 300 pi²',
      'Préparation & meulage professionnel du béton',
      'Réparation des fissures mineures incluse',
      'Couche primaire polyaspartique PREMIUM haute adhérence',
      'Flocons décoratifs PREMIUM (au choix parmi 12 couleurs)',
      'Top coat polyaspartique renforcé triple couche',
      'Fini antidérapant certifié',
      'Résistant sel, huile, calcium, UV, produits chimiques',
      'Nettoyage complet post-installation',
      'Garantie 15 ans — matériaux & main-d\'oeuvre',
      'Prêt à utiliser en 24h',
      'Meilleur rapport pi²/dollar',
    ],
    excludes: ['Fissures structurelles majeures (supplément)'],
    cta: 'Je veux ce forfait',
  },
]

export default function Pricing() {
  const [addonsOpen, setAddonsOpen] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="tarifs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-block bg-primary/8 border border-primary/15 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            Tarification transparente
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            Deux forfaits.
            <span className="block text-gradient">Zéro frais caché.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Le prix que vous voyez est le prix que vous payez. On ne fait pas de surprise le jour de l'installation. 
            Taxes incluses, matériaux inclus, main-d'oeuvre incluse.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto mb-10">
          {plans.map((plan, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} relative rounded-3xl overflow-hidden card-lift ${
              plan.popular
                ? 'shadow-2xl shadow-primary/20 ring-2 ring-primary'
                : 'border-2 border-gray-100 shadow-lg'
            }`}>
              {plan.badge && (
                <div className="bg-gradient-to-r from-primary to-red-500 text-white text-center py-3 text-sm font-bold tracking-wide">
                  {plan.badge}
                </div>
              )}

              <div className="p-8">
                {/* Plan header */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-black text-dark uppercase">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{plan.tagline}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">{plan.size}</div>
                  </div>
                  
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="font-display text-6xl font-black text-dark leading-none">{plan.price}</span>
                    <span className="font-display text-3xl font-black text-gray-400">{plan.cents}</span>
                  </div>
                  <div className="mt-2 flex gap-3 flex-wrap">
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">Taxes incluses</span>
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">Prix fixe garanti</span>
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">Installation 1 jour</span>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="mb-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Ce qui est inclus</div>
                  <ul className="space-y-2.5">
                    {plan.includes.map((item, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                {plan.excludes.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-dashed border-gray-100">
                    <div className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3">Non inclus</div>
                    <ul className="space-y-2">
                      {plan.excludes.map((item, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-400 text-sm leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a href="#soumission"
                  className={`relative overflow-hidden w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 btn-shimmer ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/25'
                      : 'bg-dark hover:bg-dark-700 text-white shadow-lg'
                  }`}>
                  {plan.cta}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-center text-xs text-gray-400 mt-3">Réponse par téléphone dans les 24h</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="reveal max-w-5xl mx-auto">
          <button
            onClick={() => setAddonsOpen(!addonsOpen)}
            className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary/30 rounded-2xl p-6 transition-all duration-200 group">
            <div className="text-left">
              <div className="font-bold text-dark text-lg">Options additionnelles</div>
              <div className="text-gray-500 text-sm">Réparations majeures, options de couleurs, extensions de surface</div>
            </div>
            <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${addonsOpen ? 'rotate-180' : ''}`} />
          </button>

          {addonsOpen && (
            <div className="mt-2 bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 space-y-4">
              {[
                { name: 'Réparation fissures structurelles majeures', price: '300–800$', note: 'Évaluation visuelle gratuite lors de la visite' },
                { name: 'Couleur de flocons personnalisée (hors catalogue)', price: '+200$', note: '12 couleurs standard incluses sans frais' },
                { name: 'Extension de surface > 600 pi²', price: 'Sur devis', note: 'Tarif dégressif — plus la surface est grande, moins le pi² coûte' },
                { name: 'Traitement hydrofuge périmétrique', price: '+150$', note: 'Recommandé si infiltration passée aux murs' },
              ].map((addon, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div>
                    <div className="font-semibold text-dark text-sm">{addon.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{addon.note}</div>
                  </div>
                  <div className="font-display text-xl font-black text-primary whitespace-nowrap">{addon.price}</div>
                </div>
              ))}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-600 text-center">
                💬 Toutes ces options sont discutées lors de la visite gratuite — aucune obligation d'achat.
              </div>
            </div>
          )}
        </div>

        {/* Guarantee strip */}
        <div className="reveal mt-14 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { icon: Shield, title: 'Garantie 15 ans', desc: 'Couvre matériaux et main-d\'oeuvre. Si ça décolle, fissure ou pèle dans les 15 ans — on revient, gratis.' },
            { icon: Star, title: 'Prix fixe — pas de surprise', desc: 'Le montant sur votre soumission est le montant final. Pas de frais cachés. Pas de "oh, c\'était pas inclus".' },
            { icon: Check, title: 'Satisfaction garantie', desc: 'On ne part pas avant que vous soyez satisfait. C\'est une promesse qu\'on respecte sur chaque chantier.' },
          ].map(({icon: Icon, title, desc}, i) => (
            <div key={i} className="bg-dark text-white rounded-2xl p-6 card-lift">
              <Icon className="w-7 h-7 text-primary mb-4" />
              <div className="font-display text-xl font-black uppercase mb-2">{title}</div>
              <div className="text-white/50 text-sm leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
