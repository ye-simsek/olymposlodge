const WP = 'https://www.olymposlodge.com.tr/wp-content/uploads'

export interface RoomData {
  slug: string
  heroImg: string
  heroAlt: string
  view: string
  size: string | null
  bed: string
  capacity: string
  fullPhoto1: string
  editorial1: {
    desc: string
    inset: string
    right: string
  }
  fullPhoto2: string
  editorial2: {
    desc: string
    inset: string
    right: string
  }
  strip: [string, string, string]
  amenities: string[]
  amenitiesDesc: string
  ctaQuote: string
  prev: { slug: string; name: string; img: string }
  next: { slug: string; name: string; img: string }
}

export const ROOMS: Record<string, RoomData> = {
  'aqua-super-deluxe': {
    slug: 'aqua-super-deluxe',
    heroImg: `${WP}/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg`,
    heroAlt: 'Aqua Super Deluxe',
    view: 'Bahçe & Deniz',
    size: '105 m²',
    bed: 'Çift Kişilik',
    capacity: '2 Kişi',
    fullPhoto1: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
    editorial1: {
      desc: 'asd_p1',
      inset: `${WP}/2024/11/IMG_5150.jpg`,
      right: `${WP}/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg`,
    },
    fullPhoto2: `${WP}/2025/04/IMG_5376-1.jpg`,
    editorial2: {
      desc: 'asd_p2',
      inset: `${WP}/2024/11/IMG_5400.jpg`,
      right: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
    },
    strip: [
      `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
      `${WP}/2025/04/IMG_5376-1.jpg`,
      `${WP}/2024/11/IMG_5400.jpg`,
    ],
    amenitiesDesc: 'asd_p3',
    amenities: ['amenity_ac','amenity_terrace','amenity_sea','amenity_fireplace','amenity_jacuzzi','amenity_rain_shower','amenity_espresso','amenity_kettle','amenity_minibar','amenity_safe','amenity_wifi'],
    ctaQuote: 'asd_p4',
    prev: { slug: 'standart', name: 'Standart Oda', img: `${WP}/2024/11/olympos-lodge-double-room-1.jpg` },
    next: { slug: 'super-deluxe', name: 'Super Deluxe', img: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg` },
  },
  'super-deluxe': {
    slug: 'super-deluxe',
    heroImg: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg`,
    heroAlt: 'Super Deluxe',
    view: 'Bahçe Manzarası',
    size: '105 m²',
    bed: 'Çift Kişilik',
    capacity: '2 Kişi',
    fullPhoto1: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg`,
    editorial1: {
      desc: 'sd_p1',
      inset: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
      right: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg`,
    },
    fullPhoto2: `${WP}/2025/04/IMG_5376-1.jpg`,
    editorial2: {
      desc: 'sd_p2',
      inset: `${WP}/2024/11/IMG_5400.jpg`,
      right: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
    },
    strip: [
      `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
      `${WP}/2025/04/IMG_5376-1.jpg`,
      `${WP}/2024/11/IMG_5400.jpg`,
    ],
    amenitiesDesc: 'sd_p3',
    amenities: ['amenity_ac','amenity_terrace','amenity_garden','amenity_fireplace','amenity_jacuzzi','amenity_rain_shower','amenity_espresso','amenity_furniture','amenity_minibar','amenity_wifi'],
    ctaQuote: 'sd_p4',
    prev: { slug: 'aqua-super-deluxe', name: 'Aqua Super Deluxe', img: `${WP}/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg` },
    next: { slug: 'deluxe', name: 'Deluxe', img: `${WP}/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg` },
  },
  'deluxe': {
    slug: 'deluxe',
    heroImg: `${WP}/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg`,
    heroAlt: 'Deluxe',
    view: 'Bahçe Manzarası',
    size: '70 m²',
    bed: 'Çift Kişilik',
    capacity: '2 Kişi',
    fullPhoto1: `${WP}/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg`,
    editorial1: {
      desc: 'dx_p1',
      inset: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
      right: `${WP}/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg`,
    },
    fullPhoto2: `${WP}/2025/04/IMG_5376-1.jpg`,
    editorial2: {
      desc: 'dx_p2',
      inset: `${WP}/2024/11/IMG_5400.jpg`,
      right: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
    },
    strip: [
      `${WP}/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg`,
      `${WP}/2025/04/IMG_5376-1.jpg`,
      `${WP}/2024/11/IMG_5150.jpg`,
    ],
    amenitiesDesc: 'dx_p3',
    amenities: ['amenity_ac','amenity_terrace','amenity_garden','amenity_fireplace','amenity_jacuzzi','amenity_rain_shower','amenity_espresso','amenity_minibar','amenity_wifi'],
    ctaQuote: 'dx_p4',
    prev: { slug: 'super-deluxe', name: 'Super Deluxe', img: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg` },
    next: { slug: 'gol-evi', name: 'Göl Evi', img: `${WP}/2025/11/Lake-House-Deluxe-room-9.jpg` },
  },
  'gol-evi': {
    slug: 'gol-evi',
    heroImg: `${WP}/2025/11/Lake-House-Deluxe-room-9.jpg`,
    heroAlt: 'Göl Evi',
    view: 'Göl Manzarası',
    size: '60 m²',
    bed: 'Çift Kişilik',
    capacity: '2 Kişi',
    fullPhoto1: `${WP}/2025/11/Lake-House-Deluxe-room-9.jpg`,
    editorial1: {
      desc: 'ge_p1',
      inset: `${WP}/2024/11/IMG_5150.jpg`,
      right: `${WP}/2025/11/Lake-House-Deluxe-room-9.jpg`,
    },
    fullPhoto2: `${WP}/2025/04/IMG_5376-1.jpg`,
    editorial2: {
      desc: 'ge_p2',
      inset: `${WP}/2024/11/IMG_5400.jpg`,
      right: `${WP}/2025/11/Lake-House-Deluxe-room-9.jpg`,
    },
    strip: [
      `${WP}/2025/11/Lake-House-Deluxe-room-9.jpg`,
      `${WP}/2025/04/IMG_5376-1.jpg`,
      `${WP}/2024/11/IMG_5150.jpg`,
    ],
    amenitiesDesc: 'ge_p3',
    amenities: ['amenity_ac','amenity_terrace','amenity_lake','amenity_fireplace','amenity_rain_shower','amenity_espresso','amenity_minibar','amenity_wifi'],
    ctaQuote: 'ge_p4',
    prev: { slug: 'deluxe', name: 'Deluxe', img: `${WP}/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg` },
    next: { slug: 'antik', name: 'Antik Oda', img: `${WP}/2024/11/olympos-lodge-antique-room-3.jpg` },
  },
  'antik': {
    slug: 'antik',
    heroImg: `${WP}/2024/11/olympos-lodge-antique-room-3.jpg`,
    heroAlt: 'Antik Oda',
    view: 'Bahçe Manzarası',
    size: null,
    bed: 'Çift Kişilik',
    capacity: '2 Kişi',
    fullPhoto1: `${WP}/2024/11/olympos-lodge-antique-room-3.jpg`,
    editorial1: {
      desc: 'an_p1',
      inset: `${WP}/2024/11/IMG_5510-1.jpg`,
      right: `${WP}/2024/11/olympos-lodge-antique-room-3.jpg`,
    },
    fullPhoto2: `${WP}/2024/11/MG_7191.jpg`,
    editorial2: {
      desc: 'an_p2',
      inset: `${WP}/2024/11/IMG_5400.jpg`,
      right: `${WP}/2024/11/olympos-lodge-antique-room-3.jpg`,
    },
    strip: [
      `${WP}/2024/11/olympos-lodge-antique-room-3.jpg`,
      `${WP}/2024/11/IMG_5510-1.jpg`,
      `${WP}/2024/11/MG_7191.jpg`,
    ],
    amenitiesDesc: 'an_p3',
    amenities: ['amenity_ac','amenity_terrace','amenity_garden','amenity_rain_shower','amenity_minibar','amenity_wifi'],
    ctaQuote: 'an_p4',
    prev: { slug: 'gol-evi', name: 'Göl Evi', img: `${WP}/2025/11/Lake-House-Deluxe-room-9.jpg` },
    next: { slug: 'standart', name: 'Standart Oda', img: `${WP}/2024/11/olympos-lodge-double-room-1.jpg` },
  },
  'standart': {
    slug: 'standart',
    heroImg: `${WP}/2024/11/olympos-lodge-double-room-1.jpg`,
    heroAlt: 'Standart Oda',
    view: 'Bahçe Manzarası',
    size: '35 m²',
    bed: 'Çift Kişilik',
    capacity: '2 Kişi',
    fullPhoto1: `${WP}/2024/11/olympos-lodge-double-room-1.jpg`,
    editorial1: {
      desc: 'st_p1',
      inset: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
      right: `${WP}/2024/11/olympos-lodge-double-room-1.jpg`,
    },
    fullPhoto2: `${WP}/2025/04/IMG_5376-1.jpg`,
    editorial2: {
      desc: 'st_p2',
      inset: `${WP}/2024/11/IMG_5400.jpg`,
      right: `${WP}/2024/11/olympos-lodge-double-room-1.jpg`,
    },
    strip: [
      `${WP}/2024/11/olympos-lodge-double-room-1.jpg`,
      `${WP}/2025/04/IMG_5376-1.jpg`,
      `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg`,
    ],
    amenitiesDesc: 'st_p3',
    amenities: ['amenity_ac','amenity_terrace','amenity_garden','amenity_rain_shower','amenity_minibar','amenity_wifi'],
    ctaQuote: 'st_p4',
    prev: { slug: 'antik', name: 'Antik Oda', img: `${WP}/2024/11/olympos-lodge-antique-room-3.jpg` },
    next: { slug: 'aqua-super-deluxe', name: 'Aqua Super Deluxe', img: `${WP}/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg` },
  },
}

export const ROOM_ORDER = ['aqua-super-deluxe','super-deluxe','deluxe','gol-evi','antik','standart']
