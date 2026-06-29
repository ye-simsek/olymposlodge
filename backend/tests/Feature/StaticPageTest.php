<?php

namespace Tests\Feature;

use App\Models\Translation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StaticPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_terms_renders_component_with_meta(): void
    {
        Translation::create(['namespace' => 'meta', 'key' => 'terms_title', 'en' => 'Terms', 'sort_order' => 0]);
        Translation::create(['namespace' => 'nav', 'key' => 'home', 'en' => 'Home', 'sort_order' => 0]);

        $this->get('/en/terms')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Terms')
                ->where('translations.meta.terms_title', 'Terms')
                ->where('translations.nav.home', 'Home') // globaler NS via PageProps
            );
    }

    public function test_privacy_renders_component(): void
    {
        $this->get('/en/privacy')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Privacy'));
    }
}
