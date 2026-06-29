import { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { usePageProps } from '@/hooks/use-page-props';
import { localePath } from '@/lib/routes';

type Locale = 'tr' | 'en' | 'de';

const LOGO = 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-logo-e1730775765361.png';

const NAV_ITEMS = [
    { key: 'nav.home',        sub: 'nav.home_sub',        to: '/' },
    { key: 'nav.rooms',       sub: 'nav.rooms_sub',       to: '/rooms' },
    { key: 'nav.experiences', sub: 'nav.experiences_sub', to: '/experiences' },
    { key: 'nav.location',    sub: 'nav.location_sub',    to: '/location' },
    { key: 'nav.gallery',     sub: 'nav.gallery_sub',     to: '/gallery' },
    { key: 'nav.offers',      sub: 'nav.offers_sub',      to: '/offers' },
    { key: 'nav.contact',     sub: 'nav.contact_sub',     to: '/contact' },
];

const MENU_ITEM = { key: 'nav.menu', sub: 'nav.menu_sub' };

export default function Header() {
    const { t } = useTranslation();
    const { locale, seo } = usePageProps();

    // Strip locale prefix for path comparisons (usePage().url is the current path, not in props)
    const rawUrl = (usePage().url ?? '').split('?')[0];
    const pathname = rawUrl.replace(new RegExp(`^/${locale}`), '') || '/';

    const isActive = (to: string) =>
        to === '/' ? pathname === '/' : pathname.startsWith(to);

    const SOLID_PATHS = ['/experiences', '/location', '/gallery', '/offers', '/contact', '/terms', '/privacy', '/activities', '/lodge'];
    const isSolid = SOLID_PATHS.some(p => pathname.startsWith(p));

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    function switchLocale(target: Locale) {
        router.visit(seo.alternates[target]);
        setLangOpen(false);
    }

    const handleNavClick = (to: string) => {
        setMenuOpen(false);
        router.visit(localePath(locale, to.replace(/^\//, '')));
    };

    return (
        <>
            <header className={`site-header${scrolled ? ' scrolled' : ''}${isSolid ? ' solid' : ''}`} id="header">
                <button
                    className={`menu-toggle${menuOpen ? ' active' : ''}`}
                    id="menuToggle"
                    aria-label="Menu"
                    onClick={() => setMenuOpen(o => !o)}
                >
                    <span className="menu-bar"></span>
                    <span className="menu-bar"></span>
                </button>

                <Link href={localePath(locale)} className="header-logo">
                    <img src={LOGO} alt="Olympos Lodge" width="1000" height="500" />
                </Link>

                <div className="header-right">
                    <div className={`lang-switch${langOpen ? ' open' : ''}`} ref={langRef}>
                        <button className="lang-current" onClick={() => setLangOpen(o => !o)}>
                            {locale.toUpperCase()}
                        </button>
                        <ul className="lang-dropdown">
                            {(['tr', 'en', 'de'] as Locale[]).map(lang => (
                                <li key={lang}>
                                    <a
                                        href="#"
                                        data-lang={lang}
                                        className={locale === lang ? 'active' : ''}
                                        onClick={e => { e.preventDefault(); switchLocale(lang); }}
                                    >
                                        {lang === 'tr' ? 'Türkçe' : lang === 'en' ? 'English' : 'Deutsch'}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link href={localePath(locale, 'booking')} className="btn-reserve">{t('nav.reserve')}</Link>
                </div>
            </header>

            <nav className={`nav-overlay${menuOpen ? ' open' : ''}`} id="navOverlay">
                <div className="nav-overlay__left">
                    <img className="nav-overlay__logo" src={LOGO} alt="Olympos Lodge" width="220" height="110" />
                    <button
                        className="nav-overlay__close"
                        aria-label="Kapat"
                        onClick={() => setMenuOpen(false)}
                    >
                        <span></span><span></span>
                    </button>
                    <ul className="nav-links">
                        {NAV_ITEMS.slice(0, 6).map(item => (
                            <li key={item.key}>
                                <div className="nav-item-wrap">
                                    <a
                                        href={localePath(locale, item.to.replace(/^\//, ''))}
                                        data-nav
                                        className={isActive(item.to) ? 'is-active' : ''}
                                        onClick={e => { e.preventDefault(); handleNavClick(item.to); }}
                                    >
                                        {t(item.key)}
                                    </a>
                                    <span className="nav-sub">{t(item.sub)}</span>
                                </div>
                            </li>
                        ))}
                        <li key={MENU_ITEM.key}>
                            <div className="nav-item-wrap">
                                <a
                                    href={`/assets/menu/menu-${locale}.html`}
                                    data-nav
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t(MENU_ITEM.key)}
                                </a>
                                <span className="nav-sub">{t(MENU_ITEM.sub)}</span>
                            </div>
                        </li>
                        {NAV_ITEMS.slice(6).map(item => (
                            <li key={item.key}>
                                <div className="nav-item-wrap">
                                    <a
                                        href={localePath(locale, item.to.replace(/^\//, ''))}
                                        data-nav
                                        className={isActive(item.to) ? 'is-active' : ''}
                                        onClick={e => { e.preventDefault(); handleNavClick(item.to); }}
                                    >
                                        {t(item.key)}
                                    </a>
                                    <span className="nav-sub">{t(item.sub)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-footer">
                        <a href="tel:+905323083486">+90 532 308 34 86</a>
                        <div className="nav-social">
                            <a href="https://www.instagram.com/olymposlodge" target="_blank" rel="noopener">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="nav-overlay__photo">
                    <div className="nav-overlay__photo-img"></div>
                    <span className="nav-overlay__caption">Çıralı · Antalya</span>
                </div>
            </nav>
        </>
    );
}
