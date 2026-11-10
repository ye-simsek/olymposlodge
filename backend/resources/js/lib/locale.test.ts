import { afterEach, describe, expect, it } from 'vitest';
import { alternatePath, rememberLanguage } from './locale';

afterEach(() => {
    document.cookie = 'ol_lang=; path=/; max-age=0';
});

describe('rememberLanguage', () => {
    it('stores the chosen language in the ol_lang cookie the server reads', () => {
        rememberLanguage('tr');

        expect(document.cookie).toContain('ol_lang=tr');
    });
});

describe('alternatePath', () => {
    it('turns an absolute alternate URL into a same-site path', () => {
        // Alternates are built from the configured site URL; navigating to them as-is
        // would leave a staging or local host.
        expect(alternatePath('https://www.olymposlodge.com.tr/de/rooms/deluxe')).toBe('/de/rooms/deluxe');
    });

    it('keeps the current query string', () => {
        expect(alternatePath('https://www.olymposlodge.com.tr/de/booking', '?room=antik')).toBe('/de/booking?room=antik');
    });

    it('passes a relative path through', () => {
        expect(alternatePath('/tr/rooms')).toBe('/tr/rooms');
    });
});
