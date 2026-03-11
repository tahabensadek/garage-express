'use client'
import { useState, useEffect, useRef } from 'react'
import { useTranslations, replace } from '@/hooks/useTranslations'
import { Phone, Mail, User, Home, MapPin, MessageSquare, CheckCircle, ArrowRight, Clock, Download, Star, AlertCircle, ChevronDown, Search, Palette, ImagePlus, X } from 'lucide-react'

type FormData = {
  name: string; phone: string; email: string
  garageSize: string; city: string; address: string; cracks: string; message: string
  colorName: string; colorFile: string
}

function AddressAutocomplete({ value, onChange, onCityDetected, fr }: {
  value: string
  onChange: (v: string) => void
  onCityDetected: (city: string) => void
  fr: boolean
}) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInput = (val: string) => {
    onChange(val)
    if (timer.current) clearTimeout(timer.current)
    if (val.length < 4) { setSuggestions([]); setOpen(false); return }
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&addressdetails=1&countrycodes=ca&limit=5&accept-language=${fr ? 'fr' : 'en'}&viewbox=-79.76,62.58,-57.10,44.99&bounded=0`,
          { headers: { 'Accept-Language': fr ? 'fr' : 'en' } }
        )
        const data = await res.json()
        setSuggestions(data)
        setOpen(data.length > 0)
      } catch { setSuggestions([]); setOpen(false) }
    }, 450)
  }

  const select = (item: any) => {
    const addr = item.address
    const number = addr.house_number || ''
    const street = addr.road || addr.pedestrian || ''
    const city = addr.city || addr.town || addr.village || addr.municipality || ''
    const formatted = [number, street].filter(Boolean).join(' ')
    onChange(formatted || item.display_name.split(',')[0])
    if (city) onCityDetected(city)
    setSuggestions([])
    setOpen(false)
  }

  const formatSuggestion = (item: any) => {
    const addr = item.address
    const number = addr.house_number || ''
    const street = addr.road || addr.pedestrian || ''
    const city = addr.city || addr.town || addr.village || addr.municipality || ''
    const province = addr.state || ''
    return {
      main: [number, street].filter(Boolean).join(' ') || item.display_name.split(',')[0],
      sub: [city, province].filter(Boolean).join(', '),
    }
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
        <input
          type="text"
          value={value}
          onChange={e => handleInput(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
          placeholder={fr ? '123 Rue des Érables' : '123 Maple Street'}
          autoComplete="off"
        />
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((item, i) => {
            const { main, sub } = formatSuggestion(item)
            return (
              <button
                key={i}
                type="button"
                onClick={() => select(item)}
                className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-dark text-sm">{main}</div>
                  <div className="text-gray-400 text-xs">{sub}</div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

const ALL_FLAKES = [
  'F3080_LANAI_GRAY_PILE','F9202_CARBON_PILE','F9203_FELDSPAR_PILE','F9205_SABLE_PILE',
  'F9303_PUMICE_PILE','F9304_OBSIDIAN_PILE','F9305_GARNET_PILE','F9307_SCHIST_PILE',
  'F9309_BASALT_PILE','F9311_DOLERITE_PILE','F9313_SPILITE_PILE','F9317_METAPELITE_PILE',
  'F9318_ARKOSE_PILE','F9319_TALUS_PILE','F9320_SOAPSTONE_PILE','FB-1005_BIRCH_BARK_PILE',
  'FB-127_CABIN_FEVER_PILE','FB-130_CANNOLI_PILE','FB-310_ORBIT_PILE','FB-320_CROSSBOW_PILE',
  'FB-330_POLAR_PILE','FB-411_DOMINO_PILE','FB-414_GRAVEL_PILE','FB-421_SHORELINE_PILE',
  'FB-424_QUICKSILVER_PILE','FB-427_STONEHENGE_PILE','FB-504_SAFARI_PILE','FB-506_RAPIDS_PILE',
  'FB-507_REED_PILE','FB-508_STINGER_PILE','FB-509_PRAIRIE_PILE','FB-513_COYOTE_PILE',
  'FB-514_NORDIC_GREEN_PILE','FB-516_WOODLAND_PILE','FB-517_OUTBACK_PILE','FB-6001_BLIZZARD_PILE',
  'FB-6002_SYCAMORE_PILE','FB-6003_WEATHERED_GRAY_PILE-2','FB-602_SNOWFALL_PILE','FB-608_SUBMARINE_PILE',
  'FB-609_MORNING_DEW_PILE','FB-612_SWAN_PILE','FB-613_TRAILMIX_PILE','FB-616_WOMBAT_PILE',
  'FB-703_FOG_PILE','FB-704_ARCTIC_PILE','FB-706_MADRAS_PILE','FB-708_STONEWASH_PILE',
  'FB-711_COMET_PILE','FB-712_OASIS_PILE','FB-713_KEYSTONE_PILE','FB-714_MUSHROOM_PILE',
  'FB-715_NIGHTFALL_PILE','FB-716_CREEKBED_PILE','FB-720_STEELCUT_1.4','FB-721_SUMMIT_1.4',
  'FB-722_AVALANCH_1.4','FB-723_BURROW_1.4','FB-724_OSPREY_1.4','FB-725_BRICKYARD_1.4',
  'FB-726_ANVIL_1.4','FB-801_ROCKY_RIDGE_PILE','FB-802_SEA_MIST_PILE','FB-803_SEA_CREST_PILE',
  'FB-806_STONY_CREEK_PILE','FB-807_TIDAL_WAVE_PILE','FB-811_KOALA_PILE','FB-817_COLONIAL_PILE',
  'FB-818_VICTORIAN_PILE','FB-823_DOVETAIL_PILE','FB-901_OPAL_PILE','FB-902_SIBERIAN_PILE',
  'FB-903_SILVER_BELLS_PILE','FB-904_LUNAR_PILE','FB-905_FEATHER_GRAY_PILE','FB-906_MOON_MIST_PILE',
  'FB-907_GALAXY_PILE','FB-908_STARGAZER_PILE','FB-909_TIMBERWOLF_PILE','FB-910_HOUNDSTOOTH_PILE',
  'FB-911_WILD_DOVE_PILE','FB-912_THUNDER_PILE','FB-913_SHADOW_PILE','FB-914_GARGOYLE_PILE',
  'FB-915_RAVEN_PILE','FB-916_GRACIOUS_1.4','FB-917_FULL_MOON_PILE','FB-918_CAPRICORN_PILE',
  'FB-919_WOVEN_PILE','FB-920_SUAVE_PILE','FB-921_WATER_LILY_PILE','FB-922_NIMBUS_PILE',
  'FB-923_JAVA_PILE','FB-924_MOOSE_PILE','FB-925_CAST_IRON_PILE','FB-926_CELESTIAL_PILE',
  'FB-927_JUNIPER_PILE','FB-928_AVIATOR_PILE','FB-929_CURRENT_PILE','FB-930_FROSTBITE_PILE',
  'FB-931_SEDUM_PILE','FB-932_MAGMA_PILE','FB-933_SMOKEY_BLUE_PILE','FB-934_BLACK_ICE_PILE',
  'FB-935_CARDAMOM_PILE','FB-936_MERCURY_PILE','FB-937_SLALOM_PILE','FB-938_SPROUT_PILE',
  'FB-939_CARAWAY_PILE','FB-940_GLACIAL_PILE','FB-941_BRAMBLE_PILE','FB-942_MAGNOLIA_PILE',
  'FB-943_LAPIS_PILE','FB-944_RAINSTORM_PILE','FB-945_KISMET_PILE','FB-946_VOLTAGE_PILE',
  'FB-947_CHICORY_PILE','FB-948_FIG_PILE','FB-951_SAND_DOLLAR_PILE','FB-954_BUFFALO_PILE',
  'FB-959_BAMBI_PILE','FB-966_LOON_PILE','FB-967_CHICKADEE_PILE','FB-968_WAXWING_PILE',
  'FB-969_ROSY_FINCH_PILE','FB-970_WREN_PILE','FB-971_MERINO_PILE','FB-972_SPARROW_PILE',
  'FB-973_ROBIN_PILE','FB-974_QUAIL_PILE','FB-975_WOODPECKER_PILE','FB-976_HERON_PILE',
  'FB-977_THYME_PILE','FB-978_CITRINE_PILE','FB-979_MOREL_PILE','FB-980-DINGO_PILE','FB-981_CHENILLE_PILE',
]

function flakeLabel(file: string) {
  return file
    .replace(/_PILE.*$/, '')
    .replace(/_1\.4$/, '')
    .replace(/^[A-Z]+-\d+-/, '')
    .replace(/^[A-Z]+[\d-]+_/, '')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}

function ColorPicker({ value, onChange, fr }: { value: string, onChange: (file: string, name: string) => void, fr: boolean }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = ALL_FLAKES.filter(f =>
    flakeLabel(f).toLowerCase().includes(search.toLowerCase())
  )

  const selectedLabel = value ? flakeLabel(value) : null

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
          open ? 'border-primary' : 'border-gray-200 hover:border-primary/40'
        }`}
      >
        {value ? (
          <>
            <img src={`/flakes/${value}.avif`} alt={selectedLabel!} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-gray-200" />
            <span className="font-semibold text-dark text-sm flex-1">{selectedLabel}</span>
          </>
        ) : (
          <>
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Palette className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-gray-400 text-sm flex-1">{fr ? 'Choisir une couleur (optionnel)' : 'Choose a color (optional)'}</span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={fr ? 'Rechercher...' : 'Search...'}
                className="flex-1 bg-transparent text-sm text-dark outline-none placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>

          {/* Grid */}
          <div className="overflow-y-auto max-h-72 p-3">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {filtered.map(file => {
                const label = flakeLabel(file)
                const selected = value === file
                return (
                  <button
                    key={file}
                    type="button"
                    onClick={() => { onChange(file, label); setOpen(false); setSearch('') }}
                    className={`flex flex-col items-center gap-1.5 p-1.5 rounded-xl transition-all ${
                      selected ? 'bg-primary/10 ring-2 ring-primary' : 'hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={`/flakes/${file}.avif`}
                      alt={label}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    />
                    <span className="text-[9px] text-center text-gray-600 leading-tight line-clamp-2 font-medium w-full">
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-6">{fr ? 'Aucun résultat' : 'No results'}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function LeadForm() {
  const { get, locale } = useTranslations()
  const fr = locale !== 'en'
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>({
    name: '', phone: '', email: '', garageSize: '', city: '', address: '', cracks: '', message: '',
    colorName: '', colorFile: '',
  })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<File[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const set = (k: keyof FormData, v: string) => setData(prev => ({ ...prev, [k]: v }))
  
  const step1ok = data.name.trim() && data.email.trim()
  const step2ok = data.garageSize && data.city.trim() && data.cracks
  const step3ok = data.phone.trim()

  const formatPhone = (val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 10)
    if (nums.length <= 3) return nums
    if (nums.length <= 6) return `${nums.slice(0, 3)}-${nums.slice(3)}`
    return `${nums.slice(0, 3)}-${nums.slice(3, 6)}-${nums.slice(6)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!step3ok) return
    setLoading(true)
    
    try {
      let photoUrls: string[] = []
      if (photos.length > 0) {
        try {
          const form = new FormData()
          photos.forEach(p => form.append('photos', p))
          const uploadRes = await fetch('/api/upload', { method: 'POST', body: form })
          const uploadData = await uploadRes.json()
          photoUrls = uploadData.urls || []
        } catch {
          // photos non-blocking — continue without them
        }
      }

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, photoUrls }),
      })
      if (!res.ok) throw new Error('Erreur envoi')
      setDone(true)
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion', { send_to: 'AW-17940446235/P5y4CPb31YIcEJv41epC' })
      }
    } catch (err) {
      alert(get('leadForm.errorAlert'))
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <section id="soumission" className="py-24 bg-dark">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display text-5xl font-black text-white uppercase mb-4">{get('leadForm.confirmationTitle')}</h2>
        <p 
          className="text-white/80 text-lg mb-8"
          dangerouslySetInnerHTML={{ 
            __html: replace(get('leadForm.confirmationText'), { name: data.name, phone: data.phone }) 
          }}
        />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-8">
          <div className="text-white/40 text-xs mb-4 uppercase tracking-widest font-semibold">{get('leadForm.recapTitle')}</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-white/60 text-sm">{get('leadForm.recapForfait')}</span>
              <span className="text-white font-bold">{data.garageSize}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-white/60 text-sm">{get('leadForm.recapVille')}</span>
              <span className="text-white font-bold">{data.city}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">{get('leadForm.recapFissures')}</span>
              <span className="text-white font-bold">{data.cracks}</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-white mb-2">{get('leadForm.giftTitle')}</h3>
              <p className="text-white/60 text-sm mb-4">{get('leadForm.giftText')}</p>
              <a href="/guide-couleurs.pdf" target="_blank"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
                <Download className="w-4 h-4" />
                {get('leadForm.giftCta')}
              </a>
            </div>
          </div>
        </div>

        <a href="tel:5148248618" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all">
          <Phone className="w-5 h-5" /> {get('leadForm.callNow')}
        </a>
      </div>
    </section>
  )

  return (
    <section id="soumission" className="py-24 bg-dark noise relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          
          <div className="reveal">
            <div className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {get('leadForm.badge')}
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-6">
              {get('leadForm.title')}
              <span className="block text-gradient">{get('leadForm.titleHighlight')}</span>
            </h2>
            <p 
              className="text-white/60 text-lg leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: get('leadForm.subtitle') }}
            />

            <div className="space-y-4 mb-10">
              {[
                { icon: Clock, title: get('leadForm.reason1'), desc: get('leadForm.reason1Desc') },
                { icon: CheckCircle, title: get('leadForm.reason2'), desc: get('leadForm.reason2Desc') },
                { icon: Phone, title: get('leadForm.reason3'), desc: get('leadForm.reason3Desc') },
              ].map(({icon: Icon, title, desc}, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{title}</div>
                    <div className="text-white/40 text-xs">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 border border-primary/25 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-3 h-3 flex-shrink-0">
                  <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                  <span className="relative w-3 h-3 bg-primary rounded-full block" />
                </div>
                <span className="font-bold text-white text-sm">{get('leadForm.urgency')}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed pl-6">
                {get('leadForm.urgencyDesc')}
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-white/60 text-sm mb-3">{get('leadForm.callOption')}</div>
              <a href="tel:5148248618"
                className="inline-flex items-center gap-2 bg-white text-dark hover:bg-gray-100 font-bold px-6 py-3 rounded-xl text-sm transition-all">
                <Phone className="w-4 h-4" /> {get('leadForm.callCta')}
              </a>
            </div>

            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map(n => (
                <div key={n} className="flex items-center gap-2 flex-1">
                  <div className={`h-2 rounded-full transition-all flex-1 ${
                    step >= n ? 'bg-primary' : 'bg-white/10'
                  }`} />
                  {n < 3 && <div className="w-2 h-2 rounded-full bg-white/10" />}
                </div>
              ))}
            </div>
            <div className="text-white/40 text-xs text-center mb-6">
              {get('leadForm.step')} {step} / 3 — {step === 1 ? get('leadForm.step1Label') : step === 2 ? get('leadForm.step2Label') : get('leadForm.step3Label')}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/30">
              <form onSubmit={handleSubmit}>
                
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <User className="w-4 h-4 text-primary" /> {get('leadForm.name')} *
                      </label>
                      <input type="text" required value={data.name}
                        onChange={e => set('name', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                        placeholder={get('leadForm.namePlaceholder')}
                        autoComplete="name" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <Mail className="w-4 h-4 text-primary" /> {get('leadForm.email')} *
                      </label>
                      <input type="email" required value={data.email}
                        onChange={e => set('email', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                        placeholder={get('leadForm.emailPlaceholder')}
                        autoComplete="email" />
                      <div className="text-gray-400 text-xs mt-1.5">{get('leadForm.emailHelp')}</div>
                    </div>
                    <button type="button" onClick={() => step1ok && setStep(2)} disabled={!step1ok}
                      className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl text-base transition-all flex items-center justify-center gap-2">
                      {get('leadForm.continue')} <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span>5/5 Google</span>
                      </div>
                      <span>•</span>
                      <span>{get('leadForm.trustReviews')}</span>
                      <span>•</span>
                      <span>{get('leadForm.trustResponse')}</span>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <Home className="w-4 h-4 text-primary" /> {get('leadForm.garageSize')} *
                      </label>
                      <div className="space-y-3">
                        {[
                          { val: get('hero.priceSimple'), price: '2 749,99$', sub: get('pricing.simpleTagline') },
                          { val: get('hero.priceDouble'), price: '4 449,99$', sub: get('pricing.doubleTagline') },
                        ].map((opt) => (
                          <button type="button" key={opt.val}
                            onClick={() => set('garageSize', opt.val)}
                            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                              data.garageSize === opt.val
                                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                : 'border-gray-200 hover:border-primary/40'
                            }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-bold text-dark text-sm">{opt.val.split('(')[0]}</div>
                                <div className="text-gray-400 text-xs">{opt.sub}</div>
                              </div>
                              <div className="font-display font-black text-primary text-xl">{opt.price}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <MapPin className="w-4 h-4 text-primary" /> {fr ? 'Adresse' : 'Address'}
                      </label>
                      <AddressAutocomplete
                        value={data.address}
                        onChange={v => set('address', v)}
                        onCityDetected={city => set('city', city)}
                        fr={fr}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <MapPin className="w-4 h-4 text-primary" /> {get('leadForm.city')} *
                      </label>
                      <input type="text" required value={data.city}
                        onChange={e => set('city', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                        placeholder={get('leadForm.cityPlaceholder')}
                        autoComplete="address-level2" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <AlertCircle className="w-4 h-4 text-primary" /> {get('leadForm.cracks')} *
                      </label>
                      <div className="space-y-2">
                        {[
                          { val: get('leadForm.cracksOption1'), sub: get('leadForm.cracksOption1Sub') },
                          { val: get('leadForm.cracksOption2'), sub: get('leadForm.cracksOption2Sub') },
                          { val: get('leadForm.cracksOption3'), sub: get('leadForm.cracksOption3Sub') },
                        ].map(opt => (
                          <button type="button" key={opt.val}
                            onClick={() => set('cracks', opt.val)}
                            className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                              data.cracks === opt.val
                                ? 'border-primary bg-primary/5 text-primary font-semibold'
                                : 'border-gray-200 text-gray-600 hover:border-primary/40'
                            }`}>
                            <div className="font-semibold">{opt.val}</div>
                            <div className={`text-xs ${data.cracks === opt.val ? 'text-primary/70' : 'text-gray-400'}`}>{opt.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <Palette className="w-4 h-4 text-primary" /> {fr ? 'Couleur préférée' : 'Preferred color'}
                      </label>
                      <ColorPicker
                        value={data.colorFile}
                        onChange={(file, name) => { set('colorFile', file); set('colorName', name) }}
                        fr={fr}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep(1)}
                        className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-dark font-bold rounded-xl transition-all text-sm">
                        {get('leadForm.back')}
                      </button>
                      <button type="button" onClick={() => {
                        if (!step2ok) return
                        fetch('/api/partial-lead', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ name: data.name, email: data.email, garageSize: data.garageSize, city: data.city, locale }),
                        }).catch(() => {})
                        setStep(3)
                      }} disabled={!step2ok}
                        className="flex-1 py-4 bg-primary hover:bg-primary-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl text-base transition-all flex items-center justify-center gap-2">
                        {get('leadForm.continue')} <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{get('leadForm.recapTitle')}</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">{get('leadForm.recapForfait')}</span>
                          <span className="font-bold text-dark">{data.garageSize.split('(')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">{get('leadForm.recapVille')}</span>
                          <span className="font-bold text-dark">{data.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">{get('leadForm.recapFissures')}</span>
                          <span className="font-bold text-dark">{data.cracks.split('(')[0]}</span>
                        </div>
                        {data.colorFile && (
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-500">{fr ? 'Couleur' : 'Color'}</span>
                            <div className="flex items-center gap-2">
                              <img src={`/flakes/${data.colorFile}.avif`} alt={data.colorName} className="w-6 h-6 rounded-full object-cover" />
                              <span className="font-bold text-dark text-sm">{data.colorName}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <Phone className="w-4 h-4 text-primary" /> {get('leadForm.phone')} *
                      </label>
                      <input type="tel" required value={data.phone}
                        onChange={e => set('phone', formatPhone(e.target.value))}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all text-lg tracking-wider"
                        placeholder="514-XXX-XXXX"
                        autoComplete="tel" />
                      <div className="text-gray-400 text-xs mt-1.5">
                        {get('leadForm.phoneHelp')}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <MessageSquare className="w-4 h-4 text-primary" /> {get('leadForm.message')}
                      </label>
                      <textarea value={data.message} onChange={e => set('message', e.target.value)} rows={3}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all resize-none text-sm"
                        placeholder={get('leadForm.messagePlaceholder')} />
                    </div>

                    {/* Photo upload */}
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <ImagePlus className="w-4 h-4 text-primary" />
                        {fr ? 'Photos de votre garage (optionnel)' : 'Photos of your garage (optional)'}
                      </label>
                      <div
                        onClick={() => fileRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-200 hover:border-primary rounded-xl p-4 cursor-pointer transition-all text-center"
                      >
                        <ImagePlus className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                        <p className="text-gray-400 text-xs">
                          {fr ? 'Cliquez pour ajouter des photos (max 3)' : 'Click to add photos (max 3)'}
                        </p>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={e => {
                            const files = Array.from(e.target.files || []).slice(0, 3)
                            setPhotos(files)
                          }}
                        />
                      </div>
                      {photos.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {photos.map((p, i) => (
                            <div key={i} className="relative group">
                              <img
                                src={URL.createObjectURL(p)}
                                alt={p.name}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* What happens next */}
                    <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
                      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{get('leadForm.nextStepsTitle')}</div>
                      <div className="space-y-2.5">
                        {[
                          { label: get('leadForm.nextStep1'), desc: get('leadForm.nextStep1Desc') },
                          { label: get('leadForm.nextStep2'), desc: get('leadForm.nextStep2Desc') },
                          { label: get('leadForm.nextStep3'), desc: get('leadForm.nextStep3Desc') },
                        ].map(({ label, desc }, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[10px] font-bold">{i + 1}</div>
                            <div>
                              <div className="font-semibold text-dark text-sm">{label}</div>
                              <div className="text-gray-500 text-xs">{desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep(2)}
                        className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-dark font-bold rounded-xl transition-all text-sm">
                        {get('leadForm.back')}
                      </button>
                      <button type="submit" disabled={!step3ok || loading}
                        className="flex-1 py-4 bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-base transition-all flex items-center justify-center gap-2 relative overflow-hidden">
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                            {get('leadForm.submitting')}
                          </span>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            {get('leadForm.submit')}
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-center text-gray-400 text-xs pt-2">
                      {get('leadForm.trustBadge')}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}