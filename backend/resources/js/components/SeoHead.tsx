import { Head } from '@inertiajs/react';
import { usePageProps } from '@/hooks/use-page-props';

interface SeoHeadProps {
    title: string;
    description?: string;
    image?: string;
}

// A 1200x630 JPEG: social previews do not reliably read WebP.
const DEFAULT_IMAGE = '/images/og-default.jpg';

/** Share images must be absolute URLs; resolve site-relative paths against this page. */
function absolute(path: string, base: string): string {
    try {
        return new URL(path, base).href;
    } catch {
        return path;
    }
}

export default function SeoHead({ title, description, image = DEFAULT_IMAGE }: SeoHeadProps) {
    const { seo } = usePageProps();
    const imageUrl = absolute(image, seo.canonical);

    return (
        <Head title={title}>
            {description && (
                <meta name="description" content={description} {...{ 'head-key': 'description' }} />
            )}
            <link rel="canonical" href={seo.canonical} {...{ 'head-key': 'canonical' }} />
            {Object.entries(seo.alternates).map(([hreflang, href]) => (
                <link
                    key={hreflang}
                    rel="alternate"
                    hrefLang={hreflang}
                    href={href}
                    {...{ 'head-key': `alt-${hreflang}` }}
                />
            ))}
            <meta property="og:type" content="website" {...{ 'head-key': 'og:type' }} />
            <meta property="og:url" content={seo.canonical} {...{ 'head-key': 'og:url' }} />
            <meta property="og:title" content={title} {...{ 'head-key': 'og:title' }} />
            {description && (
                <meta
                    property="og:description"
                    content={description}
                    {...{ 'head-key': 'og:description' }}
                />
            )}
            <meta property="og:image" content={imageUrl} {...{ 'head-key': 'og:image' }} />
            <meta name="twitter:card" content="summary_large_image" {...{ 'head-key': 'tw:card' }} />
        </Head>
    );
}
