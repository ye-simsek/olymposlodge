import { describe, expect, it } from 'vitest';
import { pageTitle } from './title';

describe('pageTitle', () => {
    it('appends the site name', () => {
        expect(pageTitle('Gallery')).toBe('Gallery | Olympos Lodge');
    });

    it('does not repeat the site name when the page title already has it', () => {
        expect(pageTitle('Spa – Olympos Lodge')).toBe('Spa – Olympos Lodge');
    });

    it('falls back to the site name alone', () => {
        expect(pageTitle('')).toBe('Olympos Lodge');
        expect(pageTitle(undefined)).toBe('Olympos Lodge');
    });
});
