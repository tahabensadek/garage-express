'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Emit native scroll events so Framer Motion useScroll stays in sync
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll', { bubbles: false }))
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
  return null
}
