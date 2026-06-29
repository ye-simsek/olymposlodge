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
    const [hasSavedPrefs, setHasSavedPrefs] = useState(false);
    const [prefs, setPrefs] = useState<Prefs>({ analytics: false, marketing: false });

    useEffect(() => {
        if (!isBrowser) return;
        const saved = loadPrefs(); // reads localStorage only AFTER mount
        if (saved) {
            setPrefs(saved);
            setHasSavedPrefs(true);
            applyConsent(saved); // calls window.gtag only if available
        } else {
            setVisible(true);
        }
    }, []);

    function commit(newPrefs: Prefs) {
        savePrefs(newPrefs);
        setPrefs(newPrefs);
        setHasSavedPrefs(true);
        setVisible(false);
        applyConsent(newPrefs);
    }

    if (!visible && !hasSavedPrefs) return null;

    return (
        <>
            {/* ── Cookie bar ── */}
            {visible && (
                <div
                    className="cookie-bar cookie-bar--visible"
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
            )}

            {/* ── FAB — reopen after decision ── */}
            {!visible && hasSavedPrefs && (
                <button
                    className="cookie-fab"
                    aria-label={t('cookie.title')}
                    onClick={() => setVisible(true)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4"/>
                        <circle cx="8.5" cy="9" r="1.2" fill="currentColor"/>
                        <circle cx="14" cy="7.5" r="0.9" fill="currentColor"/>
                        <circle cx="15.5" cy="13" r="1.2" fill="currentColor"/>
                        <circle cx="9.5" cy="14.5" r="1" fill="currentColor"/>
                        <circle cx="12.5" cy="11" r="0.7" fill="currentColor"/>
                    </svg>
                </button>
            )}
        </>
    );
}
