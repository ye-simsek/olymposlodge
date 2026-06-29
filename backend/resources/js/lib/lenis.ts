import Lenis from 'lenis';
import { isBrowser } from '@/lib/ssr';

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
    if (!isBrowser) return null;
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
