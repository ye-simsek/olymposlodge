import { afterEach, describe, expect, it, vi } from 'vitest';
import { uuidv4 } from './uuid';

const V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('uuidv4', () => {
    it('returns a valid v4 uuid and unique values', () => {
        expect(uuidv4()).toMatch(V4);
        expect(uuidv4()).not.toBe(uuidv4());
    });

    it('falls back to getRandomValues when randomUUID is unavailable (insecure context)', () => {
        // Simulate a non-secure context: getRandomValues present, randomUUID gone.
        vi.stubGlobal('crypto', {
            getRandomValues: (arr: Uint8Array) => {
                for (let i = 0; i < arr.length; i++) arr[i] = i * 7;
                return arr;
            },
        });
        expect(uuidv4()).toMatch(V4);
    });

    it('falls back to Math.random when crypto is entirely absent', () => {
        vi.stubGlobal('crypto', undefined);
        expect(uuidv4()).toMatch(V4);
    });
});
