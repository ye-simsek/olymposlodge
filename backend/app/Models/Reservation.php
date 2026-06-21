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

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function getNightsAttribute(): int
    {
        return $this->check_in->diffInDays($this->check_out);
    }
}
