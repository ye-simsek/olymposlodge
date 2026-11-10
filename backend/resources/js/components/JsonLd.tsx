import { usePageProps } from '@/hooks/use-page-props';

/**
 * Structured data for search engines (hotel, rooms, FAQ, breadcrumbs), carried over
 * from the legacy pages. The data lives in resources/js/data/structured-data.json with
 * two placeholders: {site} is this site's origin and {home} the current language's home.
 */
export default function JsonLd({ data }: { data: unknown }) {
    const { seo, locale } = usePageProps();

    if (data === undefined || data === null) return null;

    let site = '';
    try {
        site = new URL(seo.canonical).origin;
    } catch {
        /* relative canonical: leave placeholders pointing at the site root */
    }

    const json = JSON.stringify(data)
        .replaceAll('{site}', site)
        .replaceAll('{home}', `${site}/${locale}`)
        // "<" is escaped so a value can never close the script element.
        .replace(/</g, '\\u003c');

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
