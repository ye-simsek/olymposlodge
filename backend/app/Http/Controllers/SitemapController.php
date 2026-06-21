<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    private const BASE = 'https://www.olymposlodge.com.tr';

    private const STATIC_PATHS = [
        ['path' => '',           'priority' => '1.0', 'changefreq' => 'weekly'],
        ['path' => '/rooms',     'priority' => '0.9', 'changefreq' => 'weekly'],
        ['path' => '/experiences','priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/location',  'priority' => '0.7', 'changefreq' => 'monthly'],
        ['path' => '/gallery',   'priority' => '0.7', 'changefreq' => 'monthly'],
        ['path' => '/offers',    'priority' => '0.8', 'changefreq' => 'weekly'],
        ['path' => '/contact',   'priority' => '0.6', 'changefreq' => 'monthly'],
    ];

    public function index(): Response
    {
        $urls = collect(self::STATIC_PATHS)->map(fn ($p) => [
            'loc'        => self::BASE . $p['path'],
            'priority'   => $p['priority'],
            'changefreq' => $p['changefreq'],
        ]);

        Room::where('is_active', true)
            ->orderBy('sort_order')
            ->pluck('slug')
            ->each(fn ($slug) => $urls->push([
                'loc'        => self::BASE . '/rooms/' . $slug,
                'priority'   => '0.8',
                'changefreq' => 'monthly',
            ]));

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($urls as $u) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$u['loc']}</loc>\n";
            $xml .= "    <changefreq>{$u['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$u['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
