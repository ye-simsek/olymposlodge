import type { BlogPost } from '../types'
import api from './client'

export const getBlogPosts = (): Promise<BlogPost[]> =>
  api.get<BlogPost[]>('/blog').then((r) => r.data)

export const getBlogPost = (slug: string): Promise<BlogPost> =>
  api.get<BlogPost>(`/blog/${slug}`).then((r) => r.data)
