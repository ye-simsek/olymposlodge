import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} | Olympos Lodge` : 'Olympos Lodge'),
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob<{ default: ResolvedComponent }>(['./pages/**/*.tsx', '!./pages/**/*.test.tsx']),
            ).then((module) => module.default),
        setup: ({ App, props }) => <App {...props} />,
    }),
);
