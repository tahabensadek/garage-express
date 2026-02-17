import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Garage Express | Plancher Polyaspartique — Rive-Sud & Laval | Dès 2 749$',
  description: 'Transformez votre garage en 1 seule journée. Revêtement polyaspartique professionnel, durable 15+ ans, résistant au sel et à l\'huile. Prix fixe garanti dès 2 749$ tout inclus. Service Rive-Sud, Laval. Estimation 100% gratuite.',
  keywords: 'revêtement garage, polyaspartique, plancher garage, epoxy garage, Rive-Sud, Laval, Longueuil, Brossard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var obs = new IntersectionObserver(function(entries) {
              entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
              });
            }, { threshold: 0.1 });
            function init() { document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); }); }
            if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
          })();
        ` }} />
      </body>
    </html>
  )
}
