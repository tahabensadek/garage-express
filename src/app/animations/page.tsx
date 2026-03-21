'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Clock, Shield, Droplets, Thermometer, Zap, Sparkles, ChevronRight, Phone, Star, ArrowDown, Download, X } from 'lucide-react'

// ─── NAV ─────────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'comparaisons', label: '⚡ Avant/Après' },
  { id: 'concept-1', label: 'Hero Fill' },
  { id: 'concept-2', label: 'Resin Drop' },
  { id: 'concept-3', label: 'Color Sweep' },
  { id: 'concept-4', label: 'Shine Cards' },
  { id: 'concept-5', label: 'Liquid Wipe' },
]

function ShowcaseNav({ active }: { active: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14 border-b border-white/8"
      style={{ backdropFilter: 'blur(24px)', background: 'rgba(12,12,12,0.9)' }}>
      <span className="font-display font-black text-xl uppercase text-white tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
        Animation Lab <span className="text-[#DC2626]">·</span> Garage Express
      </span>
      <div className="flex gap-1">
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            style={{
              background: active === s.id ? '#DC2626' : 'rgba(255,255,255,0.05)',
              color: active === s.id ? '#fff' : 'rgba(255,255,255,0.35)',
            }}>
            <span className="text-[10px] opacity-60">{String(i + 1).padStart(2, '0')}</span>
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

// ─── LABEL BADGE ─────────────────────────────────────────────────────────────
function ConceptBadge({ n, title, where, children }: { n: string; title: string; where: string; children: React.ReactNode }) {
  return (
    <section id={`concept-${n}`} className="min-h-screen pt-14">
      {/* Header strip */}
      <div className="border-b border-white/6 px-10 py-8 flex items-end justify-between"
        style={{ background: 'linear-gradient(180deg, #111 0%, #0C0C0C 100%)' }}>
        <div className="flex items-end gap-5">
          <span className="font-display font-black leading-none select-none"
            style={{ fontSize: 80, color: 'rgba(255,255,255,0.04)', fontFamily: 'Barlow Condensed, sans-serif' }}>{String(n).padStart(2, '0')}</span>
          <div className="pb-1">
            <p className="text-[#DC2626] text-xs font-bold uppercase tracking-[0.2em] mb-1">Où → {where}</p>
            <h2 className="font-display font-black text-4xl uppercase text-white leading-none"
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2 pb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
          <span className="text-white/20 text-xs uppercase tracking-widest">Interactive</span>
        </div>
      </div>
      <div className="px-10 py-10">{children}</div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CONCEPT 1 — LIQUID HERO FILL
// Maquette réaliste du Hero existant avec résine qui monte
// ══════════════════════════════════════════════════════════════════════════════
function ConceptHeroFill() {
  const [phase, setPhase] = useState<'idle' | 'filling' | 'shine' | 'done'>('idle')
  const floodCtrl = useAnimation()
  const shineCtrl = useAnimation()

  async function play() {
    if (phase !== 'idle' && phase !== 'done') return
    setPhase('filling')
    floodCtrl.set({ scaleY: 0, opacity: 1 })
    shineCtrl.set({ x: '-120%', opacity: 0 })

    await floodCtrl.start({ scaleY: 1, transition: { duration: 2.4, ease: [0.12, 0.8, 0.32, 1] } })
    setPhase('shine')
    await shineCtrl.start({ x: '140%', opacity: [0, 1, 1, 0], transition: { duration: 1.0, ease: 'easeInOut' } })
    setPhase('done')
  }

  return (
    <div className="grid grid-cols-5 gap-6">
      {/* Hero mockup — 3 cols */}
      <div className="col-span-3 relative rounded-2xl overflow-hidden cursor-pointer" style={{ height: 500 }} onClick={play}>
        {/* Real hero bg photo */}
        <img src="/images/hero-car2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(12,12,12,0.97) 0%, rgba(12,12,12,0.85) 55%, rgba(12,12,12,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(12,12,12,1) 0%, transparent 30%, rgba(12,12,12,0.4) 100%)' }} />

        {/* FLOOD LAYER — résine qui monte */}
        <motion.div
          animate={floodCtrl}
          initial={{ scaleY: 0 }}
          className="absolute inset-0 origin-bottom z-10 pointer-events-none"
        >
          {/* Couleur résine semi-transparente */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(220,38,38,0.0) 0%, rgba(220,38,38,0.04) 60%, rgba(127,29,29,0.12) 100%)' }} />

          {/* Vague animée sur le dessus */}
          <div className="absolute left-0 right-0 -top-5">
            <svg viewBox="0 0 1200 40" className="w-full" preserveAspectRatio="none" style={{ height: 40 }}>
              <motion.path
                fill="rgba(220,38,38,0.35)"
                animate={{ d: [
                  'M0,20 C150,5 300,35 450,20 C600,5 750,35 900,20 C1050,5 1150,30 1200,20 L1200,40 L0,40 Z',
                  'M0,12 C150,28 300,8 450,25 C600,8 750,28 900,12 C1050,28 1150,15 1200,25 L1200,40 L0,40 Z',
                  'M0,20 C150,5 300,35 450,20 C600,5 750,35 900,20 C1050,5 1150,30 1200,20 L1200,40 L0,40 Z',
                ]}}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* Flocons dispersés */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="absolute"
              style={{
                width: `${1.5 + Math.random() * 4}px`,
                height: `${0.8 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? 'rgba(255,255,255,0.5)' : i % 3 === 1 ? '#DC2626' : 'rgba(200,150,150,0.6)',
                borderRadius: '1px',
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.3 + Math.random() * 0.5,
              }} />
          ))}
        </motion.div>

        {/* Shine sweep */}
        <motion.div
          animate={shineCtrl}
          initial={{ x: '-120%', opacity: 0 }}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)', transform: 'skewX(-10deg)' }}
        />

        {/* Hero content (exact copy du vrai Hero) */}
        <div className="relative z-30 h-full flex flex-col justify-center px-10 pt-8">
          <div className="flex gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#DC2626] text-[#DC2626]" />)}
            <span className="text-white/50 text-xs ml-2">200+ avis 5 étoiles</span>
          </div>
          <h1 className="font-display font-black uppercase leading-none text-white mb-4"
            style={{ fontSize: 52, fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 1 }}>
            Garage<br />
            <span style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Express</span><br />
            Plancher
          </h1>
          <p className="text-white/60 text-sm mb-6 max-w-xs leading-relaxed">Installation en 1 jour. Garanti 15 ans.</p>
          <div className="flex gap-3">
            <div className="bg-[#DC2626] text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
              Obtenir un estimé <ChevronRight className="w-4 h-4" />
            </div>
            <div className="bg-white/8 border border-white/15 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#DC2626]" /> Appeler
            </div>
          </div>
        </div>

        {/* Idle overlay */}
        <AnimatePresence>
          {(phase === 'idle') && (
            <motion.div exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute inset-0 z-40 flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#DC2626]/60 flex items-center justify-center">
                  <div className="text-3xl">🌊</div>
                </div>
                <p className="text-white/60 text-sm font-semibold">Cliquer pour animer</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Done state */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setPhase('idle')}
              className="absolute bottom-5 right-5 z-40 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full"
            >
              ↺ Rejouer
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Explication — 2 cols */}
      <div className="col-span-2 flex flex-col gap-4">
        <div className="rounded-2xl border border-white/8 p-6" style={{ background: '#161616' }}>
          <h3 className="font-display font-black text-xl uppercase text-white mb-3" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Comment ça marche</h3>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Au chargement de la page, une vague de résine monte de bas en haut sur toute la section Hero' },
              { step: '2', text: 'Des flocons Torginol apparaissent dispersés dans la résine pendant le coulage' },
              { step: '3', text: 'Un shimmer lumineux sweep pour simuler le plancher fraîchement coulé sous les lumières' },
            ].map(({ step, text }) => (
              <div key={step} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-[10px] font-black">{step}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 p-6" style={{ background: '#161616' }}>
          <h3 className="font-display font-black text-xl uppercase text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Effort d'intégration</h3>
          <div className="space-y-2">
            {[
              { label: 'Complexité', value: 2, max: 5, color: '#22c55e' },
              { label: 'Impact visuel', value: 5, max: 5, color: '#DC2626' },
              { label: 'Perf mobile', value: 4, max: 5, color: '#3b82f6' },
            ].map(({ label, value, max, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-white/40 text-xs">{label}</span>
                  <span className="text-white/40 text-xs">{value}/{max}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: max }).map((_, i) => (
                    <div key={i} className="flex-1 h-1.5 rounded-full" style={{ background: i < value ? color : 'rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#DC2626]/20 p-5" style={{ background: 'rgba(127,29,29,0.1)' }}>
          <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-2">⭐ Recommandé pour</p>
          <p className="text-white/60 text-sm leading-relaxed">Créer un effet "wow" immédiat dès l'arrivée sur le site. Renforce le branding sans cacher le contenu.</p>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CONCEPT 2 — RESIN DROP PROCESS
// Version animée de la vraie section Process du site
// ══════════════════════════════════════════════════════════════════════════════
const REAL_STEPS = [
  { num: '01', time: '8h00', title: 'Inspection', desc: 'Évaluation du béton, repérage des fissures et zones problématiques', detail: 'On documente tout avant de commencer. Zéro surprise.', icon: '🔍' },
  { num: '02', time: '8h30', title: 'Meulage Diamant', desc: 'Préparation mécanique de la surface pour adhérence maximale', detail: 'Équipement professionnel HEPA — votre garage reste propre.', icon: '⚙️' },
  { num: '03', time: '10h00', title: 'Base Coat', desc: 'Application de la première couche de polyaspartique haute performance', detail: 'Cure 5x plus vite que l\'époxy standard.', icon: '🪣' },
  { num: '04', time: '11h00', title: 'Flocons Torginol', desc: 'Dispersion manuelle des flocons décoratifs selon votre couleur choisie', detail: '137 couleurs disponibles. Votre signature.', icon: '✨' },
  { num: '05', time: '12h30', title: 'Top Coat UV', desc: 'Couche de finition anti-UV, anti-produits chimiques, haute brillance', detail: 'Ne jaunit jamais. Résistant au sel de déglaçage.', icon: '🛡️' },
  { num: '06', time: '16h00', title: 'Livraison', desc: 'Inspection finale, photos, remise des documents de garantie', detail: 'Vous marchez dessus le soir même. Voitures: 24h.', icon: '🏁' },
]

function ConceptResinDrop() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [dropping, setDropping] = useState<number | null>(null)
  const lineProgress = revealed.size / REAL_STEPS.length

  async function trigger(i: number) {
    // Auto-reveal in order
    const nextToReveal = revealed.size
    if (i !== nextToReveal || dropping !== null) return
    setDropping(i)
    await new Promise(r => setTimeout(r, 750))
    setRevealed(prev => new Set(prev).add(i))
    setDropping(null)
  }

  const reset = () => setRevealed(new Set())

  return (
    <div className="grid grid-cols-5 gap-8">
      {/* Process timeline mockup */}
      <div className="col-span-3 relative">
        {/* Vertical progress line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <motion.div
          className="absolute left-8 top-8 w-0.5 origin-top"
          style={{ background: 'linear-gradient(180deg, #DC2626, #7f1d1d)' }}
          animate={{ height: `${lineProgress * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        <div className="space-y-4">
          {REAL_STEPS.map((step, i) => {
            const isRevealed = revealed.has(i)
            const isNext = i === revealed.size
            const isDone = i < revealed.size

            return (
              <div key={i} className="relative flex gap-5 cursor-pointer" onClick={() => trigger(i)}>
                {/* Drop animation */}
                <AnimatePresence>
                  {dropping === i && (
                    <motion.div key="drop"
                      initial={{ y: -50, opacity: 1 }}
                      animate={{ y: 32, opacity: 1 }}
                      exit={{ scaleX: 2.5, scaleY: 0.2, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute left-5 top-0 z-30"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#DC2626', boxShadow: '0 0 12px #DC2626' }} />
                        <div className="w-1.5 h-5 -mt-1" style={{ background: 'linear-gradient(180deg, #DC2626, transparent)', borderRadius: '0 0 50% 50%' }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Splash rings */}
                <AnimatePresence>
                  {dropping === i && [...Array(3)].map((_, r) => (
                    <motion.div key={r}
                      initial={{ scale: 0, opacity: 0.9 }}
                      animate={{ scale: 2.5 + r * 0.8, opacity: 0 }}
                      transition={{ duration: 0.5, delay: r * 0.07 }}
                      className="absolute left-4 top-8 z-20 w-8 h-8 rounded-full border border-[#DC2626]"
                      style={{ marginLeft: -16, marginTop: -4 }}
                    />
                  ))}
                </AnimatePresence>

                {/* Step number bubble */}
                <div className="flex-shrink-0 relative z-10">
                  <motion.div
                    animate={{
                      background: isDone ? '#DC2626' : isNext ? 'rgba(220,38,38,0.15)' : '#161616',
                      borderColor: isDone ? '#DC2626' : isNext ? 'rgba(220,38,38,0.5)' : 'rgba(255,255,255,0.08)',
                      scale: isNext && !dropping ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ scale: { duration: 1.5, repeat: Infinity } }}
                    className="w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center"
                  >
                    <span className="text-xs opacity-60 text-white">{step.time}</span>
                    <span className="text-white font-display font-black text-lg leading-none"
                      style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{step.num}</span>
                  </motion.div>
                </div>

                {/* Card content */}
                <motion.div
                  animate={{
                    background: isDone ? 'rgba(127,29,29,0.12)' : '#111',
                    borderColor: isDone ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.06)',
                  }}
                  className="flex-1 rounded-2xl border p-5 min-h-[80px] relative overflow-hidden"
                  style={{ background: '#111', border: '1.5px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Content revealed via clip */}
                  <motion.div
                    initial={{ clipPath: 'circle(0% at 20px 50%)' }}
                    animate={{ clipPath: isRevealed ? 'circle(200% at 20px 50%)' : 'circle(0% at 20px 50%)' }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-display font-black text-lg text-white uppercase mb-1"
                          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{step.icon} {step.title}</h4>
                        <p className="text-white/50 text-xs leading-relaxed mb-2">{step.desc}</p>
                        <div className="flex items-center gap-2 bg-[#DC2626]/8 border-l-2 border-[#DC2626] pl-3 py-1.5 rounded-r-lg">
                          <p className="text-[#DC2626]/80 text-xs">💡 {step.detail}</p>
                        </div>
                      </div>
                      <div className="ml-3 w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 12 12" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" width="10" height="10"><path d="M2 6l3 3 5-5"/></svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Idle hint */}
                  <AnimatePresence>
                    {!isRevealed && (
                      <motion.div exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/15 text-xs uppercase tracking-widest">
                          {isNext ? '💧 Cliquer pour révéler' : `Étape ${step.num}`}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* End badge */}
        <AnimatePresence>
          {revealed.size === REAL_STEPS.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center rounded-2xl p-6"
              style={{ background: 'linear-gradient(135deg, #1a1a1a, #111)', border: '1px solid rgba(220,38,38,0.3)' }}
            >
              <p className="font-display font-black text-2xl text-white uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>🏁 Votre plancher est prêt !</p>
              <p className="text-white/40 text-sm mt-1">Le soir même, vous marchez dessus.</p>
              <button onClick={reset} className="mt-4 text-[#DC2626] text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">↺ Recommencer</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info panel */}
      <div className="col-span-2 flex flex-col gap-4">
        <div className="rounded-2xl border border-white/8 p-6" style={{ background: '#161616' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-black text-xl uppercase text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Progression</h3>
            <span className="text-[#DC2626] font-bold">{revealed.size}/{REAL_STEPS.length}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444)' }}
              animate={{ width: `${(revealed.size / REAL_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }} />
          </div>
          <p className="text-white/30 text-xs mt-3">
            {revealed.size === 0 ? 'Cliquer sur chaque étape dans l\'ordre →' : `${REAL_STEPS.length - revealed.size} étape${REAL_STEPS.length - revealed.size > 1 ? 's' : ''} restante${REAL_STEPS.length - revealed.size > 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 p-6 flex-1" style={{ background: '#161616' }}>
          <h3 className="font-display font-black text-xl uppercase text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Concept</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Chaque étape du processus se révèle quand le visiteur clique, comme une goutte de résine qui tombe et expose le contenu sous-jacent.
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            <strong className="text-white/80">Alternative passive:</strong> la révélation se déclenche au scroll, une étape après l'autre automatiquement.
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 p-5" style={{ background: '#161616' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/40 text-xs uppercase tracking-wider">Impact</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Engagement', value: 5, color: '#DC2626' },
              { label: 'Complexité', value: 3, color: '#f59e0b' },
              { label: 'Originalité', value: 5, color: '#DC2626' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-white/40 text-xs w-24">{label}</span>
                <div className="flex gap-1 flex-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex-1 h-1.5 rounded-full" style={{ background: i < value ? color : 'rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CONCEPT 3 — COLOR SWEEP (avec vrais flocons Torginol)
// ══════════════════════════════════════════════════════════════════════════════
const FEATURED_FLAKES = [
  'F9202_CARBON_PILE',
  'F9304_OBSIDIAN_PILE',
  'FB-330_POLAR_PILE',
  'FB-508_STINGER_PILE',
  'FB-932_MAGMA_PILE',
  'FB-703_FOG_PILE',
  'FB-908_STARGAZER_PILE',
  'FB-801_ROCKY_RIDGE_PILE',
]

function flakeLabel(file: string) {
  return file.replace(/_PILE.*$/, '').replace(/_1\.4$/, '').replace(/^[A-Z]+-\d+-/, '').replace(/^[A-Z]+[\d-]+_/, '').replace(/_/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase())
}

function ConceptColorSweep() {
  const [current, setCurrent] = useState(FEATURED_FLAKES[4])
  const [sweeping, setSweeping] = useState<string | null>(null)
  const [displayFlake, setDisplayFlake] = useState(FEATURED_FLAKES[4])
  const sweepCtrl = useAnimation()
  const shineCtrl = useAnimation()

  async function pick(flake: string) {
    if (sweeping || flake === current) return
    setSweeping(flake)

    sweepCtrl.set({ x: '-110%', skewX: -10 })
    shineCtrl.set({ x: '-100%', opacity: 0 })

    await sweepCtrl.start({ x: '0%', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } })
    setDisplayFlake(flake)
    setCurrent(flake)

    await Promise.all([
      sweepCtrl.start({ x: '110%', transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } }),
      shineCtrl.start({ x: '200%', opacity: [0, 0.7, 0], transition: { duration: 0.6, ease: 'easeInOut' } }),
    ])
    setSweeping(null)
  }

  return (
    <div className="grid grid-cols-5 gap-6">
      {/* Floor preview — mimics real ColorSelector section */}
      <div className="col-span-3 space-y-4">
        {/* Section header like the real site */}
        <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: '#0C0C0C' }}>
          <div className="px-8 py-6 text-center border-b border-white/5">
            <span className="text-[#DC2626] text-xs font-bold tracking-widest uppercase">137 nuances disponibles</span>
            <h2 className="font-display font-black text-4xl uppercase text-white mt-1 leading-tight"
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Votre garage, <span style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>votre signature.</span>
            </h2>
          </div>

          {/* Preview window */}
          <div className="relative mx-8 my-6 rounded-2xl overflow-hidden" style={{ height: 280 }}>
            {/* Flake image background */}
            <img src={`/flakes/${displayFlake}.avif`} alt="" className="absolute inset-0 w-full h-full object-cover" />

            {/* Gloss overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />

            {/* Floor perspective illusion */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />

            {/* Sweep wave */}
            <AnimatePresence>
              {sweeping && (
                <motion.div
                  key={sweeping}
                  animate={sweepCtrl}
                  className="absolute inset-0 z-10"
                >
                  <img src={`/flakes/${sweeping}.avif`} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
                  {/* Wave leading edge */}
                  <svg className="absolute right-0 top-0 h-full z-20" style={{ width: 80, right: -1 }} viewBox="0 0 80 280" preserveAspectRatio="none">
                    <path d="M60,0 C40,50 70,100 50,140 C30,180 60,230 60,280 L80,280 L80,0 Z" fill="white" opacity="0.06" />
                    <path d="M58,0 C38,50 68,100 48,140 C28,180 58,230 58,280 L80,280 L80,0 Z" fill="rgba(255,255,255,0.03)" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shine pass */}
            <motion.div
              animate={shineCtrl}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.25) 50%, transparent 75%)', transform: 'skewX(-12deg)' }}
            />

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-30" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)' }}>
              <motion.p key={displayFlake} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="text-white/40 text-xs uppercase tracking-widest">Torginol · {displayFlake.match(/^([A-Z0-9-]+)_/)?.[1]}</motion.p>
              <motion.h3 key={displayFlake + 'name'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="font-display font-black text-3xl uppercase text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                {flakeLabel(displayFlake)}
              </motion.h3>
            </div>
          </div>

          {/* CTA row */}
          <div className="px-8 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <Download className="w-3.5 h-3.5" />
              Télécharger le catalogue (PDF)
            </div>
            <div className="bg-[#DC2626] text-white font-bold text-sm px-5 py-2.5 rounded-xl">
              Obtenir mon estimé gratuit
            </div>
          </div>
        </div>
      </div>

      {/* Flake picker */}
      <div className="col-span-2 flex flex-col gap-4">
        <div className="rounded-2xl border border-white/8 p-5" style={{ background: '#161616' }}>
          <h3 className="font-display font-black text-xl uppercase text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Choisir un flocon
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {FEATURED_FLAKES.map(flake => (
              <motion.button
                key={flake}
                onClick={() => pick(flake)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-xl overflow-hidden"
                style={{
                  height: 90,
                  border: `2px solid ${current === flake ? '#DC2626' : 'transparent'}`,
                  boxShadow: current === flake ? '0 0 20px rgba(220,38,38,0.3)' : 'none',
                }}
              >
                <img src={`/flakes/${flake}.avif`} alt={flakeLabel(flake)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-end p-2"
                  style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%)' }}>
                  <span className="text-white text-[9px] font-bold leading-tight uppercase">{flakeLabel(flake)}</span>
                </div>
                <AnimatePresence>
                  {current === flake && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center">
                      <svg viewBox="0 0 10 10" fill="white" width="8" height="8"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-3 text-center">Cliquer pour voir la vague de résine</p>
        </div>

        <div className="rounded-2xl border border-white/8 p-5" style={{ background: '#161616' }}>
          <h3 className="font-display font-black text-xl uppercase text-white mb-3" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Concept</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            Remplace la simple swap d'image par une vague de résine qui sweep d'un flocon à l'autre. Chaque changement de couleur devient un micro-moment "wow".
          </p>
          <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)' }}>
            <p className="text-[#DC2626] text-xs font-bold">S'intègre directement dans ColorSelector.tsx existant</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CONCEPT 4 — SHINE PASS (sur les vraies Benefit cards)
// ══════════════════════════════════════════════════════════════════════════════
const REAL_BENEFITS = [
  { Icon: Clock, title: 'Installé en 1 jour', desc: 'Nos techniciens arrivent à 8h et repartent en fin d\'après-midi. Marcher dessus le soir même.', highlight: true },
  { Icon: Shield, title: 'Garanti 15 ans', desc: 'Matériaux ET main-d\'oeuvre. Si ça pèle ou fissure, on revient sans frais.', highlight: false },
  { Icon: Droplets, title: '100% imperméable', desc: 'Huile, calcium, sel de déglaçage — tout essuie avec un simple coup de vadrouille.', highlight: false },
  { Icon: Thermometer, title: 'Résiste au gel', desc: '-40°C à +40°C. Conçu pour les cycles gel/dégel québécois. Ne décolle jamais.', highlight: false },
  { Icon: Zap, title: '5× plus rapide', desc: 'Polyaspartique vs époxy: cure 5 fois plus vite. Même journée, toujours.', highlight: false },
  { Icon: Sparkles, title: '137 couleurs', desc: 'Catalogue Torginol complet. Mélanges sur mesure disponibles.', highlight: false },
]

function ConceptShinePass() {
  const [mode, setMode] = useState<'hover' | 'auto' | 'color'>('auto')

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2 p-1 rounded-xl border border-white/8 w-fit" style={{ background: '#161616' }}>
        {(['auto', 'hover', 'color'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-4 py-2 rounded-lg text-xs font-bold transition-all capitalize"
            style={{ background: mode === m ? '#DC2626' : 'transparent', color: mode === m ? '#fff' : 'rgba(255,255,255,0.35)' }}>
            {m === 'auto' ? '▶ Auto' : m === 'hover' ? '👆 Au survol' : '🎨 Couleur'}
          </button>
        ))}
      </div>

      {/* Benefit cards grid — exact same layout as the real site */}
      <div className="grid grid-cols-3 gap-4">
        {REAL_BENEFITS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="relative rounded-2xl p-7 overflow-hidden group"
            style={{
              background: b.highlight ? 'rgba(220,38,38,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1.5px solid ${b.highlight ? 'rgba(220,38,38,0.25)' : 'rgba(255,255,255,0.07)'}`,
            }}
            whileHover={mode === 'hover' ? { borderColor: 'rgba(220,38,38,0.4)', scale: 1.02 } : { scale: 1.01 }}
          >
            {/* AUTO MODE shine */}
            {mode === 'auto' && (
              <motion.div
                className="absolute inset-y-0 w-32 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', transform: 'skewX(-12deg)' }}
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 + i * 0.4, delay: i * 0.35 }}
              />
            )}

            {/* HOVER MODE shine */}
            {mode === 'hover' && (
              <motion.div
                className="absolute inset-y-0 w-32 pointer-events-none opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', transform: 'skewX(-12deg)' }}
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 0.7, ease: 'easeInOut', repeat: Infinity, delay: 0 }}
              />
            )}

            {/* COLOR MODE — red glow instead of shine */}
            {mode === 'color' && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 80% 20%, rgba(220,38,38,0.${b.highlight ? '15' : '08'}) 0%, transparent 60%)` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            )}

            {/* Card content — identical to real Benefits.tsx */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${b.highlight ? 'bg-[#DC2626]' : 'bg-white/8'}`}>
              <b.Icon className={`w-6 h-6 ${b.highlight ? 'text-white' : 'text-[#DC2626]'}`} />
            </div>
            <h3 className="font-display text-xl font-black text-white uppercase leading-tight mb-3"
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{b.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-5 rounded-2xl border border-white/6 flex items-center justify-between" style={{ background: '#111' }}>
        <div>
          <p className="text-white/60 text-sm font-semibold mb-1">3 variantes testables ci-dessus</p>
          <p className="text-white/30 text-xs">Auto = passif en boucle · Hover = au survol · Couleur = glow ambiant</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/30 text-xs">S'intègre dans Benefits.tsx</span>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CONCEPT 5 — LIQUID WIPE (vraies photos avant/après du site)
// ══════════════════════════════════════════════════════════════════════════════
const PHOTO_PAIRS = [
  { before: '/images/before-1.png', after: '/images/after-1.png', label: 'Garage simple · Laval' },
  { before: '/images/before-2.png', after: '/images/after-2.png', label: 'Garage double · Brossard' },
  { before: '/images/before-3.png', after: '/images/after-3.png', label: 'Garage + rangement · Longueuil' },
  { before: '/images/before-4.png', after: '/images/after-4.png', label: 'Garage sport · Saint-Hubert' },
  { before: '/images/before-5.png', after: '/images/after-5.png', label: 'Garage double · La Prairie' },
]

function ConceptLiquidWipe() {
  const [progress, setProgress] = useState(0.5)
  const [dragging, setDragging] = useState(false)
  const [auto, setAuto] = useState(false)
  const [pair, setPair] = useState(0)
  const [wipeStyle, setWipeStyle] = useState<'liquid' | 'straight' | 'diagonal'>('liquid')
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const dirRef = useRef(1)

  useEffect(() => {
    if (!auto) { cancelAnimationFrame(rafRef.current); return }
    const tick = () => {
      setProgress(p => {
        let n = p + dirRef.current * 0.0025
        if (n >= 0.97) { dirRef.current = -1; n = 0.97 }
        if (n <= 0.03) { dirRef.current = 1; n = 0.03 }
        return n
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [auto])

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || auto) return
    const rect = containerRef.current.getBoundingClientRect()
    setProgress(Math.max(0.02, Math.min(0.98, (clientX - rect.left) / rect.width)))
  }, [auto])

  const clipPath = wipeStyle === 'liquid'
    ? `polygon(0 0, ${progress * 100}% 0, calc(${progress * 100}% + 2%) 50%, ${progress * 100}% 100%, 0 100%)`
    : wipeStyle === 'diagonal'
    ? `polygon(0 0, ${progress * 100 + 5}% 0, ${progress * 100 - 5}% 100%, 0 100%)`
    : `inset(0 ${(1 - progress) * 100}% 0 0)`

  return (
    <div className="space-y-5">
      {/* Style selector */}
      <div className="flex items-center gap-4">
        <span className="text-white/30 text-xs uppercase tracking-wider">Style du wipe:</span>
        <div className="flex gap-2">
          {(['liquid', 'straight', 'diagonal'] as const).map(s => (
            <button key={s} onClick={() => setWipeStyle(s)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize"
              style={{ background: wipeStyle === s ? '#DC2626' : 'rgba(255,255,255,0.06)', color: wipeStyle === s ? '#fff' : 'rgba(255,255,255,0.4)' }}>
              {s === 'liquid' ? '🌊 Vague' : s === 'straight' ? '| Droit' : '/ Diagonal'}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setAuto(a => !a)}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={{ background: auto ? '#DC2626' : 'rgba(255,255,255,0.06)', color: auto ? '#fff' : 'rgba(255,255,255,0.4)' }}>
            {auto ? '⏸ Pause' : '▶ Auto'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Main wipe viewer */}
        <div className="col-span-2">
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden border border-white/10"
            style={{ height: 450, cursor: dragging ? 'grabbing' : 'ew-resize' }}
            onMouseMove={e => handleMove(e.clientX)}
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onTouchMove={e => handleMove(e.touches[0].clientX)}
          >
            {/* AFTER */}
            <div className="absolute inset-0">
              <img src={PHOTO_PAIRS[pair].after} alt="Après" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 50%)' }} />
              <div className="absolute bottom-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Après</span>
              </div>
            </div>

            {/* BEFORE */}
            <div className="absolute inset-0" style={{ clipPath }}>
              <img src={PHOTO_PAIRS[pair].before} alt="Avant" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 50%)' }} />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Avant</span>
              </div>
            </div>

            {/* Divider + handle */}
            <div className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center"
              style={{ left: `${progress * 100}%`, transform: 'translateX(-50%)' }}>
              {wipeStyle === 'liquid' && (
                <svg className="absolute" style={{ width: 6, height: '100%', left: -3 }} viewBox="0 0 6 450" preserveAspectRatio="none">
                  <path d="M3,0 L5,112 L1,225 L5,337 L3,450" stroke="#DC2626" strokeWidth="2" fill="none" opacity="0.8" />
                </svg>
              )}
              {wipeStyle !== 'liquid' && (
                <div className="absolute h-full w-px bg-[#DC2626] opacity-70" />
              )}
              <motion.div
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
                animate={{ scale: dragging ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  background: 'linear-gradient(135deg, #DC2626, #7f1d1d)',
                  border: '2px solid rgba(255,255,255,0.25)',
                  boxShadow: '0 0 24px rgba(220,38,38,0.5), 0 4px 20px rgba(0,0,0,0.6)',
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" width="12" height="12">
                  <path d="M5 8H1M15 8h-4M5 5l-3 3 3 3M11 5l3 3-3 3"/>
                </svg>
              </motion.div>
            </div>

            {/* Photo label */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
              <div className="px-3 py-1.5 rounded-full text-xs text-white/50 backdrop-blur-md"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {PHOTO_PAIRS[pair].label}
              </div>
            </div>
          </div>
        </div>

        {/* Photo thumbnails + info */}
        <div className="flex flex-col gap-3">
          <p className="text-white/30 text-xs uppercase tracking-wider">5 réalisations réelles</p>
          <div className="space-y-2">
            {PHOTO_PAIRS.map((p, i) => (
              <motion.button key={i} onClick={() => setPair(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full rounded-xl overflow-hidden flex items-center gap-3 p-2 transition-all"
                style={{
                  background: pair === i ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${pair === i ? '#DC2626' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={p.after} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-white/50 text-xs text-left leading-tight">{p.label}</span>
                {pair === i && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" />}
              </motion.button>
            ))}
          </div>

          <div className="mt-auto rounded-xl border border-white/6 p-4" style={{ background: '#111' }}>
            <p className="text-white/60 text-sm font-semibold mb-2">3 styles de wipe</p>
            <p className="text-white/30 text-xs leading-relaxed">Vague · Droit · Diagonal. Le style <em>vague</em> imite le coulage de résine, le plus "on-brand".</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPARAISONS AVANT / APRÈS — rendu exact du site vs version améliorée
// ══════════════════════════════════════════════════════════════════════════════

// Label flottant dans chaque panneau
function PanelLabel({ text, type }: { text: string; type: 'before' | 'after' }) {
  return (
    <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"
      style={{
        background: type === 'before' ? 'rgba(255,255,255,0.9)' : '#DC2626',
        color: type === 'before' ? '#111' : '#fff',
      }}>
      {type === 'before' ? '● ACTUEL' : '▲ AMÉLIORÉ'}
    </div>
  )
}

// Wrapper côte-à-côte
function SideBySide({ title, file, changes, before, after }: {
  title: string
  file: string
  changes: string[]
  before: React.ReactNode
  after: React.ReactNode
}) {
  return (
    <div className="border border-white/6 rounded-3xl overflow-hidden" style={{ background: '#0e0e0e' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
        <div>
          <h3 className="font-display font-black text-xl uppercase text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{title}</h3>
          <p className="text-white/30 text-xs mt-0.5">{file}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end max-w-sm">
          {changes.map((c, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(220,38,38,0.15)', color: '#EF4444' }}>+ {c}</span>
          ))}
        </div>
      </div>
      {/* Panels */}
      <div className="grid grid-cols-2 divide-x divide-white/6">
        <div className="relative p-5">
          <PanelLabel text="Actuel" type="before" />
          {before}
        </div>
        <div className="relative p-5">
          <PanelLabel text="Amélioré" type="after" />
          {after}
        </div>
      </div>
    </div>
  )
}

// ── COMP 1 : BeforeAfter slider ───────────────────────────────────────────────
function CompBeforeAfter() {
  // Current version
  const [posA, setPosA] = useState(50)
  const refA = useRef<HTMLDivElement>(null)

  // Improved version
  const [posB, setPosB] = useState(50)
  const [dragB, setDragB] = useState(false)
  const [autoB, setAutoB] = useState(true)
  const refB = useRef<HTMLDivElement>(null)
  const rafB = useRef<number>(0)
  const dirB = useRef(1)
  const shineCtrl = useAnimation()

  useEffect(() => {
    if (!autoB) { cancelAnimationFrame(rafB.current); return }
    const tick = () => {
      setPosB(p => {
        let n = p + dirB.current * 0.3
        if (n >= 92) { dirB.current = -1; n = 92 }
        if (n <= 8)  { dirB.current =  1; n = 8 }
        return n
      })
      rafB.current = requestAnimationFrame(tick)
    }
    rafB.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafB.current)
  }, [autoB])

  // Shine sweep on direction change
  useEffect(() => {
    shineCtrl.start({ x: ['−100%', '200%'], opacity: [0, 0.4, 0], transition: { duration: 0.8 } })
  }, [dirB.current])

  const IMG_B = '/images/before-1.png'
  const IMG_A = '/images/after-1.png'

  return (
    <SideBySide
      title="Section Avant/Après"
      file="BeforeAfter.tsx"
      changes={['Divider liquide', 'Handle animé', 'Mode auto', 'Shine sweep', 'Transition fluide']}
      before={
        <div className="space-y-3">
          {/* Exact current component */}
          <div ref={refA} className="relative w-full rounded-xl overflow-hidden select-none cursor-col-resize"
            style={{ aspectRatio: '16/10' }}
            onMouseMove={e => {
              if (!refA.current) return
              const r = refA.current.getBoundingClientRect()
              setPosA(Math.max(5, Math.min(95, ((e.clientX - r.left) / r.width) * 100)))
            }}>
            <img src={IMG_A} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - posA}% 0 0)` }}>
              <img src={IMG_B} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide"
                style={{ background: 'rgba(12,12,12,0.8)' }}>Avant</div>
            </div>
            {/* White divider — current */}
            <div className="absolute inset-y-0 bg-white shadow-xl pointer-events-none" style={{ left: `${posA}%`, width: 2 }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center"
                style={{ border: '2px solid rgba(220,38,38,0.2)' }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="#111" strokeWidth="1.5" width="14"><path d="M8 4l-4 6 4 6M12 4l4 6-4 6"/></svg>
              </div>
            </div>
            <div className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide"
              style={{ background: 'rgba(220,38,38,0.9)' }}>Après</div>
            <div className="absolute bottom-3 left-3 text-white text-xs px-2 py-1 rounded"
              style={{ background: 'rgba(12,12,12,0.7)' }}>Longueuil · Garage double</div>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 justify-center">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-14 h-10 rounded-lg overflow-hidden" style={{ opacity: i === 1 ? 1 : 0.4, outline: i === 1 ? '2px solid #DC2626' : 'none' }}>
                <img src={`/images/after-${i}.png`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs text-center">Divider blanc · Handle basique · Pas d'auto</p>
        </div>
      }
      after={
        <div className="space-y-3">
          <div ref={refB} className="relative w-full rounded-xl overflow-hidden select-none"
            style={{ aspectRatio: '16/10', cursor: dragB ? 'grabbing' : 'ew-resize' }}
            onMouseMove={e => {
              if (!refB.current || autoB) return
              const r = refB.current.getBoundingClientRect()
              setPosB(Math.max(3, Math.min(97, ((e.clientX - r.left) / r.width) * 100)))
            }}
            onMouseDown={() => { setAutoB(false); setDragB(true) }}
            onMouseUp={() => setDragB(false)}
          >
            <img src={IMG_A} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />

            {/* Before clip */}
            <div className="absolute inset-0"
              style={{ clipPath: `polygon(0 0, ${posB}% 0, calc(${posB}% + 1.5%) 50%, ${posB}% 100%, 0 100%)` }}>
              <img src={IMG_B} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />
            </div>

            {/* Shine on direction change */}
            <motion.div animate={shineCtrl} className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)' }} />

            {/* Liquid divider */}
            <div className="absolute inset-0 pointer-events-none z-10"
              style={{ left: `${posB}%`, position: 'absolute', top: 0, bottom: 0, width: 0 }}>
              <svg style={{ position: 'absolute', left: -12, top: 0, width: 24, height: '100%' }} viewBox="0 0 24 200" preserveAspectRatio="none">
                <path d="M12,0 C8,40 16,80 12,120 C8,160 16,180 12,200 L24,200 L24,0 Z" fill="rgba(220,38,38,0.7)" />
                <path d="M12,0 C8,40 16,80 12,120 C8,160 16,180 12,200" stroke="#DC2626" strokeWidth="1.5" fill="none" opacity="0.9" />
              </svg>
              {/* Animated handle */}
              <motion.div
                animate={{ scale: dragB ? 1.2 : autoB ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 1.5, repeat: autoB ? Infinity : 0 }}
                className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-20"
                style={{
                  left: -22,
                  background: 'linear-gradient(135deg, #DC2626, #7f1d1d)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 0 20px rgba(220,38,38,0.6), 0 4px 16px rgba(0,0,0,0.5)',
                }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" width="10"><path d="M5 8H1M15 8h-4M5 5l-3 3 3 3M11 5l3 3-3 3"/></svg>
              </motion.div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-white text-[10px] font-bold uppercase">Avant</span>
            </div>
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-white text-[10px] font-bold uppercase">Après</span>
            </div>

            {/* Auto btn */}
            <button onClick={() => setAutoB(a => !a)}
              className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-lg text-[10px] font-bold"
              style={{ background: autoB ? '#DC2626' : 'rgba(0,0,0,0.6)', color: 'white', backdropFilter: 'blur(8px)' }}>
              {autoB ? '⏸ Auto' : '▶ Auto'}
            </button>
          </div>

          <div className="flex gap-2 justify-center">
            {[1,2,3,4,5].map(i => (
              <motion.div key={i} whileHover={{ scale: 1.1 }}
                className="w-14 h-10 rounded-lg overflow-hidden cursor-pointer"
                style={{ border: i === 1 ? '2px solid #DC2626' : '2px solid transparent', opacity: i === 1 ? 1 : 0.5 }}>
                <img src={`/images/after-${i}.png`} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center">Divider vague · Handle rouge animé · Mode auto</p>
        </div>
      }
    />
  )
}

// ── COMP 2 : Process timeline ─────────────────────────────────────────────────
function CompProcess() {
  const [revealedAfter, setRevealedAfter] = useState<Set<number>>(new Set())
  const [dropping, setDropping] = useState<number | null>(null)

  const steps = [
    { num: '01', time: '8h00', title: 'Inspection', icon: '🔍', color: false },
    { num: '02', time: '8h30', title: 'Meulage', icon: '⚙️', color: false },
    { num: '03', time: '10h', title: 'Base Coat', icon: '🪣', color: true },
    { num: '04', time: '11h', title: 'Flocons', icon: '✨', color: false },
    { num: '05', time: '12h30', title: 'Top Coat', icon: '🛡️', color: false },
  ]

  async function triggerDrop(i: number) {
    const next = revealedAfter.size
    if (i !== next || dropping !== null) return
    setDropping(i)
    await new Promise(r => setTimeout(r, 650))
    setRevealedAfter(prev => new Set(prev).add(i))
    setDropping(null)
  }

  return (
    <SideBySide
      title="Section Notre Processus"
      file="Process.tsx"
      changes={['Goutte animée', 'Clip reveal', 'Ligne de progression', 'Ordre interactif']}
      before={
        <div className="space-y-3">
          <div className="relative pl-6">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
            {steps.map((s, i) => (
              <div key={i} className="relative flex gap-4 mb-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center z-10"
                  style={{ background: s.color ? '#DC2626' : 'white', border: s.color ? 'none' : '2px solid #e5e7eb' }}>
                  <span className="text-[9px] opacity-60" style={{ color: s.color ? 'rgba(255,255,255,0.8)' : '#374151' }}>{s.time}</span>
                  <span className="font-display font-black text-sm leading-none" style={{ color: s.color ? 'white' : '#111', fontFamily: 'Barlow Condensed, sans-serif' }}>{s.num}</span>
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                  <p className="font-display font-black text-sm uppercase text-gray-900" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{s.icon} {s.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">Étape de l'installation professionnelle.</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs text-center">CSS fade · Pas d'interaction · Timeline statique</p>
        </div>
      }
      after={
        <div className="space-y-3">
          <div className="relative pl-6">
            {/* Progress line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <motion.div className="absolute left-3 top-2 w-0.5 origin-top"
              style={{ background: 'linear-gradient(180deg, #DC2626, #7f1d1d)' }}
              animate={{ height: `${(revealedAfter.size / steps.length) * 94}%` }}
              transition={{ duration: 0.4 }} />

            {steps.map((s, i) => {
              const isRevealed = revealedAfter.has(i)
              const isNext = i === revealedAfter.size
              return (
                <div key={i} className="relative flex gap-4 mb-3 cursor-pointer" onClick={() => triggerDrop(i)}>
                  {/* Drop */}
                  <AnimatePresence>
                    {dropping === i && (
                      <motion.div key="d" initial={{ y: -30, opacity: 1 }} animate={{ y: 26, opacity: 1 }} exit={{ scaleX: 2, scaleY: 0.1, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute left-1 -top-6 z-30 w-3 h-5 rounded-b-full rounded-t-full"
                        style={{ background: '#DC2626', boxShadow: '0 0 10px #DC2626' }} />
                    )}
                  </AnimatePresence>
                  {/* Splash */}
                  <AnimatePresence>
                    {isRevealed && !revealedAfter.has(i - 1) && [...Array(2)].map((_, r) => (
                      <motion.div key={r} initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 2.5 + r, opacity: 0 }}
                        transition={{ duration: 0.4, delay: r * 0.06 }}
                        className="absolute left-1 top-6 z-20 w-6 h-6 rounded-full border border-[#DC2626]"
                        style={{ marginLeft: -6, marginTop: -3 }} />
                    ))}
                  </AnimatePresence>

                  <motion.div className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center z-10"
                    animate={{
                      background: isRevealed ? '#DC2626' : isNext ? 'rgba(220,38,38,0.12)' : '#1a1a1a',
                      borderColor: isNext ? 'rgba(220,38,38,0.5)' : 'rgba(255,255,255,0.08)',
                    }}
                    style={{ border: '1.5px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-[9px] text-white/50">{s.time}</span>
                    <span className="font-display font-black text-sm text-white leading-none" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{s.num}</span>
                  </motion.div>

                  <motion.div className="flex-1 rounded-xl overflow-hidden relative min-h-[52px]"
                    style={{ background: isRevealed ? 'rgba(127,29,29,0.1)' : '#1a1a1a', border: `1.5px solid ${isRevealed ? 'rgba(220,38,38,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
                    <motion.div
                      initial={{ clipPath: 'circle(0% at 16px 50%)' }}
                      animate={{ clipPath: isRevealed ? 'circle(200% at 16px 50%)' : 'circle(0% at 16px 50%)' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 p-3 flex items-center gap-2">
                      <span className="text-xl">{s.icon}</span>
                      <p className="font-display font-black text-sm uppercase text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{s.title}</p>
                    </motion.div>
                    <AnimatePresence>
                      {!isRevealed && (
                        <motion.div exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/15 text-[10px] uppercase tracking-widest">{isNext ? '💧 Cliquer' : `Étape ${s.num}`}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )
            })}
          </div>
          <p className="text-white/40 text-xs text-center">Goutte animée · Clip reveal · Cliquer dans l'ordre</p>
        </div>
      }
    />
  )
}

// ── COMP 3 : Color selector ───────────────────────────────────────────────────
function CompColorSelector() {
  const FLAKES_SAMPLE = [
    'FB-932_MAGMA_PILE',
    'F9202_CARBON_PILE',
    'FB-330_POLAR_PILE',
    'FB-703_FOG_PILE',
    'FB-508_STINGER_PILE',
    'FB-908_STARGAZER_PILE',
  ]

  // Before: instant swap
  const [beforeFlake, setBeforeFlake] = useState(FLAKES_SAMPLE[0])

  // After: sweep
  const [afterCurrent, setAfterCurrent] = useState(FLAKES_SAMPLE[0])
  const [afterNext, setAfterNext] = useState<string | null>(null)
  const [sweeping, setSweeping] = useState(false)
  const sweepCtrl = useAnimation()

  async function pickAfter(flake: string) {
    if (sweeping || flake === afterCurrent) return
    setSweeping(true)
    setAfterNext(flake)
    sweepCtrl.set({ x: '-110%' })
    await sweepCtrl.start({ x: '110%', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } })
    setAfterCurrent(flake)
    setAfterNext(null)
    setSweeping(false)
  }

  const FlakeGrid = ({ selected, onSelect, instant }: { selected: string; onSelect: (f: string) => void; instant?: boolean }) => (
    <div className="grid grid-cols-3 gap-1.5 mt-3">
      {FLAKES_SAMPLE.map(f => (
        <button key={f} onClick={() => onSelect(f)}
          className="relative rounded-lg overflow-hidden"
          style={{ height: 52, border: `2px solid ${selected === f ? '#DC2626' : 'transparent'}` }}>
          <img src={`/flakes/${f}.avif`} alt="" className="w-full h-full object-cover" />
          {instant && selected === f && (
            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <svg viewBox="0 0 10 10" fill="none" stroke="#DC2626" strokeWidth="1.5" width="8"><path d="M2 5l2 2 4-4"/></svg>
            </div>
          )}
        </button>
      ))}
    </div>
  )

  return (
    <SideBySide
      title="Sélecteur 137 Couleurs Torginol"
      file="ColorSelector.tsx"
      changes={['Vague de résine', 'Transition fluide', 'Effet époxy visuel']}
      before={
        <div>
          <div className="relative rounded-xl overflow-hidden" style={{ height: 160 }}>
            <img src={`/flakes/${beforeFlake}.avif`} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
            <div className="absolute bottom-3 left-3">
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Sélectionné</p>
              <p className="font-display font-black text-lg text-white uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{flakeLabel(beforeFlake)}</p>
            </div>
          </div>
          <FlakeGrid selected={beforeFlake} onSelect={setBeforeFlake} instant />
          <p className="text-white/20 text-[10px] text-center mt-2">Swap instantané · Pas de transition</p>
        </div>
      }
      after={
        <div>
          <div className="relative rounded-xl overflow-hidden" style={{ height: 160 }}>
            <img src={`/flakes/${afterCurrent}.avif`} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

            {/* Sweep overlay */}
            <AnimatePresence>
              {afterNext && (
                <motion.div key={afterNext} animate={sweepCtrl} className="absolute inset-0 z-10">
                  <img src={`/flakes/${afterNext}.avif`} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                  {/* Wave edge */}
                  <svg className="absolute right-0 top-0 h-full z-20" style={{ width: 60, right: -1 }} viewBox="0 0 60 200" preserveAspectRatio="none">
                    <path d="M50,0 C30,40 60,80 40,120 C20,160 50,180 50,200 L60,200 L60,0 Z" fill="rgba(255,255,255,0.04)" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-3 left-3 z-20">
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Sélectionné</p>
              <motion.p key={afterCurrent} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                className="font-display font-black text-lg text-white uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                {flakeLabel(afterCurrent)}
              </motion.p>
            </div>
          </div>
          <FlakeGrid selected={afterCurrent} onSelect={pickAfter} />
          <p className="text-white/40 text-[10px] text-center mt-2">Vague de résine · Transition fluide · On-brand</p>
        </div>
      }
    />
  )
}

// ── COMP 4 : Testimonials ─────────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Marc-André Tremblay', city: 'Longueuil', title: 'Service impeccable', text: 'Équipe professionnelle, résultat époustouflant. Mon garage est méconnaissable.', type: 'Garage double' },
  { name: 'Sophie Gagnon-Roy',   city: 'Brossard',   title: 'Wow au premier regard', text: 'Installé en une journée. Le lendemain matin j\'ai garé ma voiture dessus.', type: 'Garage simple' },
  { name: 'Jean-François Côté',  city: 'Laval',      title: 'Qualité top', text: 'Après 3 hivers, aucune fissure, aucun pelage. La garantie vaut vraiment quelque chose.', type: 'Garage double' },
]

function CompTestimonials() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <SideBySide
      title="Section Témoignages"
      file="Testimonials.tsx"
      changes={['Stagger reveal', 'Shimmer on hover', 'Quote flottante', 'Glow étoiles']}
      before={
        <div className="space-y-3">
          {/* Featured — current style (white bg) */}
          <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute top-4 right-5 opacity-10">
              <svg viewBox="0 0 40 30" fill="#DC2626" width="40"><path d="M0 30V18C0 8 6 2 18 0l2 4C12 5 8 9 8 18h8v12H0zm22 0V18c0-10 6-16 18-18l2 4c-8 1-12 5-12 14h8v12H22z"/></svg>
            </div>
            <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_,j) => <Star key={j} className="w-4 h-4 fill-[#DC2626] text-[#DC2626]" />)}</div>
            <p className="font-display font-black text-base uppercase text-white mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{REVIEWS[0].title}</p>
            <p className="text-white/50 text-xs leading-relaxed mb-3">{REVIEWS[0].text}</p>
            <div className="border-t border-white/8 pt-3 flex justify-between">
              <div><p className="text-white text-xs font-bold">{REVIEWS[0].name}</p><p className="text-white/30 text-[10px]">{REVIEWS[0].city} · {REVIEWS[0].type}</p></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {REVIEWS.slice(1).map((r, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_,j) => <Star key={j} className="w-3 h-3 fill-[#DC2626] text-[#DC2626]" />)}</div>
                <p className="font-bold text-gray-900 text-xs mb-1">{r.title}</p>
                <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2">{r.text}</p>
                <p className="text-gray-300 text-[9px] mt-2">{r.name} · {r.city}</p>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-[10px] text-center">CSS fade classique · Pas d'animation hover</p>
        </div>
      }
      after={
        <div className="space-y-3">
          {/* Featured amélioré */}
          <motion.div
            className="rounded-2xl p-5 relative overflow-hidden cursor-pointer"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
            whileHover={{ borderColor: 'rgba(220,38,38,0.4)', background: '#160808' }}
            onHoverStart={() => setHovered(0)}
            onHoverEnd={() => setHovered(null)}
          >
            {/* Floating quote — animée */}
            <motion.div className="absolute top-4 right-5"
              animate={{ y: [0, -4, 0], opacity: [0.12, 0.2, 0.12] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <svg viewBox="0 0 40 30" fill="#DC2626" width="40"><path d="M0 30V18C0 8 6 2 18 0l2 4C12 5 8 9 8 18h8v12H0zm22 0V18c0-10 6-16 18-18l2 4c-8 1-12 5-12 14h8v12H22z"/></svg>
            </motion.div>

            {/* Stars avec glow */}
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, j) => (
                <motion.div key={j} animate={{ filter: hovered === 0 ? 'drop-shadow(0 0 4px #DC2626)' : 'none' }}
                  transition={{ delay: j * 0.05 }}>
                  <Star className="w-4 h-4 fill-[#DC2626] text-[#DC2626]" />
                </motion.div>
              ))}
            </div>

            <p className="font-display font-black text-base uppercase text-white mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{REVIEWS[0].title}</p>
            <p className="text-white/50 text-xs leading-relaxed mb-3">{REVIEWS[0].text}</p>
            <div className="border-t border-white/8 pt-3 flex justify-between">
              <div><p className="text-white text-xs font-bold">{REVIEWS[0].name}</p><p className="text-white/30 text-[10px]">{REVIEWS[0].city} · {REVIEWS[0].type}</p></div>
            </div>

            {/* Shimmer au hover */}
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent, rgba(220,38,38,0.06), transparent)' }}
              animate={hovered === 0 ? { x: ['-100%', '200%'] } : {}}
              transition={{ duration: 0.8, ease: 'easeInOut' }} />
          </motion.div>

          {/* Grid avec stagger */}
          <div className="grid grid-cols-2 gap-2">
            {REVIEWS.slice(1).map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(220,38,38,0.3)' }}
                className="rounded-xl p-3 cursor-pointer relative overflow-hidden"
                style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}
                onHoverStart={() => setHovered(i + 1)}
                onHoverEnd={() => setHovered(null)}
              >
                <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_,j) => <Star key={j} className="w-3 h-3 fill-[#DC2626] text-[#DC2626]" />)}</div>
                <p className="font-bold text-white text-xs mb-1">{r.title}</p>
                <p className="text-white/40 text-[10px] leading-relaxed line-clamp-2">{r.text}</p>
                <p className="text-white/20 text-[9px] mt-2">{r.name} · {r.city}</p>
                {/* Shimmer */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 + i * 0.5, delay: i * 0.3 }} />
              </motion.div>
            ))}
          </div>
          <p className="text-white/40 text-[10px] text-center">Stagger reveal · Shimmer hover · Quote flottante</p>
        </div>
      }
    />
  )
}

// ── WRAPPER SECTION ───────────────────────────────────────────────────────────
function SectionComparaisons() {
  return (
    <section id="comparaisons" className="min-h-screen pt-14">
      <div className="border-b border-white/6 px-10 py-8 flex items-end justify-between"
        style={{ background: 'linear-gradient(180deg, #111 0%, #0C0C0C 100%)' }}>
        <div className="flex items-end gap-5">
          <span className="font-display font-black leading-none select-none"
            style={{ fontSize: 80, color: 'rgba(255,255,255,0.04)', fontFamily: 'Barlow Condensed, sans-serif' }}>00</span>
          <div className="pb-1">
            <p className="text-[#DC2626] text-xs font-bold uppercase tracking-[0.2em] mb-1">Ton site actuel vs version animée</p>
            <h2 className="font-display font-black text-4xl uppercase text-white leading-none"
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Comparaisons Avant / Après</h2>
          </div>
        </div>
        <div className="pb-1 text-right">
          <p className="text-white/20 text-xs max-w-xs">Gauche = rendu exact de ton site live. Droite = version améliorée. Dis lequel tu veux.</p>
        </div>
      </div>

      <div className="px-10 py-10 space-y-8">
        <CompBeforeAfter />
        <CompProcess />
        <CompColorSelector />
        <CompTestimonials />
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function AnimationLab() {
  const [activeSection, setActiveSection] = useState('concept-1')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.25 }
    )
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-white" style={{ fontFamily: 'Barlow, system-ui, sans-serif' }}>
      <ShowcaseNav active={activeSection} />

      {/* Intro */}
      <div className="pt-14 px-10 py-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-[600px] h-[400px] rounded-full blur-[120px] opacity-8" style={{ background: '#DC2626' }} />
        </div>
        <div className="relative max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#DC2626] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Lab d'animations — Garage Express
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-display font-black text-6xl uppercase leading-none text-white mb-4"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            5 concepts,<br />
            <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)', WebkitTextFillColor: 'transparent' }}>vrais assets,</span><br />
            <span style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>vrai site.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="text-white/40 text-lg max-w-2xl leading-relaxed">
            Chaque concept utilise tes vraies photos, tes vrais flocons Torginol, et le même design que le site live. Tout est interactif.
          </motion.p>
        </div>
      </div>

      {/* Comparaisons avant/après */}
      <SectionComparaisons />

      {/* Concepts détaillés */}
      <div className="divide-y divide-white/5">
        <ConceptBadge n="1" title="Liquid Hero Fill" where="Section Hero — au chargement">
          <ConceptHeroFill />
        </ConceptBadge>

        <ConceptBadge n="2" title="Resin Drop Process" where="Section Notre Processus">
          <ConceptResinDrop />
        </ConceptBadge>

        <ConceptBadge n="3" title="Color Sweep ⭐" where="Sélecteur 137 couleurs Torginol">
          <ConceptColorSweep />
        </ConceptBadge>

        <ConceptBadge n="4" title="Shine Pass Cards" where="Section Avantages — 3 variantes">
          <ConceptShinePass />
        </ConceptBadge>

        <ConceptBadge n="5" title="Liquid Wipe Before/After" where="Section Avant/Après — 5 réalisations">
          <ConceptLiquidWipe />
        </ConceptBadge>
      </div>

      <div className="border-t border-white/5 py-10 px-10 flex items-center justify-between">
        <p className="text-white/20 text-sm">
          <code className="text-[#DC2626]">localhost:3000/animations</code> · Page locale uniquement
        </p>
        <p className="text-white/20 text-sm">Dis lequel tu veux intégrer dans le vrai site →</p>
      </div>
    </div>
  )
}
