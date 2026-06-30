import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Inertia router.on('navigate', …) returns an unsubscribe fn.
vi.mock('@inertiajs/react', () => ({
    router: { on: vi.fn(() => vi.fn()) },
}));

// Controllable IntersectionObserver: records every observed element with the
// callback that watches it, so a test can fire an intersection at will.
interface Watched {
    el: Element;
    fire: (isIntersecting: boolean) => void;
    unobserved: boolean;
}
let watched: Watched[] = [];

class MockIntersectionObserver {
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
    }
    observe(el: Element) {
        const entry = {
            el,
            unobserved: false,
            fire: (isIntersecting: boolean) =>
                this.cb([{ isIntersecting, target: el } as IntersectionObserverEntry], this as never),
        };
        watched.push(entry);
    }
    unobserve(el: Element) {
        watched.filter((w) => w.el === el).forEach((w) => (w.unobserved = true));
    }
    disconnect() {}
}

beforeEach(() => {
    watched = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('ScrollReveal', () => {
    it('reveals .story-block__content via .is-revealed on intersection, then unobserves', async () => {
        document.body.innerHTML = `
            <div class="story-block__content"><span>eyebrow</span><h3>head</h3><p>body</p></div>
        `;
        const ScrollReveal = (await import('./ScrollReveal')).default;
        render(<ScrollReveal />);

        const el = document.querySelector('.story-block__content')!;
        const w = watched.find((x) => x.el === el);
        expect(w, '.story-block__content must be observed').toBeTruthy();

        expect(el.classList.contains('is-revealed')).toBe(false);
        w!.fire(true);
        expect(el.classList.contains('is-revealed')).toBe(true);
        expect(w!.unobserved, 'element should be unobserved after first reveal').toBe(true);
    });

    it('still reveals generic .reveal elements via .visible', async () => {
        document.body.innerHTML = `<div class="reveal">x</div>`;
        const ScrollReveal = (await import('./ScrollReveal')).default;
        render(<ScrollReveal />);

        const el = document.querySelector('.reveal')!;
        const w = watched.find((x) => x.el === el);
        expect(w, '.reveal must be observed').toBeTruthy();
        w!.fire(true);
        expect(el.classList.contains('visible')).toBe(true);
    });
});
