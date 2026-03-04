'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { useTranslations } from '@/hooks/useTranslations'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { get } = useTranslations()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/50 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/images/logo-icon.png" alt="Garage Express" width={44} height={44} className="h-11 w-auto sm:hidden" />
          <Image src="/images/logo-text.png" alt="Garage Express" width={320} height={80} className="h-20 w-auto hidden sm:block" />
        </div>
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          <a href={`tel:${get('nav.phone').replace(/-/g, '')}`}
            className="hidden sm:flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            {get('nav.phone')}
          </a>
          
          <a href="#soumission"
            className="relative overflow-hidden bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 btn-shimmer">
            {get('nav.cta')}
          </a>
        </div>
      </div>
    </nav>
  )
}