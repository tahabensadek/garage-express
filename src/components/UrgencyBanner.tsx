'use client'
import { useTranslations } from '@/hooks/useTranslations'

const copy = {
  fr: '🌱 Saison printanière — Disponibilités limitées en avril. Réservez maintenant.',
  en: '🌱 Spring season — Limited availability in April. Book now.',
}

export default function UrgencyBanner() {
  const { locale } = useTranslations()
  return (
    <div className="bg-red-600 text-white text-xs font-bold text-center px-4 py-2.5 tracking-wide">
      {copy[locale as 'fr' | 'en'] ?? copy.fr}
    </div>
  )
}
