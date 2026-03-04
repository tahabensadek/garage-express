'use client'
import { useState, useEffect } from 'react'
import { useTranslations, replace } from '@/hooks/useTranslations'
import { Phone, Mail, User, Home, MapPin, MessageSquare, CheckCircle, ArrowRight, Clock, Download, Star, AlertCircle } from 'lucide-react'

type FormData = {
  name: string; phone: string; email: string
  garageSize: string; city: string; cracks: string; message: string
}

export default function LeadForm() {
  const { get } = useTranslations()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>({
    name: '', phone: '', email: '', garageSize: '', city: '', cracks: '', message: ''
  })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

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
      await new Promise(r => setTimeout(r, 900))
      console.log('Lead soumis:', data)
      setDone(true)
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion', { send_to: 'AW-17940446235/DRFQCO7B1IIcEJv41epC' })
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
                        <span>4.9/5 Google</span>
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
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep(1)}
                        className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-dark font-bold rounded-xl transition-all text-sm">
                        {get('leadForm.back')}
                      </button>
                      <button type="button" onClick={() => step2ok && setStep(3)} disabled={!step2ok}
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