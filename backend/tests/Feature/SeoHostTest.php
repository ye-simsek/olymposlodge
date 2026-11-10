<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SeoHostTest extends TestCase
{
    use RefreshDatabase;

    public function test_canonical_and_alternates_use_the_configured_site_url_not_the_request_host(): void
    {
        config(['app.url' => 'https://www.olymposlodge.com.tr']);

        // A spoofed Host header, or a proxy that forwards plain http, must not leak into SEO tags.
        $this->get('http://evil.example/de/rooms')
            ->assertInertia(fn (Assert $page) => $page
                ->where('seo.canonical', 'https://www.olymposlodge.com.tr/de/rooms')
                ->where('seo.alternates.en', 'https://www.olymposlodge.com.tr/en/rooms')
                ->where('seo.alternates.x-default', 'https://www.olymposlodge.com.tr/en/rooms'));
    }

    public function test_home_canonical_has_no_trailing_slash(): void
    {
        config(['app.url' => 'https://www.olymposlodge.com.tr/']);

        $this->get('/tr')->assertInertia(fn (Assert $page) => $page
            ->where('seo.canonical', 'https://www.olymposlodge.com.tr/tr'));
    }
}
