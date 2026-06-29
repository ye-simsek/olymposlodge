import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Booking from './Booking';

vi.mock('@inertiajs/react', () => ({
    Link: ({ children, href }: any) => <a href={href}>{children}</a>,
    Head: ({ children }: any) => <>{children}</>,
    usePage: () => ({
        props: { locale: 'en', seo: { canonical: '/en/booking', alternates: { tr: '/tr/booking', en: '/en/booking', de: '/de/booking' } } },
        url: '/en/booking',
    }),
}));
vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => [] }),
}));

const rooms = [{ id: 1, slug: 'deluxe', name: 'Deluxe', price_per_night: 250, capacity: 2 }];

describe('Booking (visual shell)', () => {
    it('renders the booking header with language links to /{locale}/booking', () => {
        const { container } = render(<Booking rooms={rooms as any} preselectRoom={null} />);
        const langLinks = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'));
        expect(langLinks).toContain('/de/booking');
        expect(langLinks).toContain('/tr/booking');
    });

    it('does not render global site chrome (no Layout)', () => {
        // Booking must not set a persistent layout
        expect((Booking as any).layout).toBeUndefined();
    });
});
