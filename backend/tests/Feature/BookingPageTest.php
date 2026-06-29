<?php

namespace Tests\Feature;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BookingPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_booking_page_renders_with_rooms_including_id(): void
    {
        $room = Room::factory()->create(['is_active' => true, 'slug' => 'deluxe']);

        $this->get('/en/booking')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Booking')
                ->where('locale', 'en')
                ->has('rooms', 1, fn (Assert $r) => $r
                    ->where('id', $room->id)
                    ->where('slug', 'deluxe')
                    ->etc())
                ->where('preselectRoom', null));
    }

    public function test_booking_page_passes_preselect_room_from_query(): void
    {
        Room::factory()->create(['is_active' => true, 'slug' => 'antik']);

        $this->get('/en/booking?room=antik')
            ->assertInertia(fn (Assert $page) => $page->where('preselectRoom', 'antik'));
    }

    public function test_booking_page_only_lists_active_rooms(): void
    {
        Room::factory()->create(['is_active' => true]);
        Room::factory()->create(['is_active' => false]);

        $this->get('/en/booking')
            ->assertInertia(fn (Assert $page) => $page->has('rooms', 1));
    }
}
