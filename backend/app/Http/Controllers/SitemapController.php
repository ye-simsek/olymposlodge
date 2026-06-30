<?php

namespace App\Http\Controllers;

use App\Http\Middleware\SetLocale;
use App\Models\Room;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    private const BASE = 'https://www.olymposlodge.com.tr';

    /**
     * Pilot pages only (Plan 2): home + rooms index + individual room slugs.
     *
     * Experiences / location / gallery / offers / contact are omitted until
     * those pages are migrated to Inertia (Plan 3).
     *
     * Each <url> carries xhtml:link hreflang alternates for all supported
     * locales plus an x-default pointing at the English variant, as required
     * by Google's multilingual sitemap spec.
     */
    public function index(): Response
    {
        $locales = SetLocale::SUPPORTED;          // ['tr', 'en', 'de']

        // ── collect pilot page paths (without locale prefix) ────────────────
        // '' = home, 'rooms' = rooms index
        $staticPaths = [
            ['path' => '',      'priority' => '1.0', 'changefreq' => 'weekly'],
            ['path' => 'rooms', 'priority' => '0.9', 'changefreq' => 'weekly'],
        ];

        $roomPaths = Room::where('is_active', true)
            ->orderBy('sort_order')
            ->pluck('slug')
            ->map(fn ($slug) => [
                'path'       => 'rooms/' . $slug,
                'priority'   => '0.8',
                'changefreq' => 'monthly',
            ])
            ->all();

        $allPaths = array_merge($staticPaths, $roomPaths);

        // ── build XML ───────────────────────────────────────────────────────
        $xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
        $xml .= '        xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

        foreach ($allPaths as $page) {
            // Emit one <url> per locale variant of this page.
            foreach ($locales as $locale) {
                $canonicalPath = $locale . ($page['path'] !== '' ? '/' . $page['path'] : '');
                $canonicalUrl  = self::BASE . '/' . $canonicalPath;

                $xml .= "  <url>\n";
                $xml .= "    <loc>{$canonicalUrl}</loc>\n";

                // hreflang alternates for every locale + x-default → English
                foreach ($locales as $altLocale) {
                    $altPath = $altLocale . ($page['path'] !== '' ? '/' . $page['path'] : '');
                    $altUrl  = self::BASE . '/' . $altPath;
                    $xml    .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$altLocale}\" href=\"{$altUrl}\"/>\n";
                }

                // x-default points at the English variant
                $defaultPath = 'en' . ($page['path'] !== '' ? '/' . $page['path'] : '');
                $defaultUrl  = self::BASE . '/' . $defaultPath;
                $xml        .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$defaultUrl}\"/>\n";

                $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
                $xml .= "    <priority>{$page['priority']}</priority>\n";
                $xml .= "  </url>\n";
            }
        }

        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
