import type { ContactFormData, NewsletterFormData } from '../types'
import api from './client'

export const submitContact = (data: ContactFormData) =>
  api.post('/contact', data).then((r) => r.data)

export const subscribeNewsletter = (data: NewsletterFormData) =>
  api.post('/newsletter/subscribe', data).then((r) => r.data)
