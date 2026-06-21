import { Helmet } from 'react-helmet-async'

const DEFAULT_IMAGE = 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0071-scaled.jpg'
const SITE_NAME = 'Olympos Lodge'
const BASE_URL = 'https://www.olymposlodge.com.tr'

const LODGING_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Olympos Lodge',
  url: BASE_URL,
  telephone: '+90-242-825-7170',
  image: DEFAULT_IMAGE,
  priceRange: '€€€',
  starRating: { '@type': 'Rating', ratingValue: '4' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Çıralı Mahallesi',
    addressLocality: 'Kemer',
    addressRegion: 'Antalya',
    postalCode: '07985',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.4137,
    longitude: 30.4754,
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Garden', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private beach access', value: true },
  ],
  checkinTime: '14:00',
  checkoutTime: '12:00',
})

interface PageMetaProps {
  title: string
  description?: string
  image?: string
  path?: string
  lang?: string
  jsonLd?: boolean
}

export default function PageMeta({
  title,
  description = '',
  image = DEFAULT_IMAGE,
  path = '',
  lang = 'tr',
  jsonLd = false,
}: PageMetaProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} – ${SITE_NAME}`
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />

      {/* hreflang — same URL serves all three languages */}
      <link rel="alternate" hrefLang="de" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="tr" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{LODGING_JSON_LD}</script>
      )}
    </Helmet>
  )
}
