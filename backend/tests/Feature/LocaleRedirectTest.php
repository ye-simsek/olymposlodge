<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LocaleRedirectTest extends TestCase
{
    use RefreshDatabase;

    public function test_root_redirects_to_default_locale(): void
    {
        $this->get('/')->assertRedirect('/en')->assertStatus(302);
    }

    public function test_legacy_path_redirects_with_locale_prefix(): void
    {
        $this->get('/rooms')->assertRedirect('/en/rooms')->assertStatus(302);
    }

    public function test_accept_language_header_picks_best_locale(): void
    {
        $this->get('/', ['Accept-Language' => 'de-DE,de;q=0.9'])
            ->assertRedirect('/de')
            ->assertStatus(302);
    }

    public function test_excluded_paths_are_not_redirected(): void
    {
        // /api/* must not enter the locale-redirect matrix.
        // A non-existent API path returns 404 (NOT a redirect) — this proves the exclusion
        // without depending on any concrete endpoint (avoids the external-calling chat endpoint).
        $this->getJson('/api/v1/this-does-not-exist')
            ->assertNotFound();
        $this->get('/api/v1/this-does-not-exist')
            ->assertStatus(404);
        // sitemap bleibt erreichbar ohne Locale-Redirect
        $this->get('/sitemap.xml')->assertOk();
    }

    public function test_locale_prefixed_unknown_path_is_not_redirected_again(): void
    {
        // Regression: once a path has a valid locale prefix (e.g. /en/unknown),
        // the catch-all redirect must NOT fire a second time, preventing
        // an infinite redirect loop (e.g. /en/unknown → /en/en/unknown → …).
        // /en/unknown has no registered route, so it must 404, not a redirect.
        $this->get('/en/unknown-path-that-does-not-exist')->assertStatus(404);
    }

    public function test_multi_segment_legacy_path_redirects_with_locale_prefix(): void
    {
        $this->get('/rooms/deluxe')->assertStatus(302)->assertRedirect('/en/rooms/deluxe');
    }

    public function test_bare_locale_prefix_is_not_redirected(): void
    {
        // '/en' is a reserved locale prefix → no catch-all redirect; 200 (home route added in Plan 2)
        $this->get('/en')->assertStatus(200);
    }

    public function test_language_redirects_are_temporary_and_vary_by_language_signals(): void
    {
        // The target depends on the visitor (cookie, Accept-Language). A permanent
        // redirect would be cached by browsers and proxies for everyone after them.
        $response = $this->get('/rooms');

        $response->assertStatus(302);
        $this->assertStringContainsString('Accept-Language', (string) $response->headers->get('Vary'));
        $this->assertStringContainsString('Cookie', (string) $response->headers->get('Vary'));
    }

    public function test_query_string_survives_the_redirect(): void
    {
        $this->get('/rooms?utm_source=newsletter&utm_campaign=spring')
            ->assertRedirect('/en/rooms?utm_source=newsletter&utm_campaign=spring');
        $this->get('/?utm_source=newsletter')->assertRedirect('/en?utm_source=newsletter');
    }

    public function test_language_cookie_overrides_accept_language(): void
    {
        // The language switcher sets this cookie in the browser, so it arrives unencrypted.
        $this->withUnencryptedCookie('ol_lang', 'tr')
            ->get('/', ['Accept-Language' => 'de-DE'])
            ->assertRedirect('/tr')
            ->assertStatus(302);
    }

    public function test_legacy_cirali_url_lands_on_the_experiences_page(): void
    {
        $this->get('/cirali')->assertRedirect('/en/experiences');
        $this->get('/en/experiences')->assertOk();
    }
}
