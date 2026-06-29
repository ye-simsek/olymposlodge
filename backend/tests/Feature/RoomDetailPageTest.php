<?php

namespace Tests\Feature;

use App\Models\Room;
use App\Models\Translation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class RoomDetailPageTest extends TestCase
{
    use RefreshDatabase;

    private function seedRooms(): void
    {
        foreach (['deluxe', 'suite'] as $i => $slug) {
            Room::factory()->create([
                'slug' => $slug, 'name_en' => ucfirst($slug),
                'images' => ['hero' => "/{$slug}.jpg"], 'sort_order' => $i,
            ]);
        }
    }

    public function test_room_detail_renders_with_neighbours(): void
    {
        $this->seedRooms();
        Translation::create(['namespace' => 'room_detail', 'key' => 'discover', 'en' => 'Discover', 'sort_order' => 0]);

        $this->get('/en/rooms/deluxe')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('RoomDetail')
                ->where('room.name', 'Deluxe')
                ->where('room.next.slug', 'suite')
                ->where('room.prev.slug', 'suite') // zirkulär bei 2 Rooms
                ->where('translations.room_detail.discover', 'Discover')
            );
    }

    public function test_unknown_slug_returns_404(): void
    {
        $this->seedRooms();
        $this->get('/en/rooms/does-not-exist')->assertNotFound();
    }
}
