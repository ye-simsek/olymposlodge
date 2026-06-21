<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatLog extends Model
{
    protected $fillable = [
        'conversation_id',
        'user_message',
        'bot_response',
        'language',
    ];
}
