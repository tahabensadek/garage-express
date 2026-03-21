'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Shield, Droplets, Thermometer, Zap, Sparkles, Star, ChevronRight } from 'lucide-react'

// ─── LUCIDE ICONS (current) ───────────────────────────────────────────────────
const LUCIDE_ICONS = [
  { Icon: Clock,       label: 'Installé en 1 jour',    desc: 'Nos techniciens arrivent à 8h. Marcher dessus le soir même.', highlight: true  },
  { Icon: Shield,      label: 'Garanti 15 ans',         desc: 'Matériaux ET main-d\'œuvre. Zéro surprise.', highlight: false },
  { Icon: Droplets,    label: '100% imperméable',       desc: 'Huile, calcium, sel de déglaçage — tout essuie.', highlight: false },
  { Icon: Thermometer, label: 'Résiste au gel',          desc: '-40°C à +40°C. Cycles gel/dégel québécois.', highlight: false },
  { Icon: Zap,         label: '5× plus rapide',          desc: 'Polyaspartique vs époxy : cure 5× plus vite.', highlight: false },
  { Icon: Sparkles,    label: '137 couleurs',            desc: 'Catalogue Torginol complet. Flocons sur mesure.', highlight: false },
]

// ─── PHOSPHOR DUOTONE (inline SVG — reproduit exactement le rendu Phosphor) ───
// Principe : couche de fond à 25% opacité + tracé principal à 100%
const PhosphorTimer = ({ color = '#DC2626', size = 28 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
    {/* Fond duotone — circle body à 25% */}
    <circle cx="128" cy="136" r="88" fill={color} opacity="0.25" />
    {/* Couronne du haut */}
    <path d="M96 16h64" stroke={color} strokeWidth="16" strokeLinecap="round" opacity="0.25" />
    {/* Aiguilles */}
    <line x1="128" y1="136" x2="128" y2="92" stroke={color} strokeWidth="16" strokeLinecap="round" />
    <line x1="128" y1="136" x2="164" y2="160" stroke={color} strokeWidth="16" strokeLinecap="round" />
    {/* Cercle extérieur */}
    <circle cx="128" cy="136" r="88" stroke={color} strokeWidth="16" fill="none" />
    {/* Bouton top */}
    <line x1="128" y1="16" x2="128" y2="48" stroke={color} strokeWidth="16" strokeLinecap="round" />
  </svg>
)

const PhosphorShield = ({ color = '#DC2626', size = 28 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
    {/* Corps du shield à 25% */}
    <path d="M40 114.79V56a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8v58.77c0 84.18-71.31 112.07-88 117.89C111.31 226.86 40 199 40 114.79z" fill={color} opacity="0.25" />
    {/* Contour */}
    <path d="M40 114.79V56a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8v58.77c0 84.18-71.31 112.07-88 117.89C111.31 226.86 40 199 40 114.79z" stroke={color} strokeWidth="16" fill="none" />
    {/* Checkmark */}
    <path d="M88 128l32 32 56-56" stroke={color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PhosphorDrop = ({ color = '#DC2626', size = 28 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
    {/* Petite goutte à 25% */}
    <path d="M192 144a64 64 0 0 1-128 0C64 96 128 24 128 24s64 72 64 120z" fill={color} opacity="0.25" />
    {/* Contour grande goutte */}
    <path d="M192 144a64 64 0 0 1-128 0C64 96 128 24 128 24s64 72 64 120z" stroke={color} strokeWidth="16" fill="none" />
    {/* Reflet intérieur */}
    <path d="M108 140c0-20 12-38 12-38" stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.6" />
  </svg>
)

const PhosphorThermo = ({ color = '#DC2626', size = 28 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
    {/* Tube fond à 25% */}
    <rect x="104" y="24" width="48" height="152" rx="24" fill={color} opacity="0.25" />
    {/* Bulbe fond */}
    <circle cx="128" cy="196" r="36" fill={color} opacity="0.25" />
    {/* Mercure (plein) */}
    <rect x="116" y="96" width="24" height="80" rx="4" fill={color} />
    <circle cx="128" cy="196" r="24" fill={color} />
    {/* Contours */}
    <rect x="104" y="24" width="48" height="152" rx="24" stroke={color} strokeWidth="14" fill="none" />
    <circle cx="128" cy="196" r="36" stroke={color} strokeWidth="14" fill="none" />
    {/* Graduations */}
    <line x1="152" y1="80" x2="168" y2="80" stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.5" />
    <line x1="152" y1="112" x2="176" y2="112" stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.5" />
    <line x1="152" y1="144" x2="168" y2="144" stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.5" />
  </svg>
)

const PhosphorLightning = ({ color = '#DC2626', size = 28 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
    {/* Ombre portée à 25% */}
    <path d="M160 16L72 144h72L88 240l128-144h-72z" fill={color} opacity="0.25" />
    {/* Éclair principal */}
    <path d="M152 16L64 144h72L80 240l128-144h-72z" fill={color} />
  </svg>
)

const PhosphorStars = ({ color = '#DC2626', size = 28 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
    {/* Étoile secondaire petite à 25% */}
    <path d="M176 16l8 24 24 8-24 8-8 24-8-24-24-8 24-8z" fill={color} opacity="0.25" />
    <path d="M56 168l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill={color} opacity="0.25" />
    {/* Étoile principale */}
    <path d="M128 32l20 56 56 20-56 20-20 56-20-56-56-20 56-20z" fill={color} />
  </svg>
)

const PHOSPHOR_ICONS = [
  { Svg: PhosphorTimer,     label: 'Installé en 1 jour',    desc: 'Nos techniciens arrivent à 8h. Marcher dessus le soir même.', highlight: true  },
  { Svg: PhosphorShield,    label: 'Garanti 15 ans',         desc: 'Matériaux ET main-d\'œuvre. Zéro surprise.', highlight: false },
  { Svg: PhosphorDrop,      label: '100% imperméable',       desc: 'Huile, calcium, sel de déglaçage — tout essuie.', highlight: false },
  { Svg: PhosphorThermo,    label: 'Résiste au gel',          desc: '-40°C à +40°C. Cycles gel/dégel québécois.', highlight: false },
  { Svg: PhosphorLightning, label: '5× plus rapide',          desc: 'Polyaspartique vs époxy : cure 5× plus vite.', highlight: false },
  { Svg: PhosphorStars,     label: '137 couleurs',            desc: 'Catalogue Torginol complet. Flocons sur mesure.', highlight: false },
]

// ─── CUSTOM SVGs (hand-crafted, on-brand pour une industrie plancher) ─────────
const CustomFloor = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Perspective floor grid */}
    <path d="M4 38L24 14L44 38H4Z" fill="#DC2626" opacity="0.2" />
    <path d="M4 38L24 14L44 38" stroke="#DC2626" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    {/* Grid lines en perspective */}
    <line x1="14" y1="26" x2="34" y2="26" stroke="#DC2626" strokeWidth="1.5" opacity="0.5" />
    <line x1="9"  y1="32" x2="39" y2="32" stroke="#DC2626" strokeWidth="1.5" opacity="0.5" />
    {/* Lignes convergentes */}
    <line x1="24" y1="14" x2="14" y2="38" stroke="#DC2626" strokeWidth="1.2" opacity="0.4" />
    <line x1="24" y1="14" x2="34" y2="38" stroke="#DC2626" strokeWidth="1.2" opacity="0.4" />
    {/* Shine dot */}
    <circle cx="24" cy="20" r="2" fill="#DC2626" opacity="0.7" />
  </svg>
)

const CustomPour = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Seau / récipient */}
    <path d="M10 12L14 36H34L38 12H10Z" fill="#DC2626" opacity="0.2" />
    <path d="M10 12L14 36H34L38 12H10Z" stroke="#DC2626" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Liquide qui coule */}
    <path d="M20 36C20 36 18 40 19 43C20 46 28 46 29 43C30 40 28 36 28 36" fill="#DC2626" opacity="0.6" />
    {/* Vague dans le seau */}
    <path d="M13 20C16 18 20 22 24 20C28 18 32 22 35 20" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
    {/* Poignée */}
    <path d="M16 12C16 8 32 8 32 12" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
)

const CustomCalendar = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Calendrier body */}
    <rect x="6" y="10" width="36" height="32" rx="4" fill="#DC2626" opacity="0.2" />
    <rect x="6" y="10" width="36" height="32" rx="4" stroke="#DC2626" strokeWidth="2.5" />
    {/* Header */}
    <rect x="6" y="10" width="36" height="10" rx="4" fill="#DC2626" opacity="0.5" />
    {/* Pins */}
    <line x1="16" y1="6" x2="16" y2="14" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="6" x2="32" y2="14" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    {/* "1" day number */}
    <text x="24" y="35" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">1</text>
  </svg>
)

const CustomShieldStar = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Shield */}
    <path d="M24 4L8 10V26C8 35 16 42 24 44C32 42 40 35 40 26V10L24 4Z" fill="#DC2626" opacity="0.2" />
    <path d="M24 4L8 10V26C8 35 16 42 24 44C32 42 40 35 40 26V10L24 4Z" stroke="#DC2626" strokeWidth="2.5" strokeLinejoin="round" />
    {/* "15" inside */}
    <text x="24" y="30" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">15</text>
    <text x="24" y="37" textAnchor="middle" fill="#DC2626" fontSize="6.5" fontWeight="700" fontFamily="Barlow, sans-serif" opacity="0.7">ANS</text>
  </svg>
)

const CustomSnowflake = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Axes principaux */}
    <line x1="24" y1="4"  x2="24" y2="44" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="4"  y1="24" x2="44" y2="24" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="8"  y1="8"  x2="40" y2="40" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    <line x1="40" y1="8"  x2="8"  y2="40" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    {/* Branches */}
    {[[24,4],[44,24],[24,44],[4,24]].map(([cx,cy], i) => {
      const angle = i * 90
      return (
        <g key={i} transform={`rotate(${angle} 24 24)`}>
          <line x1="24" y1="4" x2="18" y2="10"  stroke="#DC2626" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="24" y1="4" x2="30" y2="10"  stroke="#DC2626" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="24" y1="12" x2="19" y2="17" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="24" y1="12" x2="29" y2="17" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </g>
      )
    })}
    {/* Centre */}
    <circle cx="24" cy="24" r="3.5" fill="#DC2626" />
  </svg>
)

const CustomPalette = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Palette shape */}
    <path d="M8 24C8 14 15 6 24 6C33 6 40 12 40 20C40 24 37 26 34 26H30C27 26 25 28 25 31C25 38 20 42 16 42C11 42 8 36 8 30V24Z" fill="#DC2626" opacity="0.2" />
    <path d="M8 24C8 14 15 6 24 6C33 6 40 12 40 20C40 24 37 26 34 26H30C27 26 25 28 25 31C25 38 20 42 16 42C11 42 8 36 8 30V24Z" stroke="#DC2626" strokeWidth="2.5" />
    {/* Color dots */}
    <circle cx="18" cy="14" r="3" fill="#DC2626" />
    <circle cx="28" cy="12" r="3" fill="#DC2626" opacity="0.7" />
    <circle cx="36" cy="20" r="3" fill="#DC2626" opacity="0.5" />
    <circle cx="14" cy="30" r="3" fill="#DC2626" opacity="0.4" />
  </svg>
)

const CUSTOM_ICONS = [
  { Svg: CustomCalendar,   label: 'Installé en 1 jour',    desc: 'Nos techniciens arrivent à 8h. Marcher dessus le soir même.', highlight: true  },
  { Svg: CustomShieldStar, label: 'Garanti 15 ans',         desc: 'Matériaux ET main-d\'œuvre. Zéro surprise.', highlight: false },
  { Svg: CustomPour,       label: '100% imperméable',       desc: 'Huile, calcium, sel de déglaçage — tout essuie.', highlight: false },
  { Svg: CustomSnowflake,  label: 'Résiste au gel',          desc: '-40°C à +40°C. Cycles gel/dégel québécois.', highlight: false },
  { Svg: CustomFloor,      label: '5× plus rapide',          desc: 'Polyaspartique vs époxy : cure 5× plus vite.', highlight: false },
  { Svg: CustomPalette,    label: '137 couleurs',            desc: 'Catalogue Torginol complet. Flocons sur mesure.', highlight: false },
]

// ─── CARD GRID ────────────────────────────────────────────────────────────────
type CardMode = 'lucide' | 'phosphor' | 'custom'

const LUCIDE_COMPONENTS = [Clock, Shield, Droplets, Thermometer, Zap, Sparkles]
const PHOSPHOR_COMPONENTS = [PhosphorTimer, PhosphorShield, PhosphorDrop, PhosphorThermo, PhosphorLightning, PhosphorStars]
const CUSTOM_COMPONENTS = [CustomCalendar, CustomShieldStar, CustomPour, CustomSnowflake, CustomFloor, CustomPalette]
const LABELS = LUCIDE_ICONS.map(i => ({ label: i.label, desc: i.desc, highlight: i.highlight }))

function BenefitGrid({ mode }: { mode: CardMode }) {
  const isLucide = mode === 'lucide'
  const icons = isLucide ? LUCIDE_COMPONENTS : mode === 'phosphor' ? PHOSPHOR_COMPONENTS : CUSTOM_COMPONENTS

  return (
    <div className="grid grid-cols-3 gap-4">
      {LABELS.map((item, i) => {
        const IconComp = icons[i]
        return (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          whileHover={{ scale: 1.03, borderColor: 'rgba(220,38,38,0.4)' }}
          className="relative rounded-2xl p-7 overflow-hidden cursor-pointer"
          style={{
            background: item.highlight ? 'rgba(220,38,38,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1.5px solid ${item.highlight ? 'rgba(220,38,38,0.25)' : 'rgba(255,255,255,0.07)'}`,
          }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-y-0 w-28 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', transform: 'skewX(-12deg)' }}
            animate={{ x: ['-200%', '300%'] }}
            transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 + i * 0.5, delay: i * 0.3 }}
          />

          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${item.highlight ? 'bg-[#DC2626]' : 'bg-white/6'}`}>
            {isLucide
              ? <IconComp className={`w-7 h-7 ${item.highlight ? 'text-white' : 'text-[#DC2626]'}`} />
              : <IconComp size={32} color={item.highlight ? '#ffffff' : '#DC2626'} />
            }
          </div>
          <h3 className="font-display font-black text-xl text-white uppercase leading-tight mb-2"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{item.label}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
        )
      })}
    </div>
  )
}

// ─── ICON CLOSEUP COMPARISON ──────────────────────────────────────────────────
function IconCloseup() {
  return (
    <div className="rounded-3xl border border-white/8 overflow-hidden" style={{ background: '#111' }}>
      <div className="grid grid-cols-3 divide-x divide-white/8">
        {/* Header cols */}
        {['Lucide React\n(actuel)', 'Phosphor Duotone\n(npm install)', 'SVG Custom\n(hand-crafted)'].map((t, i) => (
          <div key={i} className="px-6 py-4 border-b border-white/8">
            <p className="text-white/60 text-xs font-bold uppercase tracking-wider whitespace-pre-line">{t}</p>
            {i === 1 && <span className="mt-1 inline-block text-[#DC2626] text-[9px] font-bold uppercase tracking-wider">Recommandé</span>}
            {i === 2 && <span className="mt-1 inline-block text-amber-400 text-[9px] font-bold uppercase tracking-wider">Maximum impact</span>}
          </div>
        ))}
      </div>

      {/* Icon rows */}
      {[
        {
          label: 'Installation rapide',
          lucide: <Clock className="w-8 h-8 text-[#DC2626]" />,
          phosphor: <PhosphorTimer size={32} />,
          custom: <CustomCalendar size={36} />,
        },
        {
          label: 'Garantie',
          lucide: <Shield className="w-8 h-8 text-[#DC2626]" />,
          phosphor: <PhosphorShield size={32} />,
          custom: <CustomShieldStar size={36} />,
        },
        {
          label: 'Imperméable',
          lucide: <Droplets className="w-8 h-8 text-[#DC2626]" />,
          phosphor: <PhosphorDrop size={32} />,
          custom: <CustomPour size={36} />,
        },
        {
          label: 'Résistance thermique',
          lucide: <Thermometer className="w-8 h-8 text-[#DC2626]" />,
          phosphor: <PhosphorThermo size={32} />,
          custom: <CustomSnowflake size={36} />,
        },
        {
          label: 'Performance',
          lucide: <Zap className="w-8 h-8 text-[#DC2626]" />,
          phosphor: <PhosphorLightning size={32} />,
          custom: <CustomFloor size={36} />,
        },
        {
          label: 'Couleurs',
          lucide: <Sparkles className="w-8 h-8 text-[#DC2626]" />,
          phosphor: <PhosphorStars size={32} />,
          custom: <CustomPalette size={36} />,
        },
      ].map((row, i) => (
        <div key={i} className={`grid grid-cols-3 divide-x divide-white/8 ${i < 5 ? 'border-b border-white/5' : ''}`}>
          {[row.lucide, row.phosphor, row.custom].map((icon, j) => (
            <div key={j} className="px-6 py-5 flex items-center gap-5"
              style={{ background: j === 1 ? 'rgba(220,38,38,0.03)' : j === 2 ? 'rgba(251,191,36,0.02)' : 'transparent' }}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${j === 0 ? 'bg-white/5' : j === 1 ? 'bg-[#DC2626]/10' : 'bg-amber-400/8'}`}>
                {icon}
              </div>
              <p className="text-white/40 text-xs leading-tight">{row.label}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function IconsShowcase() {
  const [mode, setMode] = useState<CardMode>('lucide')

  const MODES: { id: CardMode; label: string; sub: string; color: string }[] = [
    { id: 'lucide',   label: 'Lucide React',       sub: 'Actuel sur le site',       color: 'rgba(255,255,255,0.08)' },
    { id: 'phosphor', label: 'Phosphor Duotone',   sub: 'npm install · 2min',        color: '#DC2626' },
    { id: 'custom',   label: 'SVG Custom',          sub: 'Hand-crafted · on-brand',  color: '#d97706' },
  ]

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-white" style={{ fontFamily: 'Barlow, system-ui, sans-serif' }}>

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14 border-b border-white/8"
        style={{ backdropFilter: 'blur(24px)', background: 'rgba(12,12,12,0.9)' }}>
        <a href="/animations" className="text-white/30 text-sm hover:text-white/60 transition-colors flex items-center gap-2">
          ← Animation Lab
        </a>
        <span className="font-display font-black text-lg uppercase text-white tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
          Icon Lab <span className="text-[#DC2626]">·</span> Garage Express
        </span>
        <div className="w-32" />
      </div>

      <div className="pt-14 max-w-6xl mx-auto px-8 py-12 space-y-16">

        {/* Hero */}
        <div className="pt-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[#DC2626] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Convaincre par l'exemple
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            className="font-display font-black text-6xl uppercase leading-none text-white mb-3"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Lucide, c'est correct.<br />
            <span style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Voilà ce que c'est mieux.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
            className="text-white/40 text-lg">
            Tes vraies benefit cards · Switcher entre les 3 versions ci-dessous.
          </motion.p>
        </div>

        {/* Toggle */}
        <div>
          <div className="flex gap-3 mb-10">
            {MODES.map(m => (
              <motion.button key={m.id} onClick={() => setMode(m.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-4 rounded-2xl text-left transition-all border"
                style={{
                  background: mode === m.id ? m.color : 'rgba(255,255,255,0.03)',
                  borderColor: mode === m.id ? (m.id === 'lucide' ? 'rgba(255,255,255,0.15)' : m.id === 'phosphor' ? '#DC2626' : '#d97706') : 'rgba(255,255,255,0.06)',
                }}
              >
                <p className="font-display font-black text-xl uppercase text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{m.label}</p>
                <p className="text-white/40 text-xs mt-0.5">{m.sub}</p>
                {mode === m.id && (
                  <motion.div layoutId="indicator" className="mt-2 w-6 h-1 rounded-full bg-white opacity-60" />
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <BenefitGrid mode={mode} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Closeup comparison */}
        <div>
          <div className="mb-8">
            <p className="text-[#DC2626] text-xs font-bold uppercase tracking-widest mb-2">Comparaison directe icône par icône</p>
            <h2 className="font-display font-black text-4xl uppercase text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              La différence au pixel
            </h2>
          </div>
          <IconCloseup />
        </div>

        {/* Verdict */}
        <div className="grid grid-cols-3 gap-4 pb-16">
          {[
            { title: 'Lucide', verdict: 'Fonctionnel', color: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.08)', pros: ['Déjà installé', 'Cohérent partout', '0 effort'], cons: ['Trop générique', 'Vu partout sur le web', 'Aucune identité de marque'] },
            { title: 'Phosphor Duotone', verdict: 'Recommandé ⭐', color: 'rgba(220,38,38,0.06)', border: 'rgba(220,38,38,0.25)', pros: ['npm install · 2min', 'Duotone = premium immédiat', 'Milliers d\'icônes dispo'], cons: ['Légèrement plus lourd', 'Moins unique que custom'] },
            { title: 'SVG Custom', verdict: 'Maximum impact', color: 'rgba(217,119,6,0.06)', border: 'rgba(217,119,6,0.25)', pros: ['100% unique', 'Lié à l\'industrie', 'Impossible à copier'], cons: ['Demande du temps', 'À refaire si on change de direction visuelle'] },
          ].map((v, i) => (
            <div key={i} className="rounded-2xl p-6 border" style={{ background: v.color, borderColor: v.border }}>
              <h3 className="font-display font-black text-xl uppercase text-white mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{v.title}</h3>
              <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-4">{v.verdict}</p>
              <div className="space-y-1.5 mb-4">
                {v.pros.map(p => <p key={p} className="text-green-400 text-xs flex gap-2"><span>✓</span>{p}</p>)}
              </div>
              <div className="space-y-1.5">
                {v.cons.map(c => <p key={c} className="text-white/30 text-xs flex gap-2"><span>−</span>{c}</p>)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
