import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SubNav from './SubNav';

vi.mock('@inertiajs/react', () => ({
    Link: ({ children, ...p }: any) => <a {...p}>{children}</a>,
    usePage: () => ({ url: '/en/experiences' }),
}));
vi.mock('@/hooks/use-page-props', () => ({ usePageProps: () => ({ locale: 'en' }) }));
vi.mock('@/hooks/use-translation', () => ({ useTranslation: () => ({ t: (k: string) => k, tRaw: () => [] }) }));

describe('SubNav', () => {
    it('renders locale-prefixed nav links', () => {
        const { container } = render(<SubNav />);
        const links = container.querySelectorAll('a');
        expect(links.length).toBeGreaterThan(0);
        // jeder interne Link ist locale-präfigiert
        links.forEach((a) => expect(a.getAttribute('href')).toMatch(/^\/en(\/|$)/));
    });
});
