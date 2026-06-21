import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

interface ApiRoom {
  slug: string
  name_tr: string; name_en: string; name_de: string
  description_tr: string; description_en: string; description_de: string
  size_sqm: number | null
  view: string
  images: { hero: string }
}

export default function RoomsPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.split('-')[0] || 'tr') as 'tr' | 'en' | 'de'

  const [rooms, setRooms] = useState<ApiRoom[]>([])

  useEffect(() => {
    fetch('/api/v1/rooms')
      .then(r => r.ok ? r.json() : [])
      .then(setRooms)
      .catch(() => setRooms([]))
  }, [])

  return (
    <>
      <PageMeta
        lang={lang}
        path="/rooms"
        title={t('meta.rooms_title')}
        description={t('meta.rooms_desc')}
      />
      {/* Page Hero */}
      <section className="rooms-page-hero">
        <div className="rooms-page-hero__image">
          <img src="/images/rooms-hero.webp" alt="Olympos Lodge Odaları"
            fetchPriority="high" decoding="async" width="4413" height="2991" />
        </div>
        <div className="rooms-page-hero__overlay">
          <h1 className="rooms-page-hero__title">{t('rooms.label')}</h1>
          <p className="rooms-page-hero__subtitle">{t('rooms_page.hero_subtitle')}</p>
        </div>
      </section>

      {/* Room Rows */}
      <section className="rooms rooms--page" id="rooms">
        <div className="rooms-list">
          {rooms.map((room, i) => {
            const name = room[`name_${lang}`]
            const desc = room[`description_${lang}`]
            return (
              <div key={room.slug}>
                <div className={`room-row room-row--landscape${i % 2 === 1 ? ' room-row--reverse' : ''}`}>
                  <Link to={`/rooms/${room.slug}`} className="room-row__image">
                    <img src={room.images?.hero} alt={name} loading="lazy" />
                  </Link>
                  <div className="room-row__content">
                    <Link to={`/rooms/${room.slug}`}><h3>{name}</h3></Link>
                    <p>{desc}</p>
                    <div className="room-row__specs">
                      {room.size_sqm && (
                        <>
                          <img className="room-row__spec-icon room-row__spec-icon--size"
                            src="/images/icons/room-size.svg" alt="" width="20" height="20" />
                          {room.size_sqm} m²
                          <span className="room-row__spec-sep">·</span>
                        </>
                      )}
                      <img className="room-row__spec-icon"
                        src={room.view === 'lake' ? '/images/icons/lake-view.svg' : '/images/icons/garden-view.svg'}
                        alt="" width="20" height="20" />
                      <span>{room.view === 'lake' ? t('rooms.view_lake') : t('rooms.view_garden')}</span>
                    </div>
                    <Link to={`/rooms/${room.slug}`} className="room-row__link">{t('rooms.view_more')}</Link>
                  </div>
                </div>
                {i < rooms.length - 1 && <div className="room-separator"></div>}
              </div>
            )
          })}
        </div>
      </section>

      {/* In Every Room */}
      <section className="rooms-all-includes">
        <div className="container">
          <span className="section-label">{t('rooms_page.includes_label')}</span>
          <div className="rooms-all-includes__grid">

            <div className="rooms-all-includes__item">
              <div className="rooms-all-includes__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <span className="rooms-all-includes__label">{t('rooms_page.include_breakfast')}</span>
            </div>

            <div className="rooms-all-includes__item">
              <div className="rooms-all-includes__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="rooms-all-includes__label">{t('rooms_page.include_wifi')}</span>
            </div>

            <div className="rooms-all-includes__item">
              <div className="rooms-all-includes__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="5.64" y2="18.36" />
                </svg>
              </div>
              <span className="rooms-all-includes__label">{t('rooms_page.include_ac')}</span>
            </div>

            <div className="rooms-all-includes__item">
              <div className="rooms-all-includes__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="rooms-all-includes__label">{t('rooms_page.include_terrace')}</span>
            </div>

          </div>
        </div>
      </section>

      {/* Offers */}
      <div className="offers-dark">
        <div className="offers-dark__header">
          <span className="section-label">{t('nav.offers')}</span>
        </div>
        <div className="offers-grid">
          <div className="offer-card">
            <p className="offer-card__title">{t('rooms_page.offer1_title')}</p>
            <p className="offer-card__desc">{t('rooms_page.offer1_desc')}</p>
            <Link to="/booking" className="offer-card__cta">{t('nav.reserve')} →</Link>
          </div>
          <div className="offer-card">
            <p className="offer-card__title">{t('rooms_page.offer2_title')}</p>
            <p className="offer-card__desc">{t('rooms_page.offer2_desc')}</p>
            <Link to="/booking" className="offer-card__cta">{t('nav.reserve')} →</Link>
          </div>
        </div>
        <div style={{ height: 'var(--space-xl)' }}></div>
      </div>
    </>
  )
}
