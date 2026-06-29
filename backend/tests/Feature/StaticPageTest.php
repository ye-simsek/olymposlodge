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

    public function test_experiences_renders_with_experiences_namespace(): void
    {
        Translation::create(['namespace' => 'experiences', 'key' => 'hero_title', 'en' => 'Experiences', 'sort_order' => 0]);

        $this->get('/en/experiences')
            ->assertOk()
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
                ->component('Experiences')
                ->where('translations.experiences.hero_title', 'Experiences')
            );
    }

    public function test_activities_renders(): void
    {
        Translation::create(['namespace' => 'activities', 'key' => 'hero_title', 'en' => 'Activities', 'sort_order' => 0]);
        $this->get('/en/activities')->assertOk()
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $p) => $p
                ->component('Activities')->where('translations.activities.hero_title', 'Activities'));
    }

    public function test_lodge_renders(): void
    {
        Translation::create(['namespace' => 'lodge', 'key' => 'hero_title', 'en' => 'Lodge', 'sort_order' => 0]);
        $this->get('/en/lodge')->assertOk()
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $p) => $p
                ->component('Lodge')->where('translations.lodge.hero_title', 'Lodge'));
    }

    public function test_spa_renders(): void
    {
        Translation::create(['namespace' => 'spa', 'key' => 'hero_title', 'en' => 'Spa', 'sort_order' => 0]);
        $this->get('/en/spa')->assertOk()
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $p) => $p
                ->component('Spa')->where('translations.spa.hero_title', 'Spa'));
    }

    public function test_gallery_renders(): void
    {
        $this->get('/en/gallery')->assertOk()
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $p) => $p->component('Gallery'));
    }

    public function test_offers_renders(): void
    {
        Translation::create(['namespace' => 'offers', 'key' => 'page_title', 'en' => 'Offers', 'sort_order' => 0]);
        $this->get('/en/offers')->assertOk()
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $p) => $p
                ->component('Offers')->where('translations.offers.page_title', 'Offers'));
    }
}
