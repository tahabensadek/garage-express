'use client'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Est-ce que c\'est vraiment installé en 1 journée ?',
    a: 'Oui — sans exception. Nos techniciens arrivent vers 8h et repartent en fin d\'après-midi. Le jour même, vous pouvez marcher sur le plancher. Après 24h, les véhicules peuvent rentrer. C\'est l\'avantage principal du polyaspartique sur l\'époxy : il cure 5× plus vite.',
  },
  {
    q: 'Quelle est la différence entre le polyaspartique et l\'époxy ?',
    a: 'Le polyaspartique est une évolution technologique de l\'époxy. Il cure plus vite, résiste mieux aux UV (ne jaunit pas), est plus flexible (résiste au gel/dégel québécois), et dure plus longtemps. L\'époxy reste un bon produit, mais le polyaspartique est ce que les professionnels choisissent aujourd\'hui pour les applications haute performance.',
  },
  {
    q: 'Le prix inclut vraiment tout ? Il n\'y aura pas de surprise ?',
    a: 'Le prix inclut : la préparation de surface (meulage), les réparations de fissures mineures, la couche de base, les flocons décoratifs, le top coat, et le nettoyage. La seule exception possible : les fissures structurelles majeures (larges de plus de 5mm ou profondes). On vous avertit à l\'avance si c\'est le cas après inspection visuelle.',
  },
  {
    q: 'Dois-je vider complètement mon garage ?',
    a: 'Idéalement oui — ça accélère l\'installation et assure une couverture complète. Si vous ne pouvez pas tout sortir, nos techniciens peuvent travailler en sections et déplacer les objets pendant l\'installation (selon le volume). Contactez-nous pour en discuter avant.',
  },
  {
    q: 'Est-ce que ça résiste vraiment aux hivers québécois ?',
    a: 'Absolument. C\'est conçu pour ça. Le polyaspartique est flexible, donc il suit la contraction/dilatation du béton avec les cycles gel/dégel sans décoller ni fissurer. Il est également résistant au sel de déglaçage, au calcium, et aux changements brusques de température de -30°C à +40°C.',
  },
  {
    q: 'Combien de temps dure la garantie et qu\'est-ce qu\'elle couvre ?',
    a: 'La garantie est de 15 ans et couvre les matériaux ET la main-d\'oeuvre. Si le revêtement se décolle, fissure, pèle ou présente des défauts non liés à un choc ou à une usure anormale, on revient le réparer sans frais. C\'est une garantie réelle, pas juste du marketing.',
  },
  {
    q: 'Puis-je choisir la couleur des flocons ?',
    a: 'Oui. Vous choisissez votre couleur lors de la prise de rendez-vous. Les forfaits standard incluent 8 couleurs (Garage Simple) ou 12 couleurs (Garage Double). Des mélanges personnalisés sont disponibles pour 200$ supplémentaires. On vous envoie un catalogue dès que vous confirmez.',
  },
  {
    q: 'Pourquoi ne pas juste acheter un kit époxy au Home Depot ?',
    a: 'Vous pouvez. Mais voici ce qui se passe généralement : le produit est de grade résidentiel bas, la préparation de surface est inadéquate, et le plancher commence à peler après 1-2 hivers. Vous le refaites. Au total, vous avez dépensé plus que le prix de notre forfait, eu le trouble de le faire vous-même deux fois, et le résultat est inférieur. Notre garantie 15 ans vous évite tout ça.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            Questions fréquentes
            <span className="block text-gradient">Réponses honnêtes.</span>
          </h2>
          <p className="text-gray-500 text-lg">On répond aux vraies questions que les gens hésitent à poser.</p>
        </div>

        <div className="space-y-3 reveal">
          {faqs.map((faq, i) => (
            <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-bold text-dark pr-4 text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center bg-gray-50 border border-gray-200 rounded-2xl p-7">
          <p className="text-gray-600 mb-4">Vous avez une question qui n'est pas là ?</p>
          <a href="tel:5148248618"
            className="inline-flex items-center gap-2 bg-dark hover:bg-dark-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all">
            Appelez-nous — 514-824-8618
          </a>
        </div>
      </div>
    </section>
  )
}
