import { useEffect, useRef } from 'react';
import { currentLenis } from '@/lib/lenis';

export interface LightboxPhoto {
    src: string;
    alt: string;
}

interface Props {
    photos: LightboxPhoto[];
    /** Index of the open photo, or null when closed. */
    index: number | null;
    onChange: (index: number | null) => void;
    labels: { viewer: string; close: string; previous: string; next: string };
}

/**
 * Full-screen photo viewer for the gallery, ported from the legacy site:
 * arrows and arrow keys step through, Escape or a click on the backdrop closes,
 * a horizontal swipe navigates on touch screens, and focus stays inside while open.
 */
export default function Lightbox({ photos, index, onChange, labels }: Props) {
    const open = index !== null;
    const closeRef = useRef<HTMLButtonElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const trigger = useRef<Element | null>(null);
    const touch = useRef({ x: 0, y: 0, multi: false });

    const step = (dir: number) => {
        if (index === null) return;
        onChange((index + dir + photos.length) % photos.length);
    };

    // Focus and page scroll follow the open state.
    useEffect(() => {
        if (!open) return;
        trigger.current = document.activeElement;
        closeRef.current?.focus();
        const lenis = currentLenis();
        if (lenis) lenis.stop();
        else document.body.style.overflow = 'hidden';

        return () => {
            if (lenis) lenis.start();
            else document.body.style.overflow = '';
            (trigger.current as HTMLElement | null)?.focus?.();
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onChange(null);
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'Tab') {
                const focusable = [closeRef.current, prevRef.current, nextRef.current];
                const at = focusable.indexOf(document.activeElement as HTMLButtonElement);
                e.preventDefault();
                const next = e.shiftKey ? (at <= 0 ? focusable.length : at) - 1 : (at + 1) % focusable.length;
                focusable[next]?.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    });

    const photo = open ? photos[index] : null;

    return (
        <div
            className={`lightbox${open ? ' is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={labels.viewer}
            aria-hidden={!open}
            onClick={(e) => { if (e.target === e.currentTarget) onChange(null); }}
        >
            <button ref={closeRef} className="lightbox__close" aria-label={labels.close} onClick={() => onChange(null)}>&#215;</button>
            <button ref={prevRef} className="lightbox__arrow lightbox__arrow--prev" aria-label={labels.previous} onClick={() => step(-1)}>&#8592;</button>
            <img
                className="lightbox__img"
                src={photo?.src ?? undefined}
                alt={photo?.alt ?? ''}
                onTouchStart={(e) => {
                    // Multi-touch (pinch zoom) is left to the browser.
                    if (e.touches.length > 1) { touch.current.multi = true; return; }
                    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, multi: false };
                }}
                onTouchEnd={(e) => {
                    if (touch.current.multi) { touch.current.multi = false; return; }
                    const t = e.changedTouches[0];
                    const dx = t.clientX - touch.current.x;
                    const dy = t.clientY - touch.current.y;
                    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
                }}
            />
            <button ref={nextRef} className="lightbox__arrow lightbox__arrow--next" aria-label={labels.next} onClick={() => step(1)}>&#8594;</button>
        </div>
    );
}
