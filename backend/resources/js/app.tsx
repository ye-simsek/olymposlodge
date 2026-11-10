import { createInertiaApp, router, type ResolvedComponent } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { getLenis } from '@/lib/lenis';
import { pageTitle } from '@/lib/title';
import '../css/app.css';
import '../css/fonts.css';
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

let firstNavigation = true;

router.on('navigate', (event) => {
    getLenis()?.scrollTo(0, { immediate: true });

    // Inertia also fires `navigate` for the initial page load, which the tag
    // manager already counts on its own. Only report in-app navigations.
    if (firstNavigation) {
        firstNavigation = false;
        return;
    }
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
            page_path: event.detail.page.url,
            page_location: window.location.href,
        });
    }
});

createInertiaApp({
    // "Rooms & Suites | Olympos Lodge": a page title alone ("Gallery", "Deluxe") says nothing in a tab or a search result.
    title: pageTitle,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob<{ default: ResolvedComponent }>(['./pages/**/*.tsx', '!./pages/**/*.test.tsx']),
        ).then((module) => module.default),
    setup({ el, App, props }) {
        if (el.hasChildNodes()) {
            hydrateRoot(el, <App {...props} />);
        } else {
            createRoot(el).render(<App {...props} />);
        }
    },
    progress: { color: '#b08d57' },
});
