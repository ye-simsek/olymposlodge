<?php

namespace Tests\Feature;

use App\Models\Room;
use App\Models\Translation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class RoomsPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_rooms_index_lists_active_rooms(): void
    {
        Room::factory()->create([
            'slug' => 'deluxe', 'name_en' => 'Deluxe', 'images' => ['hero' => '/h.jpg'],
            'view' => 'lake', 'size_sqm' => 30, 'sort_order' => 0,
        ]);
        Translation::create(['namespace' => 'rooms_page', 'key' => 'hero_subtitle', 'en' => 'Our rooms', 'sort_order' => 0]);

        $this->get('/en/rooms')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Rooms')
                ->where('rooms.0.name', 'Deluxe')
                ->where('translations.rooms_page.hero_subtitle', 'Our rooms')
            );
    }
}
