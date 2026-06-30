import React, { useEffect, useRef } from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import SubNav from '@/components/SubNav'
import Layout from '@/components/layout/Layout'

export default function Experiences() {
  const { t, tRaw } = useTranslation()
  const { locale } = usePageProps()
  const ringmapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ringmapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const e = (key: string) => t(`experiences.${key}`)
  const linkerList = tRaw<string[]>('experiences.linker_list') ?? []

  return (
    <div className="page--dest page--cirali">
      <SeoHead title={t('meta.experiences_title')} description={t('meta.experiences_desc')} />

      <SubNav />

      {/* Hero */}
      <section className="child-hero child-hero--full">
        <img
          className="child-hero__image"
          src="/images/cirali-hero.jpg"
          alt="Çıralı"
          fetchPriority="high"
          decoding="async"
          width={2400}
          height={1581}
        />
        <div className="child-hero__overlay" />
      </section>

      {/* Intro */}
      <section className="intro intro--dest">
        <div className="intro-body">
          <div className="intro-col">
            <p>{e('intro_p1')}</p>
          </div>
          <div className="intro-col">
            <p>{e('intro_p2')}</p>
          </div>
        </div>
      </section>

      {/* Scroll-snap chapter container */}
      <div className="dest-chapters-scroll">

        {/* Chapter 01: Plaj — image left, text right */}
        <section className="dest-chapter" id="plaj">
          <div className="dest-chapter__visual">
            <img src="/images/cirali-sahili.webp" alt="Çıralı Plajı" loading="lazy" width={2000} height={1069} />
          </div>
          <div className="dest-chapter__body">
            <span className="dest-chapter__eyebrow">{e('ch1_eyebrow')}</span>
            <h2 className="dest-chapter__title">{e('ch1_title')}</h2>
            <p className="dest-chapter__lead">{e('ch1_lead')}</p>
          </div>
        </section>

        {/* Chapter 02: Olympos — text left, image right */}
        <section className="dest-chapter dest-chapter--reverse" id="olympos">
          <div className="dest-chapter__visual">
            <img
              src="/images/olympos-antik-kenti-1200.webp"
              srcSet="/images/olympos-antik-kenti-1200.webp 1200w, /images/olympos-antik-kenti-2400.webp 2400w, /images/olympos-antik-kenti.webp 3680w"
              sizes="50vw"
              alt="Olympos Antik Kenti"
              loading="lazy"
              width={3680}
              height={1197}
            />
          </div>
          <div className="dest-chapter__body">
            <span className="dest-chapter__eyebrow">{e('ch2_cat')}</span>
            <h2 className="dest-chapter__title">{e('ch2_title')}</h2>
            <dl className="dest-chapter__specs">
              <div><dt>{t('experiences.ch2_s_location_label')}</dt><dd>{t('experiences.ch2_s_location_val')}</dd></div>
              <div><dt>{t('experiences.ch2_s_founded_label')}</dt><dd>{t('experiences.ch2_s_founded_val')}</dd></div>
              <div><dt>{t('experiences.ch2_s_union_label')}</dt><dd>{t('experiences.ch2_s_union_val')}</dd></div>
            </dl>
            <p className="dest-chapter__lead">{e('ch2_lead')}</p>
          </div>
        </section>

        {/* Chapter 03: Yanartaş — image left, text right */}
        <section className="dest-chapter" id="yanartas">
          <div className="dest-chapter__visual">
            <img
              src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5150.jpg"
              alt="Yanartaş"
              loading="lazy"
              width={2000}
              height={1333}
            />
          </div>
          <div className="dest-chapter__body">
            <span className="dest-chapter__eyebrow">{e('ch3_eyebrow')}</span>
            <h2 className="dest-chapter__title">{e('ch3_title')}</h2>
            <p className="dest-chapter__lead">{e('ch3_lead')}</p>
          </div>
        </section>

        {/* Chapter 04: Likya Yolu — text left, image right */}
        <section className="dest-chapter dest-chapter--reverse" id="likya">
          <div className="dest-chapter__visual">
            <img
              src="https://www.olymposlodge.com.tr/wp-content/uploads/2025/04/IMG_5434-e1731093615320-1.jpg"
              alt="Likya Yolu"
              loading="lazy"
              width={1700}
              height={1333}
            />
          </div>
          <div className="dest-chapter__body">
            <span className="dest-chapter__eyebrow">{e('ch4_cat')}</span>
            <h2 className="dest-chapter__title">{e('ch4_title')}</h2>
            <dl className="dest-chapter__specs">
              <div><dt>{t('experiences.ch4_s_total_label')}</dt><dd>{t('experiences.ch4_s_total_val')}</dd></div>
              <div><dt>{t('experiences.ch4_s_stage_label')}</dt><dd>{t('experiences.ch4_s_stage_val')}</dd></div>
              <div><dt>{t('experiences.ch4_s_elevation_label')}</dt><dd>{t('experiences.ch4_s_elevation_val')}</dd></div>
              <div><dt>{t('experiences.ch4_s_season_label')}</dt><dd>{t('experiences.ch4_s_season_val')}</dd></div>
            </dl>
            <p className="dest-chapter__lead">{e('ch4_lead')}</p>
          </div>
        </section>

      </div>

      {/* Pull quote */}
      <div className="dest-pullquote">
        <q>{e('pullquote')}</q>
      </div>

      {/* Image strip */}
      <div className="dest-strip">
        <div className="dest-strip__item">
          <img src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg" alt="Olympos Lodge" loading="lazy" width={1920} height={1280} />
        </div>
        <div className="dest-strip__item">
          <img src="https://www.olymposlodge.com.tr/wp-content/uploads/2025/04/IMG_5376-1.jpg" alt="Çıralı Plajı" loading="lazy" width={2000} height={1333} />
        </div>
        <div className="dest-strip__item">
          <img src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5400.jpg" alt="Çevre" loading="lazy" width={2000} height={1333} />
        </div>
      </div>

      {/* Beyond Çıralı — concentric ring map */}
      <div className="dest-nearby">
        <div className="dest-nearby__header">
          <span className="section-label">{e('nearby_label')}</span>
        </div>
        <div className="dest-ringmap" ref={ringmapRef}>
          <svg className="dest-ringmap__svg" viewBox="0 0 600 600" aria-hidden="true">
            <circle className="dest-ringmap__ring dest-ringmap__ring--1" cx="300" cy="300" r="90" fill="none" stroke="#d5d0c8" strokeWidth="1"/>
            <circle className="dest-ringmap__ring dest-ringmap__ring--2" cx="300" cy="300" r="180" fill="none" stroke="#d5d0c8" strokeWidth="1"/>
            <circle className="dest-ringmap__ring dest-ringmap__ring--3" cx="300" cy="300" r="270" fill="none" stroke="#d5d0c8" strokeWidth="1"/>
            <line className="dest-ringmap__line" x1="300" y1="300" x2="236" y2="364" stroke="#d5d0c8" strokeWidth="0.7" strokeDasharray="4 4"/>
            <line className="dest-ringmap__line" x1="300" y1="300" x2="236" y2="236" stroke="#d5d0c8" strokeWidth="0.7" strokeDasharray="4 4"/>
            <line className="dest-ringmap__line" x1="300" y1="300" x2="300" y2="480" stroke="#d5d0c8" strokeWidth="0.7" strokeDasharray="4 4"/>
            <line className="dest-ringmap__line" x1="300" y1="300" x2="449" y2="427" stroke="#d5d0c8" strokeWidth="0.7" strokeDasharray="4 4"/>
            <line className="dest-ringmap__line" x1="300" y1="300" x2="465" y2="170" stroke="#d5d0c8" strokeWidth="0.7" strokeDasharray="4 4"/>
            <line className="dest-ringmap__line" x1="300" y1="300" x2="570" y2="300" stroke="#d5d0c8" strokeWidth="0.7" strokeDasharray="4 4"/>
            <circle className="dest-ringmap__center" cx="300" cy="300" r="5" fill="#8E7441"/>
            <circle className="dest-ringmap__dot" cx="236" cy="364" r="4" fill="#8E7441"/>
            <circle className="dest-ringmap__dot" cx="236" cy="236" r="4" fill="#8E7441"/>
            <circle className="dest-ringmap__dot" cx="300" cy="480" r="4" fill="#8E7441"/>
            <circle className="dest-ringmap__dot" cx="449" cy="427" r="4" fill="#8E7441"/>
            <circle className="dest-ringmap__dot" cx="465" cy="170" r="4" fill="#8E7441"/>
            <circle className="dest-ringmap__dot" cx="570" cy="300" r="4" fill="#8E7441"/>
          </svg>
          <span className="dest-ringmap__ring-label dest-ringmap__ring-label--1">{e('ring_10min')}</span>
          <span className="dest-ringmap__ring-label dest-ringmap__ring-label--2">{e('ring_30min')}</span>
          <span className="dest-ringmap__ring-label dest-ringmap__ring-label--3">{e('ring_1hr')}</span>
          <span className="dest-ringmap__center-label">Olympos Lodge</span>
          <div className="dest-ringmap__label dest-ringmap__label--olympos">
            <h3>{e('nearby1_title')}</h3>
            <span className="dest-ringmap__time">{e('nearby1_time')}</span>
          </div>
          <div className="dest-ringmap__label dest-ringmap__label--yanartas">
            <h3>{e('nearby2_title')}</h3>
            <span className="dest-ringmap__time">{e('nearby2_time')}</span>
          </div>
          <div className="dest-ringmap__label dest-ringmap__label--phaselis">
            <h3>{e('nearby3_title')}</h3>
            <span className="dest-ringmap__time">{e('nearby3_time')}</span>
          </div>
          <div className="dest-ringmap__label dest-ringmap__label--kemer">
            <h3>{e('nearby4_title')}</h3>
            <span className="dest-ringmap__time">{e('nearby4_time')}</span>
          </div>
          <div className="dest-ringmap__label dest-ringmap__label--tahtali">
            <h3>{e('nearby5_title')}</h3>
            <span className="dest-ringmap__time">{e('nearby5_time')}</span>
          </div>
          <div className="dest-ringmap__label dest-ringmap__label--antalya">
            <h3>{e('nearby6_title')}</h3>
            <span className="dest-ringmap__time">{e('nearby6_time')}</span>
          </div>
        </div>
      </div>

      {/* Linker CTA */}
      <Link href={localePath(locale, 'booking')} className="lodge-linker lodge-linker--cirali">
        <div className="lodge-linker__image">
          <img src="https://www.olymposlodge.com.tr/wp-content/uploads/2025/04/IMG_5376-1.jpg" alt="Aktiviteler" loading="lazy" width={2000} height={1333} />
        </div>
        <div className="lodge-linker__content">
          <span className="lodge-linker__eyebrow">{e('linker_eyebrow')}</span>
          <h2 className="lodge-linker__title">{e('linker_title')}</h2>
          <p className="lodge-linker__lead">{e('linker_body')}</p>
          <ul className="lodge-linker__list">
            {linkerList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <span className="lodge-linker__cta">{e('linker_cta')}</span>
        </div>
      </Link>

      {/* Closing CTA */}
      <div className="dest-cta">
        <p className="dest-cta__quote">{e('cta_quote')}</p>
        <div className="dest-cta__actions">
          <Link href={localePath(locale, 'rooms')} className="btn-reserve">{e('cta_rooms')}</Link>
          <Link href={localePath(locale, 'contact')} className="btn-reserve">{t('nav.reserve')}</Link>
        </div>
      </div>
    </div>
  )
}

Experiences.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
