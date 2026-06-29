import { useEffect, useState } from 'react';
import { isBrowser } from '@/lib/ssr';
import { useTranslation } from '@/hooks/use-translation';

const STORAGE_KEY = 'ol_cookie_consent';

interface Prefs { analytics: boolean; marketing: boolean }

function loadPrefs(): Prefs | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Prefs) : null;
    } catch { return null; }
}

function savePrefs(prefs: Prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

function applyConsent(prefs: Prefs) {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            analytics_storage:  prefs.analytics ? 'granted' : 'denied',
            ad_storage:         prefs.marketing ? 'granted' : 'denied',
            ad_user_data:       prefs.marketing ? 'granted' : 'denied',
            ad_personalization: prefs.marketing ? 'granted' : 'denied',
        });
    }
}

export default function CookieConsent() {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(false);
    const [prefs, setPrefs] = useState<Prefs>({ analytics: false, marketing: false });

    useEffect(() => {
        if (!isBrowser) return;
        const saved = loadPrefs(); // reads localStorage only AFTER mount
        if (saved) {
            setPrefs(saved);
            applyConsent(saved); // calls window.gtag only if available
        } else {
            setVisible(true);
        }
    }, []);

    function commit(newPrefs: Prefs) {
        savePrefs(newPrefs);
        setPrefs(newPrefs);
        setVisible(false);
        applyConsent(newPrefs);
    }

    if (!visible) return null;

    return (
        <>
            {/* ── Cookie bar ── */}
            <div
                className={`cookie-bar${visible ? ' cookie-bar--visible' : ''}`}
                role="dialog"
                aria-label={t('cookie.title')}
            >
                {/* Text */}
                <div className="cookie-bar__text">
                    <span className="cookie-bar__title">{t('cookie.title')}</span>
                    <span className="cookie-bar__body">{t('cookie.body')}</span>
                </div>

                {/* Toggles */}
                <div className="cookie-bar__toggles">
                    <div className="cookie-bar__option">
                        <span className="cookie-bar__option-label">{t('cookie.required_name')}</span>
                        <div className="cookie-toggle cookie-toggle--locked">
                            <span className="cookie-toggle__track" />
                        </div>
                    </div>
                    <div className="cookie-bar__option">
                        <span className="cookie-bar__option-label">{t('cookie.analytics_name')}</span>
                        <label className="cookie-toggle">
                            <input
                                type="checkbox"
                                checked={prefs.analytics}
                                onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                            />
                            <span className="cookie-toggle__track" />
                        </label>
                    </div>
                    <div className="cookie-bar__option">
                        <span className="cookie-bar__option-label">{t('cookie.marketing_name')}</span>
                        <label className="cookie-toggle">
                            <input
                                type="checkbox"
                                checked={prefs.marketing}
                                onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                            />
                            <span className="cookie-toggle__track" />
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="cookie-bar__actions">
                    <button
                        className="cookie-btn cookie-btn--fill"
                        onClick={() => commit({ analytics: true, marketing: true })}
                    >
                        {t('cookie.accept_all')}
                    </button>
                    <button
                        className="cookie-btn cookie-btn--outline"
                        onClick={() => commit(prefs)}
                    >
                        {t('cookie.save')}
                    </button>
                    <button
                        className="cookie-btn cookie-btn--ghost"
                        onClick={() => commit({ analytics: false, marketing: false })}
                    >
                        {t('cookie.decline_all')}
                    </button>
                </div>
            </div>
        </>
    );
}
