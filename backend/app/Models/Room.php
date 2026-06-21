<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
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
}
