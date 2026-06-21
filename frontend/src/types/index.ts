export type Language = 'tr' | 'en' | 'de'

export interface Room {
  id: number
  slug: string
  name_tr: string
  name_en: string
  name_de: string
  description_tr: string
  description_en: string
  description_de: string
  tagline_tr: string | null
  tagline_en: string | null
  tagline_de: string | null
  capacity: number
  size_sqm: number | null
  bed_type: string
  view: string | null
  price_per_night: string | null
  currency: string
  amenities: string[] | null
  images: string[] | null
  sort_order: number
}

export interface BlogPost {
  id: number
  slug: string
  title_tr: string
  title_en: string
  title_de: string
  excerpt_tr: string | null
  excerpt_en: string | null
  excerpt_de: string | null
  content_tr?: string
  content_en?: string
  content_de?: string
  cover_image: string | null
  author: string | null
  tags: string[] | null
  published_at: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  language: Language
}

export interface NewsletterFormData {
  email: string
  name?: string
  language: Language
  consent: boolean
}
