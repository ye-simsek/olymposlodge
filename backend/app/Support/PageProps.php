<?php

namespace App\Support;

use Closure;

class PageProps
{
    /**
     * Auf JEDER Seite via Layout gerendertes Chrome (Header/Footer/Newsletter/Weather/Cookie/Chat).
     *
     * @var array<int, string>
     */
    public const GLOBAL = ['common', 'nav', 'footer', 'cookie', 'newsletter', 'weather', 'chat'];

    /**
     * Liefert eine lazy Closure mit global ∪ page Übersetzungen für die aktive Locale.
     *
     * @param  array<int, string>  $pageNamespaces
     */
    public static function translations(array $pageNamespaces): Closure
    {
        return fn () => (new TranslationRepository())->forLocale(
            app()->getLocale(),
            array_values(array_unique([...self::GLOBAL, ...$pageNamespaces])),
        );
    }
}
