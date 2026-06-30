import { render } from '@testing-library/react';
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
});
