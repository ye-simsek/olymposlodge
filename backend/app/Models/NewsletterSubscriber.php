<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsletterSubscriber extends Model
{
    protected $fillable = [
        'email', 'name', 'language', 'consent_at', 'ip_address', 'is_active',
    ];

    protected $casts = [
        'consent_at' => 'datetime',
        'is_active' => 'boolean',
    ];
}
