<?php

namespace App\Support;

use App\Http\Middleware\SetLocale;
use Illuminate\Http\Request;

class Locale
{
    public const DEFAULT = 'en';

    public static function best(Request $request): string
    {
        $cookie = $request->cookie('ol_lang');
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
