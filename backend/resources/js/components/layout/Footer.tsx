import { useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { localePath } from '@/lib/routes';
import NewsletterBlock from '@/components/NewsletterBlock';
import WeatherPanel from '@/components/WeatherPanel';

const LOGO = 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-logo-e1730775765361.png';

export default function Footer() {
    const { t } = useTranslation();
    const { locale } = usePage().props;
    const year = new Date().getFullYear();
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = mainRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); } },
            { threshold: 0.05 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <footer className="site-footer" id="contact">
            <div className="footer-main" id="footer-main" ref={mainRef}>

                <div className="footer-col-brand">
                    <div className="footer-brand">
                        <img src={LOGO} alt="Olympos Lodge" className="footer-logo" width="1000" height="500" />
                        <p className="footer-tagline">{t('footer.tagline')}</p>
                    </div>
                    <div className="footer-col">
                        <h4>{t('footer.contact_title')}</h4>
                        <ul>
                            <li><a href="tel:+905323083486">+90 532 308 34 86</a></li>
                            <li><a href="https://wa.me/905323083486" target="_blank" rel="noopener">WhatsApp</a></li>
                            <li><a href="mailto:info@olymposlodge.com.tr">info@olymposlodge.com.tr</a></li>
                            <li dangerouslySetInnerHTML={{ __html: t('footer.address') }} />
                        </ul>
                    </div>
                </div>

                <WeatherPanel />

                <div className="footer-col-nav">
                    <div className="footer-col">
                        <h4>{t('footer.explore_title')}</h4>
                        <ul>
                            <li><Link href={localePath(locale, 'rooms')}>{t('nav.rooms')}</Link></li>
                            <li><a href={`${localePath(locale)}#nature`}>{t('footer.nature_link')}</a></li>
                            <li><Link href={localePath(locale, 'experiences')}>{t('nav.experiences')}</Link></li>
                            <li><Link href={localePath(locale, 'gallery')}>{t('nav.gallery')}</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>{t('footer.follow_title')}</h4>
                        <ul>
                            <li><a href="https://www.instagram.com/olymposlodge" target="_blank" rel="noopener">Instagram</a></li>
                            <li><a href="https://www.tripadvisor.com" target="_blank" rel="noopener">TripAdvisor</a></li>
                        </ul>
                    </div>
                </div>

            </div>

            <NewsletterBlock />

            <div className="footer-bottom">
                <div className="footer-copyright-block">
                    <p>© {year}</p>
                    <p>Olympos Lodge</p>
                    <p>Türkiye</p>
                    <p>{t('footer.rights')}</p>
                </div>
                <div className="footer-legal">
                    <Link href={localePath(locale, 'terms')}>{t('footer.terms')}</Link>
                    <span className="footer-legal__sep">|</span>
                    <Link href={localePath(locale, 'privacy')}>{t('footer.privacy')}</Link>
                </div>
            </div>
        </footer>
    );
}
