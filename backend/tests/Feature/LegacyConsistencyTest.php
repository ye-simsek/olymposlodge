<?php

namespace Tests\Feature;

use App\Models\Room;
use App\Models\SiteMedia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Content decisions carried over from the legacy site (June 2026), which the
 * rebuild had lost because it was based on an older snapshot.
 */
class LegacyConsistencyTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_the_four_rooms_shown_on_the_legacy_site_are_active(): void
    {
        $this->seed();

        $this->assertSame(
            ['super-deluxe', 'deluxe', 'gol-evi', 'standart'],
            Room::where('is_active', true)->orderBy('sort_order')->pluck('slug')->all(),
        );
        // Kept in the database so they can be switched back on after the photoshoot.
        $this->assertSame(2, Room::where('is_active', false)->whereIn('slug', ['aqua-super-deluxe', 'antik'])->count());
    }

    public function test_the_conviction_block_shows_the_terracotta_peacock(): void
    {
        $this->seed();

        $this->assertSame('/images/terakota-tavus-kusu-2400.webp', SiteMedia::where('key', 'conviction.image')->value('url'));
        $this->assertStringContainsString("'/images/terakota-tavus-kusu-2400.webp'", file_get_contents(resource_path('js/pages/Home.tsx')));
    }

    public function test_the_offers_page_is_switched_off(): void
    {
        $this->get('/en/offers')->assertNotFound();
        $this->assertStringNotContainsString('/offers', $this->get('/sitemap.xml')->getContent());
    }
}
