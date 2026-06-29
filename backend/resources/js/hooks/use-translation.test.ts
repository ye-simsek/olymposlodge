import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTranslation } from './use-translation';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({
        props: {
            translations: {
                nav: { home: 'Start', greeting: 'Hallo :name' },
            },
        },
    }),
}));

describe('useTranslation', () => {
    it('resolves nested namespace.key', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.t('nav.home')).toBe('Start');
    });

    it('returns the key itself when missing', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.t('nav.unknown')).toBe('nav.unknown');
    });

    it('replaces :placeholder tokens', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.t('nav.greeting', { name: 'Fabian' })).toBe('Hallo Fabian');
    });
});
