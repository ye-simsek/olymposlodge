import { router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ScrollReveal() {
    useEffect(() => {
        const run = () => {
            // Generic fade/slide-in elements → toggle `.visible` (kept observed).
            const revealObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) entry.target.classList.add('visible');
                    });
                },
                { threshold: 0.12 },
            );
            document
                .querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right, .breathe')
                .forEach((el, i) => {
                    el.style.transitionDelay = `${i * 0.06}s`;
                    revealObserver.observe(el);
                });

            // Story blocks stagger their children (eyebrow → heading → paragraphs) on first
            // reveal via `.is-revealed`; the children start at opacity:0 in CSS, so this MUST
            // run or the text stays invisible. Unobserve after the first reveal (one-shot).
            const storyObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-revealed');
                            storyObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2, rootMargin: '0px 0px -80px 0px' },
            );
            document
                .querySelectorAll<HTMLElement>('.story-block__content')
                .forEach((el) => storyObserver.observe(el));

            return () => {
                revealObserver.disconnect();
                storyObserver.disconnect();
            };
        };

        let teardown = run();
        // Re-scan on Inertia navigation (DOM has changed):
        const off = router.on('navigate', () => {
            teardown();
            teardown = run();
        });

        return () => {
            teardown();
            off();
        };
    }, []);

    return null;
}
