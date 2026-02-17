'use client'
import { useEffect, useRef } from 'react'
import { Phone, ArrowDown, Star, Shield, Clock, ChevronRight } from 'lucide-react'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Staggered entrance
    const els = document.querySelectorAll('.hero-reveal')
    els.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible')
      }, 150 + i * 120)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      {/* SVG Hero Image - plein écran */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-car.svg"
          alt="Garage professionnel avec revêtement polyaspartique"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
        {/* Gradient left heavy pour lisibilité texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/97 via-dark/85 to-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
        {/* Red accent glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16 w-full">
        <div className="max-w-2xl">

          {/* Trust badge */}
          <div className="reveal hero-reveal flex items-center gap-2.5 mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_,i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-white/70 text-sm">+500 garages transformés sur la Rive-Sud & Laval</span>
          </div>

          {/* Main headline */}
          <h1 ref={titleRef} className="reveal hero-reveal font-display text-6xl sm:text-7xl lg:text-[6rem] font-black leading-none text-white uppercase tracking-tight mb-4">
            Votre garage
            <span className="block text-gradient">mérite mieux</span>
            <span className="block text-white">qu'un béton</span>
            <span className="block text-white">taché.</span>
          </h1>

          {/* Subheadline */}
          <p className="reveal hero-reveal text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
            On installe un <strong className="text-white">plancher polyaspartique professionnel</strong> en une seule journée. 
            Résultat : un fini digne d'un showroom — durable 15 ans, antidérapant, résistant au sel et à l'huile.
          </p>

          {/* Price strip */}
          <div className="reveal hero-reveal flex flex-wrap gap-3 mb-8">
            <div className="bg-white/8 backdrop-blur border border-white/12 rounded-xl px-5 py-3">
              <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Garage simple (≤300 pi²)</div>
              <div className="font-display text-3xl font-black text-white">2 749<span className="text-lg text-white/70">,99$</span></div>
            </div>
            <div className="bg-primary/15 backdrop-blur border border-primary/40 rounded-xl px-5 py-3">
              <div className="text-primary/80 text-xs uppercase tracking-widest mb-1">Garage double (&gt;300 pi²)</div>
              <div className="font-display text-3xl font-black text-primary">4 449<span className="text-lg text-primary/70">,99$</span></div>
            </div>
            <div className="flex items-center">
              <span className="text-white/40 text-xs leading-tight">Taxes incluses<br/>Prix fixe garanti</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="reveal hero-reveal flex flex-col sm:flex-row gap-3 mb-10">
            <a href="#soumission"
              className="relative overflow-hidden group bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl shadow-primary/30 btn-shimmer">
              Obtenir ma soumission gratuite
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:5148248618"
              className="group bg-white/8 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm">
              <Phone className="w-5 h-5 text-primary" />
              514-824-8618
            </a>
          </div>

          {/* Micro trust */}
          <div className="reveal hero-reveal flex flex-wrap gap-5">
            {[
              { icon: Clock, label: 'Complété en 1 journée' },
              { icon: Shield, label: 'Garantie 15 ans' },
              { icon: Star, label: 'Prix fixe — zéro surprise' },
            ].map(({icon: Icon, label}, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon className="w-4 h-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#pourquoi" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group">
        <span className="text-xs uppercase tracking-widest">Défiler</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  )
}
