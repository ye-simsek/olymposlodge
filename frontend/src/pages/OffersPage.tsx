import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'

export default function OffersPage() {
  const { t, i18n } = useTranslation()
  const o = (key: string) => t(`offers.${key}`)
  const lang = i18n.language?.split('-')[0] || 'tr'

  return (
    <div className="offers-dark">
      <PageMeta
        lang={lang}
        path="/offers"
        title={t('meta.offers_title')}
        description={t('meta.offers_desc')}
      />
      <section className="offers-hero">
        <h1 className="offers-hero__title">{o('page_title')}</h1>
      </section>

      <div className="offers-grid">
        <div className="offer-card">
          <p className="offer-card__title">{o('offer1_title')}</p>
          <p className="offer-card__desc">{o('offer1_desc')}</p>
          <a href="/contact" className="offer-card__cta">{o('offer1_cta')}</a>
        </div>

        <div className="offer-card">
          <p className="offer-card__title">{o('offer2_title')}</p>
          <p className="offer-card__desc">{o('offer2_desc')}</p>
          <a href="/contact" className="offer-card__cta">{o('offer2_cta')}</a>
        </div>
      </div>

      <div style={{ height: 'var(--space-xl)' }} />
    </div>
  )
}
