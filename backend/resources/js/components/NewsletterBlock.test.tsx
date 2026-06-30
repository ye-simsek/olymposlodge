import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NewsletterBlock from './NewsletterBlock';

const post = vi.fn();

vi.mock('@inertiajs/react', () => ({
    useForm: () => ({
        data: { email: '', name: '', consent: false },
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
});
