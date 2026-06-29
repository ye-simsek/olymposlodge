import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { usePageProps } from './use-page-props';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({ props: { locale: 'de', seo: { canonical: 'x', alternates: {} }, translations: {} } }),
}));

describe('usePageProps', () => {
    it('returns typed shared props', () => {
        const { result } = renderHook(() => usePageProps());
        expect(result.current.locale).toBe('de');
        expect(result.current.seo.canonical).toBe('x');
    });
});
