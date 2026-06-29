import { Head } from '@inertiajs/react';
import { usePageProps } from '@/hooks/use-page-props';

interface SeoHeadProps {
    title: string;
    description?: string;
    image?: string;
}

const DEFAULT_IMAGE =
    'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0071-scaled.jpg';

export default function SeoHead({ title, description, image = DEFAULT_IMAGE }: SeoHeadProps) {
    const { seo } = usePageProps();

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
            <meta property="og:title" content={title} {...{ 'head-key': 'og:title' }} />
            {description && (
                <meta
                    property="og:description"
                    content={description}
                    {...{ 'head-key': 'og:description' }}
                />
            )}
            <meta property="og:image" content={image} {...{ 'head-key': 'og:image' }} />
            <meta name="twitter:card" content="summary_large_image" {...{ 'head-key': 'tw:card' }} />
        </Head>
    );
}
