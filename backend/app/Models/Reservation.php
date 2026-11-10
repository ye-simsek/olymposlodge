<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    protected $fillable = [
        'room_id', 'confirmation_number',
        'guest_name', 'guest_email', 'guest_phone', 'guest_country',
        'check_in', 'check_out', 'adults', 'children',
        'price_per_night', 'total_price', 'currency',
        'status', 'channel', 'guest_notes', 'internal_notes',
    ];

    protected $casts = [
        'check_in'  => 'date',
        'check_out' => 'date',
        'price_per_night' => 'decimal:2',
        'total_price'     => 'decimal:2',
    ];

    /**
     * Next free number for the current year, e.g. OL-2026-0007.
     *
     * Based on the highest number already issued, not on a row count: counting
     * broke as soon as a reservation was deleted (the next number collided
     * with an existing one and the unique index rejected it).
     */
    public static function nextConfirmationNumber(): string
    {
        $prefix = 'OL-'.now()->year.'-';
        $last = static::where('confirmation_number', 'like', $prefix.'%')->max('confirmation_number');
        $next = $last ? ((int) substr($last, strlen($prefix))) + 1 : 1;

        return $prefix.str_pad((string) $next, 4, '0', STR_PAD_LEFT);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function getNightsAttribute(): int
    {
        return $this->check_in->diffInDays($this->check_out);
    }
}
