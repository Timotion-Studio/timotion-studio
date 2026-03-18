import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string }
  alt?: string
}

export interface SanityProject {
  _id: string
  _type: 'project'
  title: string
  slug: { current: string }
  category?: 'fashion' | 'wedding' | 'brand' | 'personal'
  coverImage?: SanityImage
  vimeoId?: string
  shortDescription?: string
  longDescription?: PortableTextBlock[]
  clientName?: string
  year?: number
  tags?: string[]
  featuredOrder?: number
}

export interface SanityTestimonial {
  _id: string
  _type: 'testimonial'
  quote: string
  clientName: string
  role?: string
  photo?: SanityImage
  order?: number
}

export interface SanityHeroReel {
  _id: string
  _type: 'heroReel'
  vimeoId: string
  posterImage: SanityImage | { asset: { url: string } }
  backgroundVideo?: { asset: { url: string } }
  active: boolean
}
