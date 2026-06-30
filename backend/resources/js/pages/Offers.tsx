import React from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import Layout from '@/components/layout/Layout'

export default function Offers() {
  const { t } = useTranslation()
  const { locale } = usePageProps()
  const o = (key: string) => t(`offers.${key}`)

  return (
    <div className="offers-dark">
      <SeoHead title={t('meta.offers_title')} description={t('meta.offers_desc')} />
      <section className="offers-hero">
        <h1 className="offers-hero__title">{o('page_title')}</h1>
      </section>

      <div className="offers-grid">
        <div className="offer-card">
          <p className="offer-card__title">{o('offer1_title')}</p>
          <p className="offer-card__desc">{o('offer1_desc')}</p>
          <Link href={localePath(locale, 'contact')} className="offer-card__cta">{o('offer1_cta')}</Link>
        </div>

        <div className="offer-card">
          <p className="offer-card__title">{o('offer2_title')}</p>
          <p className="offer-card__desc">{o('offer2_desc')}</p>
          <Link href={localePath(locale, 'contact')} className="offer-card__cta">{o('offer2_cta')}</Link>
        </div>
      </div>

      <div style={{ height: 'var(--space-xl)' }} />
    </div>
  )
}

Offers.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
