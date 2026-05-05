'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Shield, Clock, Check, Star, CaretDown,
  Wrench, Thermometer, Drop, Lightning, Sparkle, Warning,
} from '@phosphor-icons/react'

const LeadForm = dynamic(() => import('@/components/LeadForm'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'))

/* ── Bilingual copy ──────────────────────────────────────── */
const copy = {
  fr: {
    /* Header */
    ctaPhone: '514-824-8618',
    ctaPrimary: 'Obtenir ma soumission gratuite',

    /* Hero */
    badge: 'Technologie polyaspartique — Ce qu\'il faut savoir',
    heroTitle: 'Pas de l\'époxy.',
    heroHighlight: 'Bien mieux.',
    heroSub: 'Le polyaspartique est ce que les professionnels choisissent quand la durabilité compte vraiment. Voici pourquoi — avec les vrais chiffres.',
    fixedPrice: 'Prix fixe tout inclus · Garantie 15 ans · Installé en 1 journée',

    /* Why poly */
    whyBadge: 'La chimie derrière la différence',
    whyTitle: 'Pourquoi le polyaspartique',
    whyHighlight: 'surpasse l\'époxy',
    whyText: 'L\'époxy est une résine aromatique — il jaunit avec les UV et devient cassant avec les cycles gel/dégel. Le polyaspartique est une résine aliphatique — elle reste flexible, stable aux UV, et maintient sa résistance mécanique dans les conditions québécoises les plus extrêmes. Ce n\'est pas du marketing. C\'est de la chimie.',
    whyPoints: [
      { title: 'Résine aliphatique = pas de jaunissement UV', desc: 'Testé ΔE < 2.0 après 500h UV (ASTM 3424). La couleur reste stable pour toujours.' },
      { title: 'Flexible sous -30°C', desc: 'Élongation à la rupture : 150%. Le revêtement suit le béton sans craquer lors des cycles gel/dégel.' },
      { title: '85% de matières solides', desc: 'Haute densité. Imperméable. La saleté ne pénètre pas — une vadrouille et c\'est propre.' },
      { title: 'Cure en quelques heures', desc: 'Le polyaspartique cure 5× plus vite que l\'époxy. C\'est pourquoi tout s\'installe en 1 journée.' },
    ],

    /* Layers */
    layersBadge: 'Ce que vous obtenez',
    layersTitle: 'Le système 4 couches',
    layersSub: 'Pas une peinture. Un système professionnel de 28 à 35 mils — la même technologie que les garages de concessions automobiles.',
    layers: [
      {
        num: '01', name: 'Primaire barrière humidité', product: 'MAGIECHEM 975',
        thickness: '6–8 mils', color: 'border-l-red-600',
        desc: 'Pénètre dans le béton et crée un ancrage chimique. Résistant à l\'humidité résiduelle jusqu\'à 8 lbs/1000 pi². Cure en 1 heure pour enchaîner le même jour.',
      },
      {
        num: '02', name: 'Base coat haute résistance', product: 'MAGIECHEM 824',
        thickness: '12–15 mils', color: 'border-l-orange-500',
        desc: 'La couche la plus épaisse. Haute solidité, résistance à l\'abrasion supérieure. Cure en 2 heures — la raison pour laquelle tout s\'installe en 1 journée.',
      },
      {
        num: '03', name: 'Flocons décoratifs Torginol', product: '137 couleurs disponibles',
        thickness: '—', color: 'border-l-amber-400',
        desc: 'Diffusés à la main dans la base coat humide. Donnent l\'apparence granit ou terrazzo, ajoutent l\'antidérapant, et protègent visuellement la surface.',
      },
      {
        num: '04', name: 'Top coat aliphatique UV', product: 'MAGIECHEM 955',
        thickness: '10–12 mils', color: 'border-l-primary',
        desc: 'La protection finale. Résistance UV maximale (ne jaunit jamais), résistance chimique supérieure, brillant longue durée. C\'est cette couche qui porte la garantie 15 ans.',
      },
    ],
    totalLabel: 'Épaisseur totale : 28–35 mils',
    diyLabel: 'Kit époxy quincaillerie : 3–4 mils',

    /* Prep */
    prepBadge: 'Avant la première couche',
    prepTitle: 'La préparation',
    prepHighlight: 'qui fait tout.',
    prepSub: 'La cause #1 des planchers qui décollent : une mauvaise préparation de surface. Voici exactement ce qu\'on fait avant d\'appliquer une seule goutte.',
    prepSteps: [
      { icon: Wrench, title: 'Grenaillage mécanique (CSP-2+)', desc: 'On meule toute la surface à la rectifieuse diamant professionnelle. Aspiration HEPA en continu — pas de poussière. On crée le profil d\'adhérence nécessaire pour que chaque couche s\'ancre dans le béton, pas juste sur lui.' },
      { icon: Drop, title: 'Test d\'humidité au Tramex', desc: 'Avant tout, on mesure le taux d\'humidité de votre dalle avec un testeur Tramex à plusieurs endroits. Si le taux dépasse le seuil (>4%), on ne procède pas — jamais on n\'installe sur une surface qui va compromettre l\'adhérence à long terme.' },
      { icon: Warning, title: 'Réparation des fissures', desc: 'On injecte un polymère haute résistance dans chaque fissure, pore et irrégularité. On laisse durcir, on meule à niveau. Les fissures mineures sont incluses dans le prix. Les fissures structurelles majeures font l\'objet d\'un supplément discuté à l\'avance.' },
      { icon: Thermometer, title: 'Vérification thermique et conditions', desc: 'On vérifie la température ambiante, le point de rosée, et les conditions d\'humidité de l\'air. L\'application est possible entre -10°C et +30°C. En dehors de cette plage, on reporte plutôt que de compromettre la qualité.' },
    ],

    /* Specs */
    specsBadge: 'Les chiffres réels (ASTM)',
    specsTitle: 'Ce que ça veut',
    specsHighlight: 'dire concrètement.',
    specs: [
      { val: '6 700 psi', label: 'Résistance à la traction', context: 'Plus fort que la plupart des bétons résidentiels' },
      { val: '57 MPa', label: 'Résistance à la compression', context: 'Standard industriel — béton ordinaire ≈ 25–35 MPa' },
      { val: 'Shore D 70', label: 'Dureté de surface', context: 'Béton résidentiel non traité : Shore D ~25' },
      { val: '25 mg', label: 'Perte abrasion Taber', context: '1000 cycles, roue CS17 — résistance supérieure' },
      { val: '>3 MPa', label: 'Adhérence pull-off', context: 'La liaison béton/revêtement est plus forte que le béton lui-même' },
      { val: '150%', label: 'Élongation à la rupture', context: 'Flexible — suit les mouvements du béton sans craquer' },
    ],

    /* Return to service */
    rtsBadge: 'Après l\'installation',
    rtsTitle: 'Quand vous pouvez',
    rtsHighlight: 'utiliser votre garage.',
    rtsSteps: [
      { time: 'Soir même', label: 'Marcher sur le plancher', desc: 'Le polyaspartique cure en quelques heures. Pas besoin d\'attendre 3 jours.' },
      { time: '48 heures', label: 'Rentrer votre véhicule', desc: 'Après 48h, la surface est prête pour le poids et la chaleur des pneus.' },
      { time: '7 jours', label: 'Premier lavage', desc: 'Attendez 7 jours avant le premier nettoyage à l\'eau pour une cure optimale.' },
      { time: '2 semaines', label: 'Pleine résistance chimique', desc: 'Résistance maximale aux produits chimiques, huile moteur, sel et calcium.' },
    ],
    rtsVsEpoxy: 'Époxy traditionnel : 3 à 5 jours avant de marcher dessus.',

    /* DIY vs Pro */
    diyBadge: 'Honnêteté totale',
    diyTitle: 'Kit DIY vs',
    diyHighlight: 'système professionnel.',
    diyRows: [
      { feature: 'Nombre de couches', diy: '1 couche', pro: '4 couches' },
      { feature: 'Épaisseur totale', diy: '3–4 mils', pro: '28–35 mils' },
      { feature: 'Préparation de surface', diy: 'Nettoyage seulement', pro: 'Grenaillage mécanique CSP-2+' },
      { feature: 'Résistance UV', diy: 'Jaunit rapidement', pro: 'Aliphatique — stable à vie' },
      { feature: 'Durée de vie réelle', diy: '1–3 hivers', pro: '15+ ans' },
      { feature: 'Garantie', diy: 'Aucune', pro: '15 ans matériaux & main-d\'œuvre' },
      { feature: 'Adhérence long terme', diy: 'Risque de décollement', pro: 'Ancrage chimique dans le béton' },
      { feature: 'Résistance au sel/calcium', diy: 'Limitée', pro: 'Excellente — conçue pour le Québec' },
    ],

    /* Warranty */
    warrantyBadge: 'Ce qui est couvert',
    warrantyTitle: 'La garantie',
    warrantyHighlight: '15 ans.',
    warrantySub: 'Pas une garantie de marketing. Une vraie garantie écrite qui couvre ce qui compte.',
    warrantyCovered: [
      'Décollement ou peeling du revêtement',
      'Fissuration non liée à un choc',
      'Perte d\'adhérence anormale',
      'Défaut de matériau ou d\'application',
    ],
    warrantyNotCovered: [
      'Dommages physiques (impact, objet tranchant)',
      'Fissures structurelles dans le béton lui-même',
      'Usure normale après 15 ans',
    ],
    warrantyNote: 'Si quelque chose se produit dans les 15 ans qui relève de la garantie, on revient. Sans frais. Sans discussion.',

    /* FAQ */
    faqTitle: 'Questions techniques',
    faqHighlight: 'Réponses directes.',
    faqs: [
      {
        q: 'Mon béton est humide — est-ce un problème ?',
        a: 'Pas nécessairement. Notre primaire résiste à l\'humidité jusqu\'à 8 lbs/1000 pi². Avant l\'installation, on mesure avec un testeur Tramex. Si c\'est trop humide, on reporte — jamais on n\'installe sur une surface qui va compromettre l\'adhérence.',
      },
      {
        q: 'Mon béton a 30–40 ans. Est-ce possible ?',
        a: 'Dans la grande majorité des cas, oui. L\'âge n\'est pas le facteur — c\'est l\'état structurel. Tant que le béton est solide et non délaminé, le grenaillage crée le profil d\'adhérence nécessaire. Les fissures mineures sont réparées et incluses.',
      },
      {
        q: 'Le plancher peut-il jaunir ?',
        a: 'Non. Notre top coat aliphatique est testé ΔE < 2.0 après 500h UV (ASTM 3424). Par conception chimique, il ne jaunit pas — c\'est la différence fondamentale entre l\'aliphatique et l\'aromatique.',
      },
      {
        q: 'Est-ce que ça résiste aux pneus chauds ?',
        a: 'Oui, dans la très grande majorité des cas. Attention : sous certaines conditions (pneus très chauds + types de pneus avec plastifiants élevés), un transfert de plastifiant peut causer une légère décoloration. On vous explique comment minimiser ce risque lors de la visite.',
      },
      {
        q: 'Comment entretenir le plancher ?',
        a: 'Ne pas laver pendant 7 jours. Entretien courant : vadrouille humide avec savon doux. Taches : chiffon humide, ça part facilement. Pas de jet de pression extrême, pas d\'eau très chaude (max 49°C), pas de produits abrasifs.',
      },
    ],
  },
  en: {
    ctaPhone: '514-824-8618',
    ctaPrimary: 'Get my free quote',
    badge: 'Polyaspartic technology — What you need to know',
    heroTitle: 'Not epoxy.',
    heroHighlight: 'Much better.',
    heroSub: 'Polyaspartic is what professionals choose when durability really matters. Here\'s why — with the real numbers.',
    fixedPrice: 'Fixed all-inclusive price · 15-year warranty · Installed in 1 day',
    whyBadge: 'The chemistry behind the difference',
    whyTitle: 'Why polyaspartic',
    whyHighlight: 'outperforms epoxy',
    whyText: 'Epoxy is an aromatic resin — it yellows under UV and becomes brittle through freeze-thaw cycles. Polyaspartic is an aliphatic resin — it stays flexible, UV-stable, and maintains its mechanical strength in the most extreme Quebec conditions. Not marketing. Chemistry.',
    whyPoints: [
      { title: 'Aliphatic resin = no UV yellowing', desc: 'Tested ΔE < 2.0 after 500h UV (ASTM 3424). Color stays stable permanently.' },
      { title: 'Flexible below -30°C', desc: 'Elongation at break: 150%. The coating follows the concrete without cracking through freeze-thaw cycles.' },
      { title: '85% solids content', desc: 'High density. Waterproof. Dirt can\'t penetrate — one mop and it\'s clean.' },
      { title: 'Cures in hours', desc: 'Polyaspartic cures 5× faster than epoxy. That\'s why everything can be installed in 1 day.' },
    ],
    layersBadge: 'What you\'re getting',
    layersTitle: 'The 4-layer system',
    layersSub: 'Not paint. A professional system at 28 to 35 mils thick — the same technology used in car dealership garages.',
    layers: [
      { num: '01', name: 'Moisture barrier primer', product: 'MAGIECHEM 975', thickness: '6–8 mils', color: 'border-l-red-600', desc: 'Penetrates the concrete and creates a chemical bond. Resistant to residual moisture up to 8 lbs/1000 sq ft. Cures in 1 hour for same-day continuation.' },
      { num: '02', name: 'High-resistance base coat', product: 'MAGIECHEM 824', thickness: '12–15 mils', color: 'border-l-orange-500', desc: 'The thickest layer. High solids, superior abrasion resistance. Cures in 2 hours — why everything installs in 1 day.' },
      { num: '03', name: 'Torginol decorative flakes', product: '137 colors available', thickness: '—', color: 'border-l-amber-400', desc: 'Hand-broadcast into the wet base coat. Delivers the granite or terrazzo look, adds slip resistance, and visually protects the surface.' },
      { num: '04', name: 'Aliphatic UV top coat', product: 'MAGIECHEM 955', thickness: '10–12 mils', color: 'border-l-primary', desc: 'The final protection layer. Maximum UV resistance (never yellows), superior chemical resistance, long-lasting gloss. This layer carries the 15-year warranty.' },
    ],
    totalLabel: 'Total thickness: 28–35 mils',
    diyLabel: 'Hardware store epoxy kit: 3–4 mils',
    prepBadge: 'Before the first coat',
    prepTitle: 'The preparation',
    prepHighlight: 'that makes it last.',
    prepSub: 'The #1 cause of floors peeling: poor surface preparation. Here\'s exactly what we do before applying a single drop.',
    prepSteps: [
      { icon: Wrench, title: 'Mechanical shot blasting (CSP-2+)', desc: 'We grind the entire surface with professional diamond grinders. Continuous HEPA suction — no dust. We create the adhesion profile needed for each layer to anchor into the concrete, not just on it.' },
      { icon: Drop, title: 'Tramex moisture testing', desc: 'Before anything, we measure moisture levels at multiple points with a Tramex meter. If levels exceed the threshold (>4%), we don\'t proceed — we never install on a surface that will compromise long-term adhesion.' },
      { icon: Warning, title: 'Crack repair', desc: 'We inject high-resistance polymer into every crack, pore, and irregularity. Let cure, grind flush. Minor cracks are included in the price. Major structural cracks are discussed as a supplement beforehand.' },
      { icon: Thermometer, title: 'Thermal and condition check', desc: 'We verify ambient temperature, dew point, and air humidity conditions. Application is possible between -10°C and +30°C. Outside this range, we reschedule rather than compromise quality.' },
    ],
    specsBadge: 'Real numbers (ASTM)',
    specsTitle: 'What these specs',
    specsHighlight: 'mean in practice.',
    specs: [
      { val: '6,700 psi', label: 'Tensile strength', context: 'Stronger than most residential concrete' },
      { val: '57 MPa', label: 'Compressive strength', context: 'Industrial grade — regular concrete ≈ 25–35 MPa' },
      { val: 'Shore D 70', label: 'Surface hardness', context: 'Untreated residential concrete: Shore D ~25' },
      { val: '25 mg', label: 'Taber abrasion loss', context: '1000 cycles, CS17 wheel — superior resistance' },
      { val: '>3 MPa', label: 'Pull-off adhesion', context: 'The concrete/coating bond is stronger than the concrete itself' },
      { val: '150%', label: 'Elongation at break', context: 'Flexible — follows concrete movement without cracking' },
    ],
    rtsBadge: 'After installation',
    rtsTitle: 'When you can',
    rtsHighlight: 'use your garage.',
    rtsSteps: [
      { time: 'Same evening', label: 'Walk on the floor', desc: 'Polyaspartic cures in a few hours. No need to wait 3 days.' },
      { time: '48 hours', label: 'Park your vehicle', desc: 'After 48h, the surface is ready for the weight and heat of your tires.' },
      { time: '7 days', label: 'First wash', desc: 'Wait 7 days before the first water cleaning for optimal cure.' },
      { time: '2 weeks', label: 'Full chemical resistance', desc: 'Maximum resistance to chemicals, motor oil, salt, and calcium.' },
    ],
    rtsVsEpoxy: 'Traditional epoxy: 3 to 5 days before you can walk on it.',
    diyBadge: 'Total honesty',
    diyTitle: 'DIY kit vs',
    diyHighlight: 'professional system.',
    diyRows: [
      { feature: 'Number of coats', diy: '1 coat', pro: '4 coats' },
      { feature: 'Total thickness', diy: '3–4 mils', pro: '28–35 mils' },
      { feature: 'Surface prep', diy: 'Cleaning only', pro: 'Mechanical shot blasting CSP-2+' },
      { feature: 'UV resistance', diy: 'Yellows quickly', pro: 'Aliphatic — stable for life' },
      { feature: 'Real lifespan', diy: '1–3 winters', pro: '15+ years' },
      { feature: 'Warranty', diy: 'None', pro: '15 years materials & labor' },
      { feature: 'Long-term adhesion', diy: 'Peeling risk', pro: 'Chemical bond into concrete' },
      { feature: 'Salt/calcium resistance', diy: 'Limited', pro: 'Excellent — designed for Quebec' },
    ],
    warrantyBadge: 'What\'s covered',
    warrantyTitle: 'The',
    warrantyHighlight: '15-year warranty.',
    warrantySub: 'Not a marketing warranty. A real written warranty that covers what matters.',
    warrantyCovered: [
      'Coating delamination or peeling',
      'Cracking unrelated to impact',
      'Abnormal adhesion loss',
      'Material or application defect',
    ],
    warrantyNotCovered: [
      'Physical damage (impact, sharp objects)',
      'Structural cracks in the concrete itself',
      'Normal wear after 15 years',
    ],
    warrantyNote: 'If something happens within 15 years that falls under the warranty, we come back. No cost. No discussion.',
    faqTitle: 'Technical questions.',
    faqHighlight: 'Direct answers.',
    faqs: [
      { q: 'My concrete is damp — is that a problem?', a: 'Not necessarily. Our primer resists moisture up to 8 lbs/1000 sq ft. Before installation, we measure with a Tramex meter. If too wet, we reschedule — we never install on a surface that will compromise adhesion.' },
      { q: 'My concrete is 30–40 years old. Is it possible?', a: 'In most cases, yes. Age isn\'t the factor — structural condition is. As long as the concrete is solid and not delaminating, shot blasting creates the needed adhesion profile. Minor cracks are repaired and included.' },
      { q: 'Can the floor yellow?', a: 'No. Our aliphatic top coat is tested at ΔE < 2.0 after 500h UV (ASTM 3424). By chemical design, it doesn\'t yellow — the fundamental difference between aliphatic and aromatic resins.' },
      { q: 'Does it resist hot tires?', a: 'Yes, in the vast majority of cases. Note: under certain conditions (very hot tires + high plasticizer tire types), plasticizer transfer can cause slight discoloration. We explain how to minimize this risk during the visit.' },
      { q: 'How do I maintain the floor?', a: 'No washing for 7 days. Regular upkeep: damp mop with mild soap. Stains: damp cloth, they come right off. No extreme pressure washing, no very hot water (max 49°C / 120°F), no abrasive products.' },
    ],
  },
}

function trackCall() {
  if (typeof window !== 'undefined') {
    ;(window as any).gtag?.('event', 'conversion', {
      send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC',
      value: 1.0, currency: 'CAD',
    })
  }
}

export default function PolyaspartiquePage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'fr'
  const c = copy[locale]
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-dark">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Image src="/images/logo-icon.png" alt="Garage Express" width={36} height={36} className="h-9 w-auto flex-shrink-0 sm:hidden" />
          <Image src="/images/logo-text.png" alt="Garage Express" width={160} height={40} className="h-9 w-auto flex-shrink-0 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-white/15 overflow-hidden text-xs font-bold">
              <a href="/fr/polyaspartique" className={`px-3 py-2 transition-colors ${locale === 'fr' ? 'bg-white text-dark' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>FR</a>
              <a href="/en/polyaspartique" className={`px-3 py-2 transition-colors ${locale === 'en' ? 'bg-white text-dark' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>EN</a>
            </div>
            <a href="#soumission" className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
              {c.ctaPrimary}
            </a>
            <a href="tel:5148248618" onClick={trackCall} className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
              <Phone weight="duotone" size={16} />
              {c.ctaPhone}
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image src="/images/hero-car3.png" alt="Plancher polyaspartique professionnel — Garage Express" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/97 via-dark/90 to-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 border border-primary/40 bg-primary/12 text-primary text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {c.badge}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase leading-none mb-5"
            >
              {c.heroTitle}
              <span className="block text-gradient">{c.heroHighlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
              className="text-white/75 text-lg sm:text-xl leading-relaxed mb-6 max-w-xl"
            >
              {c.heroSub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#soumission" className="bg-primary hover:bg-red-700 text-white font-black px-7 py-4 rounded-xl text-sm transition-all shadow-2xl shadow-primary/40">
                {c.ctaPrimary}
              </a>
              <a href="tel:5148248618" onClick={trackCall} className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl text-sm transition-all inline-flex items-center gap-2">
                <Phone weight="duotone" size={16} color="#DC2626" />
                {c.ctaPhone}
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-5 text-white/35 text-xs flex items-center gap-2"
            >
              <Shield weight="duotone" size={14} color="#DC2626" />
              {c.fixedPrice}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Why poly ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">{c.whyBadge}</span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight mt-3 mb-5">
                {c.whyTitle}<span className="block text-gradient">{c.whyHighlight}</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{c.whyText}</p>
              <div className="space-y-4">
                {c.whyPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check weight="bold" size={13} color="#fff" />
                    </div>
                    <div>
                      <p className="font-bold text-dark text-sm">{p.title}</p>
                      <p className="text-gray-500 text-sm">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-dark rounded-3xl p-8 space-y-4">
              {[
                { icon: Lightning, val: '5×', label: locale === 'fr' ? 'plus rapide que l\'époxy' : 'faster than epoxy' },
                { icon: Thermometer, val: '-30°C', label: locale === 'fr' ? 'application possible' : 'application possible' },
                { icon: Shield, val: '15 ans', label: locale === 'fr' ? 'garantie matériaux & pose' : 'materials & labor warranty' },
                { icon: Sparkle, val: '137', label: locale === 'fr' ? 'couleurs disponibles' : 'colors available' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/4 border border-white/8 rounded-xl p-4">
                  <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <s.icon weight="duotone" size={20} color="#DC2626" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-black text-white leading-none">{s.val}</div>
                    <div className="text-white/55 text-sm">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4 Layers ── */}
      <section className="py-20 bg-dark noise relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-primary/6 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">{c.layersBadge}</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase leading-tight mb-4">
              {c.layersTitle}<span className="block text-gradient">{c.layersSub.split(' ').slice(0, 3).join(' ')}</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">{c.layersSub}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            {c.layers.map((layer, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                className={`bg-white/4 border border-white/8 rounded-2xl p-5 border-l-4 ${layer.color}`}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-white/8 border border-white/12 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-black text-white text-xs">
                    {layer.num}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-display text-base font-bold text-white uppercase">{layer.name}</h3>
                      {layer.thickness !== '—' && (
                        <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">{layer.thickness}</span>
                      )}
                    </div>
                    <p className="text-white/40 text-xs font-mono mb-2">{layer.product}</p>
                    <p className="text-white/65 text-sm leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Thickness comparison */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="bg-white/4 border border-white/8 rounded-2xl p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-white font-bold text-sm mb-2">{c.totalLabel}</p>
                <div className="h-6 bg-gradient-to-r from-primary to-red-700 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.15)_4px,rgba(255,255,255,0.15)_8px)]" />
                </div>
              </div>
              <div>
                <p className="text-white/40 text-sm mb-2">{c.diyLabel}</p>
                <div className="h-6 bg-white/8 rounded-lg relative overflow-hidden border border-white/8">
                  <div className="h-full bg-white/15 rounded-l-lg" style={{ width: '11%' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Surface Prep ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="inline-block bg-dark/6 border border-dark/10 text-dark/60 font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">{c.prepBadge}</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight mb-4">
              {c.prepTitle}<span className="block text-gradient">{c.prepHighlight}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{c.prepSub}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {c.prepSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="w-11 h-11 bg-dark rounded-xl flex items-center justify-center mb-4">
                  <step.icon weight="duotone" size={22} color="#DC2626" />
                </div>
                <h3 className="font-display text-lg font-bold text-dark uppercase mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Specs ── */}
      <section className="py-20 bg-dark noise relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">{c.specsBadge}</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
              {c.specsTitle}<span className="block text-gradient">{c.specsHighlight}</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.specs.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.07 }} viewport={{ once: true }}
                className="bg-white/4 border border-white/8 rounded-2xl p-5">
                <div className="font-display text-3xl font-black text-primary leading-none mb-2">{s.val}</div>
                <div className="text-white font-bold text-sm mb-1">{s.label}</div>
                <div className="text-white/40 text-xs">{s.context}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Return to service ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="inline-block bg-dark/6 border border-dark/10 text-dark/60 font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">{c.rtsBadge}</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight">
              {c.rtsTitle}<span className="block text-gradient">{c.rtsHighlight}</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {c.rtsSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="font-display text-2xl font-black text-primary mb-2">{step.time}</div>
                <div className="font-bold text-dark text-sm mb-2">{step.label}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-dark rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center sm:text-left">
              {locale === 'fr' ? 'Comparaison — ' : 'Comparison — '}<strong className="text-white">{c.rtsVsEpoxy}</strong>
            </p>
            <a href="#soumission" className="flex-shrink-0 bg-primary hover:bg-red-700 text-white font-black px-6 py-3 rounded-xl text-sm transition-all whitespace-nowrap">
              {c.ctaPrimary} →
            </a>
          </div>
        </div>
      </section>

      {/* ── DIY vs Pro ── */}
      <section className="py-20 bg-dark noise relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">{c.diyBadge}</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
              {c.diyTitle}<span className="block text-gradient">{c.diyHighlight}</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-white/4 border-b border-white/8">
              <div className="py-3 px-4 text-white/40 text-xs font-bold uppercase tracking-wide">{locale === 'fr' ? 'Caractéristique' : 'Feature'}</div>
              <div className="py-3 px-4 text-white/40 text-xs font-bold uppercase tracking-wide text-center">{locale === 'fr' ? 'Kit DIY' : 'DIY Kit'}</div>
              <div className="py-3 px-4 text-primary text-xs font-bold uppercase tracking-wide text-center">Garage Express</div>
            </div>
            {c.diyRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/2'}`}>
                <div className="py-3 px-4 text-white/65 text-sm">{row.feature}</div>
                <div className="py-3 px-4 text-white/35 text-sm text-center">{row.diy}</div>
                <div className="py-3 px-4 text-primary font-semibold text-sm text-center">{row.pro}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Warranty ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="inline-block bg-dark/6 border border-dark/10 text-dark/60 font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-5">{c.warrantyBadge}</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-dark uppercase leading-tight mb-4">
              {c.warrantyTitle}<span className="text-gradient"> {c.warrantyHighlight}</span>
            </h2>
            <p className="text-gray-600 text-lg">{c.warrantySub}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-dark text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Check weight="bold" size={16} color="#16a34a" />{locale === 'fr' ? 'Ce qui est couvert' : 'What\'s covered'}
              </h3>
              <ul className="space-y-3">
                {c.warrantyCovered.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check weight="bold" size={14} color="#16a34a" className="mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-dark text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Warning size={16} color="#9ca3af" />{locale === 'fr' ? 'Non couvert' : 'Not covered'}
              </h3>
              <ul className="space-y-3">
                {c.warrantyNotCovered.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="bg-dark rounded-2xl p-6 text-center">
            <Shield weight="duotone" size={32} color="#DC2626" className="mx-auto mb-3" />
            <p className="text-white font-semibold text-base">{c.warrantyNote}</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-dark noise relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
              {c.faqTitle}<span className="block text-gradient">{c.faqHighlight}</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {c.faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
                className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/4 transition-colors">
                  <span className="font-bold text-white pr-4 text-sm">{faq.q}</span>
                  <CaretDown weight="bold" size={18} color="#DC2626" className={`flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-6 pb-5 text-white/65 text-sm leading-relaxed border-t border-white/8 pt-4">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Form ── */}
      <div id="soumission">
        <LeadForm />
      </div>

      <Footer />

      {/* Sticky mobile CTA */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-dark/97 backdrop-blur-md border-t border-white/12 px-4 py-3 flex gap-3">
        <a href="tel:5148248618" onClick={trackCall}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold py-3 rounded-xl text-sm">
          <Phone weight="duotone" size={16} color="#DC2626" />
          {locale === 'fr' ? 'Appeler' : 'Call'}
        </a>
        <a href="#soumission" className="flex-1 flex items-center justify-center bg-primary text-white font-black py-3 rounded-xl text-sm">
          {locale === 'fr' ? 'Soumission gratuite →' : 'Free quote →'}
        </a>
      </div>
    </div>
  )
}
