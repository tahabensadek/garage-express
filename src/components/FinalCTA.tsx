'use client'
import { useEffect } from 'react'
import { Phone, ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-primary relative overflow-hidden noise">
      {/* Background geometry */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 border-2 border-white rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="reveal">
          <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-white uppercase leading-none mb-6">
            Votre garage
            <span className="block italic">mérite mieux</span>
            <span className="block text-white/30">qu'attendre.</span>
          </h2>
          <p className="text-white/75 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Chaque saison que vous attendez, c'est un autre hiver que le sel et le calcium font leur travail. 
            Une journée d'installation. 15 ans de résultats.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#soumission"
              className="group relative overflow-hidden bg-white text-primary hover:bg-gray-50 font-black px-10 py-5 rounded-xl text-lg transition-all shadow-2xl flex items-center justify-center gap-2">
              Obtenir ma soumission gratuite
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:5148248618"
              className="bg-white/15 hover:bg-white/25 border-2 border-white/40 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Phone className="w-6 h-6" />
              514-824-8618
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <span>✓ Réponse en 24h</span>
            <span>✓ Prix fixe garanti</span>
            <span>✓ Garantie 15 ans</span>
            <span>✓ Aucun engagement</span>
          </div>
        </div>
      </div>
    </section>
  )
}
