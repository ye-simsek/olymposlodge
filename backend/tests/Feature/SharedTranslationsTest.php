<?php

namespace Tests\Feature;

use App\Models\Translation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SharedTranslationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_global_namespaces_are_shared_for_active_locale(): void
    {
        Translation::create(['namespace' => 'nav', 'key' => 'home', 'en' => 'Home', 'de' => 'Start', 'sort_order' => 0]);
        Translation::create(['namespace' => 'home', 'key' => 'hero', 'en' => 'Hero', 'de' => 'Held', 'sort_order' => 0]);

        $this->get('/de/_smoke')
            ->assertInertia(fn (Assert $page) => $page
                ->where('locale', 'de')
                ->where('translations.nav.home', 'Start')
                // 'home' ist KEIN globaler Namespace -> nicht in shared props
                ->missing('translations.home')
            );
    }
}
