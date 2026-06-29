<?php

namespace Tests\Feature;

use Tests\TestCase;

class LocaleRedirectTest extends TestCase
{
    public function test_root_redirects_to_default_locale(): void
    {
        $this->get('/')->assertRedirect('/en');
    }

    public function test_legacy_path_redirects_with_locale_prefix(): void
    {
        $this->get('/rooms')->assertRedirect('/en/rooms');
    }

    public function test_accept_language_header_picks_best_locale(): void
    {
        $this->get('/', ['Accept-Language' => 'de-DE,de;q=0.9'])
            ->assertRedirect('/de');
    }

    public function test_cookie_overrides_accept_language(): void
    {
        $this->withCookie('ol_lang', 'tr')
            ->get('/', ['Accept-Language' => 'de-DE'])
            ->assertRedirect('/tr');
    }

    public function test_excluded_paths_are_not_redirected(): void
    {
        // /api/* darf nicht in die Redirect-Matrix geraten
        $this->getJson('/api/v1/rooms')->assertOk();
        // sitemap bleibt erreichbar ohne Locale-Redirect
        $this->get('/sitemap.xml')->assertOk();
    }
}
