<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $fillable = ['namespace', 'key', 'tr', 'en', 'de', 'sort_order', 'customized_at'];

    protected $casts = ['customized_at' => 'datetime'];
}
