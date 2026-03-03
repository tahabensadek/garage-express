'use client'
import { useTranslations } from '@/hooks/useTranslations'

export default function SocialProofBar() {
  const { get } = useTranslations()

  const stats = [
    { value: get('socialProof.stat1'), label: get('socialProof.stat1Label'), sub: get('socialProof.stat1Sub') },
    { value: get('socialProof.stat2'), label: get('socialProof.stat2Label'), sub: get('socialProof.stat2Sub') },
    { value: get('socialProof.stat3'), label: get('socialProof.stat3Label'), sub: get('socialProof.stat3Sub') },
    { value: get('socialProof.stat4'), label: get('socialProof.stat4Label'), sub: get('socialProof.stat4Sub') },
  ]

  return (
    <section className="bg-dark-800 border-y border-white/5 py-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {stats.map((s, i) => (
            <div key={i} className="px-6 py-6 text-center">
              <div className="font-display text-4xl font-black text-primary leading-none mb-1">{s.value}</div>
              <div className="text-white font-semibold text-sm mb-0.5">{s.label}</div>
              <div className="text-white/40 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}