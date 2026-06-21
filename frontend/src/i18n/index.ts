import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './de'
import en from './en'
import tr from './tr'

const SUPPORTED = ['tr', 'en', 'de'] as const
type Lang = (typeof SUPPORTED)[number]

function getSaved(): Lang | null {
  const v = localStorage.getItem('ol_lang')
  return SUPPORTED.includes(v as Lang) ? (v as Lang) : null
}

// Returns the matched lang, 'en' for unsupported langs, or null if no lang at all
function fromBrowser(): Lang | null {
  const langs = [...(navigator.languages ?? []), navigator.language].filter(Boolean)
  if (!langs.length) return null
  for (const l of langs) {
    const code = l.split('-')[0].toLowerCase()
    if (SUPPORTED.includes(code as Lang)) return code as Lang
  }
  // Browser language detected but not supported → English, skip IP lookup
  return 'en'
}

async function fromIp(): Promise<Lang> {
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 3000)
    const r = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    if (!r.ok) return 'en'
    const { country_code } = await r.json() as { country_code?: string }
    if (country_code === 'TR') return 'tr'
    if (['DE', 'AT', 'CH'].includes(country_code ?? '')) return 'de'
  } catch { /* ignore */ }
  return 'en'
}

const saved       = getSaved()
const browserLang = fromBrowser()       // null = no lang detected at all
const initialLang: Lang = saved ?? browserLang ?? 'en'

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
    de: { translation: de },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => localStorage.setItem('ol_lang', lng))

// No saved preference and no browser language at all → detect via IP
if (!saved && browserLang === null) {
  fromIp().then(lang => {
    if (lang !== i18n.language) i18n.changeLanguage(lang)
    // changeLanguage fires languageChanged → saves to localStorage automatically
  })
}

// Fetch fresh translations from API and overlay on bundled data
fetch('/api/v1/translations')
  .then(r => r.ok ? r.json() : null)
  .then((data: Record<string, Record<string, unknown>> | null) => {
    if (!data) return
    for (const [lang, namespaces] of Object.entries(data)) {
      i18n.addResourceBundle(lang, 'translation', namespaces, true, true)
    }
    i18n.changeLanguage(i18n.language)
  })
  .catch(() => {})

export default i18n
