import type { Metadata } from 'next'

const SITE_URL = 'https://garagexpress.ca'

const meta = {
  fr: {
    title: 'Époxy Garage Montréal, Rive-Sud & Laval — Garage Express | Dès 2 749$',
    description:
      'Cherchez-vous un plancher époxy pour votre garage? Nos clients choisissent le polyaspartique — même look, 2× plus résistant, installé en 1 journée. Prix fixe 2 749$ tout inclus. Service Montréal, Rive-Sud & Laval.',
  },
  en: {
    title: 'Epoxy Garage Montreal, South Shore & Laval — Garage Express | From $2,749',
    description:
      'Looking for garage epoxy in Montreal, South Shore or Laval? Our clients choose polyaspartic — same look, 2× stronger, installed in 1 day. Fixed all-inclusive price from $2,749. Serving Montreal, South Shore & Laval.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale === 'en' ? 'en' : 'fr'
  const m = meta[locale]
  const url = `${SITE_URL}/${locale}/epoxy-garage`

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/epoxy-garage`,
        en: `${SITE_URL}/en/epoxy-garage`,
        'x-default': `${SITE_URL}/fr/epoxy-garage`,
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

export default function EpoxyGarageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
