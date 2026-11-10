import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import Honeypot from '@/components/Honeypot';

export default function NewsletterBlock() {
    const { t } = useTranslation();
    const { locale } = usePage().props;
    const form = useForm<{ email: string; consent: boolean; website: string }>({
        email: '',
        consent: false,
        website: '',
    });

    // Stays true after a sign-up; Inertia's `recentlySuccessful` flips back after two seconds.
    const [subscribed, setSubscribed] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.data.email || !form.data.consent) return;
        form.post(`/${locale}/newsletter`, {
            preserveScroll: true,
            onSuccess: () => { form.reset(); setSubscribed(true); },
        });
    }

    return (
        <div className="footer-newsletter">
            <h4 className="footer-newsletter__title">{t('newsletter.title')}</h4>
            <p className="footer-newsletter__sub">{t('newsletter.subtitle')}</p>
            {subscribed ? (
                <p className="footer-newsletter__success">{t('newsletter.success')}</p>
            ) : (
                <form className="footer-newsletter__form" onSubmit={handleSubmit} noValidate>
                    <Honeypot value={form.data.website} onChange={(v) => form.setData('website', v)} />
                    <div className="footer-newsletter__row">
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder={t('newsletter.email')}
                            required
                            aria-label={t('newsletter.email')}
                            disabled={form.processing}
                        />
                        <button type="submit" disabled={form.processing || !form.data.consent}>
                            {t('newsletter.subscribe')}
                        </button>
                    </div>
                    {form.errors.email && (
                        <p className="footer-newsletter__error">{form.errors.email}</p>
                    )}
                    <label className="footer-newsletter__consent">
                        <input
                            type="checkbox"
                            checked={form.data.consent}
                            onChange={(e) => form.setData('consent', e.target.checked)}
                        />
                        <span>{t('newsletter.consent')}</span>
                    </label>
                    {form.errors.consent && (
                        <p className="footer-newsletter__error">{form.errors.consent}</p>
                    )}
                </form>
            )}
        </div>
    );
}
