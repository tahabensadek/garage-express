'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'

const copy = {
  fr: 'Places limitées — Réservez votre estimé gratuit dès maintenant',
  en: 'Limited availability — Book your free estimate now',
}

export default function UrgencyBanner() {
  const { locale } = useTranslations()
  const [visible, setVisible] = useState(false)
  const shown = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (!shown.current && window.scrollY > 400) {
        shown.current = true
        setVisible(true)
        setTimeout(() => setVisible(false), 5000)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[60px] left-0 right-0 z-40 bg-amber-400 text-dark font-body text-sm font-semibold text-center px-4 py-2.5"
        >
          <span className="inline-flex items-center gap-2 justify-center flex-wrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark/30 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-dark/50" />
            </span>
            {copy[locale as 'fr' | 'en'] ?? copy.fr}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
