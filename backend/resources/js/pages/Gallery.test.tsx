import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Gallery from './Gallery';

vi.mock('@inertiajs/react', () => ({
    Head: ({ children }: any) => <>{children}</>,
    Link: ({ children, ...p }: any) => <a {...p}>{children}</a>,
    usePage: () => ({ props: { locale: 'tr', seo: { canonical: 'https://x.test/tr/gallery', alternates: {} } }, url: '/tr/gallery' }),
}));
vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => [] }),
}));

const photos = (c: HTMLElement) => Array.from(c.querySelectorAll<HTMLImageElement>('.photo-grid__item img'));

describe('Gallery', () => {
    it('reveals each photo once it has loaded (they start transparent in CSS)', () => {
        const { container } = render(<Gallery />);
        const first = photos(container)[0];

        expect(first.classList.contains('is-loaded')).toBe(false);
        fireEvent.load(first);
        expect(first.classList.contains('is-loaded')).toBe(true);
    });

    it('does not show the two rooms that are hidden until the photoshoot', () => {
        const { container } = render(<Gallery />);
        const sources = photos(container).map((img) => img.getAttribute('src'));

        expect(sources.some((s) => s?.includes('aqua-super-deluxe'))).toBe(false);
        expect(sources.some((s) => s?.includes('oda-antik'))).toBe(false);
        expect(sources.length).toBe(13);
    });

    it('opens a photo in the lightbox, steps through with the arrows and closes with Escape', () => {
        const { container } = render(<Gallery />);
        const all = photos(container);

        fireEvent.click(all[1].closest('.photo-grid__item')!);
        const box = document.querySelector('.lightbox')!;
        const shown = () => box.querySelector<HTMLImageElement>('.lightbox__img')!.getAttribute('src');
        expect(box.classList.contains('is-open')).toBe(true);
        expect(shown()).toBe(all[1].getAttribute('src'));

        fireEvent.click(box.querySelector('.lightbox__arrow--next')!);
        expect(shown()).toBe(all[2].getAttribute('src'));

        fireEvent.keyDown(document, { key: 'ArrowLeft' });
        expect(shown()).toBe(all[1].getAttribute('src'));

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(box.classList.contains('is-open')).toBe(false);
    });

    it('moves to the next photo on a left swipe', () => {
        const { container } = render(<Gallery />);
        const all = photos(container);
        fireEvent.click(all[0].closest('.photo-grid__item')!);
        const img = document.querySelector<HTMLImageElement>('.lightbox__img')!;

        fireEvent.touchStart(img, { touches: [{ clientX: 300, clientY: 200 }] });
        fireEvent.touchEnd(img, { changedTouches: [{ clientX: 180, clientY: 210 }] });

        expect(img.getAttribute('src')).toBe(all[1].getAttribute('src'));
    });
});
