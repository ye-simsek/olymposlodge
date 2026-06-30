import { useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { usePageProps } from '@/hooks/use-page-props';
import { localePath } from '@/lib/routes';

export default function SubNav() {
    const { t } = useTranslation();
    const { locale } = usePageProps();
    const navRef = useRef<HTMLElement>(null);
    const pageNameRef = useRef<HTMLSpanElement>(null);

    // Strip locale prefix for path comparisons (usePage().url is the current path, not in props)
    const rawUrl = (usePage().url ?? '').split('?')[0];
    const pathname = rawUrl.replace(new RegExp(`^/${locale}`), '') || '/';

    const activeTab = pathname.startsWith('/activities') ? 'activities'
        : pathname.startsWith('/lodge') ? 'lodge'
        : 'experiences';

    const pageName = activeTab === 'activities' ? t('nav.activities')
        : activeTab === 'lodge' ? t('nav.at_lodge')
        : t('nav.experiences');

    useEffect(() => {
        const el = navRef.current;
        const pageNameEl = pageNameRef.current;
        if (!el) return;

        let wasSticky = false;

        const onScroll = () => {
            const isSticky = wasSticky ? window.scrollY > 3 : window.scrollY > 10;
            if (isSticky === wasSticky) return;
            wasSticky = isSticky;
            el.classList.toggle('sticky', isSticky);
            if (pageNameEl) {
                if (isSticky) {
                    setTimeout(() => pageNameEl.classList.add('is-visible'), 50);
                } else {
                    pageNameEl.classList.remove('is-visible');
                }
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav id="subnav" ref={navRef}>
            <span className="page-name" ref={pageNameRef}>{pageName}</span>
            <div className="row">
                <ul>
                    <li>
                        <Link
                            href={localePath(locale, 'experiences')}
                            className={activeTab === 'experiences' ? 'active' : ''}
                            style={{ '--icon': "url('/images/icons/cirali-column.svg')" } as React.CSSProperties}
                        >
                            {t('nav.experiences')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={localePath(locale, 'activities')}
                            className={activeTab === 'activities' ? 'active' : ''}
                            style={{ '--icon': "url('/images/icons/activities-signpost.svg')" } as React.CSSProperties}
                        >
                            {t('nav.activities')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={localePath(locale, 'lodge')}
                            className={activeTab === 'lodge' ? 'active' : ''}
                            style={{ '--icon': "url('/images/icons/lodge-key.svg')" } as React.CSSProperties}
                        >
                            {t('nav.at_lodge')}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
