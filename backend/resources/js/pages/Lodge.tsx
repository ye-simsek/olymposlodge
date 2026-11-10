import React from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import SubNav from '@/components/SubNav'
import Layout from '@/components/layout/Layout'

export default function Lodge() {
  const { t } = useTranslation()
  const { locale } = usePageProps()
  const l = (key: string) => t(`lodge.${key}`)

  return (
    <div className="page--dest page--cirali">
      <SeoHead title={t('meta.lodge_title')} description={t('meta.lodge_desc')} />

      <SubNav />

      {/* Hero */}
      <section className="child-hero child-hero--full">
        <img
          className="child-hero__image"
          src="/images/oda-aqua-super-deluxe-1920.webp"
          srcSet="/images/oda-aqua-super-deluxe-1200.webp 1200w, /images/oda-aqua-super-deluxe-1920.webp 1920w"
          alt={l('hero_alt')}
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1280}
        />
        <div className="child-hero__overlay" />
      </section>

      {/* Spa — editorial split, image right */}
      <section className="tekne-card tekne-card--reverse" id="spa">
        <div className="tekne-card__content">
          <span className="tekne-card__label">{l('spa_label')}</span>
          <h2 className="tekne-card__title">{l('spa_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{l('spa_desc')}</p>
          <div style={{ marginTop: '2rem' }}>
            <Link
              href={localePath(locale, 'spa')}
              className="section-label"
              style={{ letterSpacing: '0.14em', color: 'var(--color-warm-gold)', textDecoration: 'none' }}
            >
              {l('spa_cta')}
            </Link>
          </div>
        </div>
        <div className="tekne-card__image">
          <img
            src="/images/oda-super-deluxe-2-1920.webp"
          srcSet="/images/oda-super-deluxe-2-1200.webp 1200w, /images/oda-super-deluxe-2-1920.webp 1920w"
            alt={l('spa_title')}
            loading="lazy"
            width={1920}
            height={1280}
          />
        </div>
      </section>

      {/* Breakfast — editorial split */}
      <section className="tekne-card" id="kahvalti">
        <div className="tekne-card__image">
          <img
            src="/images/bahce-hamak-2000.webp"
          srcSet="/images/bahce-hamak-1200.webp 1200w, /images/bahce-hamak-2000.webp 2000w"
            alt={l('breakfast_title')}
            loading="lazy"
            width={2000}
            height={1333}
          />
        </div>
        <div className="tekne-card__content">
          <span className="tekne-card__label">{l('breakfast_label')}</span>
          <h2 className="tekne-card__title">{l('breakfast_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{l('breakfast_desc')}</p>
        </div>
      </section>

      {/* Private Beach — editorial split, image right */}
      <section className="tekne-card tekne-card--reverse" id="plaj">
        <div className="tekne-card__content">
          <span className="tekne-card__label">{l('beach_label')}</span>
          <h2 className="tekne-card__title">{l('beach_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{l('beach_desc')}</p>
        </div>
        <div className="tekne-card__image">
          <img
            src="/images/bahce-oturma-2000.webp"
          srcSet="/images/bahce-oturma-1200.webp 1200w, /images/bahce-oturma-2000.webp 2000w"
            alt={l('beach_title')}
            loading="lazy"
            width={2000}
            height={1333}
          />
        </div>
      </section>

      {/* Sports Equipment — editorial split */}
      <section className="tekne-card" id="spor">
        <div className="tekne-card__image">
          <img
            src="/images/bahce-patika-2000.webp"
          srcSet="/images/bahce-patika-1200.webp 1200w, /images/bahce-patika-2000.webp 2000w"
            alt={l('sports_title')}
            loading="lazy"
            width={2000}
            height={1333}
          />
        </div>
        <div className="tekne-card__content">
          <span className="tekne-card__label">{l('sports_label')}</span>
          <h2 className="tekne-card__title">{l('sports_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{l('sports_desc')}</p>
        </div>
      </section>

      {/* Page Linker */}
      <section className="story-philosophy">
        <div className="story-philosophy__header">
          <h2 className="story-philosophy__title">{l('linker_title')}</h2>
        </div>

        {/* Card 1: Çıralı — text left, image right */}
        <div className="story-block">
          <div className="story-block__content">
            <h3 className="story-block__heading">{t('nav.experiences')}</h3>
            <p>{l('linker_cirali_body')}</p>
            <Link href={localePath(locale, 'experiences')} className="room-row__link">{l('linker_cirali_cta')}</Link>
          </div>
          <div className="story-block__image">
            <img
              src="/images/cirali-sahili-gunbatimi-1600.webp"
          srcSet="/images/cirali-sahili-gunbatimi-1200.webp 1200w, /images/cirali-sahili-gunbatimi-1600.webp 1600w"
              alt={t('nav.experiences')}
              loading="lazy"
              width={1600}
              height={2277}
            />
          </div>
        </div>

        {/* Card 2: Activities — image left, text right */}
        <div className="story-block story-block--reverse">
          <div className="story-block__image">
            <img
              src="/images/bahce-patika-2000.webp"
          srcSet="/images/bahce-patika-1200.webp 1200w, /images/bahce-patika-2000.webp 2000w"
              alt={t('nav.activities')}
              loading="lazy"
              width={2000}
              height={1333}
            />
          </div>
          <div className="story-block__content">
            <h3 className="story-block__heading">{t('nav.activities')}</h3>
            <p>{l('linker_activities_body')}</p>
            <Link href={localePath(locale, 'activities')} className="room-row__link">{l('linker_activities_cta')}</Link>
          </div>
        </div>

        {/* Card 3: Location — text left, image right */}
        <div className="story-block">
          <div className="story-block__content">
            <h3 className="story-block__heading">
              <span>{l('linker_loc_title_l1')}</span><br />
              <span>{l('linker_loc_title_l2')}</span>
            </h3>
            <p>{l('linker_loc_body')}</p>
            <Link href={localePath(locale, 'location')} className="room-row__link">{l('linker_loc_cta')}</Link>
          </div>
          <div className="story-block__image">
            <img
              src="/images/cirali-vadisi-havadan-1520.webp"
          srcSet="/images/cirali-vadisi-havadan-1200.webp 1200w, /images/cirali-vadisi-havadan-1520.webp 1520w"
              alt={l('linker_loc_img_alt')}
              loading="lazy"
              width={1520}
              height={1075}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

Lodge.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
