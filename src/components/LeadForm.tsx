'use client'
import { useState, useEffect } from 'react'
import { Phone, Mail, User, Home, MapPin, MessageSquare, CheckCircle, ArrowRight, Clock } from 'lucide-react'

type FormData = {
  name: string; phone: string; email: string
  garageSize: string; city: string; cracks: string; message: string
}

export default function LeadForm() {
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
  const step1ok = data.name.trim() && data.phone.trim() && data.email.trim()
  const step2ok = data.garageSize && data.city.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!step2ok) return
    setLoading(true)

    try {
      // Envoi direct vers ton webhook GoHighLevel
      await fetch('https://services.leadconnectorhq.com/hooks/RF7MiujmGNkEq3tjMbyC/webhook-trigger/513b01f5-3f31-47fb-a8ca-6b96f51a1ba7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      setDone(true)
    } catch (error) {
      console.error("Erreur lors de l'envoi à GHL:", error)
      // On affiche quand même le succès à l'utilisateur pour ne pas le bloquer, 
      // ou tu peux ajouter une alerte erreur ici.
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <section id="soumission" className="py-24 bg-primary">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-display text-5xl font-black text-white uppercase mb-4">Demande reçue !</h2>
        <p className="text-white/80 text-lg mb-6">
          Merci <strong className="text-white">{data.name}</strong> ! 
          On vous appelle dans les <strong className="text-white">24 heures ouvrables</strong> au numéro fourni 
          pour confirmer les détails et fixer une date d'installation.
        </p>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-left">
          <div className="text-white/60 text-sm mb-3 uppercase tracking-widest font-semibold">Récapitulatif de votre demande</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-white/50">Nom</div><div className="text-white font-medium">{data.name}</div>
            <div className="text-white/50">Téléphone</div><div className="text-white font-medium">{data.phone}</div>
            <div className="text-white/50">Forfait</div><div className="text-white font-medium">{data.garageSize}</div>
            <div className="text-white/50">Ville</div><div className="text-white font-medium">{data.city}</div>
          </div>
        </div>
        <a href="tel:5148248618" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl mt-6 hover:bg-gray-100 transition-all">
          <Phone className="w-5 h-5" /> Appeler maintenant — 514-824-8618
        </a>
      </div>
    </section>
  )

  return (
    <section id="soumission" className="py-24 bg-dark noise relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          
          {/* Left — pitch */}
          <div className="reveal">
            <div className="inline-block bg-primary/15 border border-primary/30 text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Estimation 100% gratuite
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-6">
              Votre prix exact
              <span className="block text-gradient">en moins de 24h.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Remplissez le formulaire. Un technicien vous appelle pour valider les détails et vous donner 
              votre prix final garanti — <strong className="text-white">sans visite préalable obligatoire</strong> dans la plupart des cas.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Clock, title: 'Réponse en moins de 24h', desc: 'Un technicien vous appelle personnellement.' },
                { icon: CheckCircle, title: 'Zéro obligation', desc: 'Pas de vendeur agressif. Pas de pression. Juste un prix.' },
                { icon: Phone, title: 'Prix fixe garanti', desc: 'Ce qu\'on vous dit au téléphone, c\'est ce que vous payez.' },
              ].map(({icon: Icon, title, desc}, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{title}</div>
                    <div className="text-white/40 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency */}
            <div className="bg-primary/10 border border-primary/25 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-3 h-3 flex-shrink-0">
                  <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                  <span className="relative w-3 h-3 bg-primary rounded-full block" />
                </div>
                <span className="font-bold text-white text-sm">Disponibilités limitées ce mois-ci</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed pl-6">
                On prend maximum 8 chantiers par mois pour maintenir notre qualité. 
                Réservez votre place tôt — surtout au printemps et à l'automne.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal reveal-delay-2">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              {[1, 2].map(n => (
                <div key={n} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= n ? 'bg-primary text-white' : 'bg-white/10 text-white/30'
                  }`}>{n}</div>
                  <span className={`text-sm transition-all ${step >= n ? 'text-white' : 'text-white/30'}`}>
                    {n === 1 ? 'Vos coordonnées' : 'Votre projet'}
                  </span>
                  {n < 2 && <div className="w-8 h-0.5 mx-1 bg-white/15" />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/30">
              <form onSubmit={handleSubmit}>
                
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <User className="w-4 h-4 text-primary" /> Nom complet *
                      </label>
                      <input type="text" required value={data.name}
                        onChange={e => set('name', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                        placeholder="Jean Tremblay" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <Phone className="w-4 h-4 text-primary" /> Téléphone *
                      </label>
                      <input type="tel" required value={data.phone}
                        onChange={e => set('phone', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                        placeholder="514-XXX-XXXX" />
                      <div className="text-gray-400 text-xs mt-1.5">On vous appelle pour confirmer votre date d'installation.</div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <Mail className="w-4 h-4 text-primary" /> Courriel *
                      </label>
                      <input type="email" required value={data.email}
                        onChange={e => set('email', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                        placeholder="jean@exemple.com" />
                    </div>
                    <button type="button" onClick={() => step1ok && setStep(2)} disabled={!step1ok}
                      className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-30 text-white font-bold rounded-xl text-base transition-all flex items-center justify-center gap-2">
                      Continuer <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <Home className="w-4 h-4 text-primary" /> Taille de garage *
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { val: 'Garage simple (≤300 pi²)', price: '2 749,99$', sub: 'Un véhicule' },
                          { val: 'Garage double (>300 pi²)', price: '4 449,99$', sub: 'Deux véhicules' },
                        ].map(opt => (
                          <button type="button" key={opt.val}
                            onClick={() => set('garageSize', opt.val)}
                            className={`text-left px-4 py-3.5 rounded-xl border-2 transition-all ${
                              data.garageSize === opt.val
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-primary/40'
                            }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-bold text-dark text-sm">{opt.val}</div>
                                <div className="text-gray-400 text-xs">{opt.sub}</div>
                              </div>
                              <div className="font-display font-black text-primary text-lg">{opt.price}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <MapPin className="w-4 h-4 text-primary" /> Ville *
                      </label>
                      <input type="text" required value={data.city}
                        onChange={e => set('city', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                        placeholder="Longueuil, Brossard, Laval…" />
                    </div>
                    <div>
                      <label className="text-dark font-semibold text-sm mb-2 block">Des fissures visibles ?</label>
                      <div className="flex gap-3">
                        {['Oui, quelques-unes', 'Oui, majeures', 'Non / Pas sûr'].map(v => (
                          <button type="button" key={v} onClick={() => set('cracks', v)}
                            className={`flex-1 py-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                              data.cracks === v ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600'
                            }`}>{v}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-dark font-semibold text-sm mb-2">
                        <MessageSquare className="w-4 h-4 text-primary" /> Notes (optionnel)
                      </label>
                      <textarea value={data.message} onChange={e => set('message', e.target.value)} rows={3}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all resize-none text-sm"
                        placeholder="Couleurs souhaitées, contraintes d'accès, questions particulières…" />
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)}
                        className="px-5 py-4 bg-gray-100 hover:bg-gray-200 text-dark font-bold rounded-xl transition-all text-sm">
                        ← Retour
                      </button>
                      <button type="submit" disabled={!step2ok || loading}
                        className="flex-1 py-4 bg-primary hover:bg-primary-dark disabled:opacity-40 text-white font-bold rounded-xl text-base transition-all flex items-center justify-center gap-2">
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                            Envoi…
                          </span>
                        ) : <>Obtenir ma soumission gratuite <ArrowRight className="w-5 h-5" /></>}
                      </button>
                    </div>
                    <p className="text-center text-gray-400 text-xs">
                      Aucun engagement · Réponse dans les 24h · Prix fixe garanti
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
