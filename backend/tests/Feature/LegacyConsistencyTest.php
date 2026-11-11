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

    public function test_super_deluxe_lists_the_indoor_and_outdoor_rain_shower(): void
    {
        $this->seed();

        $superDeluxe = Room::where('slug', 'super-deluxe')->firstOrFail();
        $this->assertContains('amenity_rain_shower_in_out', $superDeluxe->amenities);
        $this->assertNotContains('amenity_rain_shower', $superDeluxe->amenities);
        // The other visible rooms have an indoor rain shower only.
        $this->assertContains('amenity_rain_shower', Room::where('slug', 'deluxe')->firstOrFail()->amenities);
    }

    public function test_room_pages_use_the_legacy_descriptions(): void
    {
        $this->seed();
        $texts = fn (string $slug, string $lang) => Room::where('slug', $slug)->firstOrFail()->{"texts_{$lang}"};

        $this->assertStringStartsWith('70 metrekare ile hem konut kadar ferah', $texts('deluxe', 'tr')['p1']);
        $this->assertStringStartsWith('At 70 square metres, the Deluxe is as generous', $texts('deluxe', 'en')['p1']);
        $this->assertStringStartsWith('Mit 70 Quadratmetern ist das Deluxe', $texts('deluxe', 'de')['p1']);

        // Facts the rewritten copy got wrong: the Lake House has a jacuzzi,
        // the Standard Room has no espresso machine.
        $this->assertStringContainsString('jacuzzi', $texts('gol-evi', 'en')['p3']);
        foreach (['tr', 'en', 'de'] as $lang) {
            $this->assertStringNotContainsStringIgnoringCase('espresso', implode(' ', $texts('standart', $lang)));
            $this->assertCount(4, $texts('standart', $lang));
        }
    }

    public function test_location_intro_uses_the_legacy_wording(): void
    {
        $this->seed(\Database\Seeders\TranslationSeeder::class);

        $intro = \App\Models\Translation::where('namespace', 'location')->where('key', 'intro_body')->firstOrFail();
        $this->assertStringStartsWith('Torosların denizle buluştuğu korunaklı bir vadinin ucunda', $intro->tr);
        $this->assertStringContainsString('das Tal nimmt Sie auf', $intro->de);
    }
}
