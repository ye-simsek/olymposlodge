import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NewsletterBlock from './NewsletterBlock';

const post = vi.fn();

const formState = { data: { email: '', name: '', consent: false, website: '' } };

vi.mock('@inertiajs/react', () => ({
    useForm: () => ({
        data: formState.data,
        setData: vi.fn(),
        post,
        processing: false,
        errors: {},
        wasSuccessful: false,
        recentlySuccessful: false,
        reset: vi.fn(),
    }),
    usePage: () => ({ props: { locale: 'en' } }),
}));

vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => undefined }),
}));

describe('NewsletterBlock', () => {
    it('renders the subscribe form with email input', () => {
        render(<NewsletterBlock />);
        expect(screen.getByPlaceholderText('newsletter.email')).toBeDefined();
        expect(screen.getByText('newsletter.subscribe')).toBeDefined();
    });

    it('keeps the confirmation on screen after a successful sign-up', () => {
        // Inertia clears `recentlySuccessful` after two seconds; the thank-you must not vanish with it.
        post.mockImplementation((_url: string, options: { onSuccess?: () => void }) => options.onSuccess?.());
        formState.data = { email: 'ada@example.com', name: '', consent: true, website: '' };
        const { container, getByText } = render(<NewsletterBlock />);

        fireEvent.submit(container.querySelector('form')!);

        expect(getByText('newsletter.success')).toBeDefined();
        expect(container.querySelector('form')).toBeNull();
        formState.data = { email: '', name: '', consent: false, website: '' };
    });

    it('includes a honeypot field that people cannot see or tab into', () => {
        const { container } = render(<NewsletterBlock />);
        const trap = container.querySelector<HTMLInputElement>('input[name="website"]');

        expect(trap).not.toBeNull();
        expect(trap?.tabIndex).toBe(-1);
        expect(trap?.closest('[aria-hidden="true"]')).not.toBeNull();
    });
});
