import { usePage } from '@inertiajs/react';

export function useSiteMedia(): (key: string, fallback: string) => string {
    const media = (usePage().props.media ?? {}) as Record<string, string>;
    return (key, fallback) => media[key] ?? fallback;
}
