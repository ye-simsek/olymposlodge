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

    public function test_without_a_tag_manager_id_no_tracking_code_is_emitted(): void
    {
        config(['services.gtm.id' => null]);

        $html = $this->get('/en')->getContent();

        $this->assertStringNotContainsString('googletagmanager.com', $html);
    }

    public function test_with_a_tag_manager_id_consent_is_denied_before_the_tag_loads(): void
    {
        config(['services.gtm.id' => 'GTM-TEST123']);

        $html = $this->get('/en')->getContent();

        $consent = strpos($html, "gtag('consent', 'default'");
        $loader = strpos($html, 'googletagmanager.com/gtm.js');
        $this->assertNotFalse($consent, 'Consent Mode default is missing.');
        $this->assertNotFalse($loader, 'Tag Manager loader is missing.');
        $this->assertLessThan($loader, $consent, 'Consent default must run before Tag Manager loads.');
        $this->assertStringContainsString("analytics_storage: 'denied'", $html);
        $this->assertStringContainsString('GTM-TEST123', $html);
    }

    public function test_pages_mark_javascript_as_available_for_progressive_reveal(): void
    {
        // Reveal animations hide content only under html.js (see base.css), so the
        // page stays readable when the script bundle fails to load.
        $this->assertStringContainsString("document.documentElement.classList.add('js')", $this->get('/en')->getContent());
    }

    public function test_robots_txt_points_to_the_sitemap_and_keeps_the_admin_out(): void
    {
        $robots = file_get_contents(public_path('robots.txt'));

        $this->assertStringContainsString('Sitemap: https://www.olymposlodge.com.tr/sitemap.xml', $robots);
        $this->assertStringContainsString('Disallow: /admin', $robots);
    }

    public function test_the_smoke_test_page_is_not_public_in_production(): void
    {
        $this->get('/en/_smoke')->assertOk();

        $this->app['env'] = 'production';

        $this->get('/en/_smoke')->assertNotFound();
    }
}
