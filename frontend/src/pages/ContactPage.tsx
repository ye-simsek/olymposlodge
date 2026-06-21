import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { submitContact } from '../api/forms'
import type { Language } from '../types'
import PageMeta from '../components/PageMeta'

type FormErrors = Partial<Record<'firstname' | 'lastname' | 'email' | 'subject' | 'message', boolean>>

export default function ContactPage() {
  const { t, i18n } = useTranslation()
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const formRef = useRef<HTMLFormElement>(null)

  const c = (key: string) => t(`contact.${key}`)

  const clearErr = (field: keyof FormErrors) =>
    () => setErrors(e => ({ ...e, [field]: false }))

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {}
    if (!String(data.get('firstname') ?? '').trim()) errs.firstname = true
    if (!String(data.get('lastname') ?? '').trim()) errs.lastname = true
    const email = String(data.get('email') ?? '')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = true
    if (!data.get('subject')) errs.subject = true
    if (!String(data.get('message') ?? '').trim()) errs.message = true
    return errs
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    try {
      await submitContact({
        name: `${data.get('firstname')} ${data.get('lastname')}`.trim(),
        email: String(data.get('email')),
        phone: String(data.get('phone') ?? ''),
        subject: String(data.get('subject')),
        message: String(data.get('message')),
        language: i18n.language as Language,
      })
      setSuccess(true)
      formRef.current?.reset()
    } catch {
      setErrors({ message: true })
    } finally {
      setSubmitting(false)
    }
  }

  const lang = i18n.language?.split('-')[0] || 'tr'

  return (
    <>
      <PageMeta
        lang={lang}
        path="/contact"
        title={t('meta.contact_title')}
        description={t('meta.contact_desc')}
      />
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

            {success && (
              <div className="form-success" style={{ display: 'block' }}>
                {c('success')}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="salutation">{c('salutation')}</label>
                <select id="salutation" name="salutation" defaultValue="">
                  <option value="" disabled>{c('salutation_placeholder')}</option>
                  <option value="Mr">{c('salutation_mr')}</option>
                  <option value="Mrs">{c('salutation_mrs')}</option>
                  <option value="Dr">{c('salutation_dr')}</option>
                  <option value="Prof">{c('salutation_prof')}</option>
                </select>
              </div>

              <div className="form-row">
                <div className={`form-group${errors.firstname ? ' has-error' : ''}`}>
                  <label htmlFor="firstname" className="required">{c('firstname')}</label>
                  <input type="text" id="firstname" name="firstname" placeholder=" "
                    onChange={clearErr('firstname')} />
                  <span className="form-error">{c('error_firstname')}</span>
                </div>
                <div className={`form-group${errors.lastname ? ' has-error' : ''}`}>
                  <label htmlFor="lastname" className="required">{c('lastname')}</label>
                  <input type="text" id="lastname" name="lastname" placeholder=" "
                    onChange={clearErr('lastname')} />
                  <span className="form-error">{c('error_lastname')}</span>
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="email" className="required">{c('email')}</label>
                  <input type="email" id="email" name="email" placeholder=" "
                    onChange={clearErr('email')} />
                  <span className="form-error">{c('error_email')}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{c('phone')}</label>
                  <input type="tel" id="phone" name="phone" placeholder="" />
                </div>
              </div>

              <div className={`form-group${errors.subject ? ' has-error' : ''}`}>
                <label htmlFor="subject">{c('subject')}</label>
                <select id="subject" name="subject" defaultValue=""
                  onChange={clearErr('subject')}>
                  <option value="" disabled>{c('subject_placeholder')}</option>
                  <option value="Rezervasyon">{c('subject_reservation')}</option>
                  <option value="Bilgi">{c('subject_info')}</option>
                  <option value="Transfer">{c('subject_transfer')}</option>
                  <option value="Ozel Istek">{c('subject_special')}</option>
                  <option value="Diger">{c('subject_other')}</option>
                </select>
                <span className="form-error">{c('error_subject')}</span>
              </div>

              <div className={`form-group${errors.message ? ' has-error' : ''}`}>
                <label htmlFor="message">{c('message')}</label>
                <textarea id="message" name="message" placeholder=" "
                  onChange={clearErr('message')} />
                <span className="form-error">{c('error_message')}</span>
              </div>

              <button type="submit" className="form-submit" disabled={submitting}>
                {submitting ? '…' : c('send')}
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
