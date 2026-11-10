import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header';

vi.mock('@inertiajs/react', () => ({
    Link: ({ children, ...p }: any) => <a {...p}>{children}</a>,
    router: { visit: vi.fn() },
    usePage: () => ({
        props: { locale: 'en', seo: { canonical: '', alternates: { tr: '/tr', en: '/en', de: '/de' } } },
        url: '/en',
    }),
}));
vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => [] }),
}));

describe('Header', () => {
    it('renders nav links without crashing', () => {
        const { container } = render(<Header />);
        expect(container.querySelectorAll('a').length).toBeGreaterThan(0);
    });

    it('announces the menu state and closes it with Escape', () => {
        const { container } = render(<Header />);
        const toggle = container.querySelector<HTMLButtonElement>('#menuToggle')!;
        const overlay = container.querySelector<HTMLElement>('#navOverlay')!;

        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        expect(overlay.getAttribute('role')).toBe('dialog');
        expect(overlay.getAttribute('aria-hidden')).toBe('true');

        fireEvent.click(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(overlay.getAttribute('aria-hidden')).toBe('false');
        expect(document.activeElement?.className).toContain('nav-overlay__close');

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        expect(document.activeElement).toBe(toggle);
    });

    it('does not link to the Offers page, which is switched off', () => {
        const { container } = render(<Header />);
        const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '');
        expect(hrefs.some((h) => h.includes('offers'))).toBe(false);
    });
});
