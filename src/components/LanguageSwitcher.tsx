'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentLocale = params?.locale as string || 'fr'

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname?.replace(`/${currentLocale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  // Ne render rien côté serveur
  if (!mounted) {
    return (
      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        <div className="px-3 py-1.5 rounded text-sm font-semibold bg-primary text-white">FR</div>
        <div className="px-3 py-1.5 rounded text-sm font-semibold text-white/60">EN</div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
      <button
        onClick={() => switchLanguage('fr')}
        className={`px-3 py-1.5 rounded text-sm font-semibold transition-all ${
          currentLocale === 'fr'
            ? 'bg-primary text-white'
            : 'text-white/60 hover:text-white'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1.5 rounded text-sm font-semibold transition-all ${
          currentLocale === 'en'
            ? 'bg-primary text-white'
            : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  )
}