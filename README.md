# 🚗 GARAGE EXPRESS - Site Web Complet

Site web professionnel ultra-optimisé pour conversion maximale.

## 🔥 Nouveautés v2.0

### Hero Spectaculaire
- ✅ Photo Ferrari sur plancher rouge (effet WOW garanti)
- ✅ Prix affichés dès le Hero (2 749,99$ / 4 449,99$)
- ✅ Navigation sticky avec logo
- ✅ CTA multiples stratégiques
- ✅ Scroll indicator animé

### Pricing Component COMPLET
- ✅ 2 forfaits détaillés (Simple / Double)
- ✅ Liste complète "inclus / non-inclus"
- ✅ Badge "Le plus populaire"
- ✅ Options additionnelles (expandable)
- ✅ Section garanties
- ✅ Prix transparents, zéro surprise

### Lead Capture Form Optimisé
- ✅ Formulaire 2 étapes (réduit friction)
- ✅ Progress bar visuelle
- ✅ Validation en temps réel
- ✅ Questions qualifiantes (taille garage, fissures, ville)
- ✅ Message de confirmation post-soumission
- ✅ Trust elements partout

## 💰 Prix affichés

**Garage Simple** : 2 749,99$ (≤ 300 pi²)
**Garage Double** : 4 449,99$ (> 300 pi²)

*Tous les prix incluent taxes + installation complète*

## 🚀 Installation

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## 📸 Images

- `/public/images/hero-car.png` - Photo principale (Ferrari sur plancher rouge)
- `/public/images/before-1.png` à `before-5.png` - Photos AVANT
- `/public/images/after-1.png` à `after-5.png` - Photos APRÈS
- `/public/logo.svg` - Logo Garage Express

## 🎯 Sections

1. **Hero** - Accroche puissante avec photo Ferrari + prix
2. **Benefits** - 4 raisons clés
3. **Avant/Après** - Galerie interactive
4. **Pricing** - Forfaits détaillés + options
5. **Process** - 4 étapes installation
6. **Lead Form** - Capture optimisée 2 steps
7. **About** - Présentation entreprise
8. **Testimonials** - Social proof
9. **Final CTA** - Dernier push
10. **Footer** - Contact complet

## ✏️ Personnalisation

### Prix (si changement)
Fichier : `src/components/Pricing.tsx`
Change les valeurs `price` dans l'array `packages`

### Lead Form Backend
Fichier : `src/components/LeadForm.tsx`
Ligne ~25 - Remplace `console.log` par ton API :
```typescript
// Exemple integration
const response = await fetch('/api/leads', {
  method: 'POST',
  body: JSON.stringify(formData)
})
```

### Contact
- Téléphone : 514-824-8618 (Hero.tsx, Footer.tsx)
- Email : info@garageexpress.ca (Footer.tsx)
- RBQ : À ajouter dans Footer.tsx

## 🎨 Couleurs

- Rouge principal : #DC2626
- Rouge foncé : #991B1B
- Noir : #0A0A0A
- Gris : #171717

## 🎁 Features Avancées

✅ Animations Framer Motion fluides
✅ Responsive mobile-first
✅ SEO optimisé
✅ Images optimisées Next.js
✅ Formulaire multi-step
✅ Progress indicators
✅ Trust badges partout
✅ Pricing transparent complet
✅ Lead qualification

## 📊 Conversion Optimization

- Hero avec prix immédiat (réduit friction)
- CTA tous les 2-3 sections
- Formulaire 2-step (+ de complétions)
- Social proof massif
- Garanties claires
- Zéro surprise sur prix

## 🚢 Déploiement

```bash
npm run build
vercel
```

## 📱 Testé sur

- iPhone (toutes tailles)
- Android
- iPad
- Desktop HD/4K

## 🔥 Ce qui fait la différence

1. **Photo Hero spectaculaire** - Ferrari = aspirationnel
2. **Prix dès le Hero** - Transparence immédiate
3. **Pricing ultra-détaillé** - Confiance maximale
4. **Lead form 2-step** - Meilleure conversion
5. **Progress bar** - Réduit abandon
6. **Trust elements** - Social proof partout

---

**Créé pour Garage Express - Rive-Sud & Laval** 🚗🔥

Version 2.0 - Optimisée pour CONVERSION MAXIMALE
