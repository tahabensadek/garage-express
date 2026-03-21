'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'
import { Phone, Check, X, Star, Shield, Clock, ArrowRight, CaretRight, Quotes } from '@phosphor-icons/react'

/* ── Copy bilingue ──────────────────────────────────────────── */
const copy = {
  fr: {
    metaTitle: 'Époxy Garage Rive-Sud & Montréal — Garage Express | Dès 2 749$',
    badge: 'Époxy garage — Rive-Sud & Montréal',
    heroTitle: 'Époxy Garage',
    heroHighlight: 'Rive-Sud.',
    heroSub: 'Vous cherchez un époxy pour votre garage ? Découvrez pourquoi le <strong>plancher polyaspartique</strong> est l\'époxy de nouvelle génération — même look, 2× plus résistant, installé en 1 journée.',
    heroReviews: '100+ garages transformés · Note 5★ Google',
    startingFrom: 'À partir de',
    fixedPrice: 'Prix fixe tout inclus · Zéro surprise',
    ctaPrimary: 'Soumission gratuite — 24h',
    ctaPhone: '514-824-8618',

    bridgeTitle: 'Vous cherchez de l\'époxy ?',
    bridgeSub: 'Vous êtes au bon endroit. Sauf qu\'on fait mieux que l\'époxy.',
    bridgeText: 'Depuis 2020, nos clients nous appellent pour de l\'époxy. On leur installe du polyaspartique. Personne n\'est jamais déçu — au contraire. Voici pourquoi :',

    compareTitle: 'Époxy vs Polyaspartique',
    compareSub: 'Même prix. Même look. Mais pas les mêmes performances.',
    rows: [
      { feature: 'Temps de séchage',  epoxy: '3-5 jours',   poly: '1 journée ✓' },
      { feature: 'Résistance UV',     epoxy: 'Jaunit',        poly: 'Ne jaunit pas ✓' },
      { feature: 'Gel/dégel québécois', epoxy: 'Se décolle', poly: 'Flexible ✓' },
      { feature: 'Résistance sel/calcium', epoxy: 'Correcte', poly: 'Excellente ✓' },
      { feature: 'Durée de vie',      epoxy: '3-5 ans',     poly: '15+ ans ✓' },
      { feature: 'Garantie',          epoxy: 'Variable',     poly: '15 ans incluse ✓' },
    ],

    whyTitle: 'Ce que vous obtenez',
    benefits: [
      { title: 'Installé en 1 journée', desc: 'Arrivée à 8h, départ en fin d\'après-midi. Vous marchez dessus le soir même.' },
      { title: 'Prix fixe garanti', desc: 'Garage simple 2 749$ — double 4 449$. Zéro frais caché, zéro surprise.' },
      { title: 'Garantie 15 ans', desc: 'Matériaux ET main-d\'œuvre. Si ça pèle, on revient sans frais.' },
      { title: 'Résistant au sel', desc: 'Conçu pour les hivers québécois. Calcium, sel de déglaçage, huile moteur.' },
      { title: '137 couleurs', desc: 'Flocons Torginol — choisissez votre style parmi 137 nuances disponibles.' },
      { title: 'Équipe locale', desc: 'Rive-Sud, Montréal, Laval. On répond en moins de 5 minutes.' },
    ],

    reviewsTitle: 'Ce que disent nos clients',
    reviews: [
      { name: 'Martin L.', city: 'Longueuil', text: 'J\'ai demandé un époxy, ils m\'ont expliqué la différence avec le polyaspartique. Vraiment content d\'avoir suivi leur conseil. Plancher impeccable, installé en une journée.' },
      { name: 'Sophie B.', city: 'Brossard', text: 'Prix fixe, pas de surprise. L\'équipe était super professionnelle. Mon garage ressemble à une salle d\'exposition maintenant.' },
      { name: 'Jean-François P.', city: 'Saint-Hubert', text: 'Troisième hiver et le plancher est encore parfait. Résiste au calcium et à l\'huile de ma voiture. Je recommande à tous mes voisins.' },
    ],

    faqTitle: 'Questions sur l\'époxy garage',
    faqs: [
      { q: 'C\'est quoi la différence entre époxy et polyaspartique ?', a: 'Le polyaspartique est une évolution de l\'époxy : il cure en 1 journée (vs 3-5 jours), résiste mieux aux UV, est plus flexible pour les cycles gel/dégel, et dure 15+ ans. Même look, meilleures performances.' },
      { q: 'Le prix est-il vraiment tout inclus ?', a: 'Oui — préparation de surface, réparations de fissures mineures, application, flocons décoratifs, topcoat, nettoyage. Un seul prix, zéro surprise.' },
      { q: 'Combien de temps ça prend ?', a: '1 journée. L\'équipe arrive vers 8h et repart en fin d\'après-midi. Vous pouvez marcher dessus le soir. Les véhicules peuvent rentrer après 24h.' },
      { q: 'Servez-vous Laval aussi ?', a: 'Oui — Rive-Sud, Montréal, Laval et les environs. Appelez-nous pour confirmer votre secteur.' },
    ],

    formTitle: 'Soumission gratuite',
    formSub: 'Réponse garantie en moins de 24h.',
    namePlaceholder: 'Votre nom',
    phonePlaceholder: 'Votre téléphone',
    emailPlaceholder: 'Votre courriel',
    cityPlaceholder: 'Votre ville',
    garageSizePlaceholder: 'Taille du garage',
    garageSizes: ['Garage simple (≤300 pi²)', 'Garage double (450-600 pi²)', 'Je ne sais pas'],
    submitBtn: 'Recevoir ma soumission gratuite',
    submitNote: 'Réponse en moins de 24h · Aucun engagement',
    successTitle: 'Demande reçue !',
    successText: 'Un technicien vous appellera dans les 24h. En attendant : 514-824-8618',
  },
  en: {
    metaTitle: 'Epoxy Garage South Shore & Montreal — Garage Express | From $2,749',
    badge: 'Epoxy garage — South Shore & Montreal',
    heroTitle: 'Epoxy Garage',
    heroHighlight: 'South Shore.',
    heroSub: 'Looking for garage epoxy? Discover why <strong>polyaspartic flooring</strong> is next-gen epoxy — same look, 2× stronger, installed in 1 day.',
    heroReviews: '100+ garages transformed · 5★ Google rating',
    startingFrom: 'Starting from',
    fixedPrice: 'Fixed all-inclusive price · No surprises',
    ctaPrimary: 'Free quote — 24h',
    ctaPhone: '514-824-8618',

    bridgeTitle: 'Looking for epoxy?',
    bridgeSub: 'You\'re in the right place. We just do it better.',
    bridgeText: 'Since 2020, customers call us for epoxy. We install polyaspartic. Nobody is ever disappointed. Here\'s why:',

    compareTitle: 'Epoxy vs Polyaspartic',
    compareSub: 'Same price. Same look. Different performance.',
    rows: [
      { feature: 'Cure time',       epoxy: '3-5 days',    poly: '1 day ✓' },
      { feature: 'UV resistance',   epoxy: 'Yellows',      poly: 'No yellowing ✓' },
      { feature: 'Freeze/thaw',     epoxy: 'Peels',        poly: 'Flexible ✓' },
      { feature: 'Salt resistance', epoxy: 'Average',      poly: 'Excellent ✓' },
      { feature: 'Lifespan',        epoxy: '3-5 years',   poly: '15+ years ✓' },
      { feature: 'Warranty',        epoxy: 'Varies',       poly: '15 years included ✓' },
    ],

    whyTitle: 'What you get',
    benefits: [
      { title: 'Installed in 1 day', desc: 'Team arrives at 8am, done by late afternoon. Walk on it the same evening.' },
      { title: 'Fixed price', desc: 'Single $2,749 — Double $4,449. Zero hidden fees, zero surprises.' },
      { title: '15-year warranty', desc: 'Materials AND labor. If it peels, we come back at no cost.' },
      { title: 'Salt resistant', desc: 'Built for Quebec winters. De-icing salt, calcium, motor oil.' },
      { title: '137 colors', desc: 'Torginol flakes — choose your style from 137 available shades.' },
      { title: 'Local team', desc: 'South Shore, Montreal, Laval. We answer in under 5 minutes.' },
    ],

    reviewsTitle: 'What our clients say',
    reviews: [
      { name: 'Martin L.', city: 'Longueuil', text: 'I asked for epoxy, they explained the difference with polyaspartic. Really glad I followed their advice. Flawless floor, installed in one day.' },
      { name: 'Sophie B.', city: 'Brossard', text: 'Fixed price, no surprises. The team was super professional. My garage looks like a showroom now.' },
      { name: 'Jean-François P.', city: 'Saint-Hubert', text: 'Third winter and the floor is still perfect. Handles calcium and motor oil from my car. I recommend to all my neighbors.' },
    ],

    faqTitle: 'Epoxy garage FAQ',
    faqs: [
      { q: 'What\'s the difference between epoxy and polyaspartic?', a: 'Polyaspartic is an evolution of epoxy: cures in 1 day (vs 3-5 days), better UV resistance, more flexible for freeze/thaw cycles, and lasts 15+ years. Same look, better performance.' },
      { q: 'Is the price really all-inclusive?', a: 'Yes — surface prep, minor crack repairs, application, decorative flakes, topcoat, cleanup. One price, no surprises.' },
      { q: 'How long does it take?', a: '1 day. Team arrives around 8am and leaves late afternoon. Walk on it that evening. Vehicles can enter after 24h.' },
      { q: 'Do you serve Laval?', a: 'Yes — South Shore, Montreal, Laval and surrounding areas. Call us to confirm your area.' },
    ],

    formTitle: 'Free quote',
    formSub: 'Reply guaranteed in under 24h.',
    namePlaceholder: 'Your name',
    phonePlaceholder: 'Your phone',
    emailPlaceholder: 'Your email',
    cityPlaceholder: 'Your city',
    garageSizePlaceholder: 'Garage size',
    garageSizes: ['Single garage (≤300 sq ft)', 'Double garage (450-600 sq ft)', 'I\'m not sure'],
    submitBtn: 'Get my free quote',
    submitNote: 'Reply within 24h · No commitment',
    successTitle: 'Request received!',
    successText: 'A technician will call you within 24h. Meanwhile: 514-824-8618',
  },
}

/* ── Before/After mini slider ───────────────────────────────── */
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
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none"
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
        <Image src="/images/before-1.png" alt="Plancher garage avant" fill className="object-cover pointer-events-none" />
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center text-xs font-black text-dark">◀▶</div>
      </div>
      <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-lg">AVANT</div>
      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">APRÈS</div>
    </div>
  )
}

/* ── Lead Form ───────────────────────────────────────────────── */
function LeadFormInline({ c, locale }: { c: typeof copy.fr; locale: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', garageSize: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    ;(window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale, source: 'epoxy-landing' }),
      })
      setDone(true)
    } catch {
      setDone(true)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="font-display text-3xl font-black text-white uppercase mb-3">{c.successTitle}</h3>
        <p className="text-white/60">{c.successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input required value={form.name} onChange={set('name')} placeholder={c.namePlaceholder}
          className="col-span-2 sm:col-span-1 bg-white/8 border border-white/15 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        <input required value={form.phone} onChange={set('phone')} placeholder={c.phonePlaceholder} type="tel"
          className="col-span-2 sm:col-span-1 bg-white/8 border border-white/15 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
      </div>
      <input required value={form.email} onChange={set('email')} placeholder={c.emailPlaceholder} type="email"
        className="w-full bg-white/8 border border-white/15 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
      <div className="grid grid-cols-2 gap-3">
        <input required value={form.city} onChange={set('city')} placeholder={c.cityPlaceholder}
          className="bg-white/8 border border-white/15 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        <select required value={form.garageSize} onChange={set('garageSize')}
          className="bg-white/8 border border-white/15 text-white/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
          <option value="">{c.garageSizePlaceholder}</option>
          {c.garageSizes.map((s, i) => <option key={i} value={s} className="bg-dark text-white">{s}</option>)}
        </select>
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-primary hover:bg-red-700 disabled:opacity-60 text-white font-black py-4 rounded-xl text-base uppercase tracking-wide transition-all flex items-center justify-center gap-2">
        {loading ? '...' : c.submitBtn}
        {!loading && <ArrowRight weight="bold" size={20} />}
      </button>
      <p className="text-center text-white/30 text-xs">{c.submitNote}</p>
    </form>
  )
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function EpoxyGaragePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'fr'
  const c = locale === 'en' ? copy.en : copy.fr
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-dark">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Image src="/images/logo-text.png" alt="Garage Express" width={160} height={40} className="h-9 w-auto" />
          <a
            href="tel:5148248618"
            onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })}
            className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            <Phone weight="duotone" size={16} />
            {c.ctaPhone}
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-car2.png" alt="Époxy garage Rive-Sud — Garage Express" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/97 via-dark/88 to-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/30" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block border border-primary/40 bg-primary/15 text-primary text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                {c.badge}
              </span>
            </motion.div>
            <motion.h1
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-white uppercase leading-none mb-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              {c.heroTitle}
              <span className="block text-gradient">{c.heroHighlight}</span>
            </motion.h1>
            <motion.p
              className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: c.heroSub }}
            />
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={16} color="#DC2626" />)}
              <span className="text-white/60 text-sm ml-1">{c.heroReviews}</span>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#soumission"
                className="group relative overflow-hidden bg-primary hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-2xl shadow-primary/30 btn-shimmer">
                {c.ctaPrimary}
                <CaretRight weight="bold" size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="tel:5148248618"
                onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })}
                className="bg-white/8 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2">
                <Phone weight="duotone" size={20} color="#DC2626" />
                {c.ctaPhone}
              </a>
            </motion.div>
            <motion.div
              className="mt-6 flex gap-2 items-center text-white/40 text-xs"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              <Shield weight="duotone" size={14} color="#DC2626" />
              {c.fixedPrice}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bridge ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
            >
              <span className="text-primary text-xs font-bold tracking-widest uppercase">{c.bridgeTitle}</span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight mt-3 mb-4">
                {c.bridgeSub}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{c.bridgeText}</p>
              <div className="space-y-3">
                {[
                  locale === 'fr' ? 'Même look qu\'un époxy — en mieux' : 'Same look as epoxy — but better',
                  locale === 'fr' ? 'Installé en 1 jour, pas 3-5 jours' : 'Installed in 1 day, not 3-5 days',
                  locale === 'fr' ? 'Résiste aux hivers québécois' : 'Handles Quebec winters',
                  locale === 'fr' ? 'Garantie 15 ans incluse' : '15-year warranty included',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check weight="bold" size={12} color="#DC2626" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
            >
              <BASlider />
              <p className="text-center text-gray-400 text-xs mt-3">
                {locale === 'fr' ? 'Glisse pour voir la transformation' : 'Drag to see the transformation'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Compare table ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight mb-3">{c.compareTitle}</h2>
            <p className="text-gray-500 text-lg">{c.compareSub}</p>
          </motion.div>
          <motion.div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-400 font-medium py-4 px-6">
                    {locale === 'fr' ? 'Caractéristique' : 'Feature'}
                  </th>
                  <th className="text-center text-gray-400 font-medium py-4 px-6">
                    {locale === 'fr' ? 'Époxy classique' : 'Classic Epoxy'}
                  </th>
                  <th className="text-center text-primary font-bold py-4 px-6 bg-primary/5">
                    {locale === 'fr' ? 'Polyaspartique ✓' : 'Polyaspartic ✓'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {c.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="text-gray-700 font-medium py-4 px-6">{row.feature}</td>
                    <td className="text-center py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <X weight="bold" size={14} className="text-gray-300" />
                        {row.epoxy}
                      </span>
                    </td>
                    <td className="text-center py-4 px-6 bg-primary/5">
                      <span className="text-primary font-semibold">{row.poly}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 bg-dark noise relative overflow-hidden">
        <div className="orb-1 absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            {c.whyTitle}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.benefits.map((b, i) => (
              <motion.div key={i}
                className="bg-white/4 border border-white/8 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }} viewport={{ once: true }}>
                <Check weight="bold" size={20} color="#DC2626" className="mb-4" />
                <h3 className="font-display text-xl font-black text-white uppercase mb-2">{b.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing band ── */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="orb-2 absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-red-900/30 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-4">
              {locale === 'fr' ? 'Prix fixe — tout inclus' : 'Fixed price — all inclusive'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="text-center">
                <div className="font-display text-6xl font-black text-white">2 749<span className="text-3xl text-white/60">,99$</span></div>
                <div className="text-white/70 text-sm mt-1">{locale === 'fr' ? 'Garage simple ≤300 pi²' : 'Single garage ≤300 sq ft'}</div>
              </div>
              <div className="w-px h-16 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="font-display text-6xl font-black text-white">4 449<span className="text-3xl text-white/60">,99$</span></div>
                <div className="text-white/70 text-sm mt-1">{locale === 'fr' ? 'Garage double 450-600 pi²' : 'Double garage 450-600 sq ft'}</div>
              </div>
            </div>
            <a href="#soumission"
              className="inline-flex items-center gap-2 bg-white text-primary font-black px-10 py-4 rounded-xl text-base hover:bg-gray-50 transition-all shadow-2xl">
              {c.ctaPrimary}
              <ArrowRight weight="bold" size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            {c.reviewsTitle}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-5">
            {c.reviews.map((r, i) => (
              <motion.div key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 relative"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                <Quotes weight="duotone" size={40} color="rgba(220,38,38,0.12)" className="absolute top-4 right-4" />
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} weight="fill" size={14} color="#DC2626" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="font-bold text-dark text-sm">{r.name} <span className="text-gray-400 font-normal">· {r.city}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase text-center mb-10"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            {c.faqTitle}
          </motion.h2>
          <div className="space-y-3">
            {c.faqs.map((faq, i) => (
              <motion.div key={i} className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-dark pr-4 text-sm">{faq.q}</span>
                  <span className={`text-primary font-black text-lg transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead form ── */}
      <section id="soumission" className="py-20 bg-dark noise relative overflow-hidden">
        <div className="orb-3 absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="font-display text-5xl font-black text-white uppercase mb-3">{c.formTitle}</h2>
            <p className="text-white/50">{c.formSub}</p>
          </motion.div>
          <motion.div className="bg-white/5 border border-white/10 rounded-3xl p-8"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            <LeadFormInline c={c} locale={locale} />
          </motion.div>
          <div className="mt-8 text-center">
            <p className="text-white/30 text-sm mb-3">{locale === 'fr' ? 'Ou appelez directement :' : 'Or call directly:'}</p>
            <a href="tel:5148248618"
              onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })}
              className="inline-flex items-center gap-2 text-white font-bold text-xl hover:text-primary transition-colors">
              <Phone weight="duotone" size={24} color="#DC2626" />
              514-824-8618
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer minimal ── */}
      <footer className="py-8 bg-dark border-t border-white/8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src="/images/logo-text.png" alt="Garage Express" width={140} height={35} className="h-8 w-auto opacity-60" />
          <p className="text-white/30 text-xs text-center">
            © 2025 Garage Express · Rive-Sud, Montréal, Laval
          </p>
          <a href="tel:5148248618" className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-1">
            <Phone weight="duotone" size={14} color="#DC2626" />
            514-824-8618
          </a>
        </div>
      </footer>
    </div>
  )
}
