<?php

namespace Tests\Feature;

use Tests\TestCase;

class LocaleRedirectTest extends TestCase
{
    public function test_root_redirects_to_default_locale(): void
    {
        // 302 (temporary) in Plan 1: locale target pages don't exist yet, so the
        // redirect must not be permanently cached. Becomes 301 in Plan 2.
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

    public function test_cookie_overrides_accept_language(): void
    {
        $this->withCookie('ol_lang', 'tr')
            ->get('/', ['Accept-Language' => 'de-DE'])
            ->assertRedirect('/tr')
            ->assertStatus(302);
    }

    public function test_excluded_paths_are_not_redirected(): void
    {
        // /api/* darf nicht in die Redirect-Matrix geraten
        $this->getJson('/api/v1/rooms')->assertOk();
        // sitemap bleibt erreichbar ohne Locale-Redirect
        $this->get('/sitemap.xml')->assertOk();
    }

    public function test_locale_prefixed_unknown_path_is_not_redirected_again(): void
    {
        // Regression: once a path has a valid locale prefix (e.g. /en/unknown),
        // the catch-all redirect must NOT fire a second time, preventing
        // an infinite redirect loop (e.g. /en/unknown → /en/en/unknown → …).
        // /en/unknown has no registered route, so it must 404, not 301/302.
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
}
