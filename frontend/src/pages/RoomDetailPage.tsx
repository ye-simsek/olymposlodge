import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link, Navigate } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

interface RoomImages {
  hero: string
  full1: string
  ed1_inset: string
  ed1_right: string
  full2: string
  ed2_inset: string
  ed2_right: string
  strip: [string, string, string]
}

interface RoomNeighbour {
  slug: string
  name_tr: string; name_en: string; name_de: string
  hero: string
}

interface RoomTexts { p1: string; p2: string; p3: string; p4: string }

interface ApiRoom {
  slug: string
  key_prefix: string
  name_tr: string; name_en: string; name_de: string
  tagline_tr: string; tagline_en: string; tagline_de: string
  texts_tr: RoomTexts; texts_en: RoomTexts; texts_de: RoomTexts
  capacity: number
  size_sqm: number | null
  bed_type: string
  view: string
  amenities: string[]
  images: RoomImages
  prev: RoomNeighbour
  next: RoomNeighbour
}

const VIEW_LABELS: Record<string, Record<string, string>> = {
  tr: { garden: 'Bahçe Manzarası', lake: 'Göl Manzarası', garden_sea: 'Bahçe & Deniz' },
  en: { garden: 'Garden View',     lake: 'Lake View',      garden_sea: 'Garden & Sea'  },
  de: { garden: 'Gartenblick',     lake: 'Seeblick',       garden_sea: 'Garten & Meer' },
}

const BED_LABELS: Record<string, Record<string, string>> = {
  tr: { Queen: 'Çift Kişilik', Double: 'Çift Kişilik', 'Queen Brass': 'Pirinç Karyola' },
  en: { Queen: 'Queen Bed',    Double: 'Double Bed',    'Queen Brass': 'Brass Bed'      },
  de: { Queen: 'Queensize',    Double: 'Doppelbett',    'Queen Brass': 'Messingbett'    },
}

export default function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.split('-')[0] || 'tr') as 'tr' | 'en' | 'de'

  const [room, setRoom]       = useState<ApiRoom | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ctaRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    obs.observe(ctaRef.current)
    return () => obs.disconnect()
  }, [room])

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)

    fetch(`/api/v1/rooms/${slug}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null }
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: ApiRoom | null) => { if (data) setRoom(data) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (notFound) return <Navigate to="/rooms" replace />
  if (loading || !room) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.2em', color: 'var(--color-warm-gold)' }}>
        {t('common.loading')}
      </span>
    </div>
  )

  const d    = (key: string) => t(`room_detail.${key}`)
  const name = room[`name_${lang}`]
  const img  = room.images
  const texts = room[`texts_${lang}`] ?? room.texts_tr ?? { p1: '', p2: '', p3: '', p4: '' }

  const prevName = room.prev[`name_${lang}`]
  const nextName = room.next[`name_${lang}`]

  const viewLabel = VIEW_LABELS[lang]?.[room.view] ?? room.view
  const bedLabel  = BED_LABELS[lang]?.[room.bed_type] ?? room.bed_type

  return (
    <>
      <PageMeta
        lang={lang}
        path={`/rooms/${slug}`}
        title={name}
        description={room[`tagline_${lang}`] || name}
        image={img.hero}
      />

      {/* Hero */}
      <section className="room-hero">
        <img className="room-hero__image" src={img.hero} alt={name}
          fetchPriority="high" decoding="async" width="1920" height="1280" />
        <div className="room-hero__overlay"></div>
        <div className="room-hero__info">
          <h1 className="room-hero__title">{name}</h1>
        </div>
        <div className="room-hero__scroll">{d('discover')}</div>
      </section>

      {/* Specs strip */}
      <div className="room-specs">
        <div className="room-spec">
          <span className="room-spec__icon">
            <img src="/images/icons/garden-view.svg" alt="" width="32" height="32" />
          </span>
          <span className="room-spec__value">{viewLabel}</span>
          <span className="room-spec__label">{d('spec_view')}</span>
        </div>
        {room.size_sqm && (
          <div className="room-spec">
            <span className="room-spec__icon">
              <img src="/images/icons/room-size.svg" alt="" width="32" height="32" />
            </span>
            <span className="room-spec__value">{room.size_sqm} m²</span>
            <span className="room-spec__label">{d('spec_size')}</span>
          </div>
        )}
        <div className="room-spec">
          <span className="room-spec__icon">
            <img src="/images/icons/bed.svg" alt="" width="32" height="32" />
          </span>
          <span className="room-spec__value">{bedLabel}</span>
          <span className="room-spec__label">{d('spec_bed')}</span>
        </div>
        <div className="room-spec">
          <span className="room-spec__icon"></span>
          <span className="room-spec__value">{room.capacity} {t('common.guests')}</span>
          <span className="room-spec__label">{d('spec_capacity')}</span>
        </div>
      </div>

      {/* Full photo 1 */}
      <div className="room-full-photo">
        <img src={img.full1} alt={name} loading="lazy" width="1920" height="1280" />
      </div>

      {/* Editorial 1 */}
      <div className="room-editorial">
        <div className="room-editorial__left">
          <p className="room-editorial__desc">{texts.p1}</p>
          <div className="room-editorial__inset">
            <img src={img.ed1_inset} alt={name} loading="lazy" width="2000" height="1333" />
          </div>
        </div>
        <div className="room-editorial__right">
          <img src={img.ed1_right} alt={name} loading="lazy" width="1920" height="1280" />
        </div>
      </div>

      {/* Full photo 2 */}
      <div className="room-full-photo">
        <img src={img.full2} alt={name} loading="lazy" width="2000" height="1333" />
      </div>

      {/* Editorial 2 */}
      <div className="room-editorial room-editorial--reverse">
        <div className="room-editorial__left">
          <p className="room-editorial__desc">{texts.p2}</p>
          <div className="room-editorial__inset">
            <img src={img.ed2_inset} alt={name} loading="lazy" width="2000" height="1333" />
          </div>
        </div>
        <div className="room-editorial__right">
          <img src={img.ed2_right} alt={name} loading="lazy" width="1920" height="1280" />
        </div>
      </div>

      {/* Image strip */}
      <div className="room-strip">
        {img.strip.map((src, i) => (
          <div key={i} className="room-strip__item">
            <img src={src} alt={name} loading="lazy" width="1920" height="1280" />
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div className="room-amenities-block">
        <span className="section-label">{d('amenities_label')}</span>
        <p className="room-amenities-block__desc">{texts.p3}</p>
        <ul className="room-amenities__list">
          {room.amenities.map(key => (
            <li key={key}>{d(key)}</li>
          ))}
        </ul>
      </div>

      {/* Full photo 3 */}
      <div className="room-full-photo">
        <img src={img.hero} alt={name} loading="lazy" width="1920" height="1280" />
      </div>

      {/* CTA */}
      <div className="room-cta" ref={ctaRef}>
        <p className="room-cta__quote">{texts.p4}</p>
        <Link to={`/booking?room=${room.slug}`} className="btn-reserve">{d('check_avail')}</Link>
      </div>

      {/* Sticky booking bar */}
      <div className={`room-sticky-cta${stickyVisible ? ' room-sticky-cta--visible' : ''}`}>
        <span className="room-sticky-cta__name">{name}</span>
        <Link to={`/booking?room=${room.slug}`} className="btn-reserve room-sticky-cta__btn">
          {d('check_avail')}
        </Link>
      </div>

      {/* Prev / Next */}
      <nav className="room-nav">
        <Link to={`/rooms/${room.prev.slug}`} className="room-nav__item">
          <img className="room-nav__image" src={room.prev.hero} alt={prevName}
            loading="lazy" width="1920" height="1280" />
          <span className="room-nav__direction">{d('nav_prev')}</span>
          <span className="room-nav__name">{prevName}</span>
        </Link>
        <Link to={`/rooms/${room.next.slug}`} className="room-nav__item">
          <img className="room-nav__image" src={room.next.hero} alt={nextName}
            loading="lazy" width="1920" height="1280" />
          <span className="room-nav__direction">{d('nav_next')}</span>
          <span className="room-nav__name">{nextName}</span>
        </Link>
      </nav>
    </>
  )
}
