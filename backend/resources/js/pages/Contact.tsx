import React from 'react'
import { useForm } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import Layout from '@/components/layout/Layout'

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
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(localePath(locale, 'contact'), {
      preserveScroll: true,
      onSuccess: () => form.reset(),
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

            {form.recentlySuccessful && (
              <div className="form-success" style={{ display: 'block' }}>
                {c('success')}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4469.900768249908!2d30.47331777670837!3d36.40184379005226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3b7c8f483ada7%3A0xead3c68b0c46fb38!2sOlympos%20Lodge%20Otel!5e1!3m2!1sen!2str!4v1775126998589!5m2!1sen!2str"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Olympos Lodge Konum"
          />
        </div>
      </section>
    </>
  )
}

Contact.layout = (page: React.ReactNode) => <Layout>{page}</Layout>
