'use client'
import { useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Marc-André Tremblay',
    city: 'Longueuil',
    type: 'Garage double',
    date: 'Janvier 2025',
    stars: 5,
    title: 'Exactement ce qui était promis. À la virgule près.',
    text: 'J\'avais peur des frais cachés — ça ne s\'est pas produit. Le prix de la soumission est exactement ce que j\'ai payé. L\'équipe est arrivée à 8h et repartie à 17h. Le lendemain matin, j\'ai rentré ma F-150 et mon VTT. Le plancher est impeccable. Je recommande les yeux fermés.',
    highlight: true,
  },
  {
    name: 'Sophie Gagnon-Roy',
    city: 'Brossard',
    type: 'Garage simple',
    date: 'Novembre 2024',
    stars: 5,
    title: 'Mon mari pensait que c\'était trop cher. Il a changé d\'avis.',
    text: 'On hésitait entre l\'époxy "cheap" du Home Depot et Garage Express. Mon mari trouvait que 2750$ c\'était beaucoup. Maintenant qu\'on voit le résultat, on regrette juste de ne pas l\'avoir fait avant. Le plancher est magnifique et tellement facile à nettoyer. Le sel de décembre — un coup de mop et c\'est parti.',
  },
  {
    name: 'Jean-François Côté',
    city: 'Laval',
    type: 'Garage double + options',
    date: 'Octobre 2024',
    stars: 5,
    title: 'Professionnalisme du début à la fin.',
    text: 'Troisième fois que je fais affaire avec une entreprise de revêtement de garage. Les deux premières fois ont été des désastres (décollement, fissures après 2 hivers). Garage Express, c\'est une autre game. L\'équipe explique chaque étape, l\'installation est propre, et ça fait maintenant 14 mois — aucun problème. C\'est ce qu\'on devrait appeler du travail bien fait.',
  },
  {
    name: 'Isabelle Pelletier',
    city: 'Saint-Hubert',
    type: 'Garage simple',
    date: 'Septembre 2024',
    stars: 5,
    title: 'Mon garage est plus beau que mon salon maintenant.',
    text: 'Je rigole, mais c\'est presque vrai. Le fini est brillant, les flocons gris donnent un look vraiment luxueux. Mes voisins m\'ont demandé votre contact deux fois déjà. L\'installation en un jour, c\'était un gros plus — pas de deuxième journée à libérer dans mon agenda.',
  },
  {
    name: 'Patrick Bouchard',
    city: 'La Prairie',
    type: 'Garage double',
    date: 'Août 2024',
    stars: 5,
    title: 'Réactifs, ponctuels, propres. On demande quoi de plus?',
    text: 'J\'ai appelé un vendredi, eu une réponse le samedi matin, et l\'installation était faite le mercredi suivant. L\'équipe a protégé mes murs avec du plastique, aspiré la poussière au fur et à mesure, et laissé le garage impeccable en partant. En plus du plancher bien sûr. Service 5 étoiles mérité.',
  },
  {
    name: 'Nathalie Viens',
    city: 'Boucherville',
    type: 'Garage simple',
    date: 'Juillet 2024',
    stars: 5,
    title: 'Valeur maison + plaisir d\'utilisation. Win-win.',
    text: 'Mon courtier immobilier m\'a dit que le plancher polyaspartique ajoute de la valeur perçue lors d\'une vente. Mais au-delà de ça, j\'adore maintenant mon garage. Je fais du yoga là-dedans l\'été. Je ris, mais c\'est vrai. Plus de poussière, plus de taches d\'huile, plus de béton qui poudroie.',
  },
]

export default function Testimonials() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            {[...Array(5)].map((_,i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            <span className="font-bold text-dark ml-1">4.9/5</span>
            <span className="text-gray-400">· 200+ avis Google vérifiés</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-dark uppercase leading-tight mb-4">
            Ce que disent
            <span className="block text-gradient">vos voisins.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Ces avis sont de vrais clients sur la Rive-Sud et à Laval. Pas de témoignages inventés, pas de fausses étoiles.
          </p>
        </div>

        {/* Featured review */}
        <div className="reveal max-w-3xl mx-auto mb-8">
          <div className="relative bg-dark text-white rounded-3xl p-8 overflow-hidden">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-primary/15" />
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_,i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-white mb-4">{reviews[0].title}</h3>
            <p className="text-white/60 leading-relaxed mb-6">{reviews[0].text}</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <div className="font-bold text-white">{reviews[0].name}</div>
                <div className="text-white/40 text-sm">{reviews[0].city} · {reviews[0].type}</div>
              </div>
              <div className="text-white/30 text-xs">{reviews[0].date}</div>
            </div>
          </div>
        </div>

        {/* Grid reviews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {reviews.slice(1).map((r, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} bg-gray-50 border border-gray-100 rounded-2xl p-6 card-lift`}>
              <div className="flex gap-1 mb-3">
                {[...Array(r.stars)].map((_,j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <h4 className="font-bold text-dark mb-2 text-sm leading-snug">{r.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{r.text}</p>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-dark text-sm">{r.name}</div>
                  <div className="text-gray-400 text-xs">{r.city} · {r.type}</div>
                </div>
                <div className="text-gray-300 text-xs">{r.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div className="reveal text-center">
          <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-6 py-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-bold text-dark">4.9</span>
            <span className="text-gray-400 text-sm">· 200+ avis Google vérifiés</span>
          </div>
        </div>
      </div>
    </section>
  )
}
