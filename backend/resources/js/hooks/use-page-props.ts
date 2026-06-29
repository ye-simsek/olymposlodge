import { usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types/inertia';

export function usePageProps(): SharedProps {
    return usePage().props as unknown as SharedProps;
}
