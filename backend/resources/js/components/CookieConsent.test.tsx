import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CookieConsent from './CookieConsent';

vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => undefined }),
}));

describe('CookieConsent', () => {
    it('shows the consent bar after mount when no preference is stored', () => {
        // jsdom-localStorage ist leer -> loadPrefs() liefert null -> Bar wird sichtbar.
        const { getByText } = render(<CookieConsent />);
        expect(getByText('cookie.title')).toBeDefined();
    });
});
