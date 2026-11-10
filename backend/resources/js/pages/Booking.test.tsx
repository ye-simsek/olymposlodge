import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Booking from './Booking';

const post = vi.fn();

vi.mock('@inertiajs/react', () => ({
    router: { post: (...args: unknown[]) => post(...args) },
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

describe('Booking page', () => {
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

function reachStep3(container: HTMLElement) {
    const days = Array.from(
        container.querySelectorAll<HTMLButtonElement>('button.cal__day'),
    ).filter((b) => !b.disabled);
    fireEvent.click(days[0]);
    fireEvent.click(days[days.length - 1]);
    fireEvent.click(container.querySelector<HTMLButtonElement>('.btn-check-availability')!);
    fireEvent.click(container.querySelector<HTMLButtonElement>('.room-card-new__cta')!);
}

function fill(container: HTMLElement, name: string, value: string) {
    fireEvent.change(container.querySelector(`[name="${name}"]`)!, { target: { value } });
}

describe('Booking request wizard', () => {
    it('never shows a price: rates come from the lodge by email', () => {
        const { container } = render(<Booking rooms={rooms as any} preselectRoom={null} />);
        reachStep3(container);

        expect(container.textContent).not.toContain('€');
        expect(container.textContent).not.toContain('250');
    });

    it('keeps the request button disabled until name and email are filled', () => {
        const { container } = render(<Booking rooms={rooms as any} preselectRoom={null} />);
        reachStep3(container);
        const submit = container.querySelector<HTMLButtonElement>('.btn-confirm')!;

        expect(submit.disabled).toBe(true);

        fill(container, 'first_name', 'Ada');
        fill(container, 'last_name', 'Lovelace');
        fill(container, 'email', 'ada@example.com');

        expect(submit.disabled).toBe(false);
        expect(submit.textContent).toContain('booking.submit');
    });

    it('posts the request and shows the confirmation step on success', () => {
        post.mockReset();
        post.mockImplementation((_url, _data, options: any) => options.onSuccess?.());
        const { container } = render(<Booking rooms={rooms as any} preselectRoom={null} />);
        reachStep3(container);
        fill(container, 'first_name', 'Ada');
        fill(container, 'last_name', 'Lovelace');
        fill(container, 'email', 'ada@example.com');

        fireEvent.click(container.querySelector<HTMLButtonElement>('.btn-confirm')!);

        expect(post).toHaveBeenCalledTimes(1);
        const [url, data] = post.mock.calls[0];
        expect(url).toBe('/en/booking');
        expect(data).toMatchObject({
            room_id: 1, rooms: 1, adults: 2, children: 0,
            first_name: 'Ada', last_name: 'Lovelace', email: 'ada@example.com', website: '',
        });
        expect(data.check_in < data.check_out).toBe(true);
        expect(container.textContent).toContain('booking.confirm_title');
    });

    it('shows server validation errors and stays on the form', () => {
        post.mockReset();
        post.mockImplementation((_url, _data, options: any) => options.onError?.({ email: 'The email field must be a valid email address.' }));
        const { container } = render(<Booking rooms={rooms as any} preselectRoom={null} />);
        reachStep3(container);
        fill(container, 'first_name', 'Ada');
        fill(container, 'last_name', 'Lovelace');
        fill(container, 'email', 'ada@example');

        fireEvent.click(container.querySelector<HTMLButtonElement>('.btn-confirm')!);

        expect(container.textContent).toContain('The email field must be a valid email address.');
        expect(container.textContent).not.toContain('booking.confirm_title');
    });

    it('lists only the chosen room type when the page is opened for one room', () => {
        const two = [...rooms, { id: 2, slug: 'antik', name: 'Antique', price_per_night: null, capacity: 2 }];
        const { container } = render(<Booking rooms={two as any} preselectRoom="antik" />);
        const days = Array.from(container.querySelectorAll<HTMLButtonElement>('button.cal__day')).filter((b) => !b.disabled);
        fireEvent.click(days[0]);
        fireEvent.click(days[days.length - 1]);
        fireEvent.click(container.querySelector<HTMLButtonElement>('.btn-check-availability')!);

        const names = Array.from(container.querySelectorAll('.room-card-new__name')).map((n) => n.textContent);
        expect(names).toEqual(['Antique']);
    });
});
