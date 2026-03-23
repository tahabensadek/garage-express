'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Check, X, Star, Shield, Clock, ArrowRight, CaretRight, Quotes,
  Lightning, Drop, Sparkle, Timer, Lock,
} from '@phosphor-icons/react'
import LeadForm from '@/components/LeadForm'

/* ── helpers ─────────────────────────────────────────────────── */
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '')
  return digits.startsWith('1') && digits.length === 11 ? digits.slice(1) : digits
}

/* ── Bilingual copy ──────────────────────────────────────────── */
const copy = {
  fr: {
    badge: 'Époxy garage — Montréal, Rive-Sud & Laval',
    heroTitle: 'Époxy Garage',
    heroHighlight: 'Grand Montréal.',
    heroSub: 'Vous cherchez de l\'époxy pour votre garage\u00a0? On fait <strong>mieux que l\'époxy</strong>\u00a0— le polyaspartique nouvelle génération. Même look, 2× plus résistant, installé en 1 journée.',
    ctaPrimary: 'Obtenir ma soumission gratuite',
    ctaPhone: '514-824-8618',
    fixedPrice: 'Prix fixe tout inclus\u00a0· Zéro surprise\u00a0· Garantie 15 ans',

    urgency: '🌱 Saison printanière — Disponibilités limitées en avril. Réservez maintenant.',

    heroFormName: 'Votre prénom',
    heroFormPhone: 'Votre téléphone',
    heroFormCta: 'Soumission gratuite →',
    heroFormSuccess: '✓ On vous rappelle en moins de 15 min !',

    floatCta: '📋 Soumission gratuite',
    stickyCall: '📞 Appeler',
    stickyCta: 'Soumission gratuite →',

    stat1: '127+', stat1Label: 'Garages transformés',
    stat2: '5★',  stat2Label: 'Note Google',
    stat3: '1 jour', stat3Label: 'Installation',
    stat4: '15 ans', stat4Label: 'Garantie',

    bridgeBadge: 'Vous cherchez de l\'époxy\u00a0?',
    bridgeTitle: 'Vous êtes au bon endroit. On fait mieux que l\'époxy.',
    bridgeText: 'Depuis 2020, nos clients nous appellent pour de l\'époxy. On leur installe du polyaspartique. Personne n\'est jamais déçu\u00a0— au contraire. Voici pourquoi\u00a0:',
    bridgePoints: [
      'Même look qu\'un époxy\u00a0— en mieux',
      'Installé en 1 jour, pas 3-5 jours',
      'Résiste aux hivers québécois sans se décoller',
      'Garantie 15 ans matériaux ET main-d\'œuvre',
    ],

    processTitle: 'Simple comme 1-2-3',
    processSteps: [
      { num: '01', title: 'Soumission gratuite', desc: 'Remplissez le formulaire. On vous rappelle dans les 24h pour confirmer les détails et fixer une date.' },
      { num: '02', title: 'Installation en 1 journée', desc: 'L\'équipe arrive à 8h. Ponçage, application, flocons, topcoat. Terminé en fin d\'après-midi.' },
      { num: '03', title: 'Profitez de votre garage', desc: 'Plancher accessible dès le soir même. Véhicules après 24h. Garantie 15 ans en main.' },
    ],

    compareTitle: 'Époxy vs Polyaspartique',
    compareSub: 'Même prix. Même look. Pas les mêmes performances.',
    compareEpoxy: 'Époxy classique',
    comparePoly: 'Polyaspartique ✓',
    compareFeature: 'Caractéristique',
    rows: [
      { feature: 'Temps de séchage',       epoxy: '3-5 jours',           poly: '1 journée ✓'       },
      { feature: 'Résistance UV',           epoxy: 'Jaunit avec le temps', poly: 'Ne jaunit pas ✓'   },
      { feature: 'Gel/dégel québécois',     epoxy: 'Se décolle',           poly: 'Flexible ✓'        },
      { feature: 'Résistance sel/calcium',  epoxy: 'Correcte',             poly: 'Excellente ✓'      },
      { feature: 'Durée de vie',            epoxy: '3-5 ans',              poly: '15+ ans ✓'         },
      { feature: 'Garantie',               epoxy: 'Variable',             poly: '15 ans incluse ✓'  },
    ],

    benefitsTitle: 'Ce que vous obtenez',
    benefits: [
      { icon: Timer,    title: 'Installé en 1 journée',  desc: 'Arrivée à 8h, départ en fin d\'après-midi. Vous marchez dessus le soir même.' },
      { icon: Lock,     title: 'Prix fixe garanti',       desc: 'Simple 2\u00a0749$ — Double 4\u00a0449$. Zéro frais caché, zéro surprise.' },
      { icon: Shield,   title: 'Garantie 15 ans',         desc: 'Matériaux ET main-d\'œuvre. Si ça pèle, on revient sans frais.' },
      { icon: Drop,     title: 'Résistant au sel',        desc: 'Conçu pour les hivers québécois. Calcium, sel de déglaçage, huile moteur.' },
      { icon: Sparkle,  title: '137 couleurs',            desc: 'Flocons Torginol — choisissez votre style parmi 137 nuances.' },
      { icon: Lightning, title: 'Équipe locale',          desc: 'Rive-Sud, Montréal, Laval. On répond en moins de 5 minutes.' },
    ],

    pricingTitle: 'Tarifs\u00a0— Tout inclus',
    pricingBadge: 'Prix fixe\u00a0— aucune surprise',
    pricingNote: 'Préparation de surface · Réparations fissures mineures · Application · Flocons Torginol · Topcoat · Nettoyage',
    pricingCta: 'Obtenir ma soumission',
    pricingCtaInline: 'Obtenir ma soumission',
    plans: [
      { name: 'Garage simple',           size: '≤300 pi²',      price: '2\u00a0749', cents: ',99$', tag: null,       popular: false },
      { name: 'Simple + Rangement',      size: '300-450 pi²',   price: '3\u00a0449', cents: ',99$', tag: 'Populaire', popular: true  },
      { name: 'Garage double',           size: '450-600 pi²',   price: '4\u00a0449', cents: ',99$', tag: null,       popular: false },
    ],

    reviewsTitle: 'Ce que disent nos clients',
    reviews: [
      { name: 'François Landry',           city: 'Il y a 3 semaines', stars: 5, text: 'Bravo ! Travaux bien exécutés, résultat final incroyable, les nuances dans le plancher ont l\'air naturel. C\'est de l\'art et un métier en même temps. Je donne un 5 étoiles bien mérités 👌🏼' },
      { name: 'Sonia Boulianne',           city: 'Il y a 1 semaine',  stars: 5, text: 'Très beau service du début à la fin, entièrement satisfaite de mon plancher de garage ! Arrivé à l\'heure, parti à 17h comme convenu. Toutes les autres entreprises m\'ont estimé deux jours de travail, avec lui ça pris une journée et un produit supérieur garanti. Je recommande.' },
      { name: 'Philippe-Alexandre Alarie', city: 'Il y a 6 jours',    stars: 5, text: 'Merci à Garage Express pour les travaux bien exécutés, service avant, pendant et après installation hors pair ! Je recommande !' },
      { name: 'Richard Theriault',         city: 'Il y a 2 jours',    stars: 5, text: 'Belle job, bon service.' },
    ],

    reviewsCtaPhone: '514-824-8618',
    reviewsCtaForm: 'Obtenir ma soumission',

    trustTitle: 'Zéro risque — 100% confiance',
    trustPills: [
      '🛡 Garantie 15 ans matériaux + pose',
      '🔒 Prix fixe — ce qu\'on dit = ce qu\'on facture',
      '✅ Soumission 100% gratuite, sans engagement',
      '⚡ On vous rappelle en moins de 15 min',
    ],

    faqTitle: 'Questions sur l\'époxy garage',
    faqs: [
      { q: 'C\'est quoi la différence entre époxy et polyaspartique\u00a0?', a: 'Le polyaspartique est une évolution de l\'époxy\u00a0: il cure en 1 journée (vs 3-5 jours), résiste mieux aux UV (ne jaunit pas), est plus flexible pour les cycles gel/dégel québécois, et dure 15+ ans. Même look, meilleures performances.' },
      { q: 'Le prix est-il vraiment tout inclus\u00a0?', a: 'Oui — préparation de surface (ponçage), réparations de fissures mineures, application de la couche de base, flocons décoratifs Torginol, topcoat protecteur, et nettoyage. Un seul prix, zéro surprise.' },
      { q: 'Combien de temps ça prend\u00a0?', a: '1 journée. L\'équipe arrive vers 8h et repart en fin d\'après-midi. Vous pouvez marcher dessus le soir même. Les véhicules peuvent rentrer après 24h.' },
      { q: 'Servez-vous Laval\u00a0?', a: 'Oui — Rive-Sud, Montréal, Laval et les environs. Appelez-nous pour confirmer votre secteur.' },
      { q: 'Est-ce que ça résiste vraiment aux hivers québécois\u00a0?', a: 'Absolument. Le polyaspartique est flexible — il suit la contraction/dilatation du béton lors des cycles gel/dégel. Résistant au sel de déglaçage, calcium, huile moteur, et aux températures de -30°C à +40°C.' },
    ],
  },
  en: {
    badge: 'Epoxy garage — Montreal, South Shore & Laval',
    heroTitle: 'Epoxy Garage',
    heroHighlight: 'Greater Montreal.',
    heroSub: 'Looking for garage epoxy? We do <strong>better than epoxy</strong>\u00a0— next-gen polyaspartic. Same look, 2× stronger, installed in 1 day.',
    ctaPrimary: 'Get my free quote',
    ctaPhone: '514-824-8618',
    fixedPrice: 'Fixed all-inclusive price\u00a0· No surprises\u00a0· 15-year warranty',

    urgency: '🌱 Spring season — Limited availability in April. Book now.',

    heroFormName: 'Your first name',
    heroFormPhone: 'Your phone number',
    heroFormCta: 'Free quote →',
    heroFormSuccess: '✓ We\'ll call you back in under 15 min!',

    floatCta: '📋 Free quote',
    stickyCall: '📞 Call',
    stickyCta: 'Free quote →',

    stat1: '127+', stat1Label: 'Garages transformed',
    stat2: '5★',  stat2Label: 'Google rating',
    stat3: '1 day', stat3Label: 'Installation',
    stat4: '15 yrs', stat4Label: 'Warranty',

    bridgeBadge: 'Looking for epoxy?',
    bridgeTitle: 'You\'re in the right place. We do better than epoxy.',
    bridgeText: 'Since 2020, customers call us for epoxy. We install polyaspartic. Nobody is ever disappointed. Here\'s why:',
    bridgePoints: [
      'Same look as epoxy — but better',
      'Installed in 1 day, not 3-5 days',
      'Handles Quebec winters without peeling',
      '15-year warranty materials AND labor',
    ],

    processTitle: 'Simple as 1-2-3',
    processSteps: [
      { num: '01', title: 'Free quote', desc: 'Fill out the form. We call you back within 24h to confirm details and schedule a date.' },
      { num: '02', title: 'Installed in 1 day', desc: 'Team arrives at 8am. Grinding, application, flakes, topcoat. Done by afternoon.' },
      { num: '03', title: 'Enjoy your garage', desc: 'Walk on it the same evening. Vehicles after 24h. 15-year warranty in hand.' },
    ],

    compareTitle: 'Epoxy vs Polyaspartic',
    compareSub: 'Same price. Same look. Different performance.',
    compareEpoxy: 'Classic Epoxy',
    comparePoly: 'Polyaspartic ✓',
    compareFeature: 'Feature',
    rows: [
      { feature: 'Cure time',         epoxy: '3-5 days',        poly: '1 day ✓'               },
      { feature: 'UV resistance',     epoxy: 'Yellows over time', poly: 'No yellowing ✓'       },
      { feature: 'Freeze/thaw',       epoxy: 'Peels',            poly: 'Flexible ✓'            },
      { feature: 'Salt resistance',   epoxy: 'Average',          poly: 'Excellent ✓'           },
      { feature: 'Lifespan',          epoxy: '3-5 years',        poly: '15+ years ✓'           },
      { feature: 'Warranty',          epoxy: 'Varies',           poly: '15 years included ✓'   },
    ],

    benefitsTitle: 'What you get',
    benefits: [
      { icon: Timer,    title: 'Installed in 1 day',  desc: 'Team arrives at 8am, done by afternoon. Walk on it the same evening.' },
      { icon: Lock,     title: 'Fixed price',          desc: 'Single $2,749 — Double $4,449. Zero hidden fees, zero surprises.' },
      { icon: Shield,   title: '15-year warranty',     desc: 'Materials AND labor. If it peels, we come back at no cost.' },
      { icon: Drop,     title: 'Salt resistant',       desc: 'Built for Quebec winters. De-icing salt, calcium, motor oil.' },
      { icon: Sparkle,  title: '137 colors',           desc: 'Torginol flakes — choose your style from 137 available shades.' },
      { icon: Lightning, title: 'Local team',          desc: 'South Shore, Montreal, Laval. We answer in under 5 minutes.' },
    ],

    pricingTitle: 'Pricing — All inclusive',
    pricingBadge: 'Fixed price — no surprises',
    pricingNote: 'Surface prep · Minor crack repairs · Application · Torginol flakes · Topcoat · Cleanup',
    pricingCta: 'Get my quote',
    pricingCtaInline: 'Get my quote',
    plans: [
      { name: 'Single garage',         size: '≤300 sq ft',      price: '2,749', cents: '.99$', tag: null,       popular: false },
      { name: 'Single + Storage',      size: '300-450 sq ft',   price: '3,449', cents: '.99$', tag: 'Popular',  popular: true  },
      { name: 'Double garage',         size: '450-600 sq ft',   price: '4,449', cents: '.99$', tag: null,       popular: false },
    ],

    reviewsTitle: 'What our clients say',
    reviews: [
      { name: 'François Landry',           city: '3 weeks ago', stars: 5, text: 'Bravo! Work well done, incredible final result, the shades in the floor look natural. It\'s art and a craft at the same time. I give a well-deserved 5 stars 👌🏼' },
      { name: 'Sonia Boulianne',           city: '1 week ago',  stars: 5, text: 'Very beautiful service from start to finish, completely satisfied with my garage floor! Arrived on time, left at 5pm as agreed. All other companies estimated two days of work, with him it took one day and a superior product guaranteed. I recommend.' },
      { name: 'Philippe-Alexandre Alarie', city: '6 days ago',  stars: 5, text: 'Thank you to Garage Express for the work well done, service before, during and after installation is top notch! I recommend!' },
      { name: 'Richard Theriault',         city: '2 days ago',  stars: 5, text: 'Great job, good service.' },
    ],

    reviewsCtaPhone: '514-824-8618',
    reviewsCtaForm: 'Get my quote',

    trustTitle: 'Zero risk — 100% confidence',
    trustPills: [
      '🛡 15-year warranty materials + labor',
      '🔒 Fixed price — what we say = what we charge',
      '✅ 100% free quote, no obligation',
      '⚡ We call you back in under 15 min',
    ],

    faqTitle: 'Epoxy garage FAQ',
    faqs: [
      { q: 'What\'s the difference between epoxy and polyaspartic?', a: 'Polyaspartic is an evolution of epoxy: cures in 1 day (vs 3-5 days), better UV resistance (no yellowing), more flexible for Quebec freeze/thaw cycles, and lasts 15+ years. Same look, better performance.' },
      { q: 'Is the price really all-inclusive?', a: 'Yes — surface prep (grinding), minor crack repairs, base coat, decorative Torginol flakes, protective topcoat, and cleanup. One price, no surprises.' },
      { q: 'How long does it take?', a: '1 day. Team arrives around 8am and leaves late afternoon. Walk on it that evening. Vehicles can enter after 24h.' },
      { q: 'Do you serve Laval?', a: 'Yes — South Shore, Montreal, Laval and surrounding areas. Call us to confirm your area.' },
      { q: 'Does it really hold up to Quebec winters?', a: 'Absolutely. Polyaspartic is flexible — it follows concrete\'s expansion and contraction during freeze/thaw cycles. Resistant to de-icing salt, calcium, motor oil, and temperatures from -30°C to +40°C.' },
    ],
  },
}

/* ── Before/After slider ────────────────────────────────────── */
function BASlider() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-2xl"
      onMouseDown={() => { dragging.current = true }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onMouseMove={e => { if (dragging.current) update(e.clientX) }}
      onTouchStart={() => { dragging.current = true }}
      onTouchEnd={() => { dragging.current = false }}
      onTouchMove={e => update(e.touches[0].clientX)}
    >
      <Image src="/images/after-1.png" alt="Plancher époxy garage après — Garage Express" fill className="object-cover pointer-events-none" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src="/images/before-1.png" alt="Plancher garage avant époxy" fill className="object-cover pointer-events-none" />
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center text-dark font-black text-sm">◀▶</div>
      </div>
      <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">AVANT</div>
      <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg">APRÈS</div>
    </div>
  )
}

/* ── Main page ──────────────────────────────────────────────── */
export default function EpoxyGaragePage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'fr'
  const c = copy[locale]
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  /* Hero mini-form state */
  const [heroName, setHeroName] = useState('')
  const [heroPhone, setHeroPhone] = useState('')
  const [heroSent, setHeroSent] = useState(false)
  const [heroLoading, setHeroLoading] = useState(false)

  /* Floating desktop CTA */
  const [showFloat, setShowFloat] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const trackCall = () =>
    (window as any).gtag?.('event', 'conversion', {
      send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC',
      value: 1.0,
      currency: 'CAD',
    })

  const heroSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHeroLoading(true)
    const phone = formatPhone(heroPhone)
    ;(window as any).gtag?.('event', 'conversion', {
      send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC',
      value: 1.0,
      currency: 'CAD',
    })
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: heroName,
          phone,
          locale,
          source: 'epoxy-hero',
          garageSize: '',
          email: '',
          city: '',
          cracks: '',
        }),
      })
    } catch (_) { /* silent */ }
    setHeroLoading(false)
    setHeroSent(true)
  }

  return (
    <div className="min-h-screen bg-dark">

      {/* ─────────── Sticky header ─────────── */}
      <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Image src="/images/logo-text.png" alt="Garage Express" width={160} height={40} className="h-9 w-auto flex-shrink-0" />
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex rounded-lg border border-white/15 overflow-hidden text-xs font-bold">
              <a href={`/fr/epoxy-garage`}
                className={`px-3 py-2 transition-colors ${locale === 'fr' ? 'bg-white text-dark' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>
                FR
              </a>
              <a href={`/en/epoxy-garage`}
                className={`px-3 py-2 transition-colors ${locale === 'en' ? 'bg-white text-dark' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>
                EN
              </a>
            </div>
            <a href="#soumission"
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
              {c.ctaPrimary}
            </a>
            <a href="tel:5148248618" onClick={trackCall}
              className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
              <Phone weight="duotone" size={16} />
              {c.ctaPhone}
            </a>
          </div>
        </div>
      </header>

      {/* ─────────── Urgency banner ─────────── */}
      <div className="bg-red-600 text-white text-xs font-bold text-center px-4 py-2.5 tracking-wide">
        {c.urgency}
      </div>

      {/* ─────────── Hero ─────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-car2.png" alt="Époxy garage Montréal, Rive-Sud & Laval — Garage Express" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/97 via-dark/90 to-dark/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <span className="inline-flex items-center gap-2 border border-primary/40 bg-primary/12 text-primary text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                {c.badge}
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-white uppercase leading-none mb-5"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
            >
              {c.heroTitle}
              <span className="block text-gradient">{c.heroHighlight}</span>
            </motion.h1>

            <motion.p
              className="text-white/75 text-lg sm:text-xl leading-relaxed mb-6 max-w-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              dangerouslySetInnerHTML={{ __html: c.heroSub }}
            />

            <motion.div
              className="flex items-center gap-2 mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.24 }}
            >
              {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={16} color="#DC2626" />)}
              <span className="text-white/55 text-sm ml-1">127+ garages transformés · 5★ Google</span>
            </motion.div>

            {/* ── Mini hero form ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            >
              {heroSent ? (
                <div className="inline-flex items-center gap-3 bg-green-500/15 border border-green-500/30 text-green-400 font-bold px-6 py-4 rounded-xl text-base mb-4">
                  {c.heroFormSuccess}
                </div>
              ) : (
                <form onSubmit={heroSubmit} className="flex flex-col sm:flex-row gap-2 mb-4 max-w-xl">
                  <input
                    type="text"
                    required
                    placeholder={c.heroFormName}
                    value={heroName}
                    onChange={e => setHeroName(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={c.heroFormPhone}
                    value={heroPhone}
                    onChange={e => setHeroPhone(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={heroLoading}
                    className="group relative overflow-hidden bg-primary hover:bg-red-700 disabled:opacity-70 text-white font-black px-6 py-3.5 rounded-xl text-sm transition-all shadow-2xl shadow-primary/40 btn-shimmer whitespace-nowrap"
                  >
                    {heroLoading ? '...' : c.heroFormCta}
                  </button>
                </form>
              )}

              <a href="tel:5148248618" onClick={trackCall}
                className="bg-white/8 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all inline-flex items-center justify-center gap-2">
                <Phone weight="duotone" size={20} color="#DC2626" />
                {c.ctaPhone}
              </a>
            </motion.div>

            <motion.p
              className="mt-5 text-white/35 text-xs flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <Shield weight="duotone" size={14} color="#DC2626" />
              {c.fixedPrice}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─────────── Stats strip ─────────── */}
      <div className="bg-primary">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: c.stat1, label: c.stat1Label },
            { val: c.stat2, label: c.stat2Label },
            { val: c.stat3, label: c.stat3Label },
            { val: c.stat4, label: c.stat4Label },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-black text-white leading-none">{s.val}</div>
              <div className="text-white/65 text-xs font-semibold uppercase tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────── Bridge ─────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
            >
              <span className="text-primary text-xs font-bold tracking-widest uppercase">{c.bridgeBadge}</span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight mt-3 mb-5">
                {c.bridgeTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-7">{c.bridgeText}</p>
              <div className="space-y-3">
                {c.bridgePoints.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check weight="bold" size={13} color="#fff" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <a href="#soumission"
                className="mt-8 inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-black px-7 py-4 rounded-xl text-sm transition-all shadow-lg shadow-primary/20">
                {c.ctaPrimary}
                <ArrowRight weight="bold" size={18} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
            >
              <BASlider />
              <p className="text-center text-gray-400 text-xs mt-3">
                {locale === 'fr' ? 'Glissez pour voir la transformation' : 'Drag to see the transformation'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────── Process ─────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="font-display text-4xl sm:text-5xl font-black text-dark uppercase text-center mb-14"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            {c.processTitle}
          </motion.h2>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-px bg-gray-200 z-0" style={{ left: '16.5%', right: '16.5%' }} />
            {c.processSteps.map((step, i) => (
              <motion.div key={i}
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}
              >
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-primary/20 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/5">
                  <span className="font-display text-2xl font-black text-primary">{step.num}</span>
                </div>
                <h3 className="font-display text-xl font-black text-dark uppercase mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Comparison table ─────────── */}
      <section className="py-20 bg-dark noise relative overflow-hidden">
        <div className="orb-1 absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase leading-tight mb-3">{c.compareTitle}</h2>
            <p className="text-white/50 text-lg">{c.compareSub}</p>
          </motion.div>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_1fr] mb-3 px-2">
            <div />
            <div className="text-center text-white/35 text-xs font-bold uppercase tracking-widest">{c.compareEpoxy}</div>
            <div className="text-center text-primary text-xs font-bold uppercase tracking-widest">{c.comparePoly}</div>
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {c.rows.map((row, i) => (
              <motion.div key={i}
                className="grid grid-cols-[1fr_1fr_1fr] items-center bg-white/4 border border-white/8 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
              >
                {/* Feature */}
                <div className="px-5 py-4 text-white/70 text-sm font-semibold">{row.feature}</div>

                {/* Epoxy value */}
                <div className="px-5 py-4 border-l border-white/8 text-center">
                  <span className="inline-flex items-center gap-1.5 text-white/30 text-sm">
                    <span className="w-4 h-4 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0">
                      <X weight="bold" size={9} />
                    </span>
                    {row.epoxy.replace(' ✓', '')}
                  </span>
                </div>

                {/* Poly value */}
                <div className="px-5 py-4 border-l border-primary/20 bg-primary/8 text-center">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check weight="bold" size={9} color="#DC2626" />
                    </span>
                    {row.poly.replace(' ✓', '')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Benefits ─────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="font-display text-4xl sm:text-5xl font-black text-dark uppercase text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            {c.benefitsTitle}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.benefits.map((b, i) => (
              <motion.div key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }} viewport={{ once: true }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <b.icon weight="duotone" size={22} color="#DC2626" />
                </div>
                <h3 className="font-display text-xl font-black text-dark uppercase mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Pricing ─────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              {c.pricingBadge}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight">{c.pricingTitle}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {c.plans.map((plan, i) => (
              <motion.div key={i}
                className={`relative rounded-2xl p-7 border-2 flex flex-col transition-all ${
                  plan.popular
                    ? 'border-primary bg-white shadow-2xl shadow-primary/10 scale-105'
                    : 'border-gray-200 bg-white'
                }`}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
              >
                {plan.tag && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.tag}
                  </div>
                )}
                <div className="mb-4">
                  <div className="font-display text-lg font-black text-dark uppercase">{plan.name}</div>
                  <div className="text-gray-400 text-sm">{plan.size}</div>
                </div>
                <div className="flex items-end gap-0.5 mb-6">
                  <span className="font-display text-5xl font-black text-dark leading-none">{plan.price}</span>
                  <span className="font-display text-2xl font-black text-gray-400 mb-1">{plan.cents}</span>
                </div>
                <div className="space-y-2 mb-7 flex-1">
                  {[
                    locale === 'fr' ? 'Préparation de surface' : 'Surface preparation',
                    locale === 'fr' ? 'Flocons Torginol au choix' : 'Torginol flakes of your choice',
                    locale === 'fr' ? 'Installation en 1 journée' : '1-day installation',
                    locale === 'fr' ? 'Garantie 15 ans' : '15-year warranty',
                  ].map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check weight="bold" size={14} color="#DC2626" />
                      {item}
                    </div>
                  ))}
                </div>
                <a href="#soumission"
                  className={`w-full text-center font-black py-3.5 rounded-xl text-sm transition-all ${
                    plan.popular
                      ? 'bg-primary hover:bg-red-700 text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-100 hover:bg-gray-200 text-dark'
                  }`}>
                  {c.pricingCta}
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mb-6">{c.pricingNote}</p>
          {/* Inline CTA after pricing note */}
          <div className="text-center">
            <a href="#soumission"
              className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-primary/20">
              {c.pricingCtaInline}
              <ArrowRight weight="bold" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── Reviews ─────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="font-display text-4xl sm:text-5xl font-black text-dark uppercase text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            {c.reviewsTitle}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.reviews.map((r, i) => (
              <motion.div key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-7 relative"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              >
                <Quotes weight="duotone" size={40} color="rgba(220,38,38,0.1)" className="absolute top-5 right-5" />
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, j) => <Star key={j} weight="fill" size={15} color="#DC2626" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-sm">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-dark text-sm">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.city}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-xs text-gray-400 font-medium">Google</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Inline CTA after reviews */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#soumission"
              className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-primary/20">
              {c.reviewsCtaForm}
              <ArrowRight weight="bold" size={18} />
            </a>
            <a href="tel:5148248618" onClick={trackCall}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-dark font-bold px-8 py-4 rounded-xl text-sm transition-all">
              <Phone weight="duotone" size={18} color="#DC2626" />
              {c.reviewsCtaPhone}
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            className="font-display text-4xl sm:text-5xl font-black text-dark uppercase text-center mb-10"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            {c.faqTitle}
          </motion.h2>
          <div className="space-y-3">
            {c.faqs.map((faq, i) => (
              <motion.div key={i}
                className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="font-bold text-dark pr-6 text-sm sm:text-base">{faq.q}</span>
                  <span className={`text-primary font-black text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
          {/* CTA below FAQ */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} viewport={{ once: true }}
          >
            <p className="text-gray-500 mb-4 text-sm">
              {locale === 'fr' ? 'Vous avez d\'autres questions ?' : 'Have more questions?'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#soumission"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-sm transition-all">
                {c.ctaPrimary} <ArrowRight weight="bold" size={18} />
              </a>
              <a href="tel:5148248618" onClick={trackCall}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-dark font-bold px-8 py-4 rounded-xl text-sm transition-all">
                <Phone weight="duotone" size={18} color="#DC2626" />
                514-824-8618
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────── Zéro risque ─────────── */}
      <section className="py-16 bg-dark noise relative overflow-hidden">
        <div className="orb-1 absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.h2
            className="font-display text-3xl sm:text-4xl font-black text-white uppercase text-center mb-8"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            {c.trustTitle}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.trustPills.map((pill, i) => (
              <motion.div key={i}
                className="bg-white/6 border border-white/12 rounded-2xl px-5 py-5 text-white/85 text-sm font-semibold leading-snug text-center"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
              >
                {pill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Lead form (full — identical to main page) ─────────── */}
      <LeadForm />

      {/* ─────────── Footer minimal ─────────── */}
      <footer className="py-8 bg-dark border-t border-white/8 pb-20 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src="/images/logo-text.png" alt="Garage Express" width={140} height={35} className="h-8 w-auto opacity-50" />
          <p className="text-white/25 text-xs text-center">
            © 2025 Garage Express · Rive-Sud, Montréal, Laval
          </p>
          <a href="tel:5148248618" onClick={trackCall}
            className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-1.5">
            <Phone weight="duotone" size={14} color="#DC2626" />
            514-824-8618
          </a>
        </div>
      </footer>

      {/* ─────────── Floating desktop CTA ─────────── */}
      <AnimatePresence>
        {showFloat && (
          <motion.a
            href="#soumission"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-primary hover:bg-red-700 text-white font-black px-6 py-4 rounded-2xl shadow-2xl shadow-primary/40 text-sm transition-colors"
          >
            {c.floatCta}
          </motion.a>
        )}
      </AnimatePresence>

      {/* ─────────── Sticky mobile bottom bar ─────────── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-dark/97 backdrop-blur-md border-t border-white/12 px-4 py-3 flex gap-3 safe-area-inset-bottom">
        <a href="tel:5148248618" onClick={trackCall}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold py-3.5 rounded-xl text-sm transition-all active:bg-white/20">
          {c.stickyCall}
        </a>
        <a href="#soumission"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-black py-3.5 rounded-xl text-sm transition-all active:bg-red-700 shadow-lg shadow-primary/30" style={{ flex: 2 }}>
          {c.stickyCta}
        </a>
      </div>

    </div>
  )
}
