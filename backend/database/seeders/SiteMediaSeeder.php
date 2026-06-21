<?php

namespace Database\Seeders;

use App\Models\SiteMedia;
use Illuminate\Database\Seeder;

class SiteMediaSeeder extends Seeder
{
    public function run(): void
    {
        $wp = 'https://www.olymposlodge.com.tr/wp-content/uploads';

        $items = [
            // Hero
            ['key' => 'hero.video_webm',  'label' => 'Hero Video (WebM)',       'group' => 'hero',    'url' => '/hero.webm',                                                    'sort_order' => 1],
            ['key' => 'hero.video_mp4',   'label' => 'Hero Video (MP4)',        'group' => 'hero',    'url' => '/hero.mp4',                                                     'sort_order' => 2],
            ['key' => 'hero.poster',      'label' => 'Hero Poster / Fallback',  'group' => 'hero',    'url' => "$wp/2024/11/DJI_0071-Large-e1731205515573.jpg",                 'sort_order' => 3],

            // Gallery
            ['key' => 'gallery.1', 'label' => 'Gallery — Bild 1', 'group' => 'gallery', 'url' => "$wp/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg", 'sort_order' => 1],
            ['key' => 'gallery.2', 'label' => 'Gallery — Bild 2', 'group' => 'gallery', 'url' => "$wp/2025/04/IMG_5376-1.jpg",                               'sort_order' => 2],
            ['key' => 'gallery.3', 'label' => 'Gallery — Bild 3', 'group' => 'gallery', 'url' => "$wp/2024/11/IMG_5150.jpg",                                 'sort_order' => 3],
            ['key' => 'gallery.4', 'label' => 'Gallery — Bild 4', 'group' => 'gallery', 'url' => "$wp/2024/11/IMG_5400.jpg",                                 'sort_order' => 4],
            ['key' => 'gallery.5', 'label' => 'Gallery — Bild 5', 'group' => 'gallery', 'url' => "$wp/2024/11/olympos-e1731029804798.jpg",                   'sort_order' => 5],
            ['key' => 'gallery.6', 'label' => 'Gallery — Bild 6', 'group' => 'gallery', 'url' => "$wp/2025/04/IMG_5434-e1731093615320-1.jpg",                'sort_order' => 6],

            // Story & Philosophy (Homepage)
            ['key' => 'story.garden',    'label' => 'Story — Garten (links)',    'group' => 'story', 'url' => "$wp/2024/11/IMG_5510-1.jpg", 'sort_order' => 1],
            ['key' => 'story.nature',    'label' => 'Story — Natur (rechts)',    'group' => 'story', 'url' => "$wp/2024/11/MG_7191.jpg",    'sort_order' => 2],
            ['key' => 'conviction.image','label' => 'Conviction — Bild',         'group' => 'story', 'url' => "$wp/2024/11/IMG_5510-1.jpg", 'sort_order' => 3],

            // Rooms Page
            ['key' => 'rooms_page.hero', 'label' => 'Zimmer-Seite — Hero',      'group' => 'pages', 'url' => '/images/rooms-hero.webp', 'sort_order' => 1],
        ];

        foreach ($items as $item) {
            SiteMedia::updateOrCreate(['key' => $item['key']], $item);
        }
    }
}
