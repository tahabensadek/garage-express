import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Image src="/logo.svg" alt="Garage Express" width={150} height={50} className="h-10 w-auto mb-4" />
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Spécialiste en revêtement polyaspartique de plancher de garage. 
              Installation professionnelle en 1 jour. Service Rive-Sud & Laval depuis plusieurs années.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-10 h-10 bg-white/6 hover:bg-primary rounded-xl flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/6 hover:bg-primary rounded-xl flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 uppercase text-sm tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:5148248618" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  514-824-8618
                </a>
              </li>
              <li>
                <a href="mailto:info@garageexpress.ca" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  info@garageexpress.ca
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Rive-Sud & Laval, Québec
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 uppercase text-sm tracking-widest">Zone desservie</h3>
            <ul className="text-white/40 text-sm space-y-1.5">
              {['Longueuil', 'Brossard', 'Saint-Hubert', 'La Prairie', 'Boucherville', 'Sainte-Julie', 'Laval', 'Montérégie'].map(c => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Garage Express. Tous droits réservés.</p>
          <p className="text-white/25 text-xs">RBQ : À venir · Fabriqué avec ❤ sur la Rive-Sud</p>
        </div>
      </div>
    </footer>
  )
}
