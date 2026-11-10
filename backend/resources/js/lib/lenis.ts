import Lenis from 'lenis';
import { isBrowser } from '@/lib/ssr';

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
    if (!isBrowser) return null;
    // Smooth scrolling is motion: visitors who ask their system for less get native scrolling.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return null;
    if (!instance) {
        instance = new Lenis();
        const raf = (time: number) => {
            instance?.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }
    return instance;
}

/** The running instance, if smooth scrolling has been started. Never creates one. */
export function currentLenis(): Lenis | null {
    return instance;
}
