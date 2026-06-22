import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

export default function SpaPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'tr'
  const s = (key: string) => t(`spa.${key}`)

  return (
    <div className="page--dest page--cirali">
      <PageMeta
        lang={lang}
        path="/spa"
        title={t('meta.spa_title')}
        description={t('meta.spa_desc')}
        image="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg"
      />

      {/* Hero */}
      <section className="child-hero child-hero--full">
        <img
          className="child-hero__image"
          src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg"
          alt={s('hero_alt')}
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1280}
        />
        <div className="child-hero__overlay" />
        <div className="child-hero__content">
          <h1 className="child-hero__title">{s('hero_title')}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="intro intro--dest">
        <div className="intro-title">{s('intro_title')}</div>
        <div className="intro-body">
          <div className="intro-col">
            <p>{s('intro_p1')}</p>
          </div>
          <div className="intro-col">
            <p>{s('intro_p2')}</p>
          </div>
        </div>
      </section>

      {/* Jacuzzi — image left */}
      <section className="tekne-card" id="jakuzi">
        <div className="tekne-card__image">
          <img
            src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg"
            alt={s('jac_title')}
            loading="lazy"
            width={1920}
            height={1280}
          />
        </div>
        <div className="tekne-card__content">
          <span className="tekne-card__label">{s('jac_label')}</span>
          <h2 className="tekne-card__title">{s('jac_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{s('jac_desc')}</p>
          <ul className="tekne-card__facts">
            <li>
              <span>{s('jac_f1_label')}</span>
              <strong>{s('jac_f1_value')}</strong>
            </li>
            <li>
              <span>{s('jac_f2_label')}</span>
              <strong>{s('jac_f2_value')}</strong>
            </li>
          </ul>
        </div>
      </section>

      {/* Sauna + Steam grid */}
      <div className="dest-activities__grid">
        <div className="dest-activity">
          <span className="dest-activity__tag">{s('sauna_label')}</span>
          <h3>{s('sauna_title')}</h3>
          <p>{s('sauna_desc')}</p>
        </div>
        <div className="dest-activity">
          <span className="dest-activity__tag">{s('steam_label')}</span>
          <h3>{s('steam_title')}</h3>
          <p>{s('steam_desc')}</p>
        </div>
      </div>

      {/* Massage — image right */}
      <section className="tekne-card tekne-card--reverse" id="masaj">
        <div className="tekne-card__content">
          <span className="tekne-card__label">{s('massage_label')}</span>
          <h2 className="tekne-card__title">{s('massage_title')}</h2>
          <div className="tekne-card__rule" />
          <p className="tekne-card__desc">{s('massage_desc')}</p>
          <ul className="tekne-card__facts">
            <li>
              <span>{s('massage_f1_label')}</span>
              <strong>{s('massage_f1_value')}</strong>
            </li>
            <li>
              <span>{s('massage_f2_label')}</span>
              <strong>{s('massage_f2_value')}</strong>
            </li>
          </ul>
          <div style={{ marginTop: '2rem' }}>
            <a
              href="mailto:info@olymposlodge.com.tr"
              className="btn-reserve"
            >
              {s('cta')}
            </a>
          </div>
        </div>
        <div className="tekne-card__image">
          <img
            src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5400.jpg"
            alt={s('massage_title')}
            loading="lazy"
            width={2000}
            height={1333}
          />
        </div>
      </section>

      {/* Back to lodge */}
      <div style={{ textAlign: 'center', padding: '4rem 2rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-cream)' }}>
        <Link
          to="/lodge"
          className="section-label"
          style={{ letterSpacing: '0.14em', color: 'var(--color-warm-gold)', textDecoration: 'none' }}
        >
          ← {t('nav.at_lodge')}
        </Link>
      </div>
    </div>
  )
}
