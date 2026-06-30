import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { getLenis } from '@/lib/lenis';
import '../css/app.css';
import '../css/base.css';
import '../css/home.css';
import '../css/rooms.css';
import '../css/offers.css';
import '../css/cirali.css';
import '../css/pages.css';
import '../css/contact.css';
import '../css/activities.css';
import '../css/location.css';
import '../css/chat.css';
import '../css/booking.css';

router.on('navigate', (event) => {
    getLenis()?.scrollTo(0, { immediate: true });
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
            page_path: event.detail.page.url,
            page_location: window.location.href,
        });
    }
});

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob(['./pages/**/*.tsx', '!./pages/**/*.test.tsx']),
        ),
    setup({ el, App, props }) {
        if (el.hasChildNodes()) {
            hydrateRoot(el, <App {...props} />);
        } else {
            createRoot(el).render(<App {...props} />);
        }
    },
    progress: { color: '#b08d57' },
});
