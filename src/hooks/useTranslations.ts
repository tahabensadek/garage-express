'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import fr from '../../locales/fr.json'
import en from '../../locales/en.json'

const translations: Record<string, typeof fr> = { fr, en }

export function useTranslations() {
  const params = useParams()
  const [locale, setLocale] = useState('fr')

  useEffect(() => {
    const newLocale = (params?.locale as string) || 'fr'
    setLocale(newLocale)
  }, [params?.locale])

  const t = translations[locale] || translations.fr

  const get = (path: string): string => {
    return path.split('.').reduce((obj: any, key) => obj?.[key], t) || path
  }

  return { t, get, locale }
}

export function replace(str: string, vars: Record<string, string>): string {
  return str.replace(/{(\w+)}/g, (_, key) => vars[key] || '')
}