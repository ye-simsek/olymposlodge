<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;
    protected $fillable = [
        'slug', 'name_tr', 'name_en', 'name_de',
        'description_tr', 'description_en', 'description_de',
        'tagline_tr', 'tagline_en', 'tagline_de',
        'texts_tr', 'texts_en', 'texts_de',
        'capacity', 'size_sqm', 'bed_type', 'view',
        'price_per_night', 'currency', 'key_prefix',
        'amenities', 'images', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'amenities'      => 'array',
        'images'         => 'array',
        'texts_tr'       => 'array',
        'texts_en'       => 'array',
        'texts_de'       => 'array',
        'is_active'      => 'boolean',
        'price_per_night' => 'decimal:2',
    ];

    /**
     * The reservations table cascades on room deletion, so deleting a room would
     * silently erase its booking history. Rooms with reservations are kept;
     * switch them off with is_active instead.
     */
    protected static function booted(): void
    {
        static::deleting(fn (Room $room) => ! $room->reservations()->exists());
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
