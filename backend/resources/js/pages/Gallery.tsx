import React from 'react'
import { useTranslation } from '@/hooks/use-translation'
import SeoHead from '@/components/SeoHead'
import Layout from '@/components/layout/Layout'

const PHOTOS = [
  { src: '/images/cirali-vadisi-havadan-1520.webp', alt: 'Olympos Lodge kuş bakışı', w: 1520, h: 1075 },
  { src: '/images/oda-aqua-super-deluxe-1920.webp', alt: 'Aqua Super Deluxe Oda', w: 1920, h: 1280 },
  { src: '/images/oda-super-deluxe-1920.webp', alt: 'Super Deluxe Oda', w: 1920, h: 1281 },
  { src: '/images/bahce-oturma-2000.webp', alt: 'Olympos Lodge', w: 2000, h: 1333 },
  { src: '/images/oda-super-deluxe-2-1920.webp', alt: 'Super Deluxe Oda', w: 1920, h: 1280 },
  { src: '/images/olympos-lodge-tabela-1920.webp', alt: 'Olympos Lodge', w: 1920, h: 1280 },
  { src: '/images/bahce-golet-1700.webp', alt: 'Olympos Lodge', w: 1700, h: 1333 },
  { src: '/images/oda-deluxe-1920.webp', alt: 'Deluxe Oda', w: 1920, h: 1280 },
  { src: '/images/oda-standart-1920.webp', alt: 'Standart Oda', w: 1920, h: 1280 },
  { src: '/images/oda-gol-evi-1621.webp', alt: 'Göl Evi Deluxe', w: 1621, h: 1080 },
  { src: '/images/oda-antik-1920.webp', alt: 'Antik Oda', w: 1920, h: 1280 },
  { src: '/images/bahce-patika-2000.webp', alt: 'Olympos Lodge', w: 2000, h: 1333 },
  { src: '/images/cirali-koyu-1155.webp', alt: 'Olympos Antik Kenti', w: 1155, h: 1080 },
  { src: '/images/cirali-sahili-gunbatimi-1600.webp', alt: 'Olympos Lodge', w: 1600, h: 2277 },
  { src: '/images/bahce-hamak-2000.webp', alt: 'Masaj', w: 2000, h: 1333 },
]

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <div className="page--dest">
      <SeoHead title={t('meta.gallery_title')} description={t('meta.gallery_desc')} />
      <section className="child-hero child-hero--full">
        <img
          className="child-hero__image"
          src="/images/olympos-lodge-kus-bakisi-1366.webp"
          alt="Olympos Lodge Galeri"
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
          <div className="photo-grid__item" key={i}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              width={photo.w}
              height={photo.h}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

Gallery.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
