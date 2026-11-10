import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SeoHead from './SeoHead';

vi.mock('@inertiajs/react', () => ({
    // <Head>-Stub rendert Kinder direkt in den Container, damit wir sie abfragen können
    Head: ({ title, children }: { title?: string; children?: React.ReactNode }) => (
        <div data-testid="head" data-title={title}>{children}</div>
    ),
    usePage: () => ({
        props: {
            locale: 'de',
            seo: {
                canonical: 'https://x.test/de/rooms',
                alternates: {
                    de: 'https://x.test/de/rooms',
                    en: 'https://x.test/en/rooms',
                    tr: 'https://x.test/tr/rooms',
                    'x-default': 'https://x.test/en/rooms',
                },
            },
        },
    }),
}));

describe('SeoHead', () => {
    it('renders title, canonical and one hreflang link per alternate', () => {
        const { getByTestId } = render(<SeoHead title="Zimmer" description="Desc" />);

        expect(getByTestId('head').getAttribute('data-title')).toBe('Zimmer');
        // React 19 hoists <link> and <meta> to document.head — query there
        expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href'))
            .toBe('https://x.test/de/rooms');

        const alternates = document.querySelectorAll('link[rel="alternate"]');
        // de, en, tr, x-default => 4 distinct hreflang links
        expect(alternates.length).toBe(4);
        const enLink = document.querySelector('link[hreflang="en"]');
        expect(enLink?.getAttribute('href')).toBe('https://x.test/en/rooms');
    });

    it('serves the default share image from this site as an absolute URL', () => {
        render(<SeoHead title="Zimmer" />);

        expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content'))
            .toBe('https://x.test/images/og-default.jpg');
        expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content'))
            .toBe('https://x.test/de/rooms');
    });

    it('makes a site-relative image absolute', () => {
        render(<SeoHead title="Zimmer" image="/images/oda-deluxe-1200.webp" />);

        expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content'))
            .toBe('https://x.test/images/oda-deluxe-1200.webp');
    });
});
