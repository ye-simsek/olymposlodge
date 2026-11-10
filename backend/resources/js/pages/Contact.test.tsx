import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Contact from './Contact';

let locale = 'tr';

vi.mock('@inertiajs/react', () => ({
    Head: ({ children }: any) => <>{children}</>,
    Link: ({ children, ...p }: any) => <a {...p}>{children}</a>,
    router: { visit: vi.fn(), on: vi.fn(() => () => {}) },
    useForm: (initial: any) => ({ data: initial, setData: vi.fn(), post: vi.fn(), reset: vi.fn(), processing: false, errors: {} }),
    usePage: () => ({ props: { locale, seo: { canonical: 'https://x.test/tr/contact', alternates: {} }, translations: {} }, url: `/${locale}/contact` }),
}));
vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => [] }),
}));

const salutations = (c: HTMLElement) =>
    Array.from(c.querySelectorAll<HTMLOptionElement>('#salutation option')).map((o) => o.value).filter(Boolean);

describe('Contact form', () => {
    it('offers "Sayın" to Turkish visitors only, as on the legacy site', () => {
        locale = 'tr';
        expect(salutations(render(<Contact />).container)).toEqual(['Mr', 'Mrs', 'Dr', 'Prof', 'Sayin']);
    });

    it('offers Ms. and Mx. in English, and Mx. in German', () => {
        locale = 'en';
        expect(salutations(render(<Contact />).container)).toEqual(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Mx']);
        locale = 'de';
        expect(salutations(render(<Contact />).container)).toEqual(['Mr', 'Mrs', 'Dr', 'Prof', 'Mx']);
    });

    it('shows a format hint in the phone field', () => {
        locale = 'tr';
        const { container } = render(<Contact />);
        expect(container.querySelector('#phone')?.getAttribute('placeholder')).toBe('contact.phone_placeholder');
    });
});
