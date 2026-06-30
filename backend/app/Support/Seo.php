<?php

namespace App\Support;

use App\Http\Middleware\SetLocale;
use Illuminate\Http\Request;

class Seo
{
    public const DEFAULT = 'en';

    /**
     * @return array{canonical: string, alternates: array<string, string>}
     */
    public static function forRequest(Request $request): array
    {
        // Pfad ohne führenden Locale-Prefix ermitteln: "de/rooms/x" -> "rooms/x"
        $segments = explode('/', trim($request->path(), '/'));
        if (isset($segments[0]) && in_array($segments[0], SetLocale::SUPPORTED, true)) {
            array_shift($segments);
        }
        $rest = implode('/', $segments); // ggf. ''

        $build = static fn (string $locale): string => url('/'.trim($locale.'/'.$rest, '/'));

        $alternates = [];
        foreach (SetLocale::SUPPORTED as $locale) {
            $alternates[$locale] = $build($locale);
        }
        $alternates['x-default'] = $build(self::DEFAULT);

        return [
            'canonical' => $build(app()->getLocale()),
            'alternates' => $alternates,
        ];
    }
}
