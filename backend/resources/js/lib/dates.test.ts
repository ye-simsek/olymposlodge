import { describe, expect, it } from 'vitest';
import { toLocalDateString } from './dates';

describe('toLocalDateString', () => {
    it('uses the local calendar day, not the UTC one', () => {
        // 00:30 local time. East of UTC, toISOString() would still report the previous day.
        expect(toLocalDateString(new Date(2026, 10, 11, 0, 30))).toBe('2026-11-11');
        // 23:30 local time. West of UTC, toISOString() would already report the next day.
        expect(toLocalDateString(new Date(2026, 10, 11, 23, 30))).toBe('2026-11-11');
    });

    it('pads month and day', () => {
        expect(toLocalDateString(new Date(2027, 0, 5, 12))).toBe('2027-01-05');
    });
});
