import { fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CookieConsent from './CookieConsent';

vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => undefined }),
}));

afterEach(() => {
    vi.restoreAllMocks();
    try { localStorage.clear(); } catch { /* storage unavailable in this runtime */ }
});

describe('CookieConsent', () => {
    it('does not open the bar on its own; the cookie button is always there', () => {
        const { container, queryByText } = render(<CookieConsent />);

        expect(queryByText('cookie.body')).toBeNull();
        expect(container.querySelector('.cookie-fab')).not.toBeNull();
    });

    it('opens from the cookie button and closes with the X without saving a choice', () => {
        const setItem = vi.spyOn(Storage.prototype, 'setItem');
        const { container, getByLabelText, queryByText } = render(<CookieConsent />);

        fireEvent.click(container.querySelector('.cookie-fab')!);
        expect(queryByText('cookie.body')).not.toBeNull();

        fireEvent.click(getByLabelText('cookie.close'));
        expect(queryByText('cookie.body')).toBeNull();
        expect(setItem).not.toHaveBeenCalled();
    });

    it('still closes after a choice when the browser blocks storage', () => {
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new DOMException('blocked', 'SecurityError');
        });
        const { container, getByText, queryByText } = render(<CookieConsent />);

        fireEvent.click(container.querySelector('.cookie-fab')!);
        fireEvent.click(getByText('cookie.decline_all'));

        expect(queryByText('cookie.body')).toBeNull();
    });
});
