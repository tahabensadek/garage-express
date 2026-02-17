'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Phone } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
        <Image src="/logo.svg" alt="Garage Express" width={140} height={48} className="h-10 w-auto" />
        
        <div className="flex items-center gap-3">
          <a href="tel:5148248618"
            className="hidden sm:flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            514-824-8618
          </a>
          <a href="#soumission"
            className="relative overflow-hidden bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 btn-shimmer">
            Soumission gratuite
          </a>
        </div>
      </div>
    </nav>
  )
}
