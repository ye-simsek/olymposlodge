import '@inertiajs/react';

type TranslationTree = Record<string, Record<string, unknown>>;

declare module '@inertiajs/react' {
    interface PageProps {
        name: string;
        locale: 'tr' | 'en' | 'de';
        translations: TranslationTree;
        seo: {
            canonical: string;
            alternates: Record<string, string>;
        };
        media?: Record<string, string>;
        [key: string]: unknown;
    }
}
