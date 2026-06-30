import { fireEvent, render } from '@testing-library/react';
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

// price_per_night is a string to mirror Laravel's decimal:2 serialisation.
const rooms = [{ id: 1, slug: 'deluxe', name: 'Deluxe', price_per_night: '250.00', capacity: 2 }];

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

describe('Booking wizard shell behavior', () => {
    it('keeps the room select CTA active without availability and disables submit on step 3', () => {
        const { container } = render(<Booking rooms={rooms as any} preselectRoom="deluxe" />);

        // No legacy availability gating is wired up anywhere in the shell.
        expect(container.querySelector('.room-card-new--unavailable')).toBeNull();

        // Step 1 — pick a check-in and a later check-out from the (ClientOnly) calendar.
        const days = Array.from(
            container.querySelectorAll<HTMLButtonElement>('button.cal__day'),
        ).filter((b) => !b.disabled);
        expect(days.length).toBeGreaterThan(1);
        fireEvent.click(days[0]);
        fireEvent.click(days[days.length - 1]);

        // The "show rooms" CTA only enables once dates are chosen → advance to step 2.
        const showRooms = container.querySelector<HTMLButtonElement>('.btn-check-availability')!;
        expect(showRooms.disabled).toBe(false);
        fireEvent.click(showRooms);

        // Step 2 — the room select CTA is always active (no availability check) → step 3.
        const cta = container.querySelector<HTMLButtonElement>('.room-card-new__cta');
        expect(cta).not.toBeNull();
        expect(cta!.disabled).toBe(false);
        fireEvent.click(cta!);

        // Step 3 — the submit button is hard-disabled with the coming-soon notice.
        const submit = container.querySelector<HTMLButtonElement>('.btn-confirm');
        expect(submit).not.toBeNull();
        expect(submit!.disabled).toBe(true);
        expect(submit!.textContent).toContain('booking.coming_soon');
    });
});
