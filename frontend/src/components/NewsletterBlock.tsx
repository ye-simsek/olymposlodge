import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { subscribeNewsletter } from '../api/forms'
import type { Language } from '../types'

export default function NewsletterBlock() {
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !consent) return
    setStatus('loading')
    try {
      const lang = (i18n.language?.split('-')[0] || 'tr') as Language
      await subscribeNewsletter({ email, consent, language: lang })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="footer-newsletter">
      <h4 className="footer-newsletter__title">{t('newsletter.title')}</h4>
      <p className="footer-newsletter__sub">{t('newsletter.subtitle')}</p>
      {status === 'success' ? (
        <p className="footer-newsletter__success">{t('newsletter.success')}</p>
      ) : (
        <form className="footer-newsletter__form" onSubmit={handleSubmit} noValidate>
          <div className="footer-newsletter__row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.email')}
              required
              aria-label={t('newsletter.email')}
              disabled={status === 'loading'}
            />
            <button type="submit" disabled={status === 'loading' || !consent}>
              {t('newsletter.subscribe')}
            </button>
          </div>
          <label className="footer-newsletter__consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>{t('newsletter.consent')}</span>
          </label>
        </form>
      )}
    </div>
  )
}
