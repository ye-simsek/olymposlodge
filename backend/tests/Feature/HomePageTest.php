<?php

namespace Tests\Feature;

use App\Models\Room;
use App\Models\SiteMedia;
use App\Models\Translation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_renders_with_rooms_media_and_translations(): void
    {
        Room::factory()->create([
            'slug' => 'deluxe', 'name_en' => 'Deluxe', 'view' => 'lake', 'size_sqm' => 30,
            'images' => ['hero' => '/img/h.jpg'], 'sort_order' => 0,
        ]);
        // Hinweis: SiteMedia-Keys enthalten in echt Punkte (z.B. 'hero.poster'); für die
        // assertInertia-Dot-Notation hier bewusst ein punktloser Key, um den Pass-through zu prüfen.
        SiteMedia::create(['key' => 'heroposter', 'label' => 'Hero', 'group' => 'hero', 'url' => '/x.jpg', 'sort_order' => 0]);
        Translation::create(['namespace' => 'intro', 'key' => 'title', 'en' => 'Welcome', 'de' => 'Willkommen', 'sort_order' => 0]);
        Translation::create(['namespace' => 'nav', 'key' => 'home', 'en' => 'Home', 'sort_order' => 0]);

        $this->get('/en')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Home')
                ->where('rooms.0.name', 'Deluxe')
                ->where('rooms.0.images.hero', '/img/h.jpg')
                ->has('media')
                ->where('media.heroposter', '/x.jpg')
                ->where('translations.intro.title', 'Welcome')
                ->where('translations.nav.home', 'Home')
            );
    }

    public function test_inactive_rooms_are_excluded(): void
    {
        Room::factory()->create(['slug' => 'hidden', 'is_active' => false]);

        $this->get('/en')
            ->assertInertia(fn (Assert $page) => $page->where('rooms', []));
    }
}
