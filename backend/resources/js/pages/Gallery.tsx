import { useState } from 'react'
import Lightbox from '@/components/Lightbox'
import React from 'react'
import { useTranslation } from '@/hooks/use-translation'
import SeoHead from '@/components/SeoHead'
import Layout from '@/components/layout/Layout'

const PHOTOS = [
  { src: '/images/cirali-vadisi-havadan-1520.webp', alt: 'alt.cirali_valley_aerial', w: 1520, h: 1075 },
  { src: '/images/oda-super-deluxe-1920.webp', alt: 'alt.room_super_deluxe', w: 1920, h: 1281 },
  { src: '/images/bahce-oturma-2000.webp', alt: 'alt.garden_seating', w: 2000, h: 1333 },
  { src: '/images/oda-super-deluxe-2-1920.webp', alt: 'alt.room_super_deluxe', w: 1920, h: 1280 },
  { src: '/images/olympos-lodge-tabela-1920.webp', alt: 'alt.lodge_sign', w: 1920, h: 1280 },
  { src: '/images/bahce-golet-1700.webp', alt: 'alt.garden_pond', w: 1700, h: 1333 },
  { src: '/images/oda-deluxe-1920.webp', alt: 'alt.room_deluxe', w: 1920, h: 1280 },
  { src: '/images/oda-standart-1920.webp', alt: 'alt.room_standard', w: 1920, h: 1280 },
  { src: '/images/oda-gol-evi-1621.webp', alt: 'alt.room_lake_house', w: 1621, h: 1080 },
  { src: '/images/bahce-patika-2000.webp', alt: 'alt.garden_path', w: 2000, h: 1333 },
  { src: '/images/cirali-koyu-1155.webp', alt: 'alt.cirali_bay', w: 1155, h: 1080 },
  { src: '/images/cirali-sahili-gunbatimi-1600.webp', alt: 'alt.beach_dusk', w: 1600, h: 2277 },
  { src: '/images/bahce-hamak-2000.webp', alt: 'alt.garden_lawn', w: 2000, h: 1333 },
]

export default function Gallery() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="page--dest">
      <SeoHead title={t('meta.gallery_title')} description={t('meta.gallery_desc')} />
      <section className="child-hero child-hero--full">
        <img
          className="child-hero__image"
          src="/images/olympos-lodge-kus-bakisi-1366.webp"
          alt={t('alt.lodge_aerial')}
          fetchPriority="high"
          decoding="async"
          width={1366}
          height={1075}
        />
        <div className="child-hero__overlay" />
        <div className="child-hero__content">
          <h1 className="child-hero__title">{t('nav.gallery')}</h1>
        </div>
      </section>

      <div className="photo-grid">
        {PHOTOS.map((photo, i) => (
          <div className="photo-grid__item" key={i} onClick={() => setOpenIndex(i)}>
            {/* Photos start transparent (pages.css) and fade in once loaded. The ref covers
                images that finished loading before React attached the onLoad handler. */}
            <img
              src={photo.src}
              alt={t(photo.alt)}
              loading="lazy"
              width={photo.w}
              height={photo.h}
              ref={(img) => { if (img?.complete && img.naturalWidth > 0) img.classList.add('is-loaded') }}
              onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
            />
          </div>
        ))}
      </div>

      <Lightbox
        photos={PHOTOS.map((photo) => ({ src: photo.src, alt: t(photo.alt) }))}
        index={openIndex}
        onChange={setOpenIndex}
        labels={{ viewer: t('nav.gallery'), close: t('alt.close_viewer'), previous: t('alt.previous_photo'), next: t('alt.next_photo') }}
      />
    </div>
  )
}

Gallery.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
