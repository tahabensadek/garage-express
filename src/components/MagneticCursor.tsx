'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const scaleVal = useMotionValue(1)

  const sx = useSpring(x, { stiffness: 90, damping: 20 })
  const sy = useSpring(y, { stiffness: 90, damping: 20 })
  const dx = useSpring(dotX, { stiffness: 300, damping: 28 })
  const dy = useSpring(dotY, { stiffness: 300, damping: 28 })
  const scale = useSpring(scaleVal, { stiffness: 200, damping: 20 })

  const enabled = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    enabled.current = true

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"]')) scaleVal.set(2.2)
    }
    const onOut = () => scaleVal.set(1)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-red-500/60 pointer-events-none z-[9999] hidden md:block"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', scale }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-red-500 pointer-events-none z-[9999] hidden md:block"
        style={{ x: dx, y: dy, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
