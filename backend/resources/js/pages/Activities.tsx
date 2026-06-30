import React from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import SubNav from '@/components/SubNav'
import Layout from '@/components/layout/Layout'

export default function Activities() {
  const { t } = useTranslation()
  const { locale } = usePageProps()
  const a = (key: string) => t(`activities.${key}`)

  return (
    <div className="page--dest page--cirali">
      <SeoHead title={t('meta.activities_title')} description={t('meta.activities_desc')} />

      <SubNav />

      {/* Hero */}
      <section className="child-hero child-hero--full">
        <img
          className="child-hero__image"
          src="https://www.olymposlodge.com.tr/wp-content/uploads/2025/04/IMG_5376-1.jpg"
          alt={a('hero_alt')}
          fetchPriority="high"
          decoding="async"
          width={2000}
          height={1333}
        />
        <div className="child-hero__overlay" />
      </section>

      {/* Tekne Turu — editorial split, image left */}
      <section className="tekne-card" id="tekne">
        <div className="tekne-card__image">
          <img
            src="https://www.olymposlodge.com.tr/wp-content/uploads/2025/04/IMG_5376-1.jpg"
            alt={a('tekne_title')}
            loading="lazy"
            width={2000}
            height={1333}
          />
        </div>
        <div className="tekne-card__content">
          <span className="tekne-card__label">{a('tekne_label')}</span>
          <h2 className="tekne-card__title">{a('tekne_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{a('tekne_desc')}</p>
          <ul className="tekne-card__facts">
            <li>
              <span>{a('tekne_f1_label')}</span>
              <strong>{a('tekne_f1_value')}</strong>
            </li>
            <li>
              <span>{a('tekne_f2_label')}</span>
              <strong>{a('tekne_f2_value')}</strong>
            </li>
          </ul>
        </div>
      </section>

      {/* Tahtalı Teleferik — editorial split, image right */}
      <section className="tekne-card tekne-card--reverse" id="tahtali">
        <div className="tekne-card__content">
          <span className="tekne-card__label">{a('tahtali_label')}</span>
          <h2 className="tekne-card__title">{a('tahtali_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{a('tahtali_desc')}</p>
          <ul className="tekne-card__facts">
            <li>
              <span>{a('tahtali_f1_label')}</span>
              <strong>{a('tahtali_f1_value')}</strong>
            </li>
            <li>
              <span>{a('tahtali_f2_label')}</span>
              <strong>{a('tahtali_f2_value')}</strong>
            </li>
          </ul>
        </div>
        <div className="tekne-card__image">
          <img
            src="/images/Olympos_beach.jpg"
            alt={a('tahtali_title')}
            loading="lazy"
            width={3152}
            height={1970}
          />
        </div>
      </section>

      {/* Lodge linker CTA */}
      <Link href={localePath(locale, 'lodge')} className="lodge-linker">
        <div className="lodge-linker__image">
          <img
            src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg"
            alt="Olympos Lodge"
            loading="lazy"
            width={1920}
            height={1280}
          />
        </div>
        <div className="lodge-linker__content">
          <span className="lodge-linker__eyebrow">{a('lodge_eyebrow')}</span>
          <h2 className="lodge-linker__title">{a('lodge_title')}</h2>
          <p className="lodge-linker__lead">{a('lodge_lead')}</p>
          <ul className="lodge-linker__list">
            <li>{a('lodge_list_spa')}</li>
            <li>{a('lodge_list_beach')}</li>
            <li>{a('lodge_list_bike')}</li>
            <li>{a('lodge_list_kayak')}</li>
          </ul>
          <span className="lodge-linker__cta">{a('lodge_cta')}</span>
        </div>
      </Link>
    </div>
  )
}

Activities.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
