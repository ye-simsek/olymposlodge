import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

export default function NotFoundPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'tr'

  return (
    <div className="not-found-page">
      <PageMeta lang={lang} title="404" description="Page not found" />
      <div className="not-found-page__bg" aria-hidden="true" />
      <div className="not-found-page__inner">
        <span className="not-found-page__code">404</span>
        <p className="not-found-page__eyebrow">Olympos Lodge</p>
        <h1 className="not-found-page__title">{t('common.not_found')}</h1>
        <div className="not-found-page__divider" />
        <Link to="/" className="btn-reserve not-found-page__cta">{t('common.go_home')}</Link>
      </div>
    </div>
  )
}
