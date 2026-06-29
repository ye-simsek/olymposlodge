<?php

namespace Tests\Feature;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class SitemapTest extends TestCase
{
    use RefreshDatabase;

    // ── helpers ──────────────────────────────────────────────────────────────

    private function sitemap(): \Illuminate\Testing\TestResponse
    {
        return $this->get('/sitemap.xml');
    }

    // ── basic response ────────────────────────────────────────────────────────

    public function test_returns_200_with_xml_content_type(): void
    {
        $response = $this->sitemap();

        $response->assertStatus(200);
        $this->assertStringContainsString('application/xml', $response->headers->get('Content-Type'));
    }

    // ── locale-prefixed URLs exist ────────────────────────────────────────────

    #[DataProvider('localeProvider')]
    public function test_contains_locale_prefixed_home_url(string $locale): void
    {
        $this->assertStringContainsString(
            "<loc>https://www.olymposlodge.com.tr/{$locale}</loc>",
            $this->sitemap()->getContent()
        );
    }

    #[DataProvider('localeProvider')]
    public function test_contains_locale_prefixed_rooms_url(string $locale): void
    {
        $this->assertStringContainsString(
            "<loc>https://www.olymposlodge.com.tr/{$locale}/rooms</loc>",
            $this->sitemap()->getContent()
        );
    }

    public static function localeProvider(): array
    {
        return [['tr'], ['en'], ['de']];
    }

    // ── Plan-3 content pages ──────────────────────────────────────────────────

    public function test_sitemap_includes_new_static_pages_locale_prefixed(): void
    {
        $xml = $this->get('/sitemap.xml')->getContent();

        foreach (['experiences', 'activities', 'lodge', 'spa', 'location', 'gallery', 'offers', 'contact', 'terms', 'privacy'] as $path) {
            $this->assertStringContainsString("/en/{$path}</loc>", $xml, "missing /en/{$path}");
            $this->assertStringContainsString("/de/{$path}", $xml);
            $this->assertStringContainsString("/tr/{$path}", $xml);
        }
        // Booking + 404 sind NICHT enthalten
        $this->assertStringNotContainsString('/booking', $xml);
    }

    // ── no unprefixed / not-yet-migrated URLs ────────────────────────────────

    public function test_does_not_contain_bare_rooms_url(): void
    {
        $this->assertStringNotContainsString(
            '<loc>https://www.olymposlodge.com.tr/rooms</loc>',
            $this->sitemap()->getContent()
        );
    }

    public function test_does_not_contain_bare_home_url(): void
    {
        // bare home would be exactly BASE + '' or BASE + '/'
        $content = $this->sitemap()->getContent();
        $this->assertStringNotContainsString(
            '<loc>https://www.olymposlodge.com.tr</loc>',
            $content
        );
        $this->assertStringNotContainsString(
            '<loc>https://www.olymposlodge.com.tr/</loc>',
            $content
        );
    }

    // ── hreflang alternates ───────────────────────────────────────────────────

    public function test_contains_xhtml_namespace(): void
    {
        $this->assertStringContainsString(
            'xmlns:xhtml="http://www.w3.org/1999/xhtml"',
            $this->sitemap()->getContent()
        );
    }

    public function test_contains_hreflang_x_default_pointing_to_en(): void
    {
        $content = $this->sitemap()->getContent();
        $this->assertStringContainsString('hreflang="x-default"', $content);
        // x-default must reference the /en variant
        $this->assertMatchesRegularExpression(
            '/hreflang="x-default"[^>]*href="https:\/\/www\.olymposlodge\.com\.tr\/en/',
            $content
        );
    }

    #[DataProvider('localeProvider')]
    public function test_contains_hreflang_for_each_locale(string $locale): void
    {
        $this->assertStringContainsString(
            "hreflang=\"{$locale}\"",
            $this->sitemap()->getContent()
        );
    }

    // ── per-room entries ──────────────────────────────────────────────────────

    public function test_contains_locale_prefixed_room_slug_urls(): void
    {
        $room = Room::factory()->create(['slug' => 'test-suite-room', 'is_active' => true]);

        $content = $this->sitemap()->getContent();

        foreach (['tr', 'en', 'de'] as $locale) {
            $this->assertStringContainsString(
                "<loc>https://www.olymposlodge.com.tr/{$locale}/rooms/{$room->slug}</loc>",
                $content,
                "Expected /{$locale}/rooms/{$room->slug} in sitemap"
            );
        }
    }

    public function test_inactive_rooms_excluded_from_sitemap(): void
    {
        Room::factory()->create(['slug' => 'inactive-room', 'is_active' => false]);

        $this->assertStringNotContainsString(
            '/rooms/inactive-room',
            $this->sitemap()->getContent()
        );
    }

    public function test_hreflang_alternates_present_for_room(): void
    {
        $room = Room::factory()->create(['slug' => 'alt-room', 'is_active' => true]);

        $content = $this->sitemap()->getContent();

        // Each locale alternate must appear inside the room's <url> block
        $this->assertMatchesRegularExpression(
            '/hreflang="x-default"[^>]*href="https:\/\/www\.olymposlodge\.com\.tr\/en\/rooms\/' . $room->slug . '"/',
            $content
        );
    }
}
