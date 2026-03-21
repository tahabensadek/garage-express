'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion'

/* ─── helpers ───────────────────────────────────────────────── */
const PHONE = '+15148248618'
const RED = '#DC2626'

const FLAKES = [
  'FB-901_OPAL_PILE','FB-907_GALAXY_PILE','FB-912_THUNDER_PILE','FB-915_RAVEN_PILE',
  'FB-930_FROSTBITE_PILE','FB-934_BLACK_ICE_PILE','FB-944_RAINSTORM_PILE','FB-946_VOLTAGE_PILE',
  'F9202_CARBON_PILE','FB-803_SEA_CREST_PILE','FB-808_TIDAL_WAVE_PILE','FB-923_JAVA_PILE',
  'FB-614_WOMBAT_PILE','FB-711_COMET_PILE','F9305_GARNET_PILE','FB-330_POLAR_PILE',
]

const STATS = [
  { value: 127, suffix: '+', label: 'Garages complétés' },
  { value: 4.9, suffix: '★', label: 'Note Google' },
  { value: 1,   suffix: ' jour', label: 'Installation' },
  { value: 15,  suffix: ' ans', label: 'Garantie' },
]

const STEPS = [
  { n: '01', title: 'Inspection', desc: 'On évalue ton plancher, les fissures, l\'humidité et la superficie exacte.' },
  { n: '02', title: 'Préparation', desc: 'Meulage diamant pour ouvrir les pores du béton et assurer l\'adhérence maximale.' },
  { n: '03', title: 'Application', desc: 'Couche de polyaspartique + dispersion des flocons Torginol de ton choix.' },
  { n: '04', title: 'Topcoat', desc: 'Scellant final haute performance, anti-UV, résistant aux produits chimiques.' },
]

/* ─── 1. LENIS SMOOTH SCROLL demo ───────────────────────────── */
function ConceptLenis() {
  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden p-10 min-h-[340px] flex flex-col justify-between border border-white/8">
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <span className="font-black text-[12rem] text-white leading-none">∿</span>
      </div>
      <div>
        <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 1</span>
        <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight">Lenis<br/>Smooth Scroll</h3>
      </div>
      <div className="space-y-3">
        <p className="text-white/50 text-sm leading-relaxed">
          Toute la page glisse comme du beurre. Pas de saccades, pas de jump. L'inertie est réglée précisément pour donner un feeling premium instantané — aucun changement visuel, mais les visiteurs le sentent.
        </p>
        <div className="flex gap-3 flex-wrap">
          {['60fps garanti','Inertie réglable','1 fichier à ajouter'].map(t => (
            <span key={t} className="text-xs bg-white/8 border border-white/10 text-white/60 px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
        <div className="pt-2">
          <div className="text-white/30 text-xs">Avant ↔ Après</div>
          <div className="mt-1 flex gap-2 items-center">
            <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-white/20 rounded-full" animate={{ x: ['-100%','100%','-100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </div>
            <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-red-500/60 rounded-full" animate={{ x: ['-100%','100%','-100%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: [0.25,0.1,0.25,1] }} />
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <span className="text-white/20 text-[10px] flex-1">scroll natif</span>
            <span className="text-red-400 text-[10px] flex-1">avec Lenis</span>
          </div>
        </div>
      </div>
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">01</div>
    </div>
  )
}

/* ─── 2. STATS COUNTER ──────────────────────────────────────── */
function AnimatedNumber({ target, suffix }: { target: number, suffix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const isDecimal = target % 1 !== 0
        const duration = 1800
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(isDecimal ? Math.round(eased * target * 10) / 10 : Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <div ref={ref} className="font-black text-5xl text-white tabular-nums">{val}{suffix}</div>
}

function ConceptStats() {
  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/8">
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">02</div>
      <div className="p-8 pb-4">
        <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 2</span>
        <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight">Stats<br/>Animées</h3>
        <p className="text-white/50 text-sm mt-3 leading-relaxed">Les chiffres s'incrémentent au scroll — social proof immédiat qui renforce la confiance.</p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/5 border-t border-white/8">
        {[
          { value: 127, suffix: '+', label: 'Garages complétés' },
          { value: 4.9, suffix: '★', label: 'Note Google' },
          { value: 1,   suffix: ' jour', label: 'Installation' },
          { value: 15,  suffix: ' ans', label: 'Garantie' },
        ].map(s => (
          <div key={s.label} className="bg-[#0a0a0a] p-6 flex flex-col gap-1">
            <AnimatedNumber target={s.value} suffix={s.suffix} />
            <div className="text-white/40 text-xs uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── 3. 3D TILT CARDS ───────────────────────────────────────── */
function TiltCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })
  const gx = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const gy = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative bg-white/4 border border-white/10 rounded-2xl p-6 cursor-pointer select-none"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at ${gx} ${gy}, rgba(220,38,38,0.12), transparent 60%)` }}
      />
      <div className="text-3xl mb-4">{icon}</div>
      <div className="font-black text-white uppercase text-lg leading-tight mb-2">{title}</div>
      <div className="text-white/50 text-sm leading-relaxed">{desc}</div>
    </motion.div>
  )
}

function ConceptTilt() {
  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden p-8 border border-white/8">
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">03</div>
      <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 3</span>
      <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight mb-2">Tilt 3D<br/>Cards</h3>
      <p className="text-white/50 text-sm mb-6 leading-relaxed">Les cartes Benefits suivent ta souris en perspective 3D avec glow dynamique. Passe ta souris dessus ↓</p>
      <div className="grid grid-cols-3 gap-3" style={{ perspective: '1000px' }}>
        <TiltCard icon="⚡" title="Rapide" desc="Installation en 1 journée seulement." />
        <TiltCard icon="🛡️" title="Durable" desc="15 ans de garantie sur le matériel." />
        <TiltCard icon="💧" title="Résistant" desc="Anti-huile, anti-produits chimiques." />
      </div>
    </div>
  )
}

/* ─── 4. PARTICLE FLAKES ─────────────────────────────────────── */
function ConceptParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const imgs = FLAKES.slice(0, 12).map(f => {
      const img = new Image()
      img.src = `/flakes/${f}.avif`
      return img
    })

    const particles = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 24 + Math.random() * 32,
      speed: 0.15 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 0.2,
      opacity: 0.15 + Math.random() * 0.35,
      img: imgs[i % imgs.length],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.y -= p.speed
        p.x += p.drift
        p.rotation += p.rotSpeed
        if (p.y + p.size < 0) { p.y = canvas.height + p.size; p.x = Math.random() * canvas.width }
        if (p.x > canvas.width + p.size) p.x = -p.size
        if (p.x < -p.size) p.x = canvas.width + p.size

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.clip()
        if (p.img.complete && p.img.naturalWidth > 0) {
          ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size)
        } else {
          ctx.fillStyle = 'rgba(220,38,38,0.3)'
          ctx.fill()
        }
        ctx.restore()
      })
      raf = requestAnimationFrame(draw)
    }
    // Wait for images
    setTimeout(draw, 300)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/8" style={{ minHeight: 340 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">04</div>
      <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: 340 }}>
        <div>
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 4</span>
          <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight">Particules<br/>Flakes</h3>
        </div>
        <div>
          <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-sm">
            Tes vrais flocons Torginol dérivent en background — unique à ton industrie. Utilisable en hero, en section couleurs, ou partout.
          </p>
          <div className="flex gap-3 flex-wrap">
            {['Canvas 2D','60fps','Tes vraies images'].map(t => (
              <span key={t} className="text-xs bg-black/40 border border-white/10 text-white/60 px-3 py-1 rounded-full backdrop-blur">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 5. SVG DIVIDERS ────────────────────────────────────────── */
function ConceptDividers() {
  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/8">
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">05</div>
      <div className="p-8 pb-0">
        <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 5</span>
        <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight mb-2">Dividers<br/>SVG</h3>
        <p className="text-white/50 text-sm leading-relaxed">Transitions fluides entre sections au lieu des coupures nettes. Plusieurs styles disponibles.</p>
      </div>

      <div className="mt-6 space-y-0">
        {/* Diagonal */}
        <div className="bg-white/90 py-6 px-8 relative">
          <div className="text-dark text-xs font-bold uppercase tracking-widest">Section blanche</div>
          <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none">
            <polygon points="0,0 1440,60 1440,60 0,60" fill="#0a0a0a" />
          </svg>
        </div>
        <div className="bg-[#0a0a0a] py-6 px-8 relative">
          <div className="text-white/50 text-xs font-bold uppercase tracking-widest">→ Diagonale</div>
        </div>

        {/* Wave */}
        <div className="bg-white/90 py-6 px-8 relative">
          <div className="text-dark text-xs font-bold uppercase tracking-widest">Section blanche</div>
          <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0a0a0a" />
          </svg>
        </div>
        <div className="bg-[#0a0a0a] py-6 px-8">
          <div className="text-white/50 text-xs font-bold uppercase tracking-widest">→ Vague</div>
        </div>

        {/* Zigzag */}
        <div className="bg-red-600 py-6 px-8 relative">
          <div className="text-white text-xs font-bold uppercase tracking-widest">Section rouge</div>
          <svg viewBox="0 0 1440 30" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none">
            <polyline points="0,0 60,30 120,0 180,30 240,0 300,30 360,0 420,30 480,0 540,30 600,0 660,30 720,0 780,30 840,0 900,30 960,0 1020,30 1080,0 1140,30 1200,0 1260,30 1320,0 1380,30 1440,0 1440,30 0,30" fill="#0a0a0a" />
          </svg>
        </div>
        <div className="bg-[#0a0a0a] py-6 px-8">
          <div className="text-white/50 text-xs font-bold uppercase tracking-widest">→ Zigzag</div>
        </div>
      </div>
    </div>
  )
}

/* ─── 6. PROCESS TIMELINE ────────────────────────────────────── */
function ConceptProcess() {
  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden p-8 border border-white/8">
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">06</div>
      <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 6</span>
      <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight mb-2">Process<br/>Timeline</h3>
      <p className="text-white/50 text-sm mb-8 leading-relaxed">Section "Comment ça marche" — absente du site. Chaque étape se révèle au scroll.</p>

      <div className="relative">
        {/* Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
        <motion.div
          className="absolute left-6 top-0 w-px bg-red-500 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              className="flex gap-6 pl-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center z-10 font-black text-white text-sm">
                {step.n}
              </div>
              <div className="pt-2">
                <div className="font-black text-white uppercase text-lg leading-tight">{step.title}</div>
                <div className="text-white/50 text-sm mt-1 leading-relaxed">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── 7. SPLIT TEXT ──────────────────────────────────────────── */
function SplitWord({ word, delay }: { word: string, delay: number }) {
  return (
    <span className="inline-block overflow-hidden mr-[0.25em]">
      <motion.span
        className="inline-block"
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        {word}
      </motion.span>
    </span>
  )
}

function ConceptSplitText() {
  const words1 = ['Votre', 'garage,']
  const words2 = ['votre', 'signature.']
  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden p-8 border border-white/8 min-h-[340px] flex flex-col justify-between">
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">07</div>
      <div>
        <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 7</span>
        <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight mb-2">Split Text<br/>Reveal</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-8">Les titres se révèlent mot par mot au scroll — effet cinématique. Scroll vers le bas ↓</p>
      </div>

      <div>
        <div className="font-black text-5xl text-white uppercase leading-none mb-1">
          {words1.map((w, i) => <SplitWord key={w} word={w} delay={i * 0.12} />)}
        </div>
        <div className="font-black text-5xl uppercase leading-none" style={{ background: 'linear-gradient(135deg,#DC2626,#ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {words2.map((w, i) => <SplitWord key={w} word={w} delay={0.24 + i * 0.12} />)}
        </div>
        <motion.div
          className="mt-4 h-0.5 bg-red-500 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  )
}

/* ─── 8. HERO PARALLAX ───────────────────────────────────────── */
function ConceptParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/8" style={{ minHeight: 400 }}>
      <div className="absolute top-6 right-6 z-20 text-white/10 font-black text-6xl">08</div>
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src="/images/hero-car2.png" alt="" className="w-full h-full object-cover scale-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </motion.div>
      <motion.div className="relative z-10 p-8 flex flex-col justify-between" style={{ minHeight: 400, y: textY }}>
        <div>
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 8</span>
          <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight">Hero<br/>Parallax</h3>
        </div>
        <div>
          <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">
            La photo du hero et le texte scrollent à des vitesses différentes — profondeur 3D immédiate. Scroll pour voir l'effet ↓
          </p>
          <span className="text-xs bg-white/10 border border-white/15 text-white/60 px-3 py-1 rounded-full">Framer Motion scroll</span>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── 9. MAGNETIC CURSOR ─────────────────────────────────────── */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="relative bg-red-600 hover:bg-red-500 text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-wide transition-colors"
    >
      {children}
    </motion.button>
  )
}

function ConceptMagnetic() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const sx = useSpring(cursorX, { stiffness: 120, damping: 18 })
  const sy = useSpring(cursorY, { stiffness: 120, damping: 18 })
  const containerRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const r = containerRef.current!.getBoundingClientRect()
    cursorX.set(e.clientX - r.left)
    cursorY.set(e.clientY - r.top)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => { cursorX.set(-100); cursorY.set(-100) }}
      className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden p-8 border border-white/8 min-h-[340px] cursor-none"
    >
      {/* Custom cursor */}
      <motion.div
        className="absolute w-6 h-6 rounded-full border-2 border-red-500 pointer-events-none z-50"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-red-500 pointer-events-none z-50"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />

      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">09</div>
      <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 9</span>
      <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight mb-2">Magnetic<br/>Cursor</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-8">
        Curseur custom qui attire les boutons CTA magnétiquement. Déplace ta souris ici ↓
      </p>
      <div className="flex gap-4 flex-wrap">
        <MagneticButton>Obtenir mon estimé</MagneticButton>
        <MagneticButton>514-824-8618</MagneticButton>
      </div>
    </div>
  )
}

/* ─── 10. BEFORE/AFTER GALLERY ───────────────────────────────── */
function BASlider({ n }: { n: number }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className="relative rounded-xl overflow-hidden aspect-video cursor-ew-resize select-none"
      onMouseDown={() => { dragging.current = true }}
      onMouseUp={() => { dragging.current = false }}
      onMouseMove={e => { if (dragging.current) update(e.clientX) }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchMove={e => update(e.touches[0].clientX)}
    >
      <img src={`/images/after-${n}.png`} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={`/images/before-${n}.png`} alt="" className="w-full h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
          <span className="text-dark font-black text-[10px]">◀▶</span>
        </div>
      </div>
      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">AVANT</div>
      <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">APRÈS</div>
    </div>
  )
}

function ConceptGallery() {
  return (
    <div className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden p-8 border border-white/8">
      <div className="absolute top-6 right-6 text-white/10 font-black text-6xl">10</div>
      <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Concept 10</span>
      <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight mb-2">Galerie<br/>Avant/Après</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-6">Grid de réalisations avec slider interactif sur chaque photo. Glisse sur les images ↓</p>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map(n => <BASlider key={n} n={n} />)}
      </div>
    </div>
  )
}

/* ─── BONUS: GRADIENT MESH ───────────────────────────────────── */
function ConceptGradientMesh() {
  return (
    <div className="relative bg-[#050505] rounded-3xl overflow-hidden border border-white/8 min-h-[300px] flex flex-col">
      {/* Animated gradient orbs */}
      <motion.div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-red-600"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-20%', left: '-10%' }}
      />
      <motion.div className="absolute w-80 h-80 rounded-full blur-3xl opacity-15 bg-orange-500"
        animate={{ x: [0, -50, 40, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ bottom: '-10%', right: '-10%' }}
      />
      <motion.div className="absolute w-64 h-64 rounded-full blur-3xl opacity-10 bg-red-800"
        animate={{ x: [0, 40, -60, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        style={{ top: '30%', right: '30%' }}
      />

      <div className="relative z-10 p-8 flex flex-col justify-between flex-1">
        <div>
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Bonus</span>
          <h3 className="font-black text-4xl text-white uppercase mt-2 leading-tight mb-2">Gradient<br/>Mesh Animé</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            Orbes de couleur qui se déplacent lentement en background — effect ambiant premium sur toutes les sections sombres.
          </p>
        </div>
        <div className="mt-6 flex gap-3 flex-wrap">
          {['Sections sombres', 'Hero', 'Benefits', 'FinalCTA'].map(t => (
            <span key={t} className="text-xs bg-white/5 border border-white/10 text-white/50 px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ───────────────────────────────────────────────── */
export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[#060606]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#060606]/95 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-white font-black text-lg uppercase tracking-tight">Showcase</span>
          <span className="text-white/30 text-sm ml-3">— Garage Express</span>
        </div>
        <a href="/fr" className="text-white/40 hover:text-white text-sm transition-colors">← Retour au site</a>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Intro */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-red-500 text-xs font-bold tracking-widest uppercase mb-4 border border-red-500/30 bg-red-500/10 px-4 py-2 rounded-full">
              10 concepts + 1 bonus
            </span>
            <h1 className="font-black text-6xl sm:text-7xl text-white uppercase leading-none mb-4">
              Choisis ce que<br/>
              <span style={{ background: 'linear-gradient(135deg,#DC2626,#ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                tu veux en prod
              </span>
            </h1>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Chaque concept est interactif — survole, glisse, scroll pour voir l'effet réel.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <ConceptLenis />
          <ConceptStats />
          <ConceptTilt />
          <ConceptParticles />
          <ConceptDividers />
          <ConceptProcess />
          <ConceptSplitText />
          <ConceptParallax />
          <ConceptMagnetic />
          <ConceptGallery />
        </div>

        {/* Bonus full width */}
        <div className="mt-6">
          <ConceptGradientMesh />
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-white/30 text-sm mb-4">Tu choisis, j'implémente en prod</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {['1','2','3','4','5','6','7','8','9','10','Bonus'].map(n => (
              <span key={n} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-bold flex items-center justify-center">
                {n}
              </span>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-4">Dis-moi les numéros qui t'intéressent</p>
        </div>
      </div>
    </div>
  )
}
