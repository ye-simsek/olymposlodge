<?php

namespace App\Support;

use App\Models\Room;

class RoomPresenter
{
    public const FALLBACK = 'en';

    /**
     * @return array<string, mixed>
     */
    public static function localize(Room $room, string $locale): array
    {
        return [
            'slug' => $room->slug,
            'key_prefix' => $room->key_prefix,
            'name' => self::pick($room, 'name', $locale),
            'tagline' => self::pick($room, 'tagline', $locale),
            'description' => self::pick($room, 'description', $locale),
            'texts' => $room->{"texts_{$locale}"} ?? $room->{'texts_'.self::FALLBACK} ?? [],
            'capacity' => $room->capacity,
            'size_sqm' => $room->size_sqm,
            'bed_type' => $room->bed_type,
            'view' => $room->view,
            'currency' => $room->currency,
            'price_per_night' => $room->price_per_night,
            'amenities' => $room->amenities ?? [],
            'images' => $room->images ?? [],
        ];
    }

    /**
     * @return array{slug: string, name: string, hero: ?string}
     */
    public static function neighbour(Room $room, string $locale): array
    {
        return [
            'slug' => $room->slug,
            'name' => self::pick($room, 'name', $locale),
            'hero' => $room->images['hero'] ?? null,
        ];
    }

    private static function pick(Room $room, string $field, string $locale): ?string
    {
        return $room->{"{$field}_{$locale}"} ?? $room->{"{$field}_".self::FALLBACK};
    }
}
