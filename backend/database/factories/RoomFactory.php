<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition(): array
    {
        return [
            'slug' => $this->faker->unique()->slug(2),
            'key_prefix' => 'room',
            'name_tr' => 'Oda', 'name_en' => 'Room', 'name_de' => 'Zimmer',
            'description_tr' => 'Açıklama', 'description_en' => 'Description', 'description_de' => 'Beschreibung',
            'tagline_tr' => null, 'tagline_en' => null, 'tagline_de' => null,
            'texts_tr' => ['p1' => 'tr'], 'texts_en' => ['p1' => 'en'], 'texts_de' => ['p1' => 'de'],
            'capacity' => 2, 'size_sqm' => 30, 'bed_type' => 'king', 'view' => 'lake',
            'price_per_night' => '120.00', 'currency' => 'EUR',
            'amenities' => ['wifi', 'ac'], 'images' => ['hero' => '/img/h.jpg'],
            'sort_order' => 0, 'is_active' => true,
        ];
    }
}
