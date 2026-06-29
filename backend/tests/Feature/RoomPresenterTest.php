<?php

namespace Tests\Feature;

use App\Models\Room;
use App\Support\RoomPresenter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoomPresenterTest extends TestCase
{
    use RefreshDatabase;

    private function makeRoom(array $overrides = []): Room
    {
        return Room::factory()->create(array_merge([
            'slug' => 'deluxe', 'key_prefix' => 'deluxe',
            'name_tr' => 'Lüks', 'name_en' => 'Deluxe', 'name_de' => 'Deluxe DE',
            'tagline_tr' => 'TR', 'tagline_en' => 'EN tagline', 'tagline_de' => null,
            'description_tr' => 'Aç TR', 'description_en' => 'Desc EN', 'description_de' => 'Desc DE',
            'texts_tr' => ['p1' => 'tr1'], 'texts_en' => ['p1' => 'en1'], 'texts_de' => ['p1' => 'de1'],
            'capacity' => 2, 'size_sqm' => 30, 'bed_type' => 'king', 'view' => 'lake',
            'price_per_night' => '120.00', 'currency' => 'EUR',
            'amenities' => ['wifi', 'ac'], 'images' => ['hero' => '/img/h.jpg', 'full1' => '/img/f1.jpg'],
            'sort_order' => 0, 'is_active' => true,
        ], $overrides));
    }

    public function test_localizes_fields_for_requested_locale(): void
    {
        $room = $this->makeRoom();

        $data = RoomPresenter::localize($room, 'de');

        $this->assertSame('Deluxe DE', $data['name']);
        $this->assertSame('Desc DE', $data['description']);
        $this->assertSame(['p1' => 'de1'], $data['texts']);
        $this->assertSame(['wifi', 'ac'], $data['amenities']);
        $this->assertSame('/img/h.jpg', $data['images']['hero']);
        $this->assertSame('deluxe', $data['slug']);
    }

    public function test_falls_back_to_english_when_locale_value_null(): void
    {
        $room = $this->makeRoom(['tagline_de' => null]);

        $data = RoomPresenter::localize($room, 'de');

        // tagline_de ist null -> Fallback auf tagline_en
        $this->assertSame('EN tagline', $data['tagline']);
    }

    public function test_neighbour_returns_slug_name_hero(): void
    {
        $room = $this->makeRoom();

        $n = RoomPresenter::neighbour($room, 'en');

        $this->assertSame(['slug' => 'deluxe', 'name' => 'Deluxe', 'hero' => '/img/h.jpg'], $n);
    }
}
