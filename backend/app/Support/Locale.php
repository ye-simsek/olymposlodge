<?php

namespace App\Support;

use App\Http\Middleware\SetLocale;
use Illuminate\Http\Request;

class Locale
{
    public const DEFAULT = 'en';

    /** Name of the language cookie. Written in the browser by the language switcher. */
    public const COOKIE = 'ol_lang';

    /**
     * URLs of the old site whose page was renamed here.
     *
     * @var array<string, string>
     */
    public const LEGACY_PATHS = [
        'cirali' => 'experiences',
    ];

    public static function best(Request $request): string
    {
        $cookie = $request->cookie(self::COOKIE);
        if (is_string($cookie) && in_array($cookie, SetLocale::SUPPORTED, true)) {
            return $cookie;
        }

        foreach ($request->getLanguages() as $lang) {
            $code = strtolower(substr($lang, 0, 2));
            if (in_array($code, SetLocale::SUPPORTED, true)) {
                return $code;
            }
        }

        return self::DEFAULT;
    }
}
