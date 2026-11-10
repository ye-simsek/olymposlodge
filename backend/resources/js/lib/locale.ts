const LANGUAGE_COOKIE = 'ol_lang'; // keep in sync with App\Support\Locale::COOKIE
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Remembers an explicit language choice. The server reads this cookie when a
 * visitor opens a URL without a language prefix (see App\Support\Locale::best).
 */
export function rememberLanguage(locale: string): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${LANGUAGE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

/** Same-site path for an alternate-language URL, keeping the current query string. */
export function alternatePath(alternateUrl: string, search = ''): string {
    try {
        return new URL(alternateUrl, 'http://placeholder.invalid').pathname + search;
    } catch {
        return alternateUrl;
    }
}
