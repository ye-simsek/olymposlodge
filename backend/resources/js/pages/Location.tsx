import React, { useEffect, useRef } from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import Layout from '@/components/layout/Layout'

export default function Location() {
  const { t } = useTranslation()
  const { locale } = usePageProps()
  const l = (key: string) => t(`location.${key}`)
  // revealRef kept for the map container (only used for IntersectionObserver in effect)
  const revealRef = useRef<HTMLDivElement>(null)

  // SSR-safe: IntersectionObserver and document.querySelectorAll run only in the browser
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.loc-reveal').forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 0.08}s`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // SSR-safe: navigator.userAgent and window.open are only accessed inside the onClick handler
  const handleDirectionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      e.preventDefault()
      window.open(
        'https://www.google.com/maps/dir/?api=1&destination=36.40182864027301,30.47590463023936',
        '_blank',
        'noopener'
      )
    }
  }

  return (
    <div className="page--dest">
      <SeoHead title={t('meta.location_title')} description={t('meta.location_desc')} />

      {/* Hero */}
      <section className="loc-hero">
        <img
          className="loc-hero__image"
          src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0118-Large-e1731100925618.jpg"
          alt="Çıralı vadisi havadan görünüm"
          fetchPriority="high"
          decoding="async"
          width={1520}
          height={1075}
        />
        <div className="loc-hero__overlay" />
        <div className="loc-hero__content">
          <span className="loc-hero__label">{l('label')}</span>
          <h1 className="loc-hero__title">{l('page_title')}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="intro loc-intro loc-reveal">
        <h2 className="intro-title">{l('intro_title')}</h2>
        <div className="intro-body">
          <div className="intro-col">
            <p>{l('intro_body')}</p>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Getting Here */}
      <section className="loc-getting-here">
        <div className="loc-getting-here__text">
          <h2 className="loc-getting-here__title loc-reveal">{l('hero_title')}</h2>
          <p className="loc-getting-here__lead">{l('lead')}</p>

          <div className="loc-method loc-reveal">
            <p className="loc-method__title">{l('method_car_title')}</p>
            <p className="loc-method__body">{l('method_car_body')}</p>
            <p className="loc-method__note">{l('method_car_note')}</p>
          </div>

          <div className="loc-method loc-reveal">
            <p className="loc-method__title">{l('method_fly_title')}</p>
            <p className="loc-method__body">{l('method_fly_body')}</p>
          </div>

          <div className="loc-method loc-reveal">
            <p className="loc-method__title">{l('method_transfer_title')}</p>
            <p className="loc-method__body">{l('method_transfer_body')}</p>
            <p className="loc-method__note">
              <a href="mailto:info@olymposlodge.com.tr" style={{ color: 'var(--color-warm-gold)', textDecoration: 'none' }}>
                info@olymposlodge.com.tr
              </a>
              {' · €100'}
            </p>
          </div>

          <a
            href="geo:36.40182864027301,30.47590463023936?q=Olympos+Lodge+Otel"
            className="loc-directions-btn loc-reveal"
            onClick={handleDirectionsClick}
          >
            {l('directions_btn')}
          </a>
        </div>
        {/* Google Maps iframe — static markup, no browser API */}
        <div className="loc-getting-here__map loc-reveal" ref={revealRef}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4469.900768249908!2d30.47331777670837!3d36.40184379005226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3b7c8f483ada7%3A0xead3c68b0c46fb38!2sOlympos%20Lodge%20Otel!5e1!3m2!1sen!2str!4v1775126998589!5m2!1sen!2str"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Olympos Lodge Konum"
          />
        </div>
      </section>

      {/* Distances */}
      <section className="loc-distances">
        <div className="loc-distances__list">
          <div className="loc-distances__item loc-reveal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span className="loc-distances__text">
              Chimaera (Yanartaş) <span>— 3,5 km</span>
            </span>
          </div>
          <div className="loc-distances__item loc-reveal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3"/><path d="M12 8v13M8 21h8"/>
            </svg>
            <span className="loc-distances__text">
              Olympos Antik Kenti <span>— yürüyüş mesafesi</span>
            </span>
          </div>
          <div className="loc-distances__item loc-reveal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3"/><path d="M12 8v13M8 21h8"/>
            </svg>
            <span className="loc-distances__text">
              Phaselis Antik Kenti <span>— 25 km</span>
            </span>
          </div>
          <div className="loc-distances__item loc-reveal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 3 19 2c-1.5-.5-3 0-4.5 1.5L11 7 2.8 5.2c-.5-.1-.9.4-.7.9l5 11.9c.1.4.6.6 1 .4l3.5-1.5 2.5 4.5c.1.3.5.4.8.3l2-.8c.4-.3.5-.8.3-1.2z"/>
            </svg>
            <span className="loc-distances__text">
              Olympos Teleferik <span>— 35 km</span>
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="loc-cta loc-reveal">
        <h2 className="loc-cta__title">{l('cta_title')}</h2>
        <p className="loc-cta__sub">{l('cta_sub')}</p>
        <div className="loc-cta__actions">
          <a
            href="mailto:info@olymposlodge.com.tr"
            className="btn-reserve"
            style={{ background: 'var(--color-warm-gold)', borderColor: 'var(--color-warm-gold)', color: '#fff' }}
          >
            {l('cta_contact')}
          </a>
        </div>
      </section>

      {/* Experiences Teaser */}
      <section className="loc-exp-teaser loc-reveal">
        <div className="loc-exp-teaser__image">
          <img
            src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0118-Large-e1731100925618.jpg"
            alt="Çıralı deneyimleri"
            loading="lazy"
            width={1520}
            height={1075}
          />
        </div>
        <div className="loc-exp-teaser__content">
          <h2 className="loc-exp-teaser__title">{l('exp_title')}</h2>
          <p className="loc-exp-teaser__body">{l('exp_body')}</p>
          <Link href={localePath(locale, 'experiences')} className="loc-exp-teaser__link">{l('exp_cta')}</Link>
        </div>
      </section>
    </div>
  )
}

Location.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
