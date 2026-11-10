<?php

namespace Database\Seeders;

use App\Models\SiteMedia;
use Illuminate\Database\Seeder;

class SiteMediaSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // Hero
            ['key' => 'hero.video_webm',  'label' => 'Hero Video (WebM)',       'group' => 'hero',    'url' => '/hero.webm',                                                    'sort_order' => 1],
            ['key' => 'hero.video_mp4',   'label' => 'Hero Video (MP4)',        'group' => 'hero',    'url' => '/hero.mp4',                                                     'sort_order' => 2],
            ['key' => 'hero.poster',      'label' => 'Hero Poster / Fallback',  'group' => 'hero',    'url' => "/images/olympos-lodge-kus-bakisi-1366.webp",                 'sort_order' => 3],

            // Gallery
            ['key' => 'gallery.1', 'label' => 'Gallery — Bild 1', 'group' => 'gallery', 'url' => "/images/oda-super-deluxe-2-1920.webp", 'sort_order' => 1],
            ['key' => 'gallery.2', 'label' => 'Gallery — Bild 2', 'group' => 'gallery', 'url' => "/images/bahce-oturma-2000.webp",                               'sort_order' => 2],
            ['key' => 'gallery.3', 'label' => 'Gallery — Bild 3', 'group' => 'gallery', 'url' => "/images/bahce-patika-2000.webp",                                 'sort_order' => 3],
            ['key' => 'gallery.4', 'label' => 'Gallery — Bild 4', 'group' => 'gallery', 'url' => "/images/bahce-hamak-2000.webp",                                 'sort_order' => 4],
            ['key' => 'gallery.5', 'label' => 'Gallery — Bild 5', 'group' => 'gallery', 'url' => "/images/cirali-koyu-1155.webp",                   'sort_order' => 5],
            ['key' => 'gallery.6', 'label' => 'Gallery — Bild 6', 'group' => 'gallery', 'url' => "/images/bahce-golet-1700.webp",                'sort_order' => 6],

            // Story & Philosophy (Homepage)
            ['key' => 'story.garden',    'label' => 'Story — Garten (links)',    'group' => 'story', 'url' => "/images/cirali-sahili-gunbatimi-1600.webp", 'sort_order' => 1],
            ['key' => 'story.nature',    'label' => 'Story — Natur (rechts)',    'group' => 'story', 'url' => "/images/olympos-lodge-tabela-1920.webp",    'sort_order' => 2],
            ['key' => 'conviction.image','label' => 'Conviction — Bild',         'group' => 'story', 'url' => '/images/terakota-tavus-kusu-2400.webp', 'sort_order' => 3],

            // Rooms Page
            ['key' => 'rooms_page.hero', 'label' => 'Zimmer-Seite — Hero',      'group' => 'pages', 'url' => '/images/odalar-hero-2400.webp', 'sort_order' => 1],
        ];

        foreach ($items as $item) {
            SiteMedia::updateOrCreate(['key' => $item['key']], $item);
        }
    }
}
