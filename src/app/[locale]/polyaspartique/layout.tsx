import type { Metadata } from 'next'

const SITE_URL = 'https://garagexpress.ca'

const meta = {
  fr: {
    title: 'Plancher Polyaspartique Garage — Montréal, Rive-Sud & Laval | Garage Express',
    description:
      'Revêtement polyaspartique professionnel pour garage. 4 couches, grenaillage mécanique CSP-2+, 28–35 mils, garantie 15 ans. Installé en 1 journée. Prix fixe dès 2 749$ tout inclus. Service Montréal, Rive-Sud & Laval.',
  },
  en: {
    title: 'Polyaspartic Garage Floor — Montreal, South Shore & Laval | Garage Express',
    description:
      'Professional polyaspartic garage floor coating. 4-layer system, mechanical shot blasting CSP-2+, 28–35 mils thick, 15-year warranty. Installed in 1 day. Fixed price from $2,749 all-inclusive. Serving Montreal, South Shore & Laval.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale === 'en' ? 'en' : 'fr'
  const m = meta[locale]
  const url = `${SITE_URL}/${locale}/polyaspartique`

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/polyaspartique`,
        en: `${SITE_URL}/en/polyaspartique`,
        'x-default': `${SITE_URL}/fr/polyaspartique`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: 'Garage Express',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default function PolyaspartiqueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
