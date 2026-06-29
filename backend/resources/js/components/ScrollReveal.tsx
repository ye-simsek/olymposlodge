import { router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ScrollReveal() {
    useEffect(() => {
        const run = () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) entry.target.classList.add('visible');
                    });
                },
                { threshold: 0.12 },
            );
            const els = document.querySelectorAll<HTMLElement>(
                '.reveal, .reveal-left, .reveal-right, .breathe',
            );
            els.forEach((el, i) => {
                el.style.transitionDelay = `${i * 0.06}s`;
                observer.observe(el);
            });
            return observer;
        };

        let observer = run();
        // Re-scan on Inertia navigation (DOM has changed):
        const off = router.on('navigate', () => {
            observer.disconnect();
            observer = run();
        });

        return () => {
            observer.disconnect();
            off();
        };
    }, []);

    return null;
}
