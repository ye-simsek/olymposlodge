<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = [
        'slug', 'title_tr', 'title_en', 'title_de',
        'excerpt_tr', 'excerpt_en', 'excerpt_de',
        'content_tr', 'content_en', 'content_de',
        'cover_image', 'author', 'tags', 'published_at', 'is_published',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->whereNotNull('published_at');
    }
}
