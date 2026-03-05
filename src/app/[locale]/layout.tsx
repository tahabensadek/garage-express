import type { Metadata } from 'next'
import '../globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const SITE_URL = 'https://garagexpress.ca'

const metaByLocale = {
  fr: {
    title: 'Garage Express | Plancher Polyaspartique — Rive-Sud & Montréal | Dès 2 749$',
    description: "Transformez votre garage en 1 seule journée. Revêtement polyaspartique professionnel, durable 15+ ans, résistant au sel et à l'huile. Prix fixe garanti dès 2 749$ tout inclus. Service Rive-Sud, Montréal. Estimation 100% gratuite.",
  },
  en: {
    title: 'Garage Express | Polyaspartic Flooring — South Shore & Montreal | From $2,749',
    description: 'Transform your garage in just one day. Professional polyaspartic coating, 15+ year durability, resistant to salt and oil. Fixed price guaranteed from $2,749 all included. Serving South Shore & Montreal. 100% free estimate.',
  },
}

const faqsByLocale = {
  fr: [
    { q: "Est-ce que c'est vraiment installé en 1 journée ?", a: "Oui — sans exception. Nos techniciens arrivent vers 8h et repartent en fin d'après-midi. Le jour même, vous pouvez marcher sur le plancher. Après 24h, les véhicules peuvent rentrer. C'est l'avantage principal du polyaspartique sur l'époxy : il cure 5× plus vite." },
    { q: "Quelle est la différence entre le polyaspartique et l'époxy ?", a: "Le polyaspartique est une évolution technologique de l'époxy. Il cure plus vite, résiste mieux aux UV (ne jaunit pas), est plus flexible (résiste au gel/dégel québécois), et dure plus longtemps. L'époxy reste un bon produit, mais le polyaspartique est ce que les professionnels choisissent aujourd'hui pour les applications haute performance." },
    { q: "Le prix inclut vraiment tout ? Il n'y aura pas de surprise ?", a: "Le prix inclut : la préparation de surface (meulage), les réparations de fissures mineures, la couche de base, les flocons décoratifs, le top coat, et le nettoyage. La seule exception possible : les fissures structurelles majeures (larges de plus de 5mm ou profondes). On vous avertit à l'avance si c'est le cas après inspection visuelle." },
    { q: "Dois-je vider complètement mon garage ?", a: "Idéalement oui — ça accélère l'installation et assure une couverture complète. Si vous ne pouvez pas tout sortir, nos techniciens peuvent travailler en sections et déplacer les objets pendant l'installation (selon le volume). Contactez-nous pour en discuter avant." },
    { q: "Est-ce que ça résiste vraiment aux hivers québécois ?", a: "Absolument. C'est conçu pour ça. Le polyaspartique est flexible, donc il suit la contraction/dilatation du béton avec les cycles gel/dégel sans décoller ni fissurer. Il est également résistant au sel de déglaçage, au calcium, et aux changements brusques de température de -30°C à +40°C." },
    { q: "Combien de temps dure la garantie et qu'est-ce qu'elle couvre ?", a: "La garantie est de 15 ans et couvre les matériaux ET la main-d'oeuvre. Si le revêtement se décolle, fissure, pèle ou présente des défauts non liés à un choc ou à une usure anormale, on revient le réparer sans frais. C'est une garantie réelle, pas juste du marketing." },
    { q: "Puis-je choisir la couleur des flocons ?", a: "Oui. Vous choisissez votre couleur lors de la prise de rendez-vous. Les forfaits standard incluent 8 couleurs (Garage Simple) ou 12 couleurs (Garage Double). Des mélanges personnalisés sont disponibles pour 200$ supplémentaires. On vous envoie un catalogue dès que vous confirmez." },
    { q: "Pourquoi ne pas juste acheter un kit époxy au Home Depot ?", a: "Vous pouvez. Mais voici ce qui se passe généralement : le produit est de grade résidentiel bas, la préparation de surface est inadéquate, et le plancher commence à peler après 1-2 hivers. Vous le refaites. Au total, vous avez dépensé plus que le prix de notre forfait, eu le trouble de le faire vous-même deux fois, et le résultat est inférieur. Notre garantie 15 ans vous évite tout ça." },
  ],
  en: [
    { q: "Is it really installed in 1 day?", a: "Yes — without exception. Our technicians arrive around 8am and leave late afternoon. That same day, you can walk on the floor. After 24h, vehicles can enter. That's the main advantage of polyaspartic over epoxy: it cures 5× faster." },
    { q: "What's the difference between polyaspartic and epoxy?", a: "Polyaspartic is a technological evolution of epoxy. It cures faster, resists UV better (doesn't yellow), is more flexible (handles Quebec freeze-thaw cycles), and lasts longer. Epoxy is still a good product, but polyaspartic is what professionals choose today for high-performance applications." },
    { q: "Does the price really include everything? Will there be surprises?", a: "The price includes: surface preparation (grinding), minor crack repairs, base coat, decorative flakes, top coat, and cleanup. The only possible exception: major structural cracks (wider than 5mm or deep). We warn you in advance if that's the case after visual inspection." },
    { q: "Do I need to completely empty my garage?", a: "Ideally yes — it speeds up installation and ensures complete coverage. If you can't move everything, our technicians can work in sections and move items during installation (depending on volume). Contact us to discuss beforehand." },
    { q: "Does it really hold up to Quebec winters?", a: "Absolutely. It's designed for that. Polyaspartic is flexible, so it follows the concrete's expansion and contraction with freeze-thaw cycles without peeling or cracking. It's also resistant to de-icing salt, calcium, and sudden temperature changes from -30°C to +40°C." },
    { q: "How long is the warranty and what does it cover?", a: "The warranty is 15 years and covers both materials AND labor. If the coating peels, cracks, chips, or shows defects unrelated to impact or abnormal wear, we come back to repair it at no cost. It's a real warranty, not just marketing." },
    { q: "Can I choose the flake color?", a: "Yes. You choose your color when booking. Standard packages include 8 colors (Single Garage) or 12 colors (Double Garage). Custom blends are available for an additional $200. We send you a catalog as soon as you confirm." },
    { q: "Why not just buy an epoxy kit from Home Depot?", a: "You can. But here's what typically happens: the product is low residential grade, surface preparation is inadequate, and the floor starts peeling after 1-2 winters. You do it again. In total, you've spent more than our package price, had the hassle of doing it yourself twice, and the result is inferior. Our 15-year warranty saves you all that." },
  ],
}

const serviceAreas = ['Longueuil', 'Brossard', 'Saint-Hubert', 'La Prairie', 'Boucherville', 'Sainte-Julie', 'Montréal']

function buildSchemas(locale: string) {
  const faqs = faqsByLocale[locale as keyof typeof faqsByLocale] || faqsByLocale.fr
  const isFr = locale === 'fr'

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    name: 'Garage Express',
    url: SITE_URL,
    telephone: '+15148248618',
    email: 'info@garageexpress.ca',
    description: isFr
      ? "Spécialiste en revêtement polyaspartique de plancher de garage. Installation professionnelle en 1 jour. Service Rive-Sud & Montréal."
      : "Garage floor polyaspartic coating specialist. Professional installation in 1 day. Serving South Shore & Montreal.",
    image: `${SITE_URL}/images/after-1.png`,
    logo: `${SITE_URL}/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Longueuil',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    areaServed: serviceAreas.map(city => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: 'Québec', containedInPlace: { '@type': 'Country', name: 'Canada' } },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '200',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    currenciesAccepted: 'CAD',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '16:00' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isFr ? 'Forfaits plancher polyaspartique' : 'Polyaspartic floor packages',
      itemListElement: [
        {
          '@type': 'Offer',
          name: isFr ? 'Garage Simple' : 'Single Garage',
          description: isFr ? 'Revêtement polyaspartique pour garage simple (≤300 pi²), installation en 1 jour, garantie 15 ans.' : 'Polyaspartic coating for single garage (≤300 sq ft), 1-day install, 15-year warranty.',
          price: '2749.99',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          name: isFr ? 'Garage Double' : 'Double Garage',
          description: isFr ? 'Revêtement polyaspartique pour garage double (>300 pi²), installation en 1 jour, garantie 15 ans.' : 'Polyaspartic coating for double garage (>300 sq ft), 1-day install, 15-year warranty.',
          price: '4449.99',
          priceCurrency: 'CAD',
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return [localBusiness, faqSchema]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'fr'
  const meta = metaByLocale[locale as keyof typeof metaByLocale] || metaByLocale.fr
  const canonicalUrl = `${SITE_URL}/${locale}/`

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr': `${SITE_URL}/fr/`,
        'en': `${SITE_URL}/en/`,
        'x-default': `${SITE_URL}/fr/`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: 'Garage Express',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: locale === 'fr'
            ? 'Garage Express — Plancher polyaspartique professionnel Rive-Sud & Montréal'
            : 'Garage Express — Professional polyaspartic garage floor South Shore & Montreal',
        },
      ],
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale || 'fr'
  const schemas = buildSchemas(locale)

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-RF7B3D0RPS" />
      <script dangerouslySetInnerHTML={{ __html: `gtag('config', 'AW-17940446235');` }} />
    </html>
  )
}
