import '@inertiajs/core';

type TranslationTree = Record<string, Record<string, unknown>>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

// Inertia 3 reads the shape of shared props from InertiaConfig in @inertiajs/core.
// (Augmenting PageProps in @inertiajs/react, as before, had no effect: usePage().props
// stayed untyped and tsc reported 13 errors that nothing ran.)
declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: SharedProps;
    }
}

export interface SharedProps {
    name: string;
    locale: 'tr' | 'en' | 'de';
    translations: Record<string, Record<string, unknown>>;
    seo: { canonical: string; alternates: Record<string, string> };
    media?: Record<string, string>;
    flash?: { success?: string | null; error?: string | null };
    [key: string]: unknown;
}
