import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import JsonLd from './JsonLd';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({ props: { locale: 'de', seo: { canonical: 'https://www.example.test/de/rooms/deluxe', alternates: {} } } }),
}));

const read = (c: HTMLElement) => JSON.parse(c.querySelector('script[type="application/ld+json"]')!.textContent!);

describe('JsonLd', () => {
    it('resolves site and language-home placeholders against the current page', () => {
        const { container } = render(<JsonLd data={{ url: '{home}', logo: '{site}/images/logo.png', item: '{home}/rooms' }} />);

        expect(read(container)).toEqual({
            url: 'https://www.example.test/de',
            logo: 'https://www.example.test/images/logo.png',
            item: 'https://www.example.test/de/rooms',
        });
    });

    it('cannot be used to break out of the script tag', () => {
        const { container } = render(<JsonLd data={{ name: '</script><script>alert(1)</script>' }} />);

        expect(container.querySelectorAll('script').length).toBe(1);
        expect(read(container).name).toBe('</script><script>alert(1)</script>');
    });

    it('renders nothing without data', () => {
        const { container } = render(<JsonLd data={undefined} />);
        expect(container.querySelector('script')).toBeNull();
    });
});
