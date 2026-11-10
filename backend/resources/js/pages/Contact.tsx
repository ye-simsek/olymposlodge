import React from 'react'
import { useForm } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import Layout from '@/components/layout/Layout'
import Honeypot from '@/components/Honeypot'
import MapEmbed from '@/components/MapEmbed'

export default function Contact() {
  const { t } = useTranslation()
  const { locale } = usePageProps()

  const c = (key: string) => t(`contact.${key}`)

  const form = useForm({
    salutation: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  })

  // Inertia's `recentlySuccessful` resets itself after two seconds, which made the
  // confirmation flash and vanish. This stays until the guest starts a new message.
  const [sent, setSent] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(false)
    form.post(localePath(locale, 'contact'), {
      preserveScroll: true,
      onSuccess: () => { form.reset(); setSent(true) },
    })
  }

  return (
    <>
      <SeoHead title={t('meta.contact_title')} description={t('meta.contact_desc')} />
      {/* Sticky Title */}
      <div className="contact-sticky-hero">
        <h1 className="contact-sticky-hero__title">{c('hero_title')}</h1>
      </div>

      {/* Contact Grid */}
      <section className="contact-page">
        <div className="contact-grid">

          {/* Left: Info */}
          <div className="contact-info">
            <p className="contact-info__label">{c('info_label')}</p>

            <div className="contact-detail">
              <p className="contact-detail__value"
                dangerouslySetInnerHTML={{ __html: c('address_value') }} />
            </div>

            <div className="contact-detail">
              <p className="contact-detail__label">{c('phone_label')}</p>
              <p className="contact-detail__value">
                <a href="tel:+905323083486">+90 532 308 34 86</a>
              </p>
            </div>

            <div className="contact-detail">
              <p className="contact-detail__label">{c('email_label')}</p>
              <p className="contact-detail__value">
                <a href="mailto:info@olymposlodge.com.tr">info@olymposlodge.com.tr</a>
              </p>
            </div>

            <div className="contact-social">
              <a href="https://www.instagram.com/olymposlodge" target="_blank" rel="noopener">Instagram</a>
              <a href="https://www.tripadvisor.com" target="_blank" rel="noopener">TripAdvisor</a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap">
            <p className="contact-form__intro">{c('form_intro')}</p>

            {sent && (
              <div className="form-success" style={{ display: 'block' }} role="status">
                {c('success')}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <Honeypot value={form.data.website} onChange={v => form.setData('website', v)} />
              <div className="form-group">
                <label htmlFor="salutation">{c('salutation')}</label>
                <select
                  id="salutation"
                  name="salutation"
                  value={form.data.salutation}
                  onChange={e => form.setData('salutation', e.target.value)}
                >
                  <option value="" disabled>{c('salutation_placeholder')}</option>
                  <option value="Mr">{c('salutation_mr')}</option>
                  <option value="Mrs">{c('salutation_mrs')}</option>
                  <option value="Dr">{c('salutation_dr')}</option>
                  <option value="Prof">{c('salutation_prof')}</option>
                </select>
              </div>

              <div className="form-row">
                <div className={`form-group${form.errors.firstname ? ' has-error' : ''}`}>
                  <label htmlFor="firstname" className="required">{c('firstname')}</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder=" "
                    value={form.data.firstname}
                    onChange={e => form.setData('firstname', e.target.value)}
                  />
                  <span className="form-error">{c('error_firstname')}</span>
                </div>
                <div className={`form-group${form.errors.lastname ? ' has-error' : ''}`}>
                  <label htmlFor="lastname" className="required">{c('lastname')}</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder=" "
                    value={form.data.lastname}
                    onChange={e => form.setData('lastname', e.target.value)}
                  />
                  <span className="form-error">{c('error_lastname')}</span>
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group${form.errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="email" className="required">{c('email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={form.data.email}
                    onChange={e => form.setData('email', e.target.value)}
                  />
                  <span className="form-error">{c('error_email')}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{c('phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder=""
                    value={form.data.phone}
                    onChange={e => form.setData('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className={`form-group${form.errors.subject ? ' has-error' : ''}`}>
                <label htmlFor="subject">{c('subject')}</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.data.subject}
                  onChange={e => form.setData('subject', e.target.value)}
                >
                  <option value="" disabled>{c('subject_placeholder')}</option>
                  <option value="Rezervasyon">{c('subject_reservation')}</option>
                  <option value="Bilgi">{c('subject_info')}</option>
                  <option value="Transfer">{c('subject_transfer')}</option>
                  <option value="Ozel Istek">{c('subject_special')}</option>
                  <option value="Diger">{c('subject_other')}</option>
                </select>
                <span className="form-error">{c('error_subject')}</span>
              </div>

              <div className={`form-group${form.errors.message ? ' has-error' : ''}`}>
                <label htmlFor="message">{c('message')}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder=" "
                  value={form.data.message}
                  onChange={e => form.setData('message', e.target.value)}
                />
                <span className="form-error">{c('error_message')}</span>
              </div>

              <button type="submit" className="form-submit" disabled={form.processing}>
                {form.processing ? '…' : c('send')}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="contact-map">
          <MapEmbed />
        </div>
      </section>
    </>
  )
}

Contact.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
