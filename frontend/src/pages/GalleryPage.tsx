import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'

const PHOTOS = [
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0118-Large-e1731100925618.jpg', alt: 'Olympos Lodge kuş bakışı', w: 1520, h: 1075 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg', alt: 'Aqua Super Deluxe Oda', w: 1920, h: 1280 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg', alt: 'Super Deluxe Oda', w: 1920, h: 1281 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2025/04/IMG_5376-1.jpg', alt: 'Olympos Lodge', w: 2000, h: 1333 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg', alt: 'Super Deluxe Oda', w: 1920, h: 1280 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/MG_7191.jpg', alt: 'Olympos Lodge', w: 1920, h: 1280 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2025/04/IMG_5434-e1731093615320-1.jpg', alt: 'Olympos Lodge', w: 1700, h: 1333 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg', alt: 'Deluxe Oda', w: 890, h: 664 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-double-room-1.jpg', alt: 'Standart Oda', w: 1920, h: 1280 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2025/11/Lake-House-Deluxe-room-9.jpg', alt: 'Göl Evi Deluxe', w: 1621, h: 1080 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-antique-room-3.jpg', alt: 'Antik Oda', w: 1920, h: 1280 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5150.jpg', alt: 'Olympos Lodge', w: 2000, h: 1333 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-e1731029804798.jpg', alt: 'Olympos Antik Kenti', w: 1155, h: 1080 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5510-1.jpg', alt: 'Olympos Lodge', w: 1600, h: 2277 },
  { src: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5400.jpg', alt: 'Masaj', w: 2000, h: 1333 },
]

export default function GalleryPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'tr'

  return (
    <div className="page--dest">
      <PageMeta
        lang={lang}
        path="/gallery"
        title={t('meta.gallery_title')}
        description={t('meta.gallery_desc')}
        image="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0071-Large-e1731205515573.jpg"
      />
      <section className="child-hero child-hero--full">
        <img
          className="child-hero__image"
          src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0071-Large-e1731205515573.jpg"
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
