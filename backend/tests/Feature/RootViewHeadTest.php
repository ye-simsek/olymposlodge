<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RootViewHeadTest extends TestCase
{
    use RefreshDatabase;

    public function test_every_page_links_a_real_favicon(): void
    {
        $html = $this->get('/en')->assertOk()->getContent();

        $this->assertMatchesRegularExpression('#<link rel="icon"[^>]*href="/favicon\.svg"#', $html);
        $this->assertGreaterThan(0, filesize(public_path('favicon.svg')));
        $this->assertGreaterThan(0, filesize(public_path('favicon.ico')), 'favicon.ico must not be an empty file.');
    }

    public function test_brand_fonts_are_declared_and_every_font_file_exists(): void
    {
        $css = file_get_contents(resource_path('css/fonts.css'));

        foreach (['Cormorant Garamond', 'Cormorant SC', 'DM Sans', 'Josefin Sans', 'Cinzel'] as $family) {
            $this->assertStringContainsString("font-family: '{$family}'", $css);
        }

        preg_match_all("#url\('(/fonts/[^']+)'\)#", $css, $matches);
        $this->assertNotEmpty($matches[1]);
        foreach ($matches[1] as $url) {
            $this->assertFileExists(public_path(ltrim($url, '/')), "fonts.css references a missing file: {$url}");
        }

        $this->assertStringContainsString("../css/fonts.css", file_get_contents(resource_path('js/app.tsx')));
    }

    public function test_the_two_main_faces_are_preloaded(): void
    {
        $html = $this->get('/en')->assertOk()->getContent();

        $this->assertMatchesRegularExpression(
            '#<link rel="preload" as="font" type="font/woff2" href="/fonts/cormorant-garamond-300-normal-latin\.woff2" crossorigin>#',
            $html
        );
        $this->assertMatchesRegularExpression(
            '#<link rel="preload" as="font" type="font/woff2" href="/fonts/dm-sans-300-normal-latin\.woff2" crossorigin>#',
            $html
        );
    }
}
