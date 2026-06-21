<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteMedia extends Model
{
    protected $table = 'site_media';

    protected $fillable = ['key', 'label', 'group', 'url', 'sort_order'];
}
