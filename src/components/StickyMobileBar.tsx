'use client'
import { useTranslations } from '@/hooks/useTranslations'

const copy = {
  fr: { call: '📞 Appeler', cta: 'Soumission gratuite →' },
  en: { call: '📞 Call', cta: 'Free quote →' },
}

export default function StickyMobileBar() {
  const { locale } = useTranslations()
  const c = copy[locale as 'fr' | 'en'] ?? copy.fr

  const trackCall = () =>
    (window as any).gtag?.('event', 'conversion', {
      send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC',
      value: 1.0,
      currency: 'CAD',
    })

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-dark/97 backdrop-blur-md border-t border-white/12 px-4 py-3 flex gap-3">
      <a
        href="tel:5148248618"
        onClick={trackCall}
        className="flex-1 flex items-center justify-center gap-2 bg-white/20 border border-white/40 text-white font-bold py-3.5 rounded-xl text-sm transition-all active:bg-white/30"
      >
        {c.call}
      </a>
      <a
        href="#soumission"
        className="flex items-center justify-center gap-2 bg-primary text-white font-black py-3.5 rounded-xl text-sm transition-all active:bg-red-700 shadow-lg shadow-primary/30"
        style={{ flex: 2 }}
      >
        {c.cta}
      </a>
    </div>
  )
}
