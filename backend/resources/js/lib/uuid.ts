// `crypto.randomUUID()` is only exposed in secure contexts (HTTPS or
// localhost/127.0.0.1). When the app is served over plain HTTP from any other
// host (a LAN IP, a WSL host name, …) it is `undefined` and calling it throws,
// which can take down the whole React tree. `crypto.getRandomValues()` is NOT
// secure-context-gated, so we fall back to an RFC 4122 v4 built on it, and to
// `Math.random()` as a last resort. The value is only a non-cryptographic
// conversation id, so the weaker fallback is acceptable.
export function uuidv4(): string {
    const c = typeof crypto !== 'undefined' ? crypto : undefined;

    if (typeof c?.randomUUID === 'function') {
        return c.randomUUID();
    }

    const bytes = new Uint8Array(16);
    if (typeof c?.getRandomValues === 'function') {
        c.getRandomValues(bytes);
    } else {
        for (let i = 0; i < 16; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
    }

    // Set the version (4) and variant (10xx) bits per RFC 4122.
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
    return (
        hex.slice(0, 4).join('') +
        '-' +
        hex.slice(4, 6).join('') +
        '-' +
        hex.slice(6, 8).join('') +
        '-' +
        hex.slice(8, 10).join('') +
        '-' +
        hex.slice(10, 16).join('')
    );
}
