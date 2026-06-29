import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CookieConsent from './CookieConsent';

vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => undefined }),
}));

afterEach(() => {
    localStorage.clear();
});

describe('CookieConsent', () => {
    it('shows the consent bar after mount when no preference is stored', () => {
        // jsdom-localStorage ist leer -> loadPrefs() liefert null -> Bar wird sichtbar.
        const { getByText } = render(<CookieConsent />);
        expect(getByText('cookie.title')).toBeDefined();
    });

    it('shows the FAB (not the bar) after mount when a preference is stored', () => {
        // Gespeicherte Prefs -> loadPrefs() liefert ein Objekt -> Bar bleibt verborgen, FAB erscheint.
        localStorage.setItem(
            'ol_cookie_consent',
            JSON.stringify({ analytics: true, marketing: false }),
        );
        const { container, queryByText } = render(<CookieConsent />);
        expect(queryByText('cookie.body')).toBeNull();
        expect(container.querySelector('.cookie-fab')).not.toBeNull();
    });
});
