'use client'
import { useTranslations } from '@/hooks/useTranslations'

const copy = {
  fr: 'Places limitées — Réservez votre estimé gratuit dès maintenant',
  en: 'Limited availability — Book your free estimate now',
}

export default function UrgencyBanner() {
  const { locale } = useTranslations()
  return (
    <div className="bg-amber-400 text-dark text-xs font-bold text-center px-4 py-3 tracking-wide">
      <span className="inline-flex items-center gap-2 justify-center flex-wrap">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark/50 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-dark/70" />
        </span>
        {copy[locale as 'fr' | 'en'] ?? copy.fr}
      </span>
    </div>
  )
}
