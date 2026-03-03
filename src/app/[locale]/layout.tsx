import type { Metadata } from 'next'
import '../globals.css'

const metaByLocale = {
  fr: {
    title: 'Garage Express | Plancher Polyaspartique — Rive-Sud & Laval | Dès 2 749$',
    description: 'Transformez votre garage en 1 seule journée. Revêtement polyaspartique professionnel, durable 15+ ans, résistant au sel et à l\'huile. Prix fixe garanti dès 2 749$ tout inclus. Service Rive-Sud, Laval. Estimation 100% gratuite.',
  },
  en: {
    title: 'Garage Express | Polyaspartic Flooring — South Shore & Laval | From $2,749',
    description: 'Transform your garage in just one day. Professional polyaspartic coating, 15+ year durability, resistant to salt and oil. Fixed price guaranteed from $2,749 all included. Serving South Shore & Laval. 100% free estimate.',
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'fr'
  const meta = metaByLocale[locale as keyof typeof metaByLocale] || metaByLocale.fr
  
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale || 'fr'}>
      <body>{children}</body>
    </html>
  )
}
