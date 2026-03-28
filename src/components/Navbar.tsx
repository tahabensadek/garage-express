'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Phone } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'
import LanguageSwitcher from './LanguageSwitcher'

const urgencyCopy = {
  fr: 'Places limitées — Réservez votre estimé gratuit dès maintenant',
  en: 'Limited availability — Book your free estimate now',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const bannerShown = useRef(false)
  const { get, locale } = useTranslations()

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40)
      if (!bannerShown.current && window.scrollY > 400) {
        bannerShown.current = true
        setShowBanner(true)
        setTimeout(() => setShowBanner(false), 5000)
      }
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/50 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#" aria-label="Retour en haut" className="flex items-center">
          <Image src="/images/logo-icon.png" alt="Garage Express" width={44} height={44} className="h-11 w-auto sm:hidden" />
          <Image src="/images/logo-text.png" alt="Garage Express" width={200} height={50} className="h-11 w-auto hidden sm:block" />
        </a>
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          <a href={`tel:${get('nav.phone').replace(/-/g, '')}`}
            onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-17940446235/AoXGCLDrhI0cEJv41epC', value: 1.0, currency: 'CAD' })}
            className="hidden sm:flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
            <Phone weight="duotone" size={16} color="#DC2626" />
            {get('nav.phone')}
          </a>
          
          <a href="#soumission"
            className="relative overflow-hidden bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 btn-shimmer">
            {get('nav.cta')}
          </a>
        </div>
      </div>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-amber-400 text-dark font-body text-sm font-semibold text-center px-4 py-2.5"
          >
            <span className="inline-flex items-center gap-2 justify-center flex-wrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark/30 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-dark/50" />
              </span>
              {urgencyCopy[locale as 'fr' | 'en'] ?? urgencyCopy.fr}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}