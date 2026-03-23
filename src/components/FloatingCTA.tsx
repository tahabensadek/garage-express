'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'

const copy = {
  fr: '📋 Soumission gratuite',
  en: '📋 Free quote',
}

export default function FloatingCTA() {
  const { locale } = useTranslations()
  const [showFloat, setShowFloat] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {showFloat && (
        <motion.a
          href="#soumission"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-primary hover:bg-red-700 text-white font-black px-6 py-4 rounded-2xl shadow-2xl shadow-primary/40 text-sm transition-colors"
        >
          {copy[locale as 'fr' | 'en'] ?? copy.fr}
        </motion.a>
      )}
    </AnimatePresence>
  )
}
