import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTranslation } from './use-translation';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({
        props: {
            translations: {
                nav: { home: 'Start', greeting: 'Hallo :name', items: '1 item|:count items' },
                home: { features: ['Garten', 'Strand', 'Spa'], hero: { title: 'Olympos' } },
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

    it('selects singular form when count === 1', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.t('nav.items', { count: 1 }, 1)).toBe('1 item');
    });

    it('selects plural form and replaces :count when count !== 1', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.t('nav.items', { count: 3 }, 3)).toBe('3 items');
    });

    it('tRaw returns an array translation value', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.tRaw<string[]>('home.features')).toEqual(['Garten', 'Strand', 'Spa']);
    });

    it('tRaw returns a nested object translation value', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.tRaw('home.hero')).toEqual({ title: 'Olympos' });
    });

    it('tRaw returns undefined when the key is missing', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.tRaw('home.unknown')).toBeUndefined();
    });

    it('t() still returns the key for non-string (array) values', () => {
        const { result } = renderHook(() => useTranslation());
        expect(result.current.t('home.features')).toBe('home.features');
    });
});
